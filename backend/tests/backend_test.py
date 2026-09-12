"""TonAer backend API tests — health, leads (homepage lead form), jobs (regression)."""
import os
import uuid

import pytest
import requests
from dotenv import dotenv_values

frontend_env = dotenv_values("/app/frontend/.env")
base_url = os.environ.get("REACT_APP_BACKEND_URL") or frontend_env.get("REACT_APP_BACKEND_URL")
if not base_url:
    raise RuntimeError("REACT_APP_BACKEND_URL is missing from env and /app/frontend/.env")
BASE_URL = base_url.rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---- Health / root ----
class TestHealth:
    def test_root(self, client):
        r = client.get(f"{API}/")
        assert r.status_code == 200
        assert r.json().get("message") == "TonAer API"

    def test_health(self, client):
        r = client.get(f"{API}/health")
        assert r.status_code == 200
        assert r.json() == {"status": "ok"}


# ---- Leads (POST /api/leads used by homepage light LeadForm) ----
class TestLeads:
    def test_create_lead_and_verify_persistence(self, client):
        email = f"TEST_lead_{uuid.uuid4().hex[:8]}@example.com"
        payload = {
            "name": "TEST_QA Lead",
            "company": "TEST_QA Operator",
            "email": email,
            "fleet_size": "10k-100k",
            "timeframe": "6m",
        }
        r = client.post(f"{API}/leads", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert isinstance(data.get("id"), str) and len(data["id"]) > 0
        assert data["name"] == payload["name"]
        assert data["company"] == payload["company"]
        assert data["email"] == email
        assert data["fleet_size"] == "10k-100k"
        assert data["timeframe"] == "6m"
        assert "created_at" in data
        assert "_id" not in data

        # verify persistence via GET /api/leads
        g = client.get(f"{API}/leads")
        assert g.status_code == 200
        leads = g.json()
        assert isinstance(leads, list)
        match = [x for x in leads if x["email"] == email]
        assert len(match) == 1
        assert match[0]["name"] == payload["name"]
        assert "_id" not in match[0]

    def test_create_lead_optional_fields_blank(self, client):
        # Homepage form posts empty strings when the selects are untouched
        email = f"TEST_lead_{uuid.uuid4().hex[:8]}@example.com"
        payload = {"name": "TEST_Minimal", "company": "TEST_Co", "email": email,
                   "fleet_size": "", "timeframe": ""}
        r = client.post(f"{API}/leads", json=payload)
        assert r.status_code == 200, r.text
        assert r.json()["email"] == email

    @pytest.mark.parametrize("payload,label", [
        ({"name": "TEST_x", "company": "TEST_c", "email": "not-an-email"}, "bad email"),
        ({"name": "", "company": "TEST_c", "email": "a@b.com"}, "empty name"),
        ({"company": "TEST_c", "email": "a@b.com"}, "missing name"),
    ])
    def test_create_lead_validation(self, client, payload, label):
        r = client.post(f"{API}/leads", json=payload)
        assert r.status_code == 422, f"{label}: {r.status_code} {r.text[:200]}"

    def test_create_lead_with_phone_and_message(self, client):
        # New homepage RequestDemoForm posts optional phone + message fields.
        email = f"TEST_lead_{uuid.uuid4().hex[:8]}@example.com"
        payload = {
            "name": "TEST_QA Phone",
            "company": "TEST_QA Co",
            "email": email,
            "phone": "+1 415 555 0199",
            "message": "TEST_QA_MESSAGE_" + uuid.uuid4().hex[:6],
        }
        r = client.post(f"{API}/leads", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["phone"] == payload["phone"]
        assert data["message"] == payload["message"]
        assert "_id" not in data
        # Persistence
        leads = client.get(f"{API}/leads").json()
        match = [x for x in leads if x["email"] == email]
        assert len(match) == 1
        assert match[0]["phone"] == payload["phone"]
        assert match[0]["message"] == payload["message"]

    def test_create_lead_phone_message_omitted(self, client):
        # phone/message must remain OPTIONAL (existing form posts without them)
        email = f"TEST_lead_{uuid.uuid4().hex[:8]}@example.com"
        r = client.post(f"{API}/leads", json={
            "name": "TEST_NoPhone", "company": "TEST_Co", "email": email,
        })
        assert r.status_code == 200, r.text
        d = r.json()
        assert d.get("phone") is None
        assert d.get("message") is None

    def test_list_leads_schema(self, client):
        r = client.get(f"{API}/leads")
        assert r.status_code == 200
        for lead in r.json()[:5]:
            assert set(["id", "name", "company", "email", "created_at"]).issubset(lead.keys())


# ---- Jobs (regression: careers page data) ----
class TestJobs:
    def test_list_jobs(self, client):
        r = client.get(f"{API}/jobs")
        assert r.status_code == 200
        jobs = r.json()
        assert isinstance(jobs, list) and len(jobs) > 0
        assert all(j["status"] == "OPEN" for j in jobs)
        assert all("_id" not in j for j in jobs)

    def test_get_job_by_slug(self, client):
        slug = client.get(f"{API}/jobs").json()[0]["slug"]
        r = client.get(f"{API}/jobs/{slug}")
        assert r.status_code == 200
        assert r.json()["slug"] == slug

    def test_get_job_404(self, client):
        r = client.get(f"{API}/jobs/TEST_no_such_job_{uuid.uuid4().hex[:6]}")
        assert r.status_code == 404

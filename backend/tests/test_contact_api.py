import os
import requests

BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/")


def test_contact_lead_returns_confirmation():
    response = requests.post(
        f"{BASE_URL}/api/contact",
        json={"name": "TEST API", "company": "TEST Co", "email": "test-api@example.com", "message": "Regression"},
        timeout=20,
    )
    assert response.status_code == 200
    body = response.json()
    assert isinstance(body["id"], str) and body["id"]
    assert body["message"] == "Thanks — we’ll be in touch shortly."


def test_contact_lead_rejects_missing_required_fields():
    response = requests.post(f"{BASE_URL}/api/contact", json={"name": "TEST API"}, timeout=20)
    assert response.status_code == 422
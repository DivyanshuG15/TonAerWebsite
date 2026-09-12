from fastapi import FastAPI, APIRouter, UploadFile, File, Form, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from careers_data import JOBS_SEED
import requests

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")


class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class LeadCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    company: str = Field(min_length=1, max_length=160)
    email: EmailStr
    fleet_size: Optional[str] = None
    timeframe: Optional[str] = None
    phone: Optional[str] = Field(default=None, max_length=40)
    message: Optional[str] = Field(default=None, max_length=2000)


class Lead(LeadCreate):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


@api_router.get("/")
async def root():
    return {"message": "TonAer API"}


@api_router.get("/health")
async def health():
    return {"status": "ok"}


@api_router.post("/leads", response_model=Lead)
async def create_lead(input: LeadCreate):
    lead = Lead(**input.model_dump())
    doc = lead.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.leads.insert_one(doc)
    return lead


@api_router.get("/leads", response_model=List[Lead])
async def list_leads():
    leads = await db.leads.find({}, {"_id": 0}).to_list(1000)
    for lead in leads:
        if isinstance(lead.get('created_at'), str):
            lead['created_at'] = datetime.fromisoformat(lead['created_at'])
    return leads


MAX_RESUME_BYTES = int(os.environ.get('MAX_RESUME_SIZE_MB', '5')) * 1024 * 1024
ALLOWED_RESUME_EXT = {'.pdf', '.doc', '.docx'}

STORAGE_BASE = (os.environ.get("INTEGRATION_PROXY_URL") or "").strip() or "https://integrations.emergentagent.com"
STORAGE_URL = STORAGE_BASE.rstrip("/") + "/objstore/api/v1/storage"
EMERGENT_KEY = os.environ.get("EMERGENT_LLM_KEY")
APP_NAME = "tonaer"
storage_key = None


def init_storage(force: bool = False):
    global storage_key
    if storage_key and not force:
        return storage_key
    resp = requests.post(f"{STORAGE_URL}/init", json={"emergent_key": EMERGENT_KEY}, timeout=30)
    resp.raise_for_status()
    storage_key = resp.json()["storage_key"]
    return storage_key


def put_object(path: str, data: bytes, content_type: str) -> dict:
    key = init_storage()
    resp = requests.put(
        f"{STORAGE_URL}/objects/{path}",
        headers={"X-Storage-Key": key, "Content-Type": content_type},
        data=data,
        timeout=120,
    )
    resp.raise_for_status()
    return resp.json()


@api_router.get("/jobs")
async def list_jobs():
    # Only OPEN jobs are listed publicly; statuses: DRAFT / OPEN / CLOSED / ARCHIVED
    return await db.jobs.find({"status": "OPEN"}, {"_id": 0}).sort("posted_date", -1).to_list(500)


@api_router.get("/jobs/{slug}")
async def get_job(slug: str):
    job = await db.jobs.find_one({"slug": slug, "status": {"$in": ["OPEN", "CLOSED"]}}, {"_id": 0})
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job


@api_router.post("/applications")
async def submit_application(
    full_name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(''),
    current_location: str = Form(''),
    years_experience: str = Form(''),
    current_company: str = Form(''),
    linkedin: str = Form(''),
    portfolio: str = Form(''),
    cover_letter: str = Form(''),
    additional_info: str = Form(''),
    job_id: str = Form(''),
    job_title: str = Form(''),
    area_of_interest: str = Form(''),
    resume: UploadFile = File(...),
):
    ext = Path(resume.filename or '').suffix.lower()
    if ext not in ALLOWED_RESUME_EXT:
        raise HTTPException(status_code=400, detail="Resume must be a PDF, DOC or DOCX file.")
    contents = await resume.read()
    if len(contents) > MAX_RESUME_BYTES:
        raise HTTPException(status_code=400, detail=f"Resume exceeds the {MAX_RESUME_BYTES // (1024 * 1024)} MB limit.")
    storage_path = f"{APP_NAME}/resumes/{uuid.uuid4().hex}{ext}"
    result = put_object(storage_path, contents, resume.content_type or "application/octet-stream")
    reference = f"XU-{uuid.uuid4().hex[:8].upper()}"
    doc = {
        "application_id": str(uuid.uuid4()),
        "reference": reference,
        "type": "general" if not job_id else "job",
        "job_id": job_id or None,
        "job_title": job_title or None,
        "area_of_interest": area_of_interest or None,
        "full_name": full_name,
        "email": email,
        "phone": phone,
        "current_location": current_location,
        "years_experience": years_experience,
        "current_company": current_company,
        "linkedin": linkedin,
        "portfolio": portfolio,
        "cover_letter": cover_letter,
        "additional_info": additional_info,
        "resume_path": result["path"],
        "resume_original_name": resume.filename,
        "is_deleted": False,
        "status": "NEW",
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.applications.insert_one(doc)
    return {"ok": True, "reference": reference}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def seed_jobs():
    if await db.jobs.count_documents({}) == 0:
        now = datetime.now(timezone.utc).isoformat()
        await db.jobs.insert_many([{**j, "created_at": now, "updated_at": now} for j in JOBS_SEED])
        logger.info(f"Seeded {len(JOBS_SEED)} job postings")
    try:
        init_storage()
        logger.info("Object storage initialized")
    except Exception as e:
        logger.error(f"Storage init failed: {e}")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

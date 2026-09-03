import { useRef, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Upload, X, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { GENERAL_APPLICATION_AREAS } from '../../data/careersConfig';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const MAX_MB = 5;

const inputCls =
    'w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all duration-300';

const FIELDS = [
    { name: 'full_name', label: 'Full Name', required: true, type: 'text', span: 1 },
    { name: 'email', label: 'Email', required: true, type: 'email', span: 1 },
    { name: 'phone', label: 'Phone Number', type: 'tel', span: 1 },
    { name: 'current_location', label: 'Current Location', type: 'text', span: 1 },
    { name: 'years_experience', label: 'Years of Experience', type: 'number', span: 1 },
    { name: 'current_company', label: 'Current / Most Recent Company', type: 'text', span: 1 },
    { name: 'linkedin', label: 'LinkedIn Profile', type: 'url', span: 1 },
    { name: 'portfolio', label: 'Portfolio / GitHub', type: 'url', span: 1 },
];

export function ApplicationForm({ job, general = false, demo = false }) {
    const [form, setForm] = useState({});
    const [area, setArea] = useState('');
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [busy, setBusy] = useState(false);
    const [reference, setReference] = useState(null);
    const fileRef = useRef();

    const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

    const onFile = (e) => {
        const f = e.target.files?.[0];
        if (!f) return;
        const ext = f.name.split('.').pop().toLowerCase();
        if (!['pdf', 'doc', 'docx'].includes(ext)) {
            toast.error('Resume must be a PDF, DOC or DOCX file.');
            e.target.value = '';
            return;
        }
        if (f.size > MAX_MB * 1024 * 1024) {
            toast.error(`Resume must be under ${MAX_MB} MB.`);
            e.target.value = '';
            return;
        }
        setFile(f);
    };

    const submit = async (e) => {
        e.preventDefault();
        if (!file) {
            toast.error('Please attach your resume (PDF, DOC or DOCX).');
            return;
        }
        setBusy(true);
        setProgress(0);
        if (demo) {
            // Demo positions: simulate the flow locally, nothing is submitted or stored.
            setTimeout(() => {
                setBusy(false);
                setReference('DEMO');
            }, 900);
            return;
        }
        try {
            const fd = new FormData();
            Object.entries(form).forEach(([k, v]) => fd.append(k, v ?? ''));
            fd.append('cover_letter', form.cover_letter || '');
            fd.append('additional_info', form.additional_info || '');
            if (job) {
                fd.append('job_id', job.job_id);
                fd.append('job_title', job.title);
            }
            if (general) fd.append('area_of_interest', area);
            fd.append('resume', file);
            const { data } = await axios.post(`${API}/applications`, fd, {
                onUploadProgress: (ev) => setProgress(Math.round((ev.loaded / (ev.total || 1)) * 100)),
            });
            setReference(data.reference);
        } catch (err) {
            toast.error(err.response?.data?.detail || 'Submission failed. Please try again.');
        } finally {
            setBusy(false);
        }
    };

    if (reference) {
        if (demo) {
            return (
                <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-2xl border border-white/15 bg-white/5 p-10 text-center"
                    data-testid="application-success"
                >
                    <CheckCircle size={36} className="text-brand mx-auto" />
                    <div className="font-display font-bold text-2xl mt-5">Demo Application Complete</div>
                    <p className="text-slate-400 text-sm mt-3 max-w-md mx-auto leading-relaxed">
                        This is a demonstration position. No application was submitted or stored.
                    </p>
                    <div className="mt-6 inline-block font-mono-xu text-xs tracking-[0.25em] border border-white/20 text-slate-400 rounded-full px-5 py-2.5">
                        DEMO — NOT SUBMITTED
                    </div>
                </motion.div>
            );
        }
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl border border-emerald-400/30 bg-emerald-400/5 p-10 text-center"
                data-testid="application-success"
            >
                <CheckCircle size={36} className="text-emerald-400 mx-auto" />
                <div className="font-display font-bold text-2xl mt-5">Application Submitted Successfully</div>
                <p className="text-slate-400 text-sm mt-3 max-w-md mx-auto leading-relaxed">
                    Thank you for your interest in joining our team. Your application has been received.
                </p>
                <div className="mt-6 inline-block font-mono-xu text-xs tracking-[0.25em] border border-emerald-400/40 text-emerald-300 rounded-full px-5 py-2.5">
                    REFERENCE: {reference}
                </div>
            </motion.div>
        );
    }

    return (
        <form onSubmit={submit} data-testid="application-form">
            {demo && (
                <div className="mb-6 rounded-xl border border-amber-400/30 bg-amber-400/5 px-5 py-3.5 text-center font-mono-xu text-[10px] tracking-[0.25em] text-amber-300" data-testid="demo-form-banner">
                    DEMO APPLICATION — NO REAL APPLICATION WILL BE SUBMITTED
                </div>
            )}
            {job && (
                <div className="mb-6 rounded-xl border border-brand/30 bg-brand/5 px-5 py-4 flex items-center justify-between">
                    <span className="font-mono-xu text-[10px] tracking-[0.25em] text-slate-400">APPLYING FOR</span>
                    <span className="font-display font-semibold text-brand-soft" data-testid="applying-for">{job.title}</span>
                </div>
            )}
            <div className="grid sm:grid-cols-2 gap-4">
                {FIELDS.map((f) => (
                    <div key={f.name}>
                        <label className="block font-mono-xu text-[9px] tracking-[0.25em] text-slate-500 mb-1.5">
                            {f.label.toUpperCase()} {f.required && <span className="text-brand">*</span>}
                        </label>
                        <input
                            type={f.type}
                            required={f.required}
                            className={inputCls}
                            value={form[f.name] || ''}
                            onChange={set(f.name)}
                            data-testid={`field-${f.name}`}
                        />
                    </div>
                ))}
                {general && (
                    <div className="sm:col-span-2">
                        <label className="block font-mono-xu text-[9px] tracking-[0.25em] text-slate-500 mb-1.5">AREA OF INTEREST *</label>
                        <select required value={area} onChange={(e) => setArea(e.target.value)} className={inputCls} data-testid="field-area-of-interest">
                            <option value="">Select an area</option>
                            {GENERAL_APPLICATION_AREAS.map((a) => (
                                <option key={a} value={a} className="bg-slate-950">{a}</option>
                            ))}
                        </select>
                    </div>
                )}
                <div className="sm:col-span-2">
                    <label className="block font-mono-xu text-[9px] tracking-[0.25em] text-slate-500 mb-1.5">COVER LETTER</label>
                    <textarea rows={4} className={inputCls} value={form.cover_letter || ''} onChange={set('cover_letter')} data-testid="field-cover-letter" />
                </div>
                <div className="sm:col-span-2">
                    <label className="block font-mono-xu text-[9px] tracking-[0.25em] text-slate-500 mb-1.5">ADDITIONAL INFORMATION</label>
                    <textarea rows={3} className={inputCls} value={form.additional_info || ''} onChange={set('additional_info')} data-testid="field-additional-info" />
                </div>
                <div className="sm:col-span-2">
                    <label className="block font-mono-xu text-[9px] tracking-[0.25em] text-slate-500 mb-1.5">
                        RESUME / CV <span className="text-brand">*</span>
                    </label>
                    <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={onFile} data-testid="field-resume" />
                    {file ? (
                        <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-3" data-testid="resume-attached">
                            <span className="text-xs text-slate-300 truncate flex-1">{file.name}</span>
                            <span className="font-mono-xu text-[9px] text-slate-500">{(file.size / 1024).toFixed(0)} KB</span>
                            <button type="button" onClick={() => { setFile(null); if (fileRef.current) fileRef.current.value = ''; }} className="p-2 text-slate-500 hover:text-white" aria-label="Remove resume" data-testid="resume-remove">
                                <X size={14} />
                            </button>
                        </div>
                    ) : (
                        <button
                            type="button"
                            onClick={() => fileRef.current?.click()}
                            data-testid="resume-upload-button"
                            className="w-full flex items-center justify-center gap-3 rounded-xl border border-dashed border-white/20 hover:border-brand/60 bg-white/5 py-4 text-sm text-slate-300 hover:text-white transition-all duration-300"
                        >
                            <Upload size={15} className="text-brand" />
                            Upload Resume — PDF, DOC or DOCX, max {MAX_MB} MB
                        </button>
                    )}
                </div>
            </div>
            {busy && progress > 0 && (
                <div className="mt-4 h-1 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-brand transition-all duration-300" style={{ width: `${progress}%` }} data-testid="upload-progress" />
                </div>
            )}
            <button
                type="submit"
                disabled={busy}
                data-testid="application-submit"
                className="mt-6 w-full rounded-full bg-[#00D084] hover:bg-brand-strong disabled:opacity-60 text-[#04150E] text-sm font-semibold tracking-wide py-4 transition-all duration-300 hover:shadow-xl hover:shadow-[#00D084]/25"
            >
                {busy ? (demo ? 'SIMULATING…' : `SUBMITTING… ${progress}%`) : demo ? 'SUBMIT DEMO APPLICATION' : 'SUBMIT APPLICATION'}
            </button>
        </form>
    );
}

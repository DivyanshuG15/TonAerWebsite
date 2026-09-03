import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const inputCls =
    'w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all duration-300';

export function LeadForm() {
    const [form, setForm] = useState({ name: '', company: '', email: '', fleet_size: '', timeframe: '' });
    const [busy, setBusy] = useState(false);

    const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

    const submit = async (e) => {
        e.preventDefault();
        setBusy(true);
        try {
            await axios.post(`${API}/leads`, form);
            toast.success('Request received — the TonAer team will reach out shortly.');
            setForm({ name: '', company: '', email: '', fleet_size: '', timeframe: '' });
        } catch (err) {
            toast.error('Could not send your request. Please check the details and try again.');
        } finally {
            setBusy(false);
        }
    };

    return (
        <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left" data-testid="lead-form">
            <input required className={inputCls} placeholder="Full name" value={form.name} onChange={set('name')} data-testid="lead-name-input" />
            <input required className={inputCls} placeholder="Company / Operator" value={form.company} onChange={set('company')} data-testid="lead-company-input" />
            <input required type="email" className={inputCls} placeholder="Work email" value={form.email} onChange={set('email')} data-testid="lead-email-input" />
            <select className={inputCls} value={form.fleet_size} onChange={set('fleet_size')} data-testid="lead-fleet-select">
                <option value="">Fleet size (optional)</option>
                <option value="<10k">Under 10k subscribers</option>
                <option value="10k-100k">10k – 100k subscribers</option>
                <option value="100k-1M">100k – 1M subscribers</option>
                <option value=">1M">1M+ subscribers</option>
            </select>
            <select className={`${inputCls} sm:col-span-2`} value={form.timeframe} onChange={set('timeframe')} data-testid="lead-timeframe-select">
                <option value="">Wi-Fi 7 deployment timeframe (optional)</option>
                <option value="now">Evaluating now</option>
                <option value="6m">Within 6 months</option>
                <option value="12m">Within 12 months</option>
                <option value="research">Early research</option>
            </select>
            <button
                type="submit"
                disabled={busy}
                data-testid="lead-submit-button"
                className="sm:col-span-2 rounded-full bg-[#00D084] hover:bg-brand-strong disabled:opacity-60 text-[#04150E] font-semibold tracking-wide text-sm py-4 transition-all duration-300 hover:shadow-xl hover:shadow-[#00D084]/25 hover:-translate-y-0.5"
            >
                {busy ? 'SENDING...' : 'REQUEST A DEMO'}
            </button>
        </form>
    );
}

import { useState } from 'react';
import { toast } from 'sonner';

const inputCls =
    'w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-[15px] text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#00D084] focus:ring-2 focus:ring-[#00D084]/15 transition-all duration-300';

const labelCls = 'block text-[13px] font-semibold text-slate-700 mb-1.5';

export function RequestDemoForm() {
    const [form, setForm] = useState({ first_name: '', last_name: '', email: '', company: '', phone: '', message: '' });
    const [sending, setSending] = useState(false);
    const [done, setDone] = useState(false);
    const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

    const submit = async (e) => {
        e.preventDefault();
        setSending(true);
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/leads`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: `${form.first_name} ${form.last_name}`.trim(),
                    company: form.company,
                    email: form.email,
                    phone: form.phone || null,
                    message: form.message || null,
                }),
            });
            if (!res.ok) throw new Error();
            setDone(true);
            toast.success("Request received. We'll be in touch shortly.");
        } catch {
            toast.error('Something went wrong. Please try again.');
        }
        setSending(false);
    };

    if (done) {
        return (
            <div className="rounded-2xl border border-[#00D084]/30 bg-[#E6FBF3] p-10 text-center" data-testid="demo-success">
                <div className="font-display font-bold text-xl text-slate-900">Request received.</div>
                <p className="text-[15px] text-slate-600 mt-3 leading-relaxed">
                    Thanks for reaching out — the TonAer team will get back to you shortly.
                </p>
                <button
                    onClick={() => {
                        setDone(false);
                        setForm({ first_name: '', last_name: '', email: '', company: '', phone: '', message: '' });
                    }}
                    className="mt-6 text-sm font-semibold text-[#00905F] hover:text-[#00B874] transition-colors"
                    data-testid="demo-another"
                >
                    Send another request
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={submit} id="demo-form" data-testid="demo-form" className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
                <div>
                    <label htmlFor="demo-first-name" className={labelCls}>First Name</label>
                    <input id="demo-first-name" data-testid="demo-first-name" required value={form.first_name} onChange={set('first_name')} className={inputCls} placeholder="Jane" />
                </div>
                <div>
                    <label htmlFor="demo-last-name" className={labelCls}>Last Name</label>
                    <input id="demo-last-name" data-testid="demo-last-name" required value={form.last_name} onChange={set('last_name')} className={inputCls} placeholder="Doe" />
                </div>
            </div>
            <div>
                <label htmlFor="demo-email" className={labelCls}>Work Email</label>
                <input id="demo-email" data-testid="demo-email" type="email" required value={form.email} onChange={set('email')} className={inputCls} placeholder="jane@company.com" />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
                <div>
                    <label htmlFor="demo-company" className={labelCls}>Company</label>
                    <input id="demo-company" data-testid="demo-company" required value={form.company} onChange={set('company')} className={inputCls} placeholder="Company name" />
                </div>
                <div>
                    <label htmlFor="demo-phone" className={labelCls}>
                        Phone <span className="text-slate-400 font-normal">(optional)</span>
                    </label>
                    <input id="demo-phone" data-testid="demo-phone" type="tel" value={form.phone} onChange={set('phone')} className={inputCls} placeholder="+1 ..." />
                </div>
            </div>
            <div>
                <label htmlFor="demo-message" className={labelCls}>What can we help you with?</label>
                <textarea id="demo-message" data-testid="demo-message" rows={4} value={form.message} onChange={set('message')} className={`${inputCls} resize-none`} placeholder="Tell us about your network, deployment or white-label requirements..." />
            </div>
            <button
                type="submit"
                disabled={sending}
                data-testid="demo-submit"
                className="w-full rounded-full bg-[#00D084] hover:bg-[#00B874] disabled:opacity-50 text-[#04150E] text-[15px] font-semibold tracking-wide py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#00D084]/25"
            >
                {sending ? 'Sending...' : 'Request a Demo'}
            </button>
        </form>
    );
}

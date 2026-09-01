import { Fragment, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { PRODUCTS, SPEC_GROUPS, FILTERS, productById, seriesById } from '../../data/catalog';

function Cell({ value }) {
    if (!value || value === '—') return <span className="text-slate-600">—</span>;
    if (value.startsWith('✓')) return <span className="text-emerald-400">{value.replace('✓ ', '') || '✓'}</span>;
    return <span className="text-slate-200">{value}</span>;
}

const REQS = [
    { id: 'wifi7', label: 'Wi-Fi 7' },
    { id: 'sim', label: 'SIM Backup' },
    { id: 'triband', label: 'Tri-Band' },
    { id: 'mesh', label: 'Mesh' },
    { id: 'enterprise', label: 'Enterprise Deployment' },
    { id: 'iot', label: 'IoT' },
];

export function CompareSection({ currentId, onSelect }) {
    const [filters, setFilters] = useState([]);
    const [slots, setSlots] = useState([currentId]);
    const [reqs, setReqs] = useState([]);

    useEffect(() => {
        setSlots((s) => [currentId, ...s.filter((id) => id !== currentId)].slice(0, 4));
    }, [currentId]);

    const compatible = (p) => filters.every((f) => p.tags.includes(f));
    const toggleFilter = (id) => setFilters((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
    const addSlot = (id) => {
        if (id && !slots.includes(id) && slots.length < 4) setSlots([...slots, id]);
    };
    const removeSlot = (id) => {
        if (id !== currentId) setSlots(slots.filter((s) => s !== id));
    };
    const toggleReq = (id) => setReqs((r) => (r.includes(id) ? r.filter((x) => x !== id) : [...r, id]));
    const matches = reqs.length
        ? PRODUCTS.filter((p) => reqs.every((r) => p.tags.includes(r))).slice(0, 3)
        : [];

    const slotProducts = slots.map(productById).filter(Boolean);

    return (
        <div data-testid="compare-section">
            <div className="flex flex-wrap gap-2 mb-8">
                {FILTERS.map((f) => (
                    <button
                        key={f.id}
                        onClick={() => toggleFilter(f.id)}
                        data-testid={`filter-${f.id}`}
                        className={`rounded-full border px-4 py-2 font-mono-xu text-[10px] tracking-[0.15em] transition-all duration-300 ${
                            filters.includes(f.id)
                                ? 'border-sky-400 bg-sky-400/15 text-sky-300'
                                : 'border-white/10 text-slate-400 hover:border-white/25 hover:text-slate-200'
                        }`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-6">
                {slotProducts.map((p) => (
                    <span
                        key={p.id}
                        className="flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-400/10 px-4 py-2 text-sm text-white"
                        data-testid={`compare-slot-${p.id}`}
                    >
                        <span className="font-mono-xu text-[9px] tracking-[0.2em] text-sky-400">{seriesById(p.series).name.toUpperCase()}</span>
                        {p.name}
                        {p.id !== currentId && (
                            <button onClick={() => removeSlot(p.id)} className="text-slate-500 hover:text-white" aria-label={`Remove ${p.name}`} data-testid={`compare-remove-${p.id}`}>
                                <X size={12} />
                            </button>
                        )}
                    </span>
                ))}
                {slots.length < 4 && (
                    <select
                        value=""
                        onChange={(e) => addSlot(e.target.value)}
                        data-testid="compare-add"
                        className="rounded-full border border-dashed border-white/20 bg-transparent px-4 py-2 text-sm text-slate-400 outline-none hover:border-sky-400/50 cursor-pointer"
                    >
                        <option value="" className="bg-slate-950">+ Add Gateway</option>
                        {PRODUCTS.filter((p) => !slots.includes(p.id)).map((p) => (
                            <option key={p.id} value={p.id} className="bg-slate-950">
                                {seriesById(p.series).name} — {p.name} {compatible(p) && filters.length ? '✓' : ''}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5" data-testid="compare-table">
                <table className="w-full min-w-[640px] text-sm">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="text-left font-mono-xu text-[10px] tracking-[0.25em] text-slate-500 px-5 py-4 sticky left-0 bg-[#0B1120]">FEATURE</th>
                            {slotProducts.map((p) => (
                                <th key={p.id} className="text-left px-5 py-4">
                                    <button onClick={() => onSelect(p)} className="text-left group" data-testid={`compare-head-${p.id}`}>
                                        <span className="block font-display font-bold text-white group-hover:text-sky-400 transition-colors">{p.name}</span>
                                        <span className="block font-mono-xu text-[9px] tracking-[0.2em] text-slate-500 mt-1">{seriesById(p.series).name.toUpperCase()}</span>
                                    </button>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {SPEC_GROUPS.map((group) => (
                            <Fragment key={group.id}>
                                <tr className="border-b border-white/10 bg-white/[0.03]">
                                    <td colSpan={slotProducts.length + 1} className="px-5 py-2.5 font-mono-xu text-[9px] tracking-[0.3em] text-sky-400 sticky left-0 bg-[#0B1120]">
                                        {group.label}
                                    </td>
                                </tr>
                                {group.rows.map((row) => (
                                    <tr key={group.id + row} className="border-b border-white/5">
                                        <td className="px-5 py-2.5 text-slate-400 text-xs sticky left-0 bg-[#0B1120]">{row}</td>
                                        {slotProducts.map((p) => (
                                            <td key={p.id} className="px-5 py-2.5 text-xs font-medium">
                                                <Cell value={p.specs[group.id]?.[row]} />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-10" data-testid="recommender">
                <div className="font-mono-xu text-[10px] tracking-[0.3em] text-sky-400 mb-3">PRODUCT RECOMMENDATION</div>
                <h3 className="font-display font-bold text-2xl tracking-tight">Not sure which gateway is right for you?</h3>
                <div className="flex flex-wrap gap-2 mt-6">
                    {REQS.map((r) => (
                        <button
                            key={r.id}
                            onClick={() => toggleReq(r.id)}
                            data-testid={`req-${r.id}`}
                            className={`rounded-full border px-4 py-2 text-xs transition-all duration-300 ${
                                reqs.includes(r.id)
                                    ? 'border-sky-400 bg-sky-400/15 text-sky-300'
                                    : 'border-white/10 text-slate-400 hover:border-white/25 hover:text-slate-200'
                            }`}
                        >
                            {r.label}
                        </button>
                    ))}
                </div>
                {reqs.length > 0 && (
                    <div className="mt-8">
                        <div className="font-mono-xu text-[9px] tracking-[0.3em] text-slate-500 mb-4">RECOMMENDED FOR YOUR REQUIREMENTS</div>
                        {matches.length ? (
                            <div className="grid sm:grid-cols-3 gap-4">
                                {matches.map((p) => (
                                    <motion.div
                                        key={p.id}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="rounded-2xl border border-sky-400/30 bg-sky-400/5 p-5"
                                        data-testid={`recommend-${p.id}`}
                                    >
                                        <div className="font-display font-bold text-lg">{p.name}</div>
                                        <div className="font-mono-xu text-[9px] tracking-[0.2em] text-slate-500 mt-1">{seriesById(p.series).name.toUpperCase()}</div>
                                        <ul className="mt-4 space-y-1.5">
                                            {REQS.filter((r) => reqs.includes(r.id) && p.tags.includes(r.id)).map((r) => (
                                                <li key={r.id} className="flex items-center gap-2 text-xs text-slate-300">
                                                    <Check size={12} className="text-emerald-400" />
                                                    {r.label}
                                                </li>
                                            ))}
                                        </ul>
                                        <button
                                            onClick={() => onSelect(p)}
                                            className="mt-4 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors"
                                            data-testid={`recommend-view-${p.id}`}
                                        >
                                            View {p.name} →
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-slate-400">
                                No single gateway matches all selected requirements —{' '}
                                <a href="/#contact" className="text-sky-400 hover:text-sky-300">talk to our team</a> about a custom build.
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

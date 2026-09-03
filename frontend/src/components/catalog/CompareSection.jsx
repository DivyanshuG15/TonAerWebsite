import { Fragment, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X, Check, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { PRODUCTS, SERIES, SPEC_GROUPS, FILTERS, productById, seriesById } from '../../data/catalog';

function Cell({ value }) {
    if (!value || value === '—') return <span className="text-slate-600">—</span>;
    if (value.startsWith('✓')) return <span className="text-emerald-400">{value.replace('✓ ', '') || '✓'}</span>;
    return <span className="text-slate-200">{value}</span>;
}

function DeviceThumb({ p }) {
    const led = seriesById(p.series).variant.ledColor || '#00D084';
    return (
        <div className="relative h-20 rounded-xl bg-gradient-to-b from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center overflow-hidden">
            <div className="w-24 h-6 rounded-md bg-gradient-to-b from-slate-600 to-slate-700 relative">
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full" style={{ background: led }} />
            </div>
            <span className="absolute top-2 right-2.5 font-mono-xu text-[8px] tracking-[0.2em] text-slate-500">
                {seriesById(p.series).name.toUpperCase()}
            </span>
        </div>
    );
}

const normValue = (v) => (!v || v === '—' ? '' : v);

export function CompareSection({ onSelect }) {
    const [filters, setFilters] = useState([]);
    const [query, setQuery] = useState('');
    const [selected, setSelected] = useState([]);
    const [comparing, setComparing] = useState(false);
    const [highlightDiffs, setHighlightDiffs] = useState(false);

    const toggleFilter = (id) => {
        setComparing(false);
        setFilters((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
    };

    const q = query.trim().toLowerCase();
    const matches = PRODUCTS.filter(
        (p) =>
            filters.every((f) => p.tags.includes(f)) &&
            (!q ||
                `${p.name} ${seriesById(p.series).name} ${p.tag} ${p.badges.join(' ')}`.toLowerCase().includes(q))
    );
    const grouped = SERIES.map((s) => ({ series: s, items: matches.filter((p) => p.series === s.id) })).filter(
        (g) => g.items.length
    );

    const closest =
        matches.length === 0 && filters.length
            ? [...PRODUCTS]
                  .map((p) => ({ p, score: filters.filter((f) => p.tags.includes(f)).length }))
                  .filter((x) => x.score > 0)
                  .sort((a, b) => b.score - a.score)
                  .slice(0, 3)
                  .map((x) => x.p)
            : [];

    const add = (id) => {
        if (selected.includes(id)) return;
        if (selected.length >= 4) {
            toast.error('You can compare up to 4 gateways.');
            return;
        }
        setSelected([...selected, id]);
        setComparing(false);
    };
    const remove = (id) => {
        setSelected(selected.filter((s) => s !== id));
        setComparing(false);
    };

    const selectedProducts = selected.map(productById).filter(Boolean);

    const ProductCard = ({ p }) => {
        const added = selected.includes(p.id);
        return (
            <div
                className={`rounded-2xl border p-4 transition-all duration-300 ${
                    added ? 'border-brand/60 bg-brand/5' : 'border-white/10 bg-white/5 hover:border-white/25'
                }`}
                data-testid={`match-card-${p.id}`}
            >
                <DeviceThumb p={p} />
                <div className="font-display font-bold mt-3">{p.name}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{p.tag}</div>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {p.badges.slice(0, 3).map((b) => (
                        <span key={b} className="font-mono-xu text-[8px] tracking-[0.12em] border border-white/15 text-slate-400 rounded-full px-2 py-0.5">
                            {b.toUpperCase()}
                        </span>
                    ))}
                </div>
                <button
                    onClick={() => (added ? remove(p.id) : add(p.id))}
                    data-testid={`compare-toggle-${p.id}`}
                    className={`mt-4 w-full rounded-full text-xs font-semibold py-2.5 transition-all duration-300 flex items-center justify-center gap-1.5 ${
                        added
                            ? 'bg-brand/15 border border-brand/50 text-brand-soft'
                            : 'border border-white/15 text-slate-300 hover:border-brand/50 hover:text-white'
                    }`}
                >
                    {added ? (
                        <>
                            <Check size={13} /> Added
                        </>
                    ) : (
                        <>
                            <Plus size={13} /> Add to Compare
                        </>
                    )}
                </button>
            </div>
        );
    };

    return (
        <div data-testid="compare-section">
            <div className="relative max-w-md mb-6">
                <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search gateway — model, series or technology"
                    data-testid="gateway-search"
                    className="w-full rounded-full border border-white/10 bg-white/5 pl-11 pr-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all duration-300"
                />
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-3">
                {FILTERS.map((f) => (
                    <button
                        key={f.id}
                        onClick={() => toggleFilter(f.id)}
                        data-testid={`filter-${f.id}`}
                        className={`rounded-full border px-4 py-2 font-mono-xu text-[10px] tracking-[0.15em] transition-all duration-300 ${
                            filters.includes(f.id)
                                ? 'border-brand bg-brand/15 text-brand-soft'
                                : 'border-white/10 text-slate-400 hover:border-white/25 hover:text-slate-200'
                        }`}
                    >
                        {f.label}
                    </button>
                ))}
                {filters.length > 0 && (
                    <button
                        onClick={() => setFilters([])}
                        data-testid="clear-filters"
                        className="rounded-full border border-white/10 px-4 py-2 font-mono-xu text-[10px] tracking-[0.15em] text-slate-500 hover:text-white hover:border-white/30 transition-all duration-300"
                    >
                        CLEAR ALL FILTERS
                    </button>
                )}
            </div>

            <div className="flex items-center justify-between mt-8 mb-4">
                <span className="font-mono-xu text-[10px] tracking-[0.3em] text-brand">
                    MATCHING GATEWAYS — {matches.length}
                </span>
                {selected.length === 0 && (
                    <span className="font-mono-xu text-[9px] tracking-[0.25em] text-slate-500" data-testid="compare-empty-hint">
                        SELECT UP TO 4 GATEWAYS TO COMPARE
                    </span>
                )}
            </div>

            {matches.length === 0 ? (
                <div className="rounded-2xl border border-amber-400/30 bg-amber-400/5 p-8 text-center" data-testid="no-match">
                    <div className="font-mono-xu text-[10px] tracking-[0.3em] text-amber-300">NO EXACT MATCH FOUND</div>
                    <p className="text-sm text-slate-400 mt-3">No gateway currently matches all selected requirements.</p>
                    <button
                        onClick={() => setFilters((f) => f.slice(0, -1))}
                        data-testid="remove-filter"
                        className="mt-4 rounded-full border border-amber-400/40 text-amber-300 text-xs font-semibold px-6 py-2.5 hover:bg-amber-400/10 transition-all duration-300"
                    >
                        Remove a Filter
                    </button>
                    {closest.length > 0 && (
                        <div className="mt-8 text-left">
                            <div className="font-mono-xu text-[9px] tracking-[0.3em] text-slate-500 mb-3">CLOSEST MATCHES</div>
                            <div className="grid sm:grid-cols-3 gap-4">
                                {closest.map((p) => (
                                    <ProductCard key={p.id} p={p} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="space-y-8">
                    {grouped.map((g) => (
                        <div key={g.series.id}>
                            <div className="font-mono-xu text-[10px] tracking-[0.3em] text-slate-500 mb-3">
                                {g.series.name.toUpperCase()}
                            </div>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {g.items.map((p) => (
                                    <ProductCard key={p.id} p={p} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <AnimatePresence>
                {comparing && selectedProducts.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 24 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-10"
                        id="comparison-result"
                        data-testid="comparison-result"
                    >
                        <div className="flex items-center justify-between mb-5">
                            <span className="font-mono-xu text-[10px] tracking-[0.3em] text-brand">
                                COMPARISON — {selectedProducts.length} GATEWAY{selectedProducts.length > 1 ? 'S' : ''}
                            </span>
                            <div className="flex items-center gap-5">
                                {selectedProducts.length > 1 && (
                                    <button
                                        onClick={() => setHighlightDiffs((v) => !v)}
                                        data-testid="highlight-differences-toggle"
                                        aria-pressed={highlightDiffs}
                                        className={`flex items-center gap-2 text-xs font-semibold transition-colors ${
                                            highlightDiffs ? 'text-brand-soft' : 'text-slate-400 hover:text-white'
                                        }`}
                                    >
                                        <span
                                            className={`relative w-8 h-[18px] rounded-full transition-colors duration-300 ${
                                                highlightDiffs ? 'bg-brand' : 'bg-white/15'
                                            }`}
                                        >
                                            <span
                                                className={`absolute top-[2px] w-[14px] h-[14px] rounded-full bg-white transition-all duration-300 ${
                                                    highlightDiffs ? 'left-[16px]' : 'left-[2px]'
                                                }`}
                                            />
                                        </span>
                                        Highlight Differences
                                    </button>
                                )}
                                <button
                                    onClick={() => setComparing(false)}
                                    data-testid="modify-selection"
                                    className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                                >
                                    Modify Selection
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5" data-testid="compare-table">
                            <table className="w-full min-w-[640px] text-sm">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="text-left font-mono-xu text-[10px] tracking-[0.25em] text-slate-500 px-5 py-4 sticky left-0 bg-[#0B1120]">
                                            FEATURE
                                        </th>
                                        {selectedProducts.map((p) => (
                                            <th key={p.id} className="text-left px-5 py-4">
                                                <button onClick={() => onSelect(p)} className="text-left group" data-testid={`compare-head-${p.id}`}>
                                                    <span className="block font-display font-bold text-white group-hover:text-brand transition-colors">
                                                        {p.name}
                                                    </span>
                                                    <span className="block font-mono-xu text-[9px] tracking-[0.2em] text-slate-500 mt-1">
                                                        {seriesById(p.series).name.toUpperCase()}
                                                    </span>
                                                </button>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {SPEC_GROUPS.map((group) => (
                                        <FragmentGroup
                                            key={group.id}
                                            group={group}
                                            products={selectedProducts}
                                            highlightDiffs={highlightDiffs}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {selected.length > 0 && !comparing && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 rounded-full bg-slate-950/90 backdrop-blur-xl border border-white/15 shadow-2xl shadow-slate-950/60 pl-5 pr-2 py-2"
                        data-testid="compare-tray"
                    >
                        <span className="font-mono-xu text-[9px] tracking-[0.25em] text-slate-400 whitespace-nowrap">
                            {selected.length} GATEWAY{selected.length > 1 ? 'S' : ''} SELECTED
                        </span>
                        <div className="hidden sm:flex items-center gap-1.5">
                            {selectedProducts.map((p) => (
                                <span key={p.id} className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white">
                                    {p.name}
                                    <button onClick={() => remove(p.id)} className="text-slate-500 hover:text-white" aria-label={`Remove ${p.name}`} data-testid={`tray-remove-${p.id}`}>
                                        <X size={11} />
                                    </button>
                                </span>
                            ))}
                        </div>
                        <button
                            onClick={() => {
                                setComparing(true);
                                setTimeout(() => document.querySelector('#comparison-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
                            }}
                            data-testid="compare-now"
                            className="rounded-full bg-[#00D084] hover:bg-brand-strong text-[#04150E] text-xs font-semibold tracking-wide px-5 py-2.5 transition-colors duration-300"
                        >
                            Compare Now
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function FragmentGroup({ group, products, highlightDiffs }) {
    return (
        <Fragment>
            <tr className="border-b border-white/10 bg-white/[0.03]">
                <td colSpan={products.length + 1} className="px-5 py-2.5 font-mono-xu text-[9px] tracking-[0.3em] text-brand sticky left-0 bg-[#0B1120]">
                    {group.label}
                </td>
            </tr>
            {group.rows.map((row) => {
                const values = products.map((p) => normValue(p.specs[group.id]?.[row]));
                const identical = new Set(values).size <= 1;
                const dimmed = highlightDiffs && identical;
                const highlighted = highlightDiffs && !identical;
                return (
                    <tr
                        key={group.id + row}
                        data-testid={highlighted ? `diff-row-${group.id}` : undefined}
                        className={`border-b transition-opacity duration-300 ${
                            dimmed ? 'border-white/5 opacity-[0.55]' : highlighted ? 'border-brand/20 bg-brand/[0.07]' : 'border-white/5'
                        }`}
                    >
                        <td className={`px-5 py-2.5 text-xs sticky left-0 ${highlighted ? 'bg-[#0D1626] text-slate-300' : 'bg-[#0B1120] text-slate-400'}`}>
                            {row}
                        </td>
                        {products.map((p) => (
                            <td key={p.id} className="px-5 py-2.5 text-xs font-medium">
                                <Cell value={p.specs[group.id]?.[row]} />
                            </td>
                        ))}
                    </tr>
                );
            })}
        </Fragment>
    );
}

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { SPEC_GROUPS } from '../../data/catalog';

function SpecValue({ value }) {
    if (value === '—' || !value) return <span className="text-slate-600">—</span>;
    if (value.startsWith('✓')) return <span className="text-emerald-400">{value}</span>;
    return <span className="text-slate-200">{value}</span>;
}

export function SpecTable({ specs }) {
    const [open, setOpen] = useState(['wireless']);
    const toggle = (id) => setOpen((o) => (o.includes(id) ? o.filter((g) => g !== id) : [...o, id]));

    return (
        <div className="space-y-3" data-testid="spec-table">
            {SPEC_GROUPS.map((group) => {
                const rows = specs[group.id] || {};
                const isOpen = open.includes(group.id);
                return (
                    <div key={group.id} className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
                        <button
                            onClick={() => toggle(group.id)}
                            data-testid={`spec-group-${group.id}`}
                            className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/5 transition-colors duration-200"
                        >
                            <span className="font-mono-xu text-[11px] tracking-[0.3em] text-brand">{group.label}</span>
                            <ChevronDown size={15} className={`text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence initial={false}>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-6 pb-4">
                                        {group.rows.map((row) => (
                                            <div key={row} className="flex items-center justify-between gap-6 py-2.5 border-t border-white/5 text-sm">
                                                <span className="text-slate-400">{row}</span>
                                                <span className="font-medium text-right">
                                                    <SpecValue value={rows[row]} />
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}

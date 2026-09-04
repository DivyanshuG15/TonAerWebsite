import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import { AnimatePresence, motion } from 'framer-motion';
import { Upload, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { D71 } from '../experience/D71';
import { scrollStore } from '../experience/store';

// Per-series device variants + logo placement areas.
// Real product mockups (GLB / transparent PNG) can replace these configs later.
// `finishes` lists the optional casing colors (beyond Standard) actually
// offered per model. Series with no entry ship in a fixed industrial finish.
const SERIES = [
    {
        id: 'd',
        name: 'D Series',
        pos: 'Advanced high-performance connectivity',
        variant: {},
        logo: { position: [0, 0.262, 0.45], size: 0.6 },
        finishes: ['white', 'black'],
    },
    {
        id: 'm',
        name: 'M Series',
        pos: 'Reliable connectivity for scalable deployments',
        variant: { bodyColor: '#e6ebf1', panelColor: '#d6dee7', ledColor: '#00D084', logoColor: '#00D084', vents: 6 },
        logo: { position: [0, 0.262, -0.35], size: 0.55 },
        finishes: ['white', 'black'],
    },
    {
        id: 'q',
        name: 'Q Series',
        pos: 'Advanced gateway solutions',
        variant: { bodyColor: '#dde5ee', panelColor: '#ccd6e2', ledColor: '#22C55E', logoColor: '#16a34a', vents: 6, simTray: true },
        logo: { position: [-0.7, 0.262, 0.45], size: 0.45 },
        finishes: ['black'],
    },
    {
        id: 'o',
        name: 'O Series',
        pos: 'Specialized connectivity solutions',
        variant: { bodyColor: '#93a6bb', panelColor: '#7e93aa', ledColor: '#F59E0B', logoColor: '#F59E0B', vents: 4, ports: 2 },
        logo: { position: [0.7, 0.262, 0.45], size: 0.45 },
        finishes: [],
    },
];

const FINISHES = [
    { id: 'standard', label: 'Standard', swatch: null, override: {} },
    { id: 'white', label: 'White', swatch: '#f4f7fa', override: { bodyColor: '#f4f7fa', panelColor: '#e8edf3' } },
    { id: 'black', label: 'Black', swatch: '#1c2733', override: { bodyColor: '#1c2733', panelColor: '#141d27' } },
];

function LogoDecal({ url, placement }) {
    const [tex, setTex] = useState(null);
    useEffect(() => {
        setTex(null);
        if (!url) return;
        let alive = true;
        new THREE.TextureLoader().load(
            url,
            (t) => {
                if (alive) setTex(t);
            },
            undefined,
            () => toast.error('Could not read that logo file.')
        );
        return () => {
            alive = false;
        };
    }, [url]);
    if (!tex) return null;
    const aspect = tex.image?.width && tex.image?.height ? tex.image.width / tex.image.height : 2;
    const w = placement.size;
    const h = Math.min(w / Math.max(aspect, 0.4), placement.size * 0.55);
    return (
        <mesh position={[placement.position[0], placement.position[1] + 0.05, placement.position[2]]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[w, h]} />
            <meshBasicMaterial map={tex} side={THREE.DoubleSide} alphaTest={0.05} toneMapped={false} />
        </mesh>
    );
}

function Turntable({ variant, logoUrl, placement }) {
    const g = useRef();
    useFrame(({ clock }) => {
        if (g.current) g.current.rotation.y = clock.elapsedTime * 0.22;
    });
    return (
        <group ref={g} position={[0, -0.3, 0]}>
            <D71 {...variant} />
            <LogoDecal url={logoUrl} placement={placement} />
        </group>
    );
}

const stepKicker = 'font-mono-xu text-[10px] tracking-[0.3em] text-brand';

export function BrandPreview({ fixedSeries = null }) {
    const [model, setModel] = useState(fixedSeries);
    const [logoUrl, setLogoUrl] = useState(null);
    const [logoName, setLogoName] = useState('');
    const [finish, setFinish] = useState('standard');
    const fileRef = useRef();
    const navigate = useNavigate();

    const selected = SERIES.find((s) => s.id === (fixedSeries || model));
    const availableFinishes = selected
        ? FINISHES.filter((f) => f.id === 'standard' || (selected.finishes || []).includes(f.id))
        : FINISHES;
    const casingSupported = availableFinishes.length > 1;
    const finishOverride = FINISHES.find((f) => f.id === finish)?.override || {};
    const variant = selected ? { ...selected.variant, ...finishOverride } : {};

    const pickModel = (id) => {
        setModel(id);
        setFinish('standard');
    };

    const onFile = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const ok = ['image/png', 'image/svg+xml', 'image/jpeg'].includes(file.type);
        if (!ok) {
            toast.error('Please upload a PNG, SVG or JPG logo.');
            return;
        }
        if (file.size > 3 * 1024 * 1024) {
            toast.error('Logo must be under 3 MB.');
            return;
        }
        if (logoUrl) URL.revokeObjectURL(logoUrl);
        setLogoUrl(URL.createObjectURL(file));
        setLogoName(file.name);
    };

    const clearLogo = () => {
        if (logoUrl) URL.revokeObjectURL(logoUrl);
        setLogoUrl(null);
        setLogoName('');
        if (fileRef.current) fileRef.current.value = '';
    };

    const resetPreview = () => {
        clearLogo();
        setFinish('standard');
    };

    // Casing finishes are per-model — reset when the underlying series changes.
    useEffect(() => {
        setFinish('standard');
    }, [fixedSeries]);

    const goContact = () => {
        const el = document.querySelector('#contact');
        if (el) {
            if (scrollStore.lenis) scrollStore.lenis.scrollTo('#contact', { duration: 1.4 });
            else el.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate('/#contact');
        }
    };

    return (
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 p-6 sm:p-8" data-testid="brand-preview">
            <div className="font-mono-xu text-[10px] tracking-[0.4em] text-slate-500 mb-2">
                {fixedSeries ? 'LOOK & FEEL // WHITE-LABEL PREVIEW' : 'BUILD YOUR BRANDED GATEWAY'}
            </div>
            {fixedSeries && (
                <>
                    <h3 className="font-display font-bold tracking-tight text-2xl sm:text-3xl text-white mt-3">
                        See Your Brand on Your Gateway
                    </h3>
                    <p className="text-sm text-slate-400 mt-2 mb-4 max-w-xl leading-relaxed">
                        Explore how your gateway could look with your brand identity. Upload your logo and preview the experience.
                    </p>
                </>
            )}

            {!fixedSeries && (
                <>
                    <div className={`${stepKicker} mt-4`}>01 / SELECT YOUR MODEL</div>
                    <p className="text-xs text-slate-500 mt-1.5 mb-4">Choose a gateway model to start your brand preview.</p>
                    <div className="flex sm:grid sm:grid-cols-4 gap-3 overflow-x-auto pb-1 -mx-1 px-1">
                        {SERIES.map((s) => (
                            <button
                                key={s.id}
                                onClick={() => pickModel(s.id)}
                                data-testid={`model-select-${s.id}`}
                                className={`min-w-[130px] text-left rounded-xl border p-4 transition-all duration-300 ${
                                    model === s.id
                                        ? 'border-brand bg-brand/10 shadow-lg shadow-brand/10'
                                        : 'border-white/10 bg-white/5 hover:border-white/25'
                                }`}
                            >
                                <div className={`font-display font-bold text-xl ${model === s.id ? 'text-brand' : 'text-slate-300'}`}>
                                    {s.id.toUpperCase()}
                                </div>
                                <div className="text-xs font-medium text-white mt-1">{s.name}</div>
                                <div className="text-[10px] text-slate-500 mt-1 leading-snug">{s.pos}</div>
                            </button>
                        ))}
                    </div>
                </>
            )}

            <div className="mt-7">
                <div className="flex items-center justify-between mb-3">
                    <span className="font-mono-xu text-[9px] tracking-[0.3em] text-slate-500">LIVE BRAND PREVIEW</span>
                    {selected && <span className="font-mono-xu text-[9px] tracking-[0.3em] text-brand">{selected.name.toUpperCase()}</span>}
                </div>
                {selected ? (
                    <motion.div
                        key={selected.id + finish}
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-slate-800 to-slate-900 aspect-[4/3]"
                        data-testid="brand-preview-canvas"
                    >
                        <Canvas dpr={[1, 1.75]} camera={{ fov: 35, position: [3.8, 1.7, 5.4] }} gl={{ antialias: true }}>
                            <ambientLight intensity={0.75} />
                            <directionalLight position={[6, 9, 7]} intensity={1.6} />
                            <directionalLight position={[-7, 5, -6]} intensity={0.5} color="#5CE8B4" />
                            <Turntable variant={variant} logoUrl={logoUrl} placement={selected.logo} />
                            <ContactShadows position={[0, -0.62, 0]} opacity={0.5} scale={9} blur={2.6} far={3} color="#020617" />
                        </Canvas>
                        {!logoUrl && (
                            <div className="absolute top-[58%] left-1/2 -translate-x-1/2 font-mono-xu text-[10px] tracking-[0.35em] text-slate-400 pointer-events-none">
                                YOUR LOGO
                            </div>
                        )}
                    </motion.div>
                ) : (
                    <div
                        className="rounded-2xl border-2 border-dashed border-white/10 aspect-[4/3] flex items-center justify-center"
                        data-testid="brand-preview-empty"
                    >
                        <span className="font-mono-xu text-[10px] tracking-[0.3em] text-slate-500 text-center px-6">
                            SELECT A GATEWAY MODEL TO BEGIN
                        </span>
                    </div>
                )}
            </div>

            <AnimatePresence>
                {selected && (
                    <motion.div
                        key="steps"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                    >
                        <div className={`${stepKicker} mt-7`}>{fixedSeries ? '01 / ADD YOUR BRAND' : '02 / ADD YOUR BRAND'}</div>
                        <p className="text-xs text-slate-500 mt-1.5 mb-4">
                            Upload your company logo to preview it on the selected gateway. PNG, SVG or JPG.
                        </p>
                        <input ref={fileRef} type="file" accept=".png,.svg,.jpg,.jpeg" className="hidden" onChange={onFile} data-testid="logo-file-input" />
                        {logoUrl ? (
                            <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-3" data-testid="logo-thumbnail">
                                <div className="w-14 h-10 rounded-lg bg-white flex items-center justify-center overflow-hidden shrink-0">
                                    <img src={logoUrl} alt="Uploaded logo" className="max-w-full max-h-full object-contain" />
                                </div>
                                <span className="text-xs text-slate-300 truncate flex-1">{logoName}</span>
                                <button onClick={clearLogo} className="p-2 text-slate-500 hover:text-white transition-colors" data-testid="logo-remove" aria-label="Remove logo">
                                    <X size={14} />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => fileRef.current?.click()}
                                data-testid="logo-upload-button"
                                className="w-full flex items-center justify-center gap-3 rounded-xl border border-dashed border-white/20 hover:border-brand/60 bg-white/5 py-4 text-sm text-slate-300 hover:text-white transition-all duration-300"
                            >
                                <Upload size={15} className="text-brand" />
                                Upload Logo
                            </button>
                        )}

                        <div className={`${stepKicker} mt-7`}>{fixedSeries ? '02 / DEVICE FINISH' : '03 / DEVICE FINISH'}</div>
                        {casingSupported ? (
                            <>
                                <p className="text-xs text-slate-500 mt-1.5 mb-1">
                                    Casing colors available for the {selected.name}.
                                </p>
                                <div className="flex gap-2 mt-3" data-testid="finish-options">
                                    {availableFinishes.map((f) => (
                                        <button
                                            key={f.id}
                                            onClick={() => setFinish(f.id)}
                                            data-testid={`finish-${f.id}`}
                                            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs transition-all duration-300 ${
                                                finish === f.id
                                                    ? 'border-brand bg-brand/10 text-white'
                                                    : 'border-white/10 text-slate-400 hover:border-white/25'
                                            }`}
                                        >
                                            <span
                                                className="w-3 h-3 rounded-full border border-white/30"
                                                style={{ background: f.swatch || selected.variant.bodyColor || '#f2f5f8' }}
                                            />
                                            {f.label}
                                        </button>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div
                                className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 flex items-center gap-3"
                                data-testid="finish-not-supported"
                            >
                                <span
                                    className="w-3 h-3 rounded-full border border-white/30 shrink-0"
                                    style={{ background: selected.variant.bodyColor || '#f2f5f8' }}
                                />
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    The {selected.name} ships in a fixed industrial finish — casing color customization is not
                                    available for this model.
                                </p>
                            </div>
                        )}

                        <div className="mt-8 border-t border-white/10 pt-6">
                            <div className="font-mono-xu text-[10px] tracking-[0.3em] text-slate-500 mb-4">LIKE WHAT YOU SEE?</div>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={goContact}
                                    data-testid="whitelabel-cta-primary"
                                    className="rounded-full bg-[#00D084] hover:bg-brand-strong text-[#04150E] text-sm font-semibold tracking-wide px-7 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#00D084]/25"
                                >
                                    Discuss Your White-Label Solution
                                </button>
                                {!fixedSeries && (
                                    <button
                                        onClick={() => navigate(`/series/${selected.id}`)}
                                        data-testid="whitelabel-cta-secondary"
                                        className="rounded-full border border-white/20 hover:border-brand/60 text-slate-300 hover:text-white text-sm font-semibold tracking-wide px-7 py-3.5 transition-all duration-300"
                                    >
                                        Explore This Product
                                    </button>
                                )}
                                <button
                                    onClick={resetPreview}
                                    data-testid="preview-reset"
                                    className="rounded-full text-slate-500 hover:text-white text-xs font-semibold tracking-wide px-4 py-3.5 transition-colors duration-300"
                                >
                                    Reset Preview
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

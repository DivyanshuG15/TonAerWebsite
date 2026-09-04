import { useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import { AnimatePresence, motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { D71 } from '../../experience/D71';

const ANGLES = [
    { id: 'front', label: 'FRONT', pos: [0.8, 1.4, 6.0] },
    { id: 'side', label: 'SIDE', pos: [6.0, 1.2, 0.6] },
    { id: 'rear', label: 'REAR', pos: [0.6, 1.5, -6.0] },
    { id: 'detail', label: 'DETAIL', pos: [2.6, 1.2, 2.9] },
];

function CamRig({ angle }) {
    const vec = useRef(new THREE.Vector3(...ANGLES[0].pos));
    useFrame(({ camera }, dt) => {
        const target = ANGLES.find((a) => a.id === angle).pos;
        vec.current.set(target[0], target[1], target[2]);
        camera.position.lerp(vec.current, 1 - Math.pow(0.001, Math.min(dt, 0.05)));
        camera.lookAt(0, 0.3, 0);
    });
    return null;
}

const TABS = [
    { id: 'images', label: 'PRODUCT IMAGES' },
    { id: 'video', label: 'PRODUCT VIDEO' },
    { id: 'demo', label: 'TECHNOLOGY DEMO' },
];

function MediaPlaceholder({ title, desc, testId }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 aspect-[4/3] flex flex-col items-center justify-center text-center px-8" data-testid={testId}>
            <span className="w-14 h-14 rounded-full border border-brand/40 bg-brand/10 flex items-center justify-center">
                <Play size={18} className="text-brand ml-0.5" />
            </span>
            <div className="font-display font-semibold text-white mt-5">{title}</div>
            <p className="text-xs text-slate-500 mt-2 max-w-xs leading-relaxed">{desc}</p>
            <Link to="/#contact" className="mt-5 text-xs font-semibold text-brand hover:text-brand-soft transition-colors">
                Request access →
            </Link>
        </div>
    );
}

export function MediaViewer({ variant, productName }) {
    const [tab, setTab] = useState('images');
    const [angle, setAngle] = useState('front');

    return (
        <div data-testid="media-viewer" className="min-w-0 w-full">
            <div className="flex gap-1 rounded-full border border-white/10 bg-white/5 p-1 w-max max-w-full overflow-x-auto mb-4">
                {TABS.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => setTab(t.id)}
                        data-testid={`media-tab-${t.id}`}
                        className={`rounded-full px-4 py-2 font-mono-xu text-[10px] tracking-[0.2em] transition-all duration-300 ${
                            tab === t.id ? 'bg-[#00D084] text-[#04150E]' : 'text-slate-400 hover:text-[#04150E]'
                        }`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>
            <AnimatePresence mode="wait">
                {tab === 'images' && (
                    <motion.div key="images" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-slate-800 to-slate-900 border border-white/10 aspect-[4/3]">
                            <Canvas dpr={[1, 1.75]} camera={{ fov: 35, position: ANGLES[0].pos }} gl={{ antialias: true }}>
                                <ambientLight intensity={0.75} />
                                <directionalLight position={[6, 9, 7]} intensity={1.6} />
                                <directionalLight position={[-7, 5, -6]} intensity={0.5} color="#5CE8B4" />
                                <CamRig angle={angle} />
                                <group position={[0, -0.3, 0]}>
                                    <D71 {...variant} />
                                </group>
                                <ContactShadows position={[0, -0.62, 0]} opacity={0.5} scale={9} blur={2.6} far={3} color="#020617" />
                            </Canvas>
                            <div className="absolute bottom-4 left-4 font-mono-xu text-[9px] tracking-[0.3em] text-slate-500">
                                {productName} // LIVE RENDER
                            </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                            {ANGLES.map((a) => (
                                <button
                                    key={a.id}
                                    onClick={() => setAngle(a.id)}
                                    data-testid={`angle-${a.id}`}
                                    className={`flex-1 rounded-xl border px-3 py-2.5 font-mono-xu text-[10px] tracking-[0.2em] transition-all duration-300 ${
                                        angle === a.id
                                            ? 'border-brand bg-brand/10 text-white'
                                            : 'border-white/10 text-slate-500 hover:border-white/25 hover:text-slate-300'
                                    }`}
                                >
                                    {a.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
                {tab === 'video' && (
                    <motion.div key="video" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                        <MediaPlaceholder
                            title="Product videos"
                            desc="Introductions, installation walkthroughs and feature films are shared through the TonAer operator portal."
                            testId="media-video-placeholder"
                        />
                    </motion.div>
                )}
                {tab === 'demo' && (
                    <motion.div key="demo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                        <MediaPlaceholder
                            title="Technology demos"
                            desc="Interactive mesh, SIM failover and cloud management demonstrations are available through the operator portal."
                            testId="media-demo-placeholder"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

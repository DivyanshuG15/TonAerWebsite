import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import { D71 } from '../experience/D71';

function Turntable({ variant }) {
    const g = useRef();
    useFrame(({ clock }) => {
        if (g.current) g.current.rotation.y = clock.elapsedTime * 0.22;
    });
    return (
        <group ref={g} position={[0, -0.3, 0]}>
            <D71 {...variant} />
        </group>
    );
}

// bare: no card chrome (for composed scenes like the hero). close: tighter camera for larger product presence.
export function SeriesVisual({ variant = {}, label, bare = false, close = false, className = '' }) {
    return (
        <div
            className={
                bare
                    ? `relative aspect-[4/3] ${className}`
                    : `relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/10 bg-gradient-to-b from-white to-slate-100 grain aspect-[4/3] ${className}`
            }
            data-testid="series-visual"
        >
            <Canvas
                dpr={[1, 2]}
                camera={close ? { fov: 32, position: [2.9, 1.25, 4.1] } : { fov: 35, position: [3.8, 1.7, 5.4] }}
                gl={{ antialias: true, alpha: bare }}
            >
                <ambientLight intensity={0.75} />
                <directionalLight position={[6, 9, 7]} intensity={1.6} />
                <directionalLight position={[-7, 5, -6]} intensity={0.5} color="#5CE8B4" />
                <Turntable variant={variant} />
                <ContactShadows position={[0, -0.62, 0]} opacity={0.45} scale={9} blur={2.6} far={3} color="#0B3D2E" />
            </Canvas>
            {label && (
                <div className="absolute bottom-5 left-5 font-mono-xu text-[10px] tracking-[0.3em] text-slate-500">
                    {label} // LIVE RENDER
                </div>
            )}
        </div>
    );
}

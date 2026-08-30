import * as THREE from 'three';
import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { scrollStore, bgColorAt, quality } from './store';
import { CameraRig } from './CameraRig';
import { HeroScene } from './HeroScene';
import { WifiScene } from './WifiScene';
import { NetworkScene } from './NetworkScene';
import { TelemetryScene } from './TelemetryScene';
import { CloudScene } from './CloudScene';
import { AIScene } from './AIScene';
import { EnvironmentScene } from './EnvironmentScene';
import { EcosystemScene } from './EcosystemScene';

function SceneRoot() {
    const { gl, scene, setDpr } = useThree();
    const bg = useMemo(() => new THREE.Color('#020617'), []);
    const fpsAcc = useRef({ frames: 0, time: 0, level: 0 });

    useEffect(() => {
        scene.background = bg;
        const pmrem = new THREE.PMREMGenerator(gl);
        const env = pmrem.fromScene(new RoomEnvironment(), 0.06).texture;
        scene.environment = env;
        return () => {
            scene.environment = null;
            scene.background = null;
            env.dispose();
            pmrem.dispose();
        };
    }, [gl, scene, bg]);

    useFrame((_, dt) => {
        bgColorAt(scrollStore.progress, bg);
        document.body.style.backgroundColor = `#${bg.getHexString()}`;

        if (quality.mobile) return;
        const f = fpsAcc.current;
        f.frames++;
        f.time += dt;
        if (f.time >= 2) {
            const fps = f.frames / f.time;
            if (fps < 42 && f.level < 2) {
                f.level++;
                setDpr(Math.max(1, 2 - f.level * 0.5));
            }
            f.frames = 0;
            f.time = 0;
        }
    });

    return (
        <>
            <CameraRig />
            <HeroScene />
            <WifiScene />
            <NetworkScene />
            <TelemetryScene />
            <CloudScene />
            <AIScene />
            <EnvironmentScene />
            <EcosystemScene />
        </>
    );
}

export function ExperienceCanvas() {
    return (
        <div className="fixed inset-0 z-0" data-testid="experience-canvas" aria-hidden="true">
            <Canvas
                dpr={quality.dpr}
                camera={{ fov: 40, near: 0.1, far: 140, position: [3.6, 1.5, 7] }}
                gl={{ antialias: !quality.mobile, powerPreference: 'high-performance' }}
                shadows={!quality.mobile}
            >
                <SceneRoot />
            </Canvas>
        </div>
    );
}

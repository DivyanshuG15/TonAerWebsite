import * as THREE from 'three';
import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { scrollStore, clamp01, smooth, quality } from './store';

const KEYS = [
    [0.0, [0, 1.3, 9.5], [0, 0.35, 0]],
    [1.0, [0, 1.0, 7.9], [0, 0.3, 0]],
];

export function CameraRig() {
    const targetPos = useMemo(() => new THREE.Vector3(), []);
    const targetLook = useMemo(() => new THREE.Vector3(), []);
    const look = useMemo(() => new THREE.Vector3(0, 0.8, 0), []);
    const pointer = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const h = (e) => {
            pointer.current.x = e.clientX / window.innerWidth - 0.5;
            pointer.current.y = e.clientY / window.innerHeight - 0.5;
        };
        window.addEventListener('pointermove', h, { passive: true });
        return () => window.removeEventListener('pointermove', h);
    }, []);

    useFrame(({ camera }, dt) => {
        const p = scrollStore.progress;
        let i = 0;
        while (i < KEYS.length - 2 && p > KEYS[i + 1][0]) i++;
        const [p0, a, la] = KEYS[i];
        const [p1, b, lb] = KEYS[i + 1];
        const t = smooth(clamp01((p - p0) / Math.max(p1 - p0, 1e-5)));

        targetPos.set(
            a[0] + (b[0] - a[0]) * t,
            a[1] + (b[1] - a[1]) * t,
            a[2] + (b[2] - a[2]) * t
        );
        targetLook.set(
            la[0] + (lb[0] - la[0]) * t,
            la[1] + (lb[1] - la[1]) * t,
            la[2] + (lb[2] - la[2]) * t
        );

        if (quality.mobile) {
            targetPos.multiplyScalar(1.22);
            targetPos.y += 0.35;
        }

        if (!quality.reduced) {
            targetPos.x += pointer.current.x * 0.4;
            targetPos.y += -pointer.current.y * 0.3;
        }

        const dampF = quality.reduced ? 1 : 1 - Math.pow(0.001, Math.min(dt, 0.05));
        camera.position.lerp(targetPos, dampF * 0.7);
        look.lerp(targetLook, dampF * 0.7);
        camera.lookAt(look);
    });

    return null;
}

import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

let dotTex = null;
export function getDotTexture() {
    if (dotTex) return dotTex;
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.35, 'rgba(255,255,255,0.85)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    dotTex = new THREE.CanvasTexture(c);
    return dotTex;
}

// Reusable GPU point cloud. fill(i, vec3) seeds positions; tick(attr, time, dt) animates.
export function Particles({ count, color = '#38BDF8', size = 0.04, fill, tick, materialRef, blending = THREE.AdditiveBlending, ...props }) {
    const geometry = useMemo(() => {
        const g = new THREE.BufferGeometry();
        const arr = new Float32Array(count * 3);
        const v = new THREE.Vector3();
        for (let i = 0; i < count; i++) {
            fill(i, v);
            arr[i * 3] = v.x;
            arr[i * 3 + 1] = v.y;
            arr[i * 3 + 2] = v.z;
        }
        g.setAttribute('position', new THREE.BufferAttribute(arr, 3));
        return g;
    }, [count, fill]);

    useFrame((state, dt) => {
        if (tick) {
            tick(geometry.attributes.position, state.clock.elapsedTime, Math.min(dt, 0.05));
            geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <points geometry={geometry} frustumCulled={false} {...props}>
            <pointsMaterial
                ref={materialRef}
                color={color}
                size={size}
                sizeAttenuation
                transparent
                opacity={0}
                map={getDotTexture()}
                alphaTest={0.01}
                blending={blending}
                depthWrite={false}
            />
        </points>
    );
}

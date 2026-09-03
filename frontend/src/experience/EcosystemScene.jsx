import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { quality } from './store';
import { useSceneFader } from './sceneUtils';
import { Particles, getDotTexture } from './Particles';

let s = 555;
const rand = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
};

// Finale: the room becomes one node among many homes, all linked to the cloud.
export function EcosystemScene() {
    const { group, register } = useSceneFader(0.84, 1.0, 0.03);
    const pulsesMeta = useRef([]);

    const { homes, links, cloudCenter } = useMemo(() => {
        const homes = [];
        for (let gx = 0; gx < 7; gx++) {
            for (let gz = 0; gz < 7; gz++) {
                homes.push(new THREE.Vector3((gx - 3) * 4.2 + (rand() - 0.5), 0.4, (gz - 3) * 3.6 + (rand() - 0.5)));
            }
        }
        const cloudCenter = new THREE.Vector3(0, 6.5, 0);
        const links = homes.map((h) => [h, cloudCenter]);
        return { homes, links, cloudCenter };
    }, []);

    const linkGeo = useMemo(() => {
        const g = new THREE.BufferGeometry();
        const pos = new Float32Array(links.length * 6);
        links.forEach(([a, b], i) => pos.set([a.x, a.y, a.z, b.x, b.y, b.z], i * 6));
        g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        return g;
    }, [links]);

    const homeGeo = useMemo(() => {
        const g = new THREE.BufferGeometry();
        const pos = new Float32Array(homes.length * 3);
        homes.forEach((h, i) => pos.set([h.x, h.y, h.z], i * 3));
        g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        return g;
    }, [homes]);

    const pulseCount = Math.floor(50 * quality.scale) + 10;
    if (pulsesMeta.current.length !== pulseCount) {
        pulsesMeta.current = Array.from({ length: pulseCount }, () => ({
            link: Math.floor(rand() * links.length),
            t: rand(),
            speed: 0.2 + rand() * 0.4,
        }));
    }
    const tmp = useMemo(() => new THREE.Vector3(), []);

    const cloudCount = Math.floor(700 * quality.scale) + 100;

    return (
        <group ref={group}>
            <lineSegments geometry={linkGeo} frustumCulled={false}>
                <lineBasicMaterial ref={register} color="#00D084" transparent opacity={0.18} />
            </lineSegments>
            <points geometry={homeGeo} frustumCulled={false}>
                <pointsMaterial ref={register} color="#00D084" size={0.35} sizeAttenuation transparent opacity={0.9} map={getDotTexture()} alphaTest={0.01} depthWrite={false} />
            </points>
            <points geometry={homeGeo} frustumCulled={false} position={[0, 0.15, 0]}>
                <pointsMaterial ref={register} color="#7AEBC2" size={0.14} sizeAttenuation transparent opacity={0.9} map={getDotTexture()} alphaTest={0.01} blending={THREE.AdditiveBlending} depthWrite={false} />
            </points>
            <Particles
                count={cloudCount}
                color="#60a5fa"
                size={0.06}
                materialRef={register}
                fill={(i, v) => {
                    const th = rand() * Math.PI * 2;
                    const ph = Math.acos(2 * rand() - 1);
                    const r = 1.8 + rand() * 1.1;
                    v.set(
                        cloudCenter.x + r * Math.sin(ph) * Math.cos(th),
                        cloudCenter.y + r * Math.cos(ph) * 0.7,
                        cloudCenter.z + r * Math.sin(ph) * Math.sin(th)
                    );
                }}
                tick={(attr, t) => {
                    // gentle breathing of the cloud shell
                }}
            />
            <Particles
                count={pulseCount}
                color="#00D084"
                size={0.12}
                materialRef={register}
                fill={(i, v) => v.copy(links[pulsesMeta.current[i].link][0])}
                tick={(attr, time, dt) => {
                    pulsesMeta.current.forEach((m, i) => {
                        m.t += dt * m.speed;
                        if (m.t >= 1) {
                            m.t = 0;
                            m.link = Math.floor(Math.random() * links.length);
                        }
                        const [a, b] = links[m.link];
                        tmp.lerpVectors(a, b, m.t);
                        attr.setXYZ(i, tmp.x, tmp.y, tmp.z);
                    });
                }}
            />
        </group>
    );
}

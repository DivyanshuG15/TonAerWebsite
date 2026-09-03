import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { scrollStore, local, smooth } from './store';
import { useSceneFader } from './sceneUtils';

const CYAN = new THREE.Color('#00D084');
const ROSE = new THREE.Color('#f43f5e');
const EMERALD = new THREE.Color('#22c55e');
const tmpC = new THREE.Color();

// AI story: normal network -> anomaly -> analysis -> optimization path -> healed.
export function AIScene() {
    const { group, register } = useSceneFader(0.65, 0.78, 0.028);
    const nodeRefs = useRef([]);
    const ringRef = useRef();
    const pathRef = useRef();

    const ANOMALY = 3;

    const { nodes, edges, alertEdges, pathPts } = useMemo(() => {
        const nodes = [new THREE.Vector3(0, 0.7, 0)];
        for (let i = 0; i < 12; i++) {
            const a = (i / 12) * Math.PI * 2;
            nodes.push(new THREE.Vector3(Math.cos(a) * 3.6, 0.7 + Math.sin(i * 2.3) * 0.5, Math.sin(a) * 3.6));
        }
        const edges = [];
        for (let i = 1; i <= 12; i++) {
            edges.push([0, i]);
            edges.push([i, (i % 12) + 1]);
        }
        const alertEdges = [[0, ANOMALY + 1], [ANOMALY + 1, ((ANOMALY + 1) % 12) + 1], [ANOMALY + 1, ANOMALY === 12 ? 1 : ANOMALY + 2 > 12 ? 1 : ANOMALY + 2]];
        const cloudPt = new THREE.Vector3(0, 3.6, 0);
        const pathPts = [nodes[ANOMALY + 1].clone(), nodes[0].clone(), cloudPt];
        return { nodes, edges, alertEdges, pathPts };
    }, []);

    const mkSegGeo = (pairs) => {
        const g = new THREE.BufferGeometry();
        const pos = new Float32Array(pairs.length * 6);
        pairs.forEach(([ai, bi], i) => {
            const a = nodes[ai];
            const b = nodes[bi];
            pos.set([a.x, a.y, a.z, b.x, b.y, b.z], i * 6);
        });
        g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        return g;
    };

    const edgeGeo = useMemo(() => mkSegGeo(edges), [edges]);
    const alertGeo = useMemo(() => mkSegGeo(alertEdges), [alertEdges]);
    const pathGeo = useMemo(() => {
        const curve = new THREE.CatmullRomCurve3(pathPts);
        const pts = curve.getPoints(60);
        const g = new THREE.BufferGeometry().setFromPoints(pts);
        g.setDrawRange(0, 0);
        return g;
    }, [pathPts]);

    useFrame(({ clock }) => {
        if (!group.current?.visible) return;
        const t = clock.elapsedTime;
        const k = local(scrollStore.progress, 0.65, 0.78);
        const anomalyOn = smooth(Math.min(1, Math.max(0, (k - 0.2) / 0.08)));
        const analyzeOn = smooth(Math.min(1, Math.max(0, (k - 0.38) / 0.08)));
        const pathOn = smooth(Math.min(1, Math.max(0, (k - 0.55) / 0.15)));
        const healed = smooth(Math.min(1, Math.max(0, (k - 0.82) / 0.1)));

        nodeRefs.current.forEach((m, i) => {
            if (!m) return;
            const isAnomaly = i === ANOMALY + 1;
            const isNeighbor = i === 0 || i === ANOMALY || i === ANOMALY + 2;
            tmpC.copy(CYAN);
            if (isAnomaly) {
                tmpC.lerp(ROSE, anomalyOn * (1 - healed));
                if (healed > 0 && healed < 1) tmpC.lerp(EMERALD, healed * (1 - healed) * 4 > 1 ? 1 : healed);
                const pulse = 1 + Math.sin(t * 6) * 0.35 * anomalyOn * (1 - healed);
                m.scale.setScalar(pulse);
            } else if (isNeighbor) {
                tmpC.lerp(ROSE, analyzeOn * 0.45 * (1 - healed));
            }
            m.material.color.copy(tmpC);
        });

        if (ringRef.current) {
            const rs = analyzeOn * (1 - healed);
            ringRef.current.visible = rs > 0.01;
            ringRef.current.scale.setScalar(rs * (1 + Math.sin(t * 3) * 0.08));
            ringRef.current.material.opacity = rs * 0.8;
            ringRef.current.position.copy(nodes[ANOMALY + 1]);
            ringRef.current.lookAt(0, nodes[ANOMALY + 1].y + 5, 0);
        }
        pathGeo.setDrawRange(0, Math.floor(pathOn * 60));
    });

    return (
        <group ref={group}>
            <lineSegments geometry={edgeGeo} frustumCulled={false}>
                <lineBasicMaterial ref={register} color="#00D084" transparent opacity={0.22} />
            </lineSegments>
            <lineSegments geometry={alertGeo} frustumCulled={false}>
                <lineBasicMaterial ref={register} color="#f43f5e" transparent opacity={0.5} />
            </lineSegments>
            <line ref={pathRef} geometry={pathGeo} frustumCulled={false}>
                <lineBasicMaterial ref={register} color="#22c55e" transparent opacity={0.9} />
            </line>
            {nodes.map((p, i) => (
                <mesh key={i} position={p} ref={(el) => (nodeRefs.current[i] = el)}>
                    <sphereGeometry args={[i === 0 ? 0.16 : 0.1, 16, 16]} />
                    <meshBasicMaterial ref={register} color="#00D084" transparent opacity={0.95} />
                </mesh>
            ))}
            <mesh ref={ringRef} visible={false}>
                <torusGeometry args={[0.45, 0.015, 8, 48]} />
                <meshBasicMaterial color="#f43f5e" transparent opacity={0} />
            </mesh>
        </group>
    );
}

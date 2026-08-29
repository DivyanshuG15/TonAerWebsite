import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import { scrollStore, quality } from './store';
import { useSceneFader } from './sceneUtils';
import { D71 } from './D71';

export function HeroScene() {
    const { group, register } = useSceneFader(0.0, 0.36, 0.025);
    const product = useRef();

    useFrame(({ clock }) => {
        if (!group.current?.visible || !product.current) return;
        const p = scrollStore.progress;
        const t = clock.elapsedTime;
        product.current.rotation.y = Math.sin(t * 0.12) * 0.1 + p * 2.2;
        product.current.position.y = (quality.mobile ? 1.55 : 0.85) + Math.sin(t * 0.6) * 0.03;
    });

    return (
        <group ref={group}>
            <ambientLight intensity={0.7} />
            <directionalLight position={[6, 9, 7]} intensity={1.6} castShadow={!quality.mobile} />
            <directionalLight position={[-7, 5, -6]} intensity={0.55} color="#7dd3fc" />
            <spotLight position={[0, 8, 3]} intensity={0.8} angle={0.5} penumbra={1} color="#ffffff" />
            <group ref={product} scale={quality.mobile ? 0.72 : 1}>
                <D71 onMaterial={register} />
            </group>
            <ContactShadows position={[0, 0.02, 0]} opacity={0.5} scale={10} blur={2.6} far={3} resolution={quality.mobile ? 256 : 512} color="#1e3a5f" />
        </group>
    );
}

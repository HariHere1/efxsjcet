import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const MODEL_URL = `${import.meta.env.BASE_URL}models/robotic-arm.glb`;
useGLTF.preload(MODEL_URL);

function useScrollProgress(maxScroll = 900) {
  const progress = useRef(0);
  useEffect(() => {
    const handleScroll = () => {
      progress.current = Math.min(window.scrollY / maxScroll, 1);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [maxScroll]);
  return progress;
}

// The glTF export has no skeleton, so we can't drive real bones. Instead we
// detach the tool-head parts (the highest cluster in the rig) into their own
// group and rotate that group around its bounding-box center — a stand-in
// for "hand" movement. Names come from the Sketchfab export's node list.
const TOOL_NODE_NAMES = ['Cylinder.006', 'Cylinder.007', 'Plane.003'];

function ArmRig({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const { scene } = useGLTF(MODEL_URL);
  const model = useMemo(() => scene.clone(true), [scene]);
  const toolGroupRef = useRef<THREE.Group>(null!);

  useEffect(() => {
    model.updateMatrixWorld(true);
    const group = toolGroupRef.current;
    const toolNodes = TOOL_NODE_NAMES
      .map((name) => model.getObjectByName(name))
      .filter(Boolean) as THREE.Object3D[];

    if (toolNodes.length === 0) return;

    const box = new THREE.Box3();
    toolNodes.forEach((node) => box.expandByObject(node));
    const pivot = box.getCenter(new THREE.Vector3());

    group.position.copy(pivot);
    toolNodes.forEach((node) => {
      node.parent?.remove(node);
      node.position.sub(pivot);
      group.add(node);
    });
  }, [model]);

  useFrame(() => {
    const t = scrollProgress.current;
    toolGroupRef.current.rotation.x = -0.7 * t;
    toolGroupRef.current.rotation.z = 0.3 * Math.sin(t * Math.PI * 1.4);
  });

  return (
    <group scale={0.011} position={[0.1, -4.1, 0]} rotation={[0, 0.4, 0]}>
      <primitive object={model} />
      <group ref={toolGroupRef} />
    </group>
  );
}

export function RoboticArmHero() {
  const scrollProgress = useScrollProgress();

  return (
    <Canvas
      camera={{ position: [4, 1.5, 6], fov: 34 }}
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 6, 4]} intensity={1.4} />
      <directionalLight position={[-4, 2, -3]} intensity={0.5} color="#0c625f" />
      <Suspense fallback={null}>
        <ArmRig scrollProgress={scrollProgress} />
      </Suspense>
    </Canvas>
  );
}
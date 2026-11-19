import { Component, useMemo, useRef, type ErrorInfo, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Group } from "three";

function ParticleField() {
  const group = useRef<Group>(null);
  const positions = useMemo(() => {
    const points = new Float32Array(720 * 3);
    let seed = 22;
    const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    for (let i = 0; i < 720; i++) {
      points[i * 3] = (random() - 0.5) * 15;
      points[i * 3 + 1] = (random() - 0.5) * 7.2;
      points[i * 3 + 2] = (random() - 0.5) * 5;
    }
    return points;
  }, []);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.009;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.07;
  });
  return <group ref={group}>
    <points><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry><pointsMaterial color="#d6e4ff" size={0.025} transparent opacity={0.7} sizeAttenuation /></points>
    <mesh position={[3.9, -1.35, 0]}><sphereGeometry args={[0.055, 12, 12]} /><meshBasicMaterial color="#68a5ff" /></mesh>
    <mesh position={[-5.3, 1.15, -0.4]}><sphereGeometry args={[0.035, 12, 12]} /><meshBasicMaterial color="#a6ccff" /></mesh>
  </group>;
}

function StaticFallback() { return <div className="star-fallback" aria-hidden="true" />; }
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(_error: Error, _info: ErrorInfo) { /* Decorative scene; page content stays usable. */ }
  render() { return this.state.failed ? <StaticFallback /> : this.props.children; }
}

export default function HeroScene({ reducedMotion }: { reducedMotion: boolean }) {
  if (reducedMotion) return <StaticFallback />;
  return <div className="hero-scene" aria-hidden="true"><SceneBoundary><Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 8], fov: 48 }} gl={{ alpha: true, antialias: true, powerPreference: "low-power" }} fallback={<StaticFallback />}><ParticleField /></Canvas></SceneBoundary></div>;
}

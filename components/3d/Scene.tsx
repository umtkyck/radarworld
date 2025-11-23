"use client";

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import RadarScanner from './RadarScanner';

export default function Scene() {
  return (
    <Canvas
      className="absolute inset-0"
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#60A5FA" />
      <pointLight position={[-10, -10, 10]} intensity={0.5} color="#3B82F6" />

      {/* 3D Radar Scanner */}
      <RadarScanner />

      {/* Subtle camera controls (disabled rotation for UX) */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        autoRotate
        autoRotateSpeed={0.5}
      />

      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom
          intensity={0.8}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.001, 0.001] as any}
        />
        <Noise
          premultiply
          blendFunction={BlendFunction.OVERLAY}
          opacity={0.15}
        />
      </EffectComposer>

      {/* Environment */}
      <Environment preset="night" />
    </Canvas>
  );
}

"use client";

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import RadarScanner from './RadarScanner';
import { Suspense, memo } from 'react';

// Memoize the scene to prevent unnecessary re-renders
const Scene = memo(function Scene() {
  return (
    <Canvas
      className="absolute inset-0"
      dpr={[1, 1.5]} // Reduced max DPR for better performance
      gl={{
        antialias: false, // Disable for better performance
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      }}
      performance={{ min: 0.5 }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />

      {/* Simplified Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#60A5FA" />

      {/* 3D Radar Scanner */}
      <Suspense fallback={null}>
        <RadarScanner />
      </Suspense>

      {/* Minimal camera controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        autoRotate
        autoRotateSpeed={0.3}
      />

      {/* Optimized post-processing - only Bloom */}
      <EffectComposer multisampling={0}>
        <Bloom
          intensity={0.5}
          luminanceThreshold={0.3}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
});

export default Scene;

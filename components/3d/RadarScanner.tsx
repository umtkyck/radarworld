"use client";

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function RadarScanner() {
  const radarRef = useRef<THREE.Group>(null);
  const waveRef = useRef<THREE.Mesh>(null);
  const scanLineRef = useRef<THREE.Mesh>(null);

  // Dither shader for premium look
  const ditherShader = useMemo(() => ({
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vPosition;

      void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 color;
      varying vec2 vUv;
      varying vec3 vPosition;

      // Dither pattern function
      float dither8x8(vec2 position, float brightness) {
        int x = int(mod(position.x, 8.0));
        int y = int(mod(position.y, 8.0));
        int index = x + y * 8;
        float limit = 0.0;

        if (x < 8) {
          if (index == 0) limit = 0.0;
          if (index == 1) limit = 32.0;
          if (index == 2) limit = 8.0;
          if (index == 3) limit = 40.0;
          if (index == 4) limit = 2.0;
          if (index == 5) limit = 34.0;
          if (index == 6) limit = 10.0;
          if (index == 7) limit = 42.0;
        }

        return brightness < limit / 64.0 ? 0.0 : 1.0;
      }

      void main() {
        // Radar wave effect
        float dist = length(vUv - 0.5);
        float wave = sin(dist * 20.0 - time * 3.0) * 0.5 + 0.5;

        // Dither effect
        float brightness = wave;
        float dithered = dither8x8(gl_FragCoord.xy, brightness);

        // Color with glow
        vec3 glowColor = color * (wave + 0.3);
        vec3 finalColor = mix(vec3(0.0), glowColor, dithered);

        // Fade edges
        float alpha = smoothstep(0.5, 0.2, dist) * wave;

        gl_FragColor = vec4(finalColor, alpha * 0.6);
      }
    `,
  }), []);

  // Scan line shader
  const scanLineShader = useMemo(() => ({
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 color;
      varying vec2 vUv;

      void main() {
        float angle = atan(vUv.y - 0.5, vUv.x - 0.5);
        float scanLine = smoothstep(0.02, 0.0, abs(angle - time));

        vec3 glowColor = color * scanLine * 2.0;
        float alpha = scanLine;

        gl_FragColor = vec4(glowColor, alpha);
      }
    `,
  }), []);

  useFrame((state) => {
    if (radarRef.current) {
      radarRef.current.rotation.z += 0.002;
    }

    if (waveRef.current && waveRef.current.material) {
      const material = waveRef.current.material as THREE.ShaderMaterial;
      material.uniforms.time.value = state.clock.elapsedTime;
    }

    if (scanLineRef.current && scanLineRef.current.material) {
      const material = scanLineRef.current.material as THREE.ShaderMaterial;
      material.uniforms.time.value = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group ref={radarRef}>
      {/* Radar waves with dither effect */}
      <mesh ref={waveRef} position={[0, 0, 0]}>
        <planeGeometry args={[8, 8, 64, 64]} />
        <shaderMaterial
          vertexShader={ditherShader.vertexShader}
          fragmentShader={ditherShader.fragmentShader}
          uniforms={{
            time: { value: 0 },
            color: { value: new THREE.Color('#60A5FA') }
          }}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Scan line */}
      <mesh ref={scanLineRef} position={[0, 0, 0.01]}>
        <planeGeometry args={[8, 8]} />
        <shaderMaterial
          vertexShader={scanLineShader.vertexShader}
          fragmentShader={scanLineShader.fragmentShader}
          uniforms={{
            time: { value: 0 },
            color: { value: new THREE.Color('#3B82F6') }
          }}
          transparent
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Radar grid */}
      {[...Array(8)].map((_, i) => (
        <mesh key={`circle-${i}`} rotation={[0, 0, 0]}>
          <ringGeometry args={[i * 0.8, i * 0.8 + 0.02, 64]} />
          <meshBasicMaterial
            color="#1E3A8A"
            transparent
            opacity={0.3 - i * 0.03}
          />
        </mesh>
      ))}

      {/* Center dot */}
      <mesh>
        <circleGeometry args={[0.1, 32]} />
        <meshBasicMaterial color="#60A5FA" />
      </mesh>

      {/* Target blips */}
      {[
        { x: 2, y: 1.5, z: 0.02 },
        { x: -1.8, y: 2.2, z: 0.02 },
        { x: 1.2, y: -2.5, z: 0.02 },
        { x: -2.5, y: -1.2, z: 0.02 },
      ].map((pos, i) => (
        <mesh key={`blip-${i}`} position={[pos.x, pos.y, pos.z]}>
          <circleGeometry args={[0.08, 32]} />
          <meshBasicMaterial color="#10B981" />
        </mesh>
      ))}
    </group>
  );
}

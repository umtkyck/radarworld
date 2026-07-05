"use client";

import { useEffect, useRef } from "react";

const VERTEX_SHADER = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

// Light-theme radar: faint dot grid, concentric rings, rotating emerald
// sweep, and expanding pulse waves, anchored to the right side.
const FRAGMENT_SHADER = `
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

const vec3 SLATE = vec3(0.58, 0.64, 0.72);
const vec3 EMERALD = vec3(0.06, 0.72, 0.51);
const vec3 INK = vec3(0.06, 0.09, 0.16);

float ring(float d, float radius, float width) {
  return smoothstep(width, 0.0, abs(d - radius));
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / u_resolution.y;
  vec2 p = vec2(uv.x * aspect, uv.y);

  // Radar center on the right side of the band
  vec2 center = vec2(aspect * 0.82, 0.42);
  vec2 rel = p - center;
  float d = length(rel);
  float angle = atan(rel.y, rel.x);

  vec3 col = vec3(0.0);
  float alpha = 0.0;

  // Dot grid, fading with distance from center
  vec2 grid = fract(p * 22.0) - 0.5;
  float dots = smoothstep(0.09, 0.03, length(grid));
  float gridFade = smoothstep(1.1, 0.15, d);
  col += SLATE * dots * 0.5 * gridFade;
  alpha += dots * 0.28 * gridFade;

  // Concentric rings
  float rings = 0.0;
  rings += ring(d, 0.16, 0.005);
  rings += ring(d, 0.32, 0.005);
  rings += ring(d, 0.48, 0.005);
  rings += ring(d, 0.64, 0.005);
  col += SLATE * rings * 0.85;
  alpha += rings * 0.5;

  // Crosshair lines
  float cross = smoothstep(0.0016, 0.0, abs(rel.x)) + smoothstep(0.0016, 0.0, abs(rel.y));
  float crossFade = smoothstep(0.68, 0.2, d);
  col += SLATE * cross * 0.4 * crossFade;
  alpha += cross * 0.18 * crossFade;

  // Rotating sweep (trailing glow behind the beam)
  float sweepAngle = -u_time * 0.7;
  float delta = mod(angle - sweepAngle, 6.2831853);
  float sweep = pow(smoothstep(1.6, 0.0, delta), 2.0) * smoothstep(0.66, 0.1, d) * step(d, 0.66);
  col += EMERALD * sweep;
  alpha += sweep * 0.65;

  // Beam edge
  float beam = smoothstep(0.02, 0.0, delta) * step(d, 0.66);
  col += EMERALD * beam;
  alpha += beam * 0.85;

  // Expanding pulse wave
  float pulseR = mod(u_time * 0.16, 1.0) * 0.66;
  float pulse = ring(d, pulseR, 0.014) * smoothstep(0.66, 0.3, pulseR);
  col += EMERALD * pulse * 0.7;
  alpha += pulse * 0.45;

  // Blips that light up when the sweep passes
  for (int i = 0; i < 3; i++) {
    float fi = float(i);
    vec2 blipPos = vec2(cos(fi * 2.4 + 1.1), sin(fi * 2.4 + 1.1)) * (0.22 + fi * 0.14);
    float blipAngle = atan(blipPos.y, blipPos.x);
    float blipDelta = mod(blipAngle - sweepAngle, 6.2831853);
    float glow = pow(smoothstep(3.0, 0.0, blipDelta), 3.0);
    float blip = smoothstep(0.014, 0.0, length(rel - blipPos)) * glow;
    col += EMERALD * blip;
    alpha += blip * 0.9;
  }

  // Soft ink vignette so the effect blends into the band
  float haze = smoothstep(0.75, 0.1, d) * 0.05;
  col += INK * haze;
  alpha += haze * 0.4;

  gl_FragColor = vec4(col, clamp(alpha, 0.0, 1.0));
}
`;

export default function RadarGL({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: false,
    });
    if (!gl || gl.isContextLost()) return;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX_SHADER));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const positionLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const resolutionLoc = gl.getUniformLocation(program, "u_resolution");
    const timeLoc = gl.getUniformLocation(program, "u_time");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { clientWidth, clientHeight } = canvas;
      canvas.width = clientWidth * dpr;
      canvas.height = clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    let frame = 0;

    const render = () => {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, (performance.now() - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reducedMotion) {
        frame = requestAnimationFrame(render);
      }
    };
    render();

    // Note: we intentionally keep the WebGL context alive on unmount.
    // Releasing it via WEBGL_lose_context breaks React StrictMode's
    // dev double-mount, since the same canvas returns the lost context.
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none h-full w-full ${className}`}
    />
  );
}

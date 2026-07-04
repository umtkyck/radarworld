"use client";

import { useEffect, useRef } from "react";

const VERTEX_SHADER = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_mouse;

#define TAU 6.28318530718

float hash(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / min(u_res.x, u_res.y);
  // Subtle parallax toward the pointer
  uv -= u_mouse * 0.04;

  float r = length(uv);
  float ang = atan(uv.y, uv.x);

  vec3 base = vec3(0.020, 0.020, 0.020);
  vec3 accent = vec3(0.063, 0.725, 0.506);
  vec3 col = base;

  // Faint cartesian grid
  vec2 g = abs(fract(uv * 5.0) - 0.5);
  float grid = smoothstep(0.02, 0.0, min(g.x, g.y) / 5.0);
  col += accent * grid * 0.035;

  // Concentric rings, fading outward
  float ringSpacing = 0.18;
  float ringDist = abs(fract(r / ringSpacing + 0.5) - 0.5) * ringSpacing;
  float ring = smoothstep(0.0035, 0.0, ringDist);
  float falloff = exp(-r * 1.6);
  col += accent * ring * falloff * 0.35;

  // Rotating sweep with decaying trail
  float sweepAngle = u_time * 0.45;
  float diff = mod(sweepAngle - ang, TAU);
  float trail = exp(-diff * 2.2);
  float sweepMask = smoothstep(1.05, 0.15, r) * smoothstep(0.02, 0.12, r);
  col += accent * trail * sweepMask * 0.16;

  // Sharp leading edge of the sweep
  float edge = smoothstep(0.025, 0.0, diff) * sweepMask;
  col += accent * edge * 0.5;

  // Target blips that glow as the sweep passes
  for (int i = 0; i < 7; i++) {
    float fi = float(i);
    float br = 0.15 + hash(vec2(fi, 1.7)) * 0.85;
    float ba = hash(vec2(fi, 9.3)) * TAU;
    vec2 bp = vec2(cos(ba), sin(ba)) * br;
    float bd = length(uv - bp);
    float excite = exp(-mod(sweepAngle - ba, TAU) * 1.4);
    col += accent * exp(-bd * bd * 2200.0) * excite * 0.9;
    col += accent * exp(-bd * bd * 300.0) * excite * 0.15;
  }

  // Center dot
  col += accent * exp(-r * r * 4000.0) * 0.6;

  // Vignette and subtle grain
  col *= 1.0 - smoothstep(0.55, 1.35, r) * 0.55;
  col += (hash(gl_FragCoord.xy + fract(u_time)) - 0.5) * 0.012;

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

interface RadarFieldProps {
  className?: string;
}

/**
 * Full-bleed WebGL radar field: concentric rings, a rotating sweep and
 * target blips rendered by a fragment shader. No external dependencies.
 * Falls back to a plain dark canvas when WebGL is unavailable and
 * renders a single static frame when the user prefers reduced motion.
 */
export default function RadarField({ className = "" }: RadarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { antialias: true, alpha: false });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    // Fullscreen triangle
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "u_time");
    const uRes = gl.getUniformLocation(program, "u_res");
    const uMouse = gl.getUniformLocation(program, "u_mouse");

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let raf = 0;
    let running = true;
    let visible = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.floor(canvas.clientWidth * dpr);
      const h = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const draw = (timeMs: number) => {
      resize();
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      gl.uniform1f(uTime, timeMs / 1000);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (t: number) => {
      if (!running) return;
      if (visible) draw(t);
      raf = requestAnimationFrame(loop);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.ty = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(canvas);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      draw(0);
    } else {
      window.addEventListener("pointermove", onPointerMove);
      raf = requestAnimationFrame(loop);
    }

    const onResize = () => {
      resize();
      if (reducedMotion) draw(0);
    };
    window.addEventListener("resize", onResize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`h-full w-full bg-[#050505] ${className}`}
    />
  );
}

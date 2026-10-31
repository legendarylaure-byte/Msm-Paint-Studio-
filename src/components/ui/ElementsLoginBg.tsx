"use client";

import { useEffect, useRef } from "react";

export function ElementsLoginBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const gl = canvasEl.getContext("webgl2", { alpha: true, antialias: true });
    if (!gl) {
      canvasEl.style.display = "none";
      return;
    }

    const ctx = gl;
    const canvas = canvasEl;

    const vs = `#version 300 es
    precision highp float;
    layout(location=0) in vec2 aPos;
    out vec2 vUv;
    void main() {
      vUv = (aPos + 1.0) * 0.5;
      gl_Position = vec4(aPos, 0.0, 1.0);
    }`;

    const fs = `#version 300 es
    precision highp float;
    in vec2 vUv;
    out vec4 fragColor;
    uniform float uTime;
    uniform vec2 uRes;

    float hash(vec2 p) {
      p = fract(p * vec2(123.34, 345.45));
      p += dot(p, p + 34.345);
      return fract(p.x * p.y);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
    }

    float fbm(vec2 p) {
      float v = 0.0;
      float a = 0.5;
      for (int i = 0; i < 5; i++) {
        v += a * noise(p);
        p *= 2.0;
        a *= 0.5;
      }
      return v;
    }

    void main() {
      vec2 uv = vUv;
      float t = uTime * 0.18;
      vec2 p = uv * 1.2;
      
      p.x += sin(t * 0.6 + uv.y * 3.2) * 0.12;
      p.y += cos(t * 0.4 + uv.x * 2.6) * 0.1;
      
      float n1 = fbm(p + t);
      float n2 = fbm(p * 1.6 - t * 0.8);
      float n3 = fbm(p * 2.4 + t * 0.6);
      float n4 = fbm((p + vec2(t, -t)) * 0.8);
      
      vec3 c1 = vec3(1.0, 0.38, 0.16);
      vec3 c2 = vec3(1.0, 0.58, 0.28);
      vec3 c3 = vec3(0.62, 0.66, 1.0);
      vec3 c4 = vec3(0.96, 0.36, 0.14);
      vec3 c5 = vec3(1.0, 0.72, 0.42);
      
      vec3 col = mix(c1, c2, smoothstep(0.0, 1.0, n1));
      col = mix(col, c4, n2 * 0.6);
      col = mix(col, c3, n3 * 0.45);
      col = mix(col, c5, n4 * 0.35);
      
      float streaks = smoothstep(0.4, 0.9, sin((uv.y + n1) * 8.0 + t * 2.0) * 0.5 + 0.5);
      col += vec3(streaks * 0.18, streaks * 0.1, streaks * 0.04);
      
      float aspect = uRes.x / max(uRes.y, 1.0);
      float vig = smoothstep(1.3, 0.35, length((uv - 0.5) * vec2(aspect, 1.0)));
      col *= vig * 0.75 + 0.25;
      
      float glow = smoothstep(0.25, 0.85, n1 + n2 * 0.6 + n3 * 0.4) * 0.5;
      col += vec3(glow * 0.7, glow * 0.38, glow * 0.12);
      
      fragColor = vec4(col, 0.22);
    }`;

    function compile(type: number, src: string) {
      const s = ctx.createShader(type);
      if (!s) return null;
      ctx.shaderSource(s, src);
      ctx.compileShader(s);
      return s;
    }

    const prog = ctx.createProgram();
    if (!prog) return;
    
    const vsS = compile(ctx.VERTEX_SHADER, vs);
    const fsS = compile(ctx.FRAGMENT_SHADER, fs);
    if (!vsS || !fsS) return;
    
    ctx.attachShader(prog, vsS);
    ctx.attachShader(prog, fsS);
    ctx.linkProgram(prog);

    const buf = ctx.createBuffer();
    if (!buf) return;
    
    ctx.bindBuffer(ctx.ARRAY_BUFFER, buf);
    ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), ctx.STATIC_DRAW);
    ctx.enableVertexAttribArray(0);
    ctx.vertexAttribPointer(0, 2, ctx.FLOAT, false, 0, 0);

    const uTimeLoc = ctx.getUniformLocation(prog, "uTime");
    const uResLoc = ctx.getUniformLocation(prog, "uRes");

    let raf = 0;
    const start = performance.now();
    
    function resize() {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = "100vw";
      canvas.style.height = "100vh";
      ctx.viewport(0, 0, canvas.width, canvas.height);
    }
    
    resize();
    window.addEventListener("resize", resize);

    function render() {
      const t = (performance.now() - start) / 1000;
      ctx.useProgram(prog);
      if (uTimeLoc) ctx.uniform1f(uTimeLoc, t);
      if (uResLoc) ctx.uniform2f(uResLoc, canvas.width, canvas.height);
      ctx.drawArrays(ctx.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(render);
    }
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      ctx.deleteProgram(prog);
      ctx.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-20 h-screen w-screen"
      aria-hidden="true"
    />
  );
}

import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

// Shader sources
const VERTEX_SHADER_SRC = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SRC = `#version 300 es
precision highp float;

uniform float u_time;
uniform float u_pixelRatio;
uniform vec2 u_resolution;

uniform float u_scale;
uniform float u_rotation;
uniform vec4 u_color1;
uniform vec4 u_color2;
uniform vec4 u_color3;
uniform float u_proportion;
uniform float u_softness;
uniform float u_shape;
uniform float u_shapeScale;
uniform float u_distortion;
uniform float u_swirl;
uniform float u_swirlIterations;

out vec4 fragColor;

#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846

vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}

vec4 blend_colors(vec4 c1, vec4 c2, vec4 c3, float mixer, float edgesWidth, float edge_blur) {
    vec3 color1 = c1.rgb * c1.a;
    vec3 color2 = c2.rgb * c2.a;
    vec3 color3 = c3.rgb * c3.a;

    float r1 = smoothstep(.0 + .35 * edgesWidth, .7 - .35 * edgesWidth + .5 * edge_blur, mixer);
    float r2 = smoothstep(.3 + .35 * edgesWidth, 1. - .35 * edgesWidth + edge_blur, mixer);

    vec3 blended_color_2 = mix(color1, color2, r1);
    float blended_opacity_2 = mix(c1.a, c2.a, r1);

    vec3 c = mix(blended_color_2, color3, r2);
    float o = mix(blended_opacity_2, c3.a, r2);
    return vec4(c, o);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    float t = 0.02 * u_time; // Slow down time for extremely elegant motion

    float noise_scale = .0005 + .006 * u_scale;

    uv -= .5;
    uv *= (noise_scale * u_resolution);
    uv = rotate(uv, u_rotation * .5 * PI);
    uv /= u_pixelRatio;
    uv += .5;

    float n1 = noise(uv * 1. + t);
    float n2 = noise(uv * 2. - t);
    float angle = n1 * TWO_PI;
    uv.x += 4. * u_distortion * n2 * cos(angle);
    uv.y += 4. * u_distortion * n2 * sin(angle);

    float iterations_number = ceil(clamp(u_swirlIterations, 1., 30.));
    for (float i = 1.; i <= iterations_number; i++) {
        uv.x += clamp(u_swirl, 0., 2.) / i * cos(t + i * 1.5 * uv.y);
        uv.y += clamp(u_swirl, 0., 2.) / i * cos(t + i * 1. * uv.x);
    }

    float proportion = clamp(u_proportion, 0., 1.);

    float shape = 0.;
    float mixer = 0.;
    if (u_shape < .5) {
      vec2 checks_shape_uv = uv * (.5 + 3.5 * u_shapeScale);
      shape = .5 + .5 * sin(checks_shape_uv.x) * cos(checks_shape_uv.y);
      mixer = shape + .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
    } else if (u_shape < 1.5) {
      vec2 stripes_shape_uv = uv * (.25 + 3. * u_shapeScale);
      float f = fract(stripes_shape_uv.y);
      shape = smoothstep(.0, .55, f) * smoothstep(1., .45, f);
      mixer = shape + .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
    } else {
      float sh = 1. - uv.y;
      sh -= .5;
      sh /= (noise_scale * u_resolution.y);
      sh += .5;
      float shape_scaling = .2 * (1. - u_shapeScale);
      shape = smoothstep(.45 - shape_scaling, .55 + shape_scaling, sh + .3 * (proportion - .5));
      mixer = shape;
    }

    vec4 color_mix = blend_colors(u_color1, u_color2, u_color3, mixer, 1. - clamp(u_softness, 0., 1.), .01 + .01 * u_scale);

    fragColor = vec4(color_mix.rgb, color_mix.a);
}
`;

const parseColor = (colorStr: string): [number, number, number, number] => {
  const str = colorStr.trim().toLowerCase();
  
  if (/^\d+(\.\d+)?\s+\d+%\s+\d+%$/.test(str)) {
    const parts = str.split(/\s+/);
    const h = parseFloat(parts[0]);
    const s = parseFloat(parts[1]) / 100;
    const l = parseFloat(parts[2]) / 100;
    return hslToRgba(h, s, l, 1.0);
  }

  if (str.startsWith('#')) {
    let hex = str.slice(1);
    if (hex.length === 3) {
      hex = hex.split('').map(x => x + x).join('');
    }
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    const a = hex.length === 8 ? parseInt(hex.substring(6, 8), 16) / 255 : 1.0;
    return [r, g, b, a];
  }

  if (str.startsWith('rgb')) {
    const match = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)/);
    if (match) {
      const r = parseInt(match[1]) / 255;
      const g = parseInt(match[2]) / 255;
      const b = parseInt(match[3]) / 255;
      const a = match[4] ? parseFloat(match[4]) : 1.0;
      return [r, g, b, a];
    }
  }

  return [0, 0, 0, 1];
};

function hslToRgba(h: number, s: number, l: number, a = 1.0): [number, number, number, number] {
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h / 360 + 1/3);
    g = hue2rgb(p, q, h / 360);
    b = hue2rgb(p, q, h / 360 - 1/3);
  }
  return [r, g, b, a];
}

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) {
      console.warn("WebGL not supported in this browser.");
      return;
    }

    // Helper to compile shader
    const compileShader = (src: string, type: number) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(VERTEX_SHADER_SRC, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(FRAGMENT_SHADER_SRC, gl.FRAGMENT_SHADER);

    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Setup full-screen quad coordinates
    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    // Get uniform locations
    const uniforms = {
      u_time: gl.getUniformLocation(program, "u_time"),
      u_pixelRatio: gl.getUniformLocation(program, "u_pixelRatio"),
      u_resolution: gl.getUniformLocation(program, "u_resolution"),
      u_scale: gl.getUniformLocation(program, "u_scale"),
      u_rotation: gl.getUniformLocation(program, "u_rotation"),
      u_color1: gl.getUniformLocation(program, "u_color1"),
      u_color2: gl.getUniformLocation(program, "u_color2"),
      u_color3: gl.getUniformLocation(program, "u_color3"),
      u_proportion: gl.getUniformLocation(program, "u_proportion"),
      u_softness: gl.getUniformLocation(program, "u_softness"),
      u_shape: gl.getUniformLocation(program, "u_shape"),
      u_shapeScale: gl.getUniformLocation(program, "u_shapeScale"),
      u_distortion: gl.getUniformLocation(program, "u_distortion"),
      u_swirl: gl.getUniformLocation(program, "u_swirl"),
      u_swirlIterations: gl.getUniformLocation(program, "u_swirlIterations"),
    };

    let animationFrameId: number;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2.0);
      const displayWidth = Math.floor(canvas.clientWidth * dpr);
      const displayHeight = Math.floor(canvas.clientHeight * dpr);

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };

    // Preset variables (from Portfolite "Mist" preset)
    const preset = {
      scale: 0.01,
      rotation: -50.0,
      proportion: 1.0,
      softness: 0.47,
      shape: 0.0, // Checks
      shapeScale: 0.45,
      distortion: 0.0,
      swirl: 0.5,
      swirlIterations: 16.0,
      speed: 20.0,
    };

    const render = (timeMs: number) => {
      const time = timeMs * 0.001;
      resizeCanvas();

      gl.useProgram(program);

      // Bind dynamic colors based on theme mode and theme accent variable
      const isDark = document.documentElement.classList.contains("dark");
      
      let accentColor = [1.0, 1.0, 1.0, 1.0];
      try {
        const computedAccent = window.getComputedStyle(document.documentElement).getPropertyValue("--theme-accent").trim();
        if (computedAccent) {
          accentColor = parseColor(computedAccent);
        }
      } catch (e) {
        // Fallback
      }

      // Replicate the grayscale mist with custom theme accent blending
      const color1 = isDark ? [0.0, 0.0, 0.0, 1.0] : [1.0, 1.0, 1.0, 1.0];
      const color2 = isDark 
        ? [accentColor[0] * 0.35 + 0.65, accentColor[1] * 0.35 + 0.65, accentColor[2] * 0.35 + 0.65, 1.0]
        : [accentColor[0] * 0.15 + 0.85, accentColor[1] * 0.15 + 0.85, accentColor[2] * 0.15 + 0.85, 1.0];
      const color3 = isDark ? [0.0, 0.0, 0.0, 1.0] : [1.0, 1.0, 1.0, 1.0];

      // Set uniform values
      gl.uniform1f(uniforms.u_time, time * (preset.speed * 0.1));
      gl.uniform1f(uniforms.u_pixelRatio, Math.min(window.devicePixelRatio || 1, 2.0));
      gl.uniform2f(uniforms.u_resolution, canvas.width, canvas.height);
      gl.uniform1f(uniforms.u_scale, preset.scale);
      gl.uniform1f(uniforms.u_rotation, preset.rotation);
      gl.uniform4fv(uniforms.u_color1, color1);
      gl.uniform4fv(uniforms.u_color2, color2);
      gl.uniform4fv(uniforms.u_color3, color3);
      gl.uniform1f(uniforms.u_proportion, preset.proportion);
      gl.uniform1f(uniforms.u_softness, preset.softness);
      gl.uniform1f(uniforms.u_shape, preset.shape);
      gl.uniform1f(uniforms.u_shapeScale, preset.shapeScale);
      gl.uniform1f(uniforms.u_distortion, preset.distortion);
      gl.uniform1f(uniforms.u_swirl, preset.swirl);
      gl.uniform1f(uniforms.u_swirlIterations, preset.swirlIterations);

      // Draw
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, []);

  const gridStroke = isDark ? "white" : "black";
  const gridOpacityClass = isDark ? "opacity-[0.08]" : "opacity-[0.04]";
  const gridBlendMode = isDark ? "mix-blend-screen" : "mix-blend-multiply";
  const fadeBgColor = isDark ? "5, 5, 5" : "229, 229, 229";

  return (
    <div className="fixed inset-0 -z-10 bg-theme-bg overflow-hidden pointer-events-none">
      {/* WebGL Shader Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block opacity-70" />

      {/* High-fidelity Vector Grid Pattern Overlay */}
      <div 
        className={`absolute inset-0 pointer-events-none ${gridOpacityClass} ${gridBlendMode}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='${gridStroke}' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px',
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Portfolite Bottom-Fade Mask Gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(180deg, rgba(${fadeBgColor}, 0) 55%, var(--theme-bg) 100%)`,
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
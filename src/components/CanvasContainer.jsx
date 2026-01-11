'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Color, Vector2 } from 'three';

const CloudShader = {
  uniforms: {
    uTime: { value: 0 },
    uResolution: { value: new Vector2() },
    uColor1: { value: new Color('#0073E6') }, // Brand Blue
    uColor2: { value: new Color('#FFFFFF') }, // White
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    varying vec2 vUv;

    // Simplex 2D noise
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 uv = vUv;
      
      // Slow drifting movement
      float time = uTime * 0.1;
      
      // Layered noise for fluffy clouds
      float noise1 = snoise(uv * 1.5 + vec2(time * 0.5, time * 0.2));
      float noise2 = snoise(uv * 3.0 - vec2(time * 0.3, time * 0.6));
      float noise3 = snoise(uv * 6.0 + time);
      
      float clouds = noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2;
      
      // Soften the mix
      clouds = smoothstep(-0.2, 0.8, clouds);
      
      // Mix Sky Blue and White
      // Mostly white with blue hints, or mostly blue with white clouds?
      // "Blue sky and white fluffy clouds" -> Base blue, white noise
      
      // Let's do a very light, airy mix so it doesn't overpower the text
      vec3 skyColor = mix(vec3(1.0), uColor1, 0.05); // Very faint blue tint base
      vec3 cloudColor = uColor2;
      
      vec3 finalColor = mix(skyColor, uColor1, clouds * 0.15); // Subtle blue patches
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
};

const BackgroundPlane = () => {
  const mesh = useRef();
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={mesh} scale={[10, 10, 1]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial 
        attach="material" 
        args={[CloudShader]} 
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
};

const CanvasContainer = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', opacity: 0.6 }}>
      <Canvas 
        camera={{ position: [0, 0, 1] }} 
        dpr={[1, 2]} 
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <BackgroundPlane />
      </Canvas>
    </div>
  );
};

export default CanvasContainer;

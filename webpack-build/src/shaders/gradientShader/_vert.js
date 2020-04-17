import { noise } from 'Functions/noise'

let vert = `
varying vec2 vUv;

uniform float u_amp;
uniform float u_time;
uniform vec2 u_resolution;

${noise}

void main() {
  vUv = uv;

  vec3 direction = normalize(position);
  vec3 newPosition = direction + noise(vUv.xy, 4., 0.1) * vec3(u_amp * 0.1);
  newPosition += position;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
}

`
export { vert }

import { noise } from 'Functions/noise'

let frag = `
  uniform vec2 u_resolution;
  uniform float u_time;
  varying vec2 vUv;

  ${noise}

  void main() {
    vec2 st = vUv;
    vec3 color = noise(st, 4.0, 0.1);

    color += vec3(1.0 - fract(st.y * 100.0));

    gl_FragColor = vec4(color, 1.0);
  }
`
export { frag }

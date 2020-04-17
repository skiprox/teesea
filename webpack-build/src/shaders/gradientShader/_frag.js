import { noise } from 'Functions/noise'

let frag = `
  uniform vec2 u_resolution;
  uniform float u_time;
  varying vec2 vUv;

  ${noise}

  void main() {
    vec2 st = vUv;

    float noiseX = noise(st, 4.0, 0.1).x;
    float noiseY = noise(vec2(sin(u_time/12.0) * 0.5 + 0.5, cos(u_time/9.0) * 0.5 + 0.5), 2.0, 0.2).y;
    vec3 color = vec3(noiseX, noiseY, 1.0);

    color += vec3(1.0 - fract(st.y * 100.0));

    gl_FragColor = vec4(color, 1.0);
  }
`
export { frag }

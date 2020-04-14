import { Vector2, ShaderMaterial } from 'three'
import { vert } from './_vert'
import { frag } from './_frag'

const config = {
  uniforms: {
    u_time: {
      value: 0.0
    },
    u_resolution: {
      value: new Vector2()
    },
    u_amp: {
      value: 0.0
    }
  },
  defines: {
    // This makes PI an accessible variable in our frag and vert shaders
    PI: Math.PI,
    HALF_PI: Math.PI * 0.5
  },
  wireframe: false,
  vertexShader: vert,
  fragmentShader: frag
}

const ExampleShader = new ShaderMaterial(config)

export { ExampleShader }

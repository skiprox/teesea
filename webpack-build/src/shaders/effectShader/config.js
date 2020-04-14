import { Vector2, ShaderMaterial } from 'three'
import { vert } from './_vert'
import { frag } from './_frag'

const config = {
  uniforms: {
    tDiffuse: {
      value: null
    },
    u_time: {
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

const EffectShader = new ShaderMaterial(config)

export { EffectShader }

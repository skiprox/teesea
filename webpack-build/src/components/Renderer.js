import * as THREE from 'three'
import { WebGLRenderer } from 'three'

export default class Renderer extends WebGLRenderer {
  constructor({ antialias, alpha, clearColor = 0xf5f5f5 } = {}) {
    super({
      antialias: antialias,
      alpha: alpha
    })

    this.setSize(window.innerWidth, window.innerHeight)
    this.setClearColor(clearColor, 1.0)
    this.setClearAlpha(1.0)
    this.toneMapping = THREE.ACESFilmicToneMapping
    this.toneMappingExposure = 0.8
    this.outputEncoding = THREE.sRGBEncoding
  }
}

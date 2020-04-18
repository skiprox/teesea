// Model loader
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default class Ball extends Mesh {
  constructor({ filename } = {}) {
    this.filename = filename
  }
}

import { AmbientLight } from 'three'

export default class SceneAmbientLight extends AmbientLight {
  constructor() {
    super(0xffffff)
  }
}

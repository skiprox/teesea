import { PerspectiveCamera } from 'three'

export default class Camera extends PerspectiveCamera {
  constructor() {
    super(60, window.innerWidth / window.innerHeight, 0.1, 1000)

    this.position.set(0, 0, 40)
    this.lookAt(0, 0, 0)

  }
}

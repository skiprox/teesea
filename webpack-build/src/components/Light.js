import { AmbientLight } from 'three'

export default class Light extends AmbientLight {
  constructor() {
    super(0xffffff)
  }
}

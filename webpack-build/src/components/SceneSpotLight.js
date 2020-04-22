import { SpotLight } from 'three'

export default class SceneSpotLight extends SpotLight {
  constructor(color = 0xffffff, position = {x: 100, y: 100, z: 100}) {
    super(color)
    this.position.set(position.x, position.y, position.z);
    this.castShadow = true;

    this.shadow.mapSize.width = 1024;
    this.shadow.mapSize.height = 1024;

    this.shadow.camera.near = 500;
    this.shadow.camera.far = 4000;
    this.shadow.camera.fov = 30;
  }
}

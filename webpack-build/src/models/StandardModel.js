import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default class StandardModel {
  constructor({
    filename,
    pos = {x: 0, y: 0, z: 0},
    scale = {x: 1, y: 1, z: 1},
    wireframe =  true,
    userData = {}
  } = {}) {
    this.filename = filename
    this.pos = pos
    this.scale = scale
    this.wireframe = wireframe
    this.userData = userData
    super.load = this.load
  }
  load() {
    // Instantiate a loader
    var loader = new GLTFLoader()
    loader.load(this.filename, (gltf) => {
      var object = gltf.scene
      object.traverse((node) => {
        if (!node.isMesh) return
        node.material.wireframe = this.wireframe
      })
      object.scale.x = this.scale.x
      object.scale.y = this.scale.y
      object.scale.z = this.scale.z
      object.position.x = this.pos.x
      object.position.y = this.pos.y
      object.position.z = this.pos.z
      object.userData = this.userData
      scene.add(object)
    }, function(xhr) {
      console.log(xhr)
      console.log((xhr.loaded / xhr.total * 100 ) + '% loaded')
    }, function(error) {
      console.log('An error happened', error)
    })
  }
}

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default class StandardModel {
  constructor({
    filename,
    pos = {x: 0, y: 0, z: 0},
    scale = {x: 1, y: 1, z: 1},
    wireframe =  true
  } = {}) {
    this.filename = filename
    this.pos = pos
    this.scale = scale
    this.wireframe = wireframe
  }
  // load() {
  //   // Instantiate a loader
  //   var loader = new GLTFLoader()
  //   console.log('what the fuck', this)
  //   loader.load(this.filename, function(gltf) {
  //     var object = gltf.scene
  //     object.traverse((node) => {
  //       if (!node.isMesh) return
  //       node.material.wireframe = true
  //     })
  //     object.scale.x = this.scale.x
  //     object.scale.y = this.scale.x
  //     object.scale.z = this.scale.x
  //     object.position.x = this.pos.x
  //     object.position.y = this.pos.x
  //     object.position.z = this.pos.x
  //     scene.add(object)
  //   }, function(xhr) {
  //     console.log(xhr)
  //     console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' )
  //   }, function(error) {
  //     console.log('An error happened', error)
  //   })
  // }
}

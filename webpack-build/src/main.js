// THREE.JS MODULES
import * as THREE from 'three'

// STATS
import Stats from 'three/examples/jsm/libs/stats.module'

// GUI
import * as dat from 'dat.gui'

// CONTROLS
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Model loader
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

// COMPONENTS
import Camera from 'Components/Camera'
import Renderer from 'Components/Renderer'
import Light from 'Components/Light'

// OBJECTS
import Ball from 'Objects/Ball'
import Cube from 'Objects/Cube'

// OBJECTS
import StandardModel from 'Models/StandardModel'

// EFFECTS
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'

import { EffectShader } from 'Shaders'

/* -------- SET UP -------- */
const container = document.querySelector('#app')

/*
   to use variables in the browser console,
   bind them to a "global" object which makes debugging easier
*/
global.camera = new Camera()
global.renderer = new Renderer({
  antialias: true,
  alpha: true,
  clearColor: 0xfcfcfc
})
global.light = new Light()
global.scene = new THREE.Scene()

let time = 0

/* -------- POST PROCESSING -------- */
// const composer = new EffectComposer(renderer)
// const renderPass = new RenderPass(scene, camera)
// const shaderPass = new ShaderPass(EffectShader)

/* -------- SHARED PARAMETERS -------- */
const params = {
  noiseStrength: 4.0
}

/* -------- DAT GUI OPTIONS -------- */
let gui = new dat.GUI()

gui
  .add(params, 'noiseStrength')
  .min(0)
  .max(50)
  .step(0.1)

/* -------- STATS -------- */
let stats = new Stats()

/* -------- CREATE OBJECTS -------- */
let ball = new Ball({
  size: 10,
  resolution: 50
})

let cube = new Cube({
  size: 10,
  resolution: 50
})

/* -------- CREATE MODELS -------- */
let tinybarn = new StandardModel({
  filename: './models/barn/barn_1.gltf',
  pos: {
    x: 0,
    y: 0,
    z: 0
  },
  scale: {
    x: 0.3,
    y: 0.3,
    z: 0.3
  },
  wireframe: true
})

let greenhouse = new StandardModel({
  filename: './models/greenhouse/greenhousse2.gltf',
  pos: {
    x: 100,
    y: 0,
    z: 100
  },
  scale: {
    x: 5.5,
    y: 5.5,
    z: 5.5
  },
  wireframe: true
})

// Instantiate a loader
var loader = new GLTFLoader()

/* -------- START -------- */
const init = () => {
  // --- add renderer to container ---
  container.appendChild(renderer.domElement)

  // --- add stats to container---
  container.appendChild(stats.dom)

  // --- add the light ---
  scene.add(light)

  // --- add objects to scene ---
  scene.add(ball)
  scene.add(cube)

  global.controls = new OrbitControls( global.camera, global.renderer.domElement )
  global.controls.enableZoom = true
  global.controls.enablePan = true
  global.controls.enableDamping = true
  global.controls.rotateSpeed = - 0.25

  // load a model!
  loader.load(tinybarn.filename, function(gltf) {
    var object = gltf.scene
    object.traverse((node) => {
      if (!node.isMesh) return
      node.material.wireframe = tinybarn.wireframe
    })
    object.scale.x = tinybarn.scale.x
    object.scale.y = tinybarn.scale.y
    object.scale.z = tinybarn.scale.z
    object.position.x = tinybarn.pos.x
    object.position.y = tinybarn.pos.y
    object.position.z = tinybarn.pos.z
    scene.add(object)
  }, function(xhr) {
    console.log(xhr)
    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' )
  }, function(error) {
    console.log('An error happened', error)
  })

  loader.load(greenhouse.filename, function(gltf) {
    var object = gltf.scene
    object.traverse((node) => {
      if (!node.isMesh) return
      node.material.wireframe = greenhouse.wireframe
    })
    object.scale.x = greenhouse.scale.x
    object.scale.y = greenhouse.scale.y
    object.scale.z = greenhouse.scale.z
    object.position.x = greenhouse.pos.x
    object.position.y = greenhouse.pos.y
    object.position.z = greenhouse.pos.z
    scene.add(object)
  }, function(xhr) {
    console.log(xhr)
    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' )
  }, function(error) {
    console.log('An error happened', error)
  })

  // Load a glTF resource
  loader.load('./models/barn/barn_1.gltf', function ( gltf ) {
    var object = gltf.scene
    // This turns it into wireframe
    object.traverse((node) => {
      if (!node.isMesh) return
      node.material.wireframe = true
    })
    object.position.y = -10
    scene.add(object)
  },
  // called while loading is progressing
  function ( xhr ) {
    console.log(xhr)
    console.log((xhr.loaded / xhr.total * 100 ) + '% loaded')
  },
  // called when loading has errors
  function ( error ) {
    console.log('An error happened')
  })
}
init()

/* -------- ANIMATION LOOP -------- */
const loop = () => {
  // update uniforms for ball material
  ball.update({
    u_amp: params.noiseStrength,
    u_time: time
  })

  cube.update({
    u_amp: params.noiseStrength,
    u_time: time
  })

  // update shaderPass uniforms
  // shaderPass.uniforms['u_time'].value += 0.1

  // --- UPDATE TIME & STATS --
  time += 0.1
  stats.update()

  // --- RENDER --
  renderer.render(scene, camera)
  // composer.render()
  requestAnimationFrame(loop)
}
loop()

/* -------- WINDOW RESIZE -------- */
window.addEventListener('resize', () => {
  let width = window.innerWidth
  let height = window.innerHeight

  // update ball u_resolution
  ball.update({
    u_resolution: [width, height]
  })

  // update camera projection matrix
  camera.aspect = width / height
  camera.updateProjectionMatrix()

  // update canvas dimensions
  renderer.setSize(width, height)
})

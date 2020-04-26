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
import SceneAmbientLight from 'Components/SceneAmbientLight'
import SceneSpotLight from 'Components/SceneSpotLight'

// OBJECTS
import Ball from 'Objects/Ball'
import Cube from 'Objects/Cube'

// MODELS
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
global.ambientLight = new SceneAmbientLight()
global.spotLightRed = new SceneSpotLight(0xff4422, {x: 100, y: 100, z: 100})
global.spotLightBlue = new SceneSpotLight(0x2244ff, {x: -100, y: 100, z: -100})
global.spotLightGreen = new SceneSpotLight(0x22ff44, {x: 100, y: 100, z: -100})
global.spotLightYellow = new SceneSpotLight(0xffff22, {x: -100, y: 100, z: 100})
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
let barn = new StandardModel({
  filename: './models/barn/barn_1.gltf',
  pos: {
    x: 0,
    y: 0,
    z: 0
  },
  scale: {
    x: 2.0,
    y: 2.0,
    z: 2.0
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
  wireframe: false
})

let cowhead = new StandardModel({
  filename:'./models/cow/bakedcowpie.gltf',
  pos: {
    x:50,
    y:20,
    z:0

  },
  scale: {
    x: 7,
    y: 7,
    z: 7
  },
  wireframe: false
})

let mootext = new StandardModel({
  filename:'./models/mootext/mootext.gltf',
  pos: {
    x:0,
    y:0,
    z:0
  },
  scale: {
    x:2,
    y:2,
    z:2
  },
  wireframe: false
})

let cooler = new StandardModel({
  filename: './models/cooler/cooler.gltf',
  pos: {
    x: -80,
    y: 10,
    z: -30
  },
  scale: {
    x: 40,
    y: 40,
    z: 40
  },
  wireframe: false
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
  scene.add(ambientLight)
  scene.add(spotLightRed)
  scene.add(spotLightBlue)
  scene.add(spotLightGreen)

  // --- add objects to scene ---
  scene.add(ball)
  scene.add(cube)

  // --- add camera controls to scene ---
  global.controls = new OrbitControls( global.camera, global.renderer.domElement )
  global.controls.enableZoom = true
  global.controls.enablePan = true
  global.controls.enableDamping = true
  global.controls.rotateSpeed = - 0.25

  // --- add models to scene ---
  greenhouse.load()
  cowhead.load()
  barn.load()
  cooler.load()
  // mootext.load()

  mootext.load()
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

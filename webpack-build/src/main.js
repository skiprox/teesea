// THREE.JS MODULES
import * as THREE from 'three'

// STATS
import Stats from 'three/examples/jsm/libs/stats.module'

// GUI
import * as dat from 'dat.gui'

// CONTROLS
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// COMPONENTS
import Camera from 'Components/Camera'
import Renderer from 'Components/Renderer'

// OBJECTS
import Ball from 'Objects/Ball'
import Cube from 'Objects/Cube'

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

/* -------- START -------- */
const init = () => {
  // --- add renderer to container ---
  container.appendChild(renderer.domElement)

  // --- add stats to container---
  container.appendChild(stats.dom)

  // --- add objects to scene ---
  scene.add(ball)
  scene.add(cube)

  global.controls = new OrbitControls( global.camera, global.renderer.domElement );
  global.controls.enableZoom = true;
  global.controls.enablePan = true;
  global.controls.enableDamping = true;
  global.controls.rotateSpeed = - 0.25;

  // --- set up composer ---
  // composer.addPass(renderPass)
  // composer.addPass(shaderPass)
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

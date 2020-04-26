import { Raycaster } from 'three'

export default class Ray extends Raycaster {
  constructor(listenWindow) {
    super()
    listenWindow.addEventListener('click', this.onClick.bind(this))
  }
  /**
   * On click events on window
   * Check if we're clicking on something that has
   * unique userData stored within it
   */
  onClick(e) {
    mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1
    mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1
    // find intersections
    this.setFromCamera(mouse, camera)
    let intersects = this.intersectObjects(scene.children, true)
    if (intersects.length > 0) {
      let intersected = intersects[0].object
      if (intersected.parent.type !== 'Scene') {
        while (intersected.parent.type !== 'Scene') {
          intersected = intersected.parent
        }
      }
      if (intersected.userData) {
        if (Object.keys(intersected.userData).length !== 0 && intersected.userData.constructor === Object) {
          console.log('the user data', intersected.userData)
        }
      }
    }
  }
}

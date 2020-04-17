import { Mesh, BoxBufferGeometry, MeshNormalMaterial } from 'three'
import { GradientShader } from 'Shaders'

export default class Cube extends Mesh {
	constructor({ size = 10, resolution = 50 } = {}) {
		// bind our GradientShader to a variable
		let shader = GradientShader

		let geo = new BoxBufferGeometry(size, size, size, resolution, resolution)
		let mat = new MeshNormalMaterial()
		mat = shader

		// essentially `new THREE.Mesh(geo,mat)`
		super(geo, mat)

		// set default values for uniforms
		shader.uniforms['u_time'].value = 0.0
		shader.uniforms['u_resolution'].value = [
			window.innerWidth,
			window.innerHeight
		]

		// allow it to be accessible inside of update method
		this.shader = shader
	}

	update({
		u_resolution = [window.innerWidth, window.innerHeight],
		u_amp = 0,
		u_time = 0,
		x = 20,
		y = 0,
		z = 10
	} = {}) {
		let { uniforms } = this.shader
		if (u_resolution) uniforms['u_resolution'].value = u_resolution
		if (u_amp) uniforms['u_amp'].value = u_amp
		if (u_time) uniforms['u_time'].value = u_time

		if (x) this.position.x = x
		if (y) this.position.y = y
		if (z) this.position.z = z

		this.rotation.x += 0.01
		this.rotation.y += 0.02
	}
}

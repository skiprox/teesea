let permute = `
  vec4 permute(vec4 x){
    return mod(((x*34.0)+1.0)*x, 289.0);
  }
`

export { permute }

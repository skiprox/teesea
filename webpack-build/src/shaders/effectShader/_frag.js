let frag = `
varying vec2 vUv;
uniform sampler2D tDiffuse;

void main() {
  // default color
  vec3 color = vec3(0.0);

  // get UV
  vec2 st = vUv;

  // repeat dimensions twice
  st = fract(st * 2.0);

  // taking color data from previous render pass
  vec4 texture = texture2D(tDiffuse, st.xy);

  // set color to texture rgb
  color = vec3(texture.rgb);

  // multiply by red
  color = vec3(1.0, 0.0, 0.0) * color;

  gl_FragColor = vec4(color, 1.0);
}
`
export { frag }

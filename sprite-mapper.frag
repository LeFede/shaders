#version 120
precision highp float;

uniform vec2 resolution;

vec4 map(float w, float h);
vec2 uv(vec2 res);

uniform sampler2D source;
uniform sampler2D lookup;

void main(void)
{
  gl_FragColor = map(64., 32.);
}

vec2 uv(vec2 res) { return gl_FragCoord.xy / res; }

vec4 map(float w, float h) {
  if (fract(w) > 0.) {w--;}
  if (fract(h) > 0.) {h--;}
  
  float lookUpW = w;
  float lookUpH = h;
  
  vec2 uv = uv(resolution);
  uv.y = 1.0 - uv.y;
  vec4 source = texture2D(source, uv);
  
  float x = floor(source.r * 256.);
  float y = floor(source.g * 256.);
  
  vec4 lookup = texture2D(lookup, vec2((1. / lookUpW) * x, (1. / lookUpH) * y));
  lookup.a = source.a;
  return lookup;
}
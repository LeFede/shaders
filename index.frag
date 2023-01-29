#version 120
#define PI 3.14159265359
precision highp float;

uniform float time;
uniform vec2 resolution;
uniform sampler2D uTex0;
//uniform sampler2D uTex0Source;
//uniform sampler2D uLookup;
uniform sampler2D uTex1Source;

vec3 colorA = vec3(0.149,0.141,0.912);
vec3 colorB = vec3(1.000,0.833,0.224);

// Snippets
float wavyShape(vec2 uv);
void tex();
vec4 map(float w, float h);

// Vars
float rev(float v); 
vec2 uv(vec2 res);

// AAAAAAAAAAA
uniform sampler2D source;
uniform sampler2D lookup;

// Funcs
vec4 smoothTransition(vec3 c1, vec3 c2);


void main(void)
{
    gl_FragColor = map(64., 32.);
}

float rev(float v) {
    return 1.0 - v;
}

vec2 uv(vec2 res) { return gl_FragCoord.xy / res; }

float wavyShape (vec2 uv) {
    return sin(uv.x*10.*PI-time + sin(uv.y*10.))*100 +.25;
}

vec4 smoothTransition(vec3 c1, vec3 c2) {
    vec3 color;
    // sin(n) ~ returns a value between -1.0 & 1.0
    float pct = abs(sin(time));
    // mix(from, to, alpha)
    color = mix(c1, c2, pct);
    return vec4(color, 1.0);
}

// TEST
void tex() {
    vec2 uTex0Uv = gl_FragCoord.xy / vec2(500.);
    uTex0Uv.y = 1.0 - uTex0Uv.y;
    vec4 texColor = texture2D(uTex0, uTex0Uv);
    gl_FragColor = texColor;
}

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
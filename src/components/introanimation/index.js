import React, { Component, createRef } from "react"
/*
import Stats from "three/examples/jsm/libs/stats.module"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
*/
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js"
import {
  WebGLRenderer,
  PerspectiveCamera,
  Group,
  GridHelper,
  Mesh,
  Scene,
  ExtrudeBufferGeometry,
  ShaderMaterial,
  Object3D,
  Vector2,
  TorusBufferGeometry,
  LineBasicMaterial,
  Vector3,
  Geometry,
  Line,
  MeshBasicMaterial,
  BoxBufferGeometry,
} from "three"
import { TimelineMax, Power2 } from "gsap"
import styles from "./intro.module.scss"

const width = 195
const height = 95
const step = 25

const uniforms = {
  u_time: { type: "f", value: 1.0 },
  u_resolution: { type: "v2", value: new Vector2() },
}

const initRenderer = canvas => {
  const renderer = new WebGLRenderer({
    antialias: true,
    canvas,
  })

  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  return renderer
}

const initCamera = () => {
  const camera = new PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.set(0, 0, 185)
  return camera
}
/*
const initControls = (camera, domNode) => {
  const controls = new OrbitControls(camera, domNode)
  controls.screenSpacePanning = true
}


const initStats = () => {
  const stats = new Stats()
   document.body.appendChild(stats.dom)
  return stats
}
*/


const initGroup = () => {
  const group = new Group()
  group.scale.multiplyScalar(0.4)
  group.position.x = -79
  group.position.y = 136
  group.scale.y *= -1

  return group
}

const SVGTo3DShapes = () => {
  const loader = new SVGLoader()

  const data = loader.parse(`<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="497.55" height="509.25" viewBox="0 0 497.55 509.25">
  <title>d</title>
  <g>
    <path d="M246.15,350.65c-2.89-13.48-13-21.2-15.73-23.31a33.11,33.11,0,0,0-14.08-6.82c-4-.77-6.92-.41-8.71-.6a28.47,28.47,0,0,0-8,.62c-21.67,4.07-32.2,29.15-46.46,25.07-5.39-1.55-10.76-8.54-11.26-12.57a8.94,8.94,0,0,1,.5-4.17c.73-1.51,2-2.3,3.05-3.5l42-43-40.22-1.63c-4.16,4.2-27.53,26.31-31.88,30.31-3.49,3.2-7.6,8.5-9.09,13.53a26.54,26.54,0,0,0,1.23,17.73,46,46,0,0,0,15.49,18.8,53,53,0,0,0,34.61,10c3.83-.32,10.07-3,13.17-4.47,4.73-2.21,7.95-5,9.88-6.28,29.71-27.7,37.76,5.51,30.87,12.7-6.48,5.87-55.93,80.57-63.39,86.87l36.2,1.51c8.82-7,41.61-66.52,54.4-78.67C242.85,375.46,249.07,364.28,246.15,350.65Z" transform="translate(8.06 47.83)" fill="#2e3192"/>
    <path d="M175,220l62.63-88.7-40.16-2.46c-4.28,4.12-49.38,76.46-53.85,80.36-3.58,3.13-7.84,8.35-9.48,13.34a26.54,26.54,0,0,0,.73,17.75,45.47,45.47,0,0,0,14.94,19.12,52.66,52.66,0,0,0,34.32,10.68c3.83-.23,10.14-2.79,13.29-4.19a62.69,62.69,0,0,0,10-6.07c30.51-27.08,37.6,6.29,30.5,13.33-6.65,5.73-32.86,30.88-40.49,37l36.14,2.26c9-6.84,18.14-17.13,31.27-29,4.27-7.2,10.82-18.25,8.28-31.94-2.5-13.53-12.36-21.46-15.05-23.62a32.63,32.63,0,0,0-13.87-7.11c-3.94-.85-6.91-.56-8.7-.79a28.4,28.4,0,0,0-8,.46c-21.77,3.62-33,28.47-47.16,24.09-5.35-1.65-10.52-8.76-10.89-12.79" transform="translate(8.06 47.83)" fill="#2e3192"/>
  </g>
</svg>
`)
  const paths = data.paths
  return paths.map(path => path.toShapes(true))
}

const extrude = (shape, extrudeSettings) => {
  return new ExtrudeBufferGeometry(shape, extrudeSettings)
}

function vertexShader() {
  return `
    varying vec3 vUv; 

    void main() {
      vUv = position; 

      vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * modelViewPosition; 
    }
  `
}

function fragmentShader() {
  return `
  uniform vec2 u_resolution;
  uniform float u_time;

  const int octaves = 6;
  const int octavesWarp = 5;
  const float seed = 400.0;
  const float seed2 = 10.;

  const float PI = 3.14159265359;
  const float TAU = 80.28318530718;

  float random(float val) {
    return fract(sin(val) * seed);
  }

 

  vec2 random2(vec2 st, float seed){
      st = vec2( dot(st,vec2(127.1,311.7)),
                dot(st,vec2(269.5,183.3)) );
      return -1.0 + 2.0*fract(sin(st)*seed2);
  }

  float noise(vec2 st, float seed) {
      vec2 i = floor(st);
      vec2 f = fract(st);

      vec2 u = f*f*(3.0-2.0*f);

      return mix( mix( dot( random2(i + vec2(0.0,0.0), seed ), f - vec2(0.0,0.0) ), 
                       dot( random2(i + vec2(1.0,0.0), seed ), f - vec2(1.0,0.0) ), u.x),
                  mix( dot( random2(i + vec2(0.0,1.0), seed ), f - vec2(0.0,1.0) ), 
                       dot( random2(i + vec2(1.0,1.0), seed ), f - vec2(1.0,1.0) ), u.x), u.y);
  }




  float fbmWarp (in vec2 st, float seed) {
    float value = 0.0;
    float amplitude = .5;
    float frequency = 5.0;
    for (int i = octavesWarp; i > 0; i--) {
        value += amplitude * noise(st, seed);
        st *= 2.;
        amplitude *= .5;
    }
    return value;
  }

float fbm ( in vec2 _st) {
  float v = 0.3;
  float a = 0.7;
  vec2 shift = vec2(100.0);
  // Rotate to reduce axial bias
  mat2 rot = mat2(cos(0.65), sin(0.8),
                  -sin(0.2), cos(0.10));
  for (int i = 0; i < octaves; ++i) {
      v += a * noise(_st, seed);
      _st = rot * _st * 2.0;
      a *= 0.6;
  }
  return v;
}

  mat2 rotate2d(float _angle){
      return mat2(cos(_angle),sin(_angle),
                  -sin(_angle),cos(_angle));
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy - 1. * u_resolution.xy) / u_resolution.xy;

    
    
    float offsetVal = fbmWarp(uv, seed);
    vec2 direction = normalize(vec2(1.));
    direction = rotate2d(offsetVal * TAU) * direction;
    vec2 uvN = uv * 5. + direction * cos(u_time / 10.) * 2.;
    vec2 uvN2 = uv * 5. + direction * cos(1. + u_time / 10.) * 2.0;
    float noiseVal = fbm(uvN);
    float noiseVal2 = fbmWarp(uvN2, seed);
    
    vec3 colour = vec3(noiseVal + noiseVal2);
    colour.r += 0.; colour.g += .58; colour.b += .3;


    gl_FragColor = vec4(colour, 0.5);
  }
`
}

const customShader = 
   new ShaderMaterial({
    fragmentShader: fragmentShader(),
    vertexShader: vertexShader(),
    uniforms,
  })


const torus = (rad, tube, radseg, tubeseg, arc) => {
  return new TorusBufferGeometry(rad, tube, radseg, tubeseg, arc)
}

const lineMaterial = new LineBasicMaterial({
  color: 0x788587,
  transparent: true,
  opacity: 0.6,
})

const verticalLines = (initial, step, limit) => {
  let increment = initial

  const group = new Group()

  while (increment < limit) {
    const geometry = new Geometry()
    geometry.vertices.push(
      new Vector3(increment + step, -height, -10),
      new Vector3(increment + step, height, -10)
    )
    const line = new Line(geometry, lineMaterial)
    group.add(line)
    increment += step
  }
  return group
}
const horizontalLines = (initial, step, limit) => {
  let increment = initial

  const group = new Group()

  while (increment < limit) {
    const geometry = new Geometry()
    geometry.vertices.push(
      new Vector3(-width, increment + step, -10),
      new Vector3(width, increment + step, -10)
    )
    const line = new Line(geometry, lineMaterial)
    group.add(line)
    increment += step
  }
  return group
}

const blocks = () => {
  const group = new Group()
  const material = new MeshBasicMaterial({ color: 0xcbd6d8 })

  let step = 0

  for (let i = 0; i < 6; i++) {
    const geometry = new BoxBufferGeometry(width * 2, 31.6, 0)
    const mesh = new Mesh(geometry, material)
    mesh.position.y = -75 + step
    group.add(mesh)
    step += 31.6
  }

  return group
}

export default class AnimatedIntro extends Component {
  renderer
  camera
  canvasRef = createRef()

  resizeHandler = () => {
    const aspect = window.innerWidth / window.innerHeight

    this.camera.aspect = aspect > 1 ? aspect : 1
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    uniforms.u_resolution.value.x = this.renderer.domElement.width
    uniforms.u_resolution.value.y = this.renderer.domElement.height
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeHandler)
    window.removeEventListener("orientationchange", this.resizeHandler)
  }

  componentDidMount() {
    //stuff to mouve out
    var extrudeSettings = {
      steps: 2,
      depth: 3,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 1,
    }

    ////

    this.renderer = initRenderer(this.canvasRef.current)
    this.camera = initCamera()

    window.addEventListener("resize", this.resizeHandler)
    window.addEventListener("orientationchange", this.resizeHandler)

    /*
    initControls(this.camera, this.canvasRef.current)
    const stats = initStats()
    */
    const scene = new Scene()
    /*
    var helper = new GridHelper(160, 10)
    helper.rotation.x = Math.PI / 2
    scene.add(helper)
    */
    //shapes setup

    const logoGroup = SVGTo3DShapes()
      .map(shape => {
        var geometry = extrude(shape, extrudeSettings)
        return new Mesh(geometry, customShader)
      })
      .reduce((group, mesh) => {
        group.add(mesh)
        return group
      }, initGroup())

    const pivot = new Object3D()

    pivot.add(logoGroup)

    const outerRing = new Mesh(torus(68, 5, 16, 100, 6.3), customShader)

    const innerRing = new Mesh(torus(70, 5, 16, 100, 6.3), customShader)
    innerRing.position.z -= 50

    const hlines = horizontalLines(-height, step, height)
    const vlines = verticalLines(-width, step, width)

    const blockGroup = blocks()

    scene.add(pivot)
    scene.add(vlines)
    scene.add(hlines)
    scene.add(outerRing)
    scene.add(innerRing)
    scene.add(blockGroup)

    this.resizeHandler()

    const render = () => {
      uniforms.u_time.value += 0.05
      this.renderer.render(scene, this.camera)
    }

    const animate = () => {
      requestAnimationFrame(animate)
      render()
//      stats.update()
    }
    animate()

    //animations
    const tl = new TimelineMax()
      .addLabel("start", 0)
      .set(blockGroup.children.map(child => child.position), { x: -2 * width })
      .set(document.body, {
        backgroundColor: "#cbd6d8",
      })
      .set([innerRing.scale, outerRing.scale, pivot.scale], {
        x: 0.0001,
        y: 0.0001,
        z: 0.0001,
      })
      .to(
        this.canvasRef.current,
        1,
        {
          scaleX: 0.9,
          scaleY: 0.9,
        },
        "start+=1.5"
      )
      .addLabel("shrunk")
    tl.staggerFrom(
      vlines.children.map(line => line.position),
      1.5,
      {
        y: -height * 2,
      },
      0.1,
      "shrunk+=0.5"
    )
      .staggerFrom(
        hlines.children.map(line => line.position),
        1.5,
        {
          x: -width * 2,
        },
        0.15,
        "shrunk+=0.5"
      )
      .to(
        [pivot.rotation, outerRing.rotation],
        3,
        {
          y: 2 * Math.PI,
          Ease: Power2.easeOut,
        },
        "shrunk+=1.5"
      )
      .to(
        innerRing.rotation,
        3,
        {
          y: -2 * Math.PI,
          Ease: Power2.easeOut,
        },
        "shrunk+=1"
      )
      .to(
        [innerRing.scale, outerRing.scale, pivot.scale],
        3.5,
        {
          x: 1,
          y: 1,
          z: 1,
          Ease: Power2.easeOut,
        },
        "shrunk+=1"
      )
      .addLabel("logoScaled")
      .to(
        [innerRing.position, outerRing.position, pivot.position],
        10,
        {
          z: -100,
          Ease: Power2.easeIn,
        },
        "logoScaled += 0.6"
      )
      .staggerTo(
        blockGroup.children.map(child => child.position),
        2.5,
        {
          x: 0,
        },
        0.3,
        "logoScaled+=0.6"
      )
  }

  render() {
    return (
      <canvas
        onLoad={() => {
          alert("loader")
        }}
        className={styles.canvas}
        ref={this.canvasRef}
      >
        You need javascript enabled to view this animation
      </canvas>
    )
  }
}

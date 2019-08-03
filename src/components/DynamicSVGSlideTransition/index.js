import React, { Component, createRef } from "react"
import { TweenLite, TimelineLite } from "gsap"
import styles from "./style.module.scss"

const right = () =>
  `M${2000},-1000  Q${800} -500 ${400} 0 Q${0} ${400} ${400} 500 T ${400} 1000 Q${800} 1500 ${2000} 2000H2000V-1000Z`

const left = (offset, mousePos) =>
  `M${800},-500 V0 Q${1000} 250 ${800} 500 T ${800} 1000 V1500 H-2000 V-500Z `

export default class DynamicSVGSlide extends Component {
  layer1Ref = createRef()
  layer2Ref = createRef()

  state = {
    offset: this.calculateOffset(),
  }

  calculateOffset() {
    const width = window.innerWidth

    return width < 300 ? 700 : width < 600 ? 500 : width < 900 ? 400 : 200
  }

  componentDidMount() {
    TweenLite.set("#layer1", {
      x: 780,
    })
  }

  componentWillUnmount() {}

  transition = event => {
    const { pageY } = event
    const height = window.innerHeight

    const point = (pageY / height) * 1000

    const offset = this.calculateOffset()

    const images = [this.layer1Ref.current, this.layer2Ref.current]

    const tl = new TimelineLite()

    console.log("transition")

    TweenLite.to("#layer1", 4, {
      x: -1000,
      y: 500,
    })
  }
  // `M${2000},-1000  Q${800} -500 ${400} 0 Q${0} ${400} ${400} 500 T ${400} 1000 Q${800} 1500 ${2000} 2000H2000V-1000Z`
  render() {
    return (
      <svg
        onClick={this.transition}
        viewBox="0 -3000 8000 8000"
        preserveAspectRatio="none"
      >
        <path
          d={`M0 -1000 `}
          id="layer1"
          ref={this.layer1Ref}
          fill="red"
          stroke="black"
          strokeMiterlimit="100"
        />
        <path
          d={`M100,900 V980`}
          id="ldayer1"
          ref={this.layer1Ref}
          fill="red"
          stroke="black"
          strokeMiterlimit="100"
        />
      </svg>
    )
  }
}

import React, { Component, createRef } from "react"
import { TweenLite, TimelineLite } from "gsap"
import TransitionLink from "gatsby-plugin-transition-link"

import styles from "./style.module.scss"

const setPathData = (top, left, yPosition) => {
  const controlPoint1X = (top && left) || (!top && !left) ? 0 : 1000
  const controlPoint2X = controlPoint1X ? 0 : 1000

  const direction = left ? -1 : 1

  return `M${2000 * direction},-1000 
          Q${controlPoint1X} -${yPosition}
          500 0 
          Q${controlPoint2X} ${yPosition}
          500 500
          T 500 1000
          Q${controlPoint2X} ${yPosition + 1000}
          ${2000 * direction} 2000Z `
}

export default class DynamicSVGSlide extends Component {
  layer1Ref = createRef()
  layer2Ref = createRef()

  transition = ({ node, e, exit, entry }) => {
    const tl = new TimelineLite()

    const { pageY, pageX } = e
    const { clientHeight, clientWidth } = document.body
    const top = pageY < clientHeight / 2
    const left = pageX < clientWidth / 2
    const normalizedPageY = (pageY / clientHeight) * 1000
    const yOffset = top ? normalizedPageY : 1000 - normalizedPageY

    const initialX = left

    tl.set("#layer1", {
      attr: {
        d: setPathData(top, left, yOffset),
      },
      x: -800,
    }).to("#layer1", 1, {
      x: 2000,
      y: 500,
    })
  }
  render() {
    return (
      <>
        <TransitionLink
          entry={{
            delay: 4,
          }}
          exit={{
            trigger: props => this.transition(props),
            length: 2,
          }}
          to="/Page"
        >
          Link
        </TransitionLink>
        <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path
            d={""}
            id="layer1"
            ref={this.layer1Ref}
            fill="white"
            stroke="none"
            strokeMiterlimit="100"
          />
        </svg>
      </>
    )
  }
}

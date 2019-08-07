import React, { Component, createRef } from "react"
import { TweenLite, TimelineLite } from "gsap"
import TransitionLink from "gatsby-plugin-transition-link"

import styles from "./style.module.scss"

const right = () =>
  `M${2000},-1000  Q${800} -500 ${400} 0 Q${0} ${500} ${400} 500 T ${400} 1000 Q${800} 1500 ${2000} 2000H2000V-1000Z`

const left = (offset, direcction) => {
  const half = offset / 2
  const up = direcction === "up"

  const controlPoint1X = up ? 0 : offset
  const controlPoint2X = up ? offset : 0
  const controlPoint3X = controlPoint2X

  return `M-2000,-1000  Q${
    controlPoint1X /* this flips the top axis*/
  } -500 ${half} 0 Q${
    controlPoint2X /*this flips the main axis */
  } ${half} ${half} 500 T ${half} 1000 Q${
    controlPoint3X /*this flips the bottom axis */
  } 1500 -2000 2000Z    `
}

const setPathData = (top, left, xOffset, yPosition) => {
  const half = xOffset / 2

  const controlPoint1X = (top && left) || (!top && !left) ? 0 : xOffset
  const controlPoint2X = controlPoint1X ? 0 : xOffset

  return left
    ? `M-2000,-1000  Q${
        controlPoint1X /* this flips the top axis*/
      } ${-1000} ${half} 0 Q${
        controlPoint2X /*this flips the main axis */
      } ${500} ${half} 500 T ${half} 1000 Q${
        controlPoint2X /*this flips the bottom axis */
      } 1500 -2000 2000Z `
    : `M2000,-1000
       Q${controlPoint1X} -${yPosition}
       ${half} 0 
       Q${controlPoint2X} ${yPosition}
       ${half} 500 
       T ${half} ${1000}
       Q${controlPoint2X} ${yPosition + 1000}
       2000 2000
       `
}

export default class DynamicSVGSlide extends Component {
  layer1Ref = createRef()
  layer2Ref = createRef()

  state = {
    offset: this.calculateOffset(),
  }

  calculateOffset() {
    const width = window.innerWidth

    return width < 300 ? 1200 : width < 600 ? 1000 : width < 900 ? 900 : 800
  }

  componentDidMount() {
    TweenLite.set("#layer1", {
      attr: {
        d: setPathData(1, 0, 300, 500),
      },
    })
  }

  transition = ({ node, e, exit, entry }) => {
    const tl = new TimelineLite()

    const { pageY, pageX } = e
    const { height, width } = window.screen
    const top = pageY < height / 2
    const left = pageX < width / 2
    const xOffset = this.calculateOffset()
    const normalizedPageY = (pageY / height) * 1000
    const yOffset = top ? normalizedPageY : 1000 - normalizedPageY

    const layer1 = this.layer1Ref.current

    tl.set("#layer1", {
      attr: {
        d: right(xOffset, "up"),
      },
      x: -800,
    }).to("#layer1", 4, {
      x: 2000,
      y: 500,
    })
  }
  render() {
    return (
      <>
        <TransitionLink
          entry={{
            delay: 5,
          }}
          exit={{
            trigger: props => this.transition(props),
            length: 5,
          }}
          to="/Page"
        >
          Link
        </TransitionLink>
        <svg viewBox="-1000 -1000 4000 4000" preserveAspectRatio="none">
          <path
            d={""}
            id="layer1"
            ref={this.layer1Ref}
            fill="none"
            stroke="black"
            strokeMiterlimit="100"
          />
          <path
            d={""}
            id="layer2"
            ref={this.layer1Ref}
            fill="red"
            stroke="black"
            strokeMiterlimit="100"
          />
        </svg>
      </>
    )
  }
}

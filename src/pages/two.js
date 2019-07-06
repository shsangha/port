import React, { Component } from "react"
import { TweenMax } from "gsap"
import DrawSVG from "../../DrawSVGPlugin"

export default class Two extends Component {
  componentDidMount() {
    console.log(DrawSVG)

    TweenMax.fromTo(
      ".cls-1",
      1,
      {
        drawSVG: 100,
      },
      {
        drawSVG: 0,
        stroke: "green",
      }
    )
  }

  render() {
    return (
      <svg
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 341.37 420.85"
      >
        <defs></defs>
        <title>Untitled-1</title>
        <path
          stroke="#231f20"
          strokeMiterlimit="10"
          strokeWidth="11px"
          className="cls-1"
          d="M206,188c219,75,275-158,219,75s142,351-56,233S136,568,171,378s99-332,34-184L140,342h0"
          transform="translate(-123.37 -127)"
        />
      </svg>
    )
  }
}

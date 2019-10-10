import React from "react"
import scrollTop from "./utils/scrollTop"

export default (props: any) => (
  <button
    style={{ width: "100%", height: "100%", display: "inline-block" }}
    aria-label="click to return to top of page"
    onClick={scrollTop}
  >
    {props.children}
  </button>
)

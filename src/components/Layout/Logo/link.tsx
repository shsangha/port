import React from "react"
import Link from "gatsby-plugin-transition-link"
import { TimelineMax, Power0 } from "gsap"
import { ExpoScaleEase } from "../../../../gsap/src/minified/easing/EasePack.min.js"

export default (props: any) => (
  <>
    <Link
      aria-label="Home"
      to="/"
      exit={{
        length: 4,
        delay: 0,
        trigger: ({ node }: any) => {
          const tl = new TimelineMax()

          const page = node.children[0]
          const bg = node.children[1]

          tl.to(bg, 0.5, {
            scale: 0.9,
            transformOrigin: "50% 50%",
            ease: ExpoScaleEase.config(1, 0.9, Power0.easeOut),
          }).to(
            page,
            1,
            {
              opacity: 0,
            },
            "-=1"
          )
        },
      }}
      entry={{
        length: 0,
        delay: 4,
      }}
    >
      {props.children}
    </Link>
  </>
)

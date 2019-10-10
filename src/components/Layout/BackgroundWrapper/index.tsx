import React, { useEffect, useState } from "react"
import { TimelineMax, Power0 } from "gsap"
import DrawSVG from "./DrawSVGPlugin.js"
import styles from "./style.module.scss"

interface Props {
  mode: "light" | "dark"
  children: (args: { invert: () => void; inverted: boolean }) => React.ReactNode
}

const Background = ({ mode, children }: Props) => {
  const [inverted, setInverted] = useState(false)

  const invert = () => {
    setInverted(prevState => !prevState)
  }

  useEffect(() => {
    if (DrawSVG && typeof window !== undefined) {
      const tl = new TimelineMax({ delay: 0.6 })

      tl.staggerFromTo(
        `.${styles.mask}`,
        0.5,
        {
          cycle: {
            drawSVG: ["0% 100%", "100% 0%"],
          },
        },
        {
          cycle: {
            drawSVG: ["0 0", "100% 100%"],
            ease: Power0.easeOut,
          },
        },
        0
      )
    }
  }, [])

  return (
    <>
      {children({ invert, inverted })}
      <svg
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        className={`${styles.cover} ${styles[mode]} ${
          inverted ? styles.inverted : ""
        }`}
      >
        <defs>
          <clipPath id="clipPath">
            <path
              d="M55.6,40.82c3.17,3.76,7.07,5.57,11,5.16,1.21-.16,3.21-1.55,4.19-2.32a23.4,23.4,0,0,0,3.14-3.25c9.41-14.28,11.1,2,9.27,6.51-.74,2.7-7.91,19.75-13.42,32.08h11.5c4.19-10.23,9.11-23,11.06-27,1.75-4.62,3.46-9.8,2.35-16.5a23.61,23.61,0,0,0-5-12c-1.3-1.76-2.77-3.14-4.47-3.51a14.05,14.05,0,0,0-2.76-.31,8.69,8.69,0,0,0-2.53.31C73,22.05,69.7,34.94,65.17,32.88c-1.71-.77-3.42-4.38-3.58-6.5a6.86,6.86,0,0,1,.16-2.16,7.63,7.63,0,0,1,1-1.81L77-1H63.53c-1.33,2.17-9,14-10.34,16a20.27,20.27,0,0,0-2.89,7,22.24,22.24,0,0,0,.38,9.13A25,25,0,0,0,55.6,40.82Z"
              fill="none"
            />
          </clipPath>
          <clipPath id="clipPath-2">
            <path
              d="M10.6,63.82c3.17,3.76,7.07,5.57,11,5.16,1.21-.16,3.21-1.55,4.19-2.32a23.4,23.4,0,0,0,3.14-3.25c9.41-14.28,11.1,2,9.27,6.51-.74,2.7-7.91,19.75-13.42,32.08h11.5c4.19-10.23,9.11-23,11.06-27,1.75-4.62,3.46-9.8,2.35-16.5a23.61,23.61,0,0,0-5-12c-1.3-1.76-2.77-3.14-4.47-3.51a14.05,14.05,0,0,0-2.76-.31,8.69,8.69,0,0,0-2.53.31C28,45.05,24.7,57.94,20.17,55.88c-1.71-.77-3.42-4.38-3.58-6.5a6.86,6.86,0,0,1,.16-2.16,7.63,7.63,0,0,1,1-1.81L32,22H18.53c-1.33,2.17-9,14-10.34,16A20.27,20.27,0,0,0,5.3,45a22.24,22.24,0,0,0,.38,9.13A25,25,0,0,0,10.6,63.82Z"
              fill="none"
            />
          </clipPath>
        </defs>
        <title>stransition</title>
        <g clipPath="url(#clipPath)">
          <path
            d="M55.6,40.82c3.17,3.76,7.07,5.57,11,5.16,1.21-.16,3.21-1.55,4.19-2.32a23.4,23.4,0,0,0,3.14-3.25c9.41-14.28,11.1,2,9.27,6.51-.74,2.7-7.91,19.75-13.42,32.08h11.5c4.19-10.23,9.11-23,11.06-27,1.75-4.62,3.46-9.8,2.35-16.5a23.61,23.61,0,0,0-5-12c-1.3-1.76-2.77-3.14-4.47-3.51a14.05,14.05,0,0,0-2.76-.31,8.69,8.69,0,0,0-2.53.31C73,22.05,69.7,34.94,65.17,32.88c-1.71-.77-3.42-4.38-3.58-6.5a6.86,6.86,0,0,1,.16-2.16,7.63,7.63,0,0,1,1-1.81L77-1H63.53c-1.33,2.17-9,14-10.34,16a20.27,20.27,0,0,0-2.89,7,22.24,22.24,0,0,0,.38,9.13A25,25,0,0,0,55.6,40.82Z"
            fill="none"
            stroke="none"
            strokeMiterlimit="10"
            strokeWidth="0.92"
            className={styles.inner}
          />
          <path
            d="M73.87-6.33c-7.06,11-14.32,22.47-15.49,35.45-.33,3.55.24,7.84,3.44,9.42,2.38,1.18,5.32.27,7.43-1.34s3.64-3.85,5.47-5.78,4.19-3.61,6.84-3.63c3.79,0,6.85,3.54,7.58,7.26s-.29,7.54-1.35,11.19C84.26,58.47,76.93,78.18,72.5,90.11"
            fill="none"
            stroke="none"
            strokeMiterlimit="10"
            strokeWidth="20"
            className={styles.mask}
          />
        </g>
        <g clipPath="url(#clipPath-2)">
          <path
            d="M10.6,63.82c3.17,3.76,7.07,5.57,11,5.16,1.21-.16,3.21-1.55,4.19-2.32a23.4,23.4,0,0,0,3.14-3.25c9.41-14.28,11.1,2,9.27,6.51-.74,2.7-7.91,19.75-13.42,32.08h11.5c4.19-10.23,9.11-23,11.06-27,1.75-4.62,3.46-9.8,2.35-16.5a23.61,23.61,0,0,0-5-12c-1.3-1.76-2.77-3.14-4.47-3.51a14.05,14.05,0,0,0-2.76-.31,8.69,8.69,0,0,0-2.53.31C28,45.05,24.7,57.94,20.17,55.88c-1.71-.77-3.42-4.38-3.58-6.5a6.86,6.86,0,0,1,.16-2.16,7.63,7.63,0,0,1,1-1.81L32,22H18.53c-1.33,2.17-9,14-10.34,16A20.27,20.27,0,0,0,5.3,45a22.24,22.24,0,0,0,.38,9.13A25,25,0,0,0,10.6,63.82Z"
            fill="none"
            stroke="none"
            strokeMiterlimit="10"
            className={styles.inner}
          />
          <path
            d="M30.11,10.78C24.43,18.5,15,35.4,12.24,44.58c-1,3.28-1.8,6.76-1.12,10.12s3.22,6.56,6.62,7c2.76.35,5.45-1.13,7.52-3s3.75-4.12,5.9-5.88,5-3,7.7-2.29A7.89,7.89,0,0,1,44,56.23a19.2,19.2,0,0,1,0,8c-2.23,14.58-8.8,28.08-15.29,41.32"
            fill="none"
            stroke="none"
            strokeMiterlimit="10"
            strokeWidth="20"
            className={styles.mask}
          />
        </g>
      </svg>
    </>
  )
}

export default Background

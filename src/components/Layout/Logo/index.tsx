import React from "react"
import styles from "./style.module.scss"
import loadable from "react-loadable"

interface Props {
  mode: "light" | "dark"
  revealClass: string
  inverted: boolean
  path: string
}

const SVG = ({
  inverted,
  mode,
}: {
  inverted: boolean
  mode: "light" | "dark"
}) => (
  <svg
    className={` ${inverted ? styles.inverted : ""} ${styles[mode]} ${
      styles.svg
    }`}
    width="0"
    viewBox="0 0 353.73 353.73"
  >
    <g>
      <path
        className={styles.path}
        d="M136.09,127.69c2.71,12.6,12.14,19.79,14.66,21.75a30.36,30.36,0,0,0,13.16,6.35c3.73.74,6.44.37,8.12.56a25.17,25.17,0,0,0,7.46-.56c20.26-3.83,30.06-27.16,43.4-23.43,5,1.4,10.08,7.93,10.55,11.76A8,8,0,0,1,233,148c-.65,1.4-1.86,2.15-2.89,3.27l-39.2,40.13,37.52,1.49c3.92-3.92,25.67-24.54,29.77-28.28,3.27-3,7.1-7.93,8.5-12.6a25.14,25.14,0,0,0-1.12-16.52A43.32,43.32,0,0,0,251.08,118a49.39,49.39,0,0,0-32.29-9.34c-3.55.28-9.43,2.8-12.32,4.2-4.39,2.06-7.38,4.67-9.24,5.88-27.72,25.86-35.28-5.13-28.84-11.85,6.06-5.51,52.17-75.23,59.17-81.11l-33.79-1.4C185.56,30.91,155,86.44,143,97.83,139.17,104.55,133.29,115,136.09,127.69Z"
        transform="translate(-8.13 -8.13)"
        stroke="none"
        strokeMiterlimit="10"
        strokeWidth="5"
        fill="black"
      />
      <path
        className={styles.path}
        d="M202.55,249.68,144,332.47l37.52,2.33c4-3.83,46.1-71.4,50.21-75,3.36-2.89,7.28-7.75,8.87-12.41a24.79,24.79,0,0,0-.66-16.62,42.72,42.72,0,0,0-13.9-17.82,48.89,48.89,0,0,0-32-10c-3.54.19-9.42,2.61-12.41,3.92a53,53,0,0,0-9.33,5.69c-28.47,25.3-35.1-5.88-28.47-12.41,6.16-5.32,30.71-28.84,37.8-34.53L148,163.44c-8.4,6.35-16.9,16-29.22,27.07-4,6.72-10.08,17.08-7.74,29.77s11.57,20.07,14,22a30.71,30.71,0,0,0,13,6.62,56.82,56.82,0,0,0,8.12.75,28.65,28.65,0,0,0,7.47-.37c20.34-3.36,30.8-26.6,44-22.5,5,1.59,9.8,8.22,10.17,11.95Z"
        transform="translate(-8.13 -8.13)"
        stroke="none"
        strokeMiterlimit="10"
        strokeWidth="5"
        fill="black"
      />
    </g>
    <path
      className={styles.path}
      d="M185,360c96.6,0,175-78.4,175-175S281.6,10,185,10,10,88.4,10,185,88.4,360,185,360Zm0-316.4A141.45,141.45,0,1,1,43.6,185.09V185A141.37,141.37,0,0,1,185,43.6Z"
      transform="translate(-8.13 -8.13)"
      stroke="none"
      strokeMiterlimit="10"
      strokeWidth="3.73"
      fill="black"
    />
  </svg>
)

SVG.defaultProps = {
  inverted: false,
  mode: "light",
}

const LinkWrapper = loadable({
  loader: () => import("./link"),
  //@ts-ignore
  loading: SVG,
})

const ButtonWrapper = loadable({
  loader: () => import("./button"),
  //@ts-ignore
  loading: SVG,
})
export default ({ revealClass, path, ...rest }: Props) => {
  return (
    <div className={`${revealClass} ${styles.logo}`}>
      {path === "/" ? (
        <ButtonWrapper>
          <SVG {...rest} />
        </ButtonWrapper>
      ) : (
        <LinkWrapper>
          <SVG {...rest} />
        </LinkWrapper>
      )}
    </div>
  )
}

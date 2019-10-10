import React from "react"
import RevealAnimationWrapper from "../RevealAnimationWrapper/index"
import styles from "./style.module.scss"
import Logo from "./Logo/index"
import Menu from "./Menu/index"
import BackgroundWrapper from "./BackgroundWrapper/index"

interface Props {
  path: string
}

const Layout = (Component: any) => (mode: "light" | "dark") => ({
  path,
}: Props) => {
  return (
    <BackgroundWrapper mode={mode}>
      {({ invert, inverted }) => (
        <RevealAnimationWrapper mode={mode}>
          {({ revealClass }) => (
            <div className={styles.page}>
              <header className={styles.header}>
                <Logo
                  revealClass={revealClass}
                  mode={mode}
                  inverted={inverted}
                  path={path}
                />
              </header>
              <main className={styles.content}></main>
            </div>
          )}
        </RevealAnimationWrapper>
      )}
    </BackgroundWrapper>
  )
}

Layout.defaultProps = {
  mode: "light",
}

export default Layout

const path = require("path")

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        TweenLite: path.resolve(
          path.join(__dirname, "node_modules/gsap/src/uncompressed/TweenLite")
        ),
      },
    },
  })
}

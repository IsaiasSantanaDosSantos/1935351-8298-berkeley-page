// Comando: webpack --config ./webpack.config.js --mode production

const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./js/handleCardLabelCourseDetails.js",
  output: {
    filename: "handleCardLabelCourseDetails.js",
    path: path.resolve(__dirname, "js/minified"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          output: {
            comments: false,
          },
          //   keep_classnames: /addSeoAttributesFromApiHtmlElements|footerInfoBox/g,
          //   keep_fnames: /addSeoAttributesFromApiHtmlElements|footerInfoBox/g,
        },
      }),
    ],
  },
};

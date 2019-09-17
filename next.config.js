const webpack = require("webpack");

const withPlugins = require("next-compose-plugins");
const withCSS = require("@zeit/next-css");
const optimizedImages = require("next-optimized-images");

module.exports = withPlugins(
  [
    [
      withCSS,
      {
        cssLoaderOptions: {
          url: false
        }
      }
    ],
    [optimizedImages]
  ],
  {}
);

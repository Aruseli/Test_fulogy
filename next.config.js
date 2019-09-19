require('dotenv').config()

const webpack = require("webpack");
const path = require('path');
const Dotenv = require('dotenv-webpack')

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
  {
    webpack: config => {
      config.plugins = config.plugins || []
  
      config.plugins = [
        ...config.plugins,

        new Dotenv({
          path: path.join(__dirname, '.env'),
          systemvars: true
        })
      ]
  
      return config;
    },
  },
);

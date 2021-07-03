// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack')
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = MiniCssExtractPlugin.loader;

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

if (process.env.NODE_ENV === 'test'){
  require('dotenv').config({ path: '.env.test' })
} else if ((process.env.NODE_ENV === 'development')){
  require('dotenv').config({ path: '.env.development'})
}

const config = {
  entry: "./src/app.js",
  output: {
    path: path.join(__dirname, "public/dist"),
    filename: 'bundle.js'
  },
  devServer: {
    open: true,
    host: "localhost",
    historyApiFallback: true
  },
  stats: {
    children:true
  },
  devtool:'eval-cheap-source-map' ,
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html'),
    }),

    new MiniCssExtractPlugin(),

    new webpack.DefinePlugin({
      'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
      'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
      'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
      'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
      'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
      'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
    }), 

  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", "sass-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
      {
        test: /\.(mp4|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            attrs: [":src"]
          }
        }
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";

    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
  } else {
    config.mode = "development";
  }
  return config;
};

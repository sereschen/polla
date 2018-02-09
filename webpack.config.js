var debug = process.env.NODE_ENV !== "production";
var webpack = require("webpack");
var path = require("path");

module.exports = {
  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : "cheap-module-source-map",
  entry: "./js/client.js",
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        query: {
          presets: ["react", "es2015", "stage-0"],
          plugins: ["react-html-attrs", "transform-class-properties", "transform-decorators-legacy"]
        }
      },
      {
        test: /\.scss$/,
        loader: "style-loader!css-loader?modules-loader!sass-loader"
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
        loader: "file-loader?name=fonts/[name].[ext]"
      },
      {
        test: /\.(jpg|jpeg|gif|png)$/,
        loader: "file-loader?name=img/[name].[ext]"
      }
    ]
  },
  output: {
    path: __dirname + "/public/",
    filename: "client.min.js"
  },
  plugins: debug
    ? []
    : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
          mangle: false,
          sourcemap: false,
          compress: { warnings: false },
          output: {
            comments: false
          }
        }),
        new webpack.DefinePlugin({
          "process.env": {
            // This has effect on the react lib size
            NODE_ENV: JSON.stringify("production"),
            __DEVTOOLS__: false //set it to true in dev mode
          }
        })
      ]
};

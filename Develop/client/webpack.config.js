const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },

    // TODO: Add and configure workbox plugins for a service worker and manifest file.
    plugins: [
      // HTML Webpack Plugin to generate the index.html file
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Progressive Web App',
      }),

      // Workbox plugin to inject custom service worker
      new InjectManifest({
        swSrc: './src-sw.js',  // Your custom service worker
        swDest: 'service-worker.js',
      }),

      // PWA Manifest plugin to generate the manifest.json file
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'My PWA App',
        short_name: 'PWA App',
        description: 'A Progressive Web Application!',
        background_color: '#ffffff',
        theme_color: '#317EFB',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    // TODO: Add CSS loaders and babel to webpack.
    module: {
      rules: [
        // CSS Loaders
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        // Babel Loader
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};

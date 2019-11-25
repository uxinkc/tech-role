//
//
//
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLBeautifyPlugin = require('html-beautify-webpack-plugin');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

//const StyleLintPlugin = require('stylelint-webpack-plugin');

const basePath = process.cwd();

let customizations = {

  BuefyStylePath: path.join(basePath, 'node_modules/buefy/dist/buefy.css'),
  mainStylePath: path.join(basePath, 'src/static/stylesheets/base.scss')
};

let styleArray = [];

styleArray.push(customizations.BuefyStylePath);
styleArray.push(customizations.mainStylePath);

const postCssLoader = {
  'loader': 'postcss-loader',
  'options': {
    'ident': 'extracted',
    'sourceMap': true,
    'plugins': [
      require('pixrem')(), // add fallbacks for rem units
      require('autoprefixer')({browsers: 'last 2 versions'}) // add vendor prefixes
    ]
  }
};

module.exports = {

  devtool: 'source-map',

  entry: {
    'main': [
      './src/static/stylesheets/base.scss',
      './src/app.js'
    ]
  },

  output: {
    publicPath: '/',
  },

  resolve: {
    extensions: ['.js', '.vue'],
    modules: ['node_modules', 'src']
  },

  externals: {
    // global app config object
    config: JSON.stringify({
      apiUrl: 'http://localhost:8888'
    })
  },

  module: {
    rules: [

      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              // needed for HTML Partials to work
              interpolate: true,
              removeAttributeQuotes: false
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader"
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },

      {
        /* Future option - allow customization of paths to include/exclude? */
        'exclude': styleArray,
        'test': /\.css$/,
        'use': [
          {
            'loader': 'raw-loader'
          },
          postCssLoader
        ]
      },

      {
        'exclude': styleArray,
        'test': /\.scss$|\.sass$/,
        'use': [
          {
            'loader': 'raw-loader'
          },
          postCssLoader,
          {
            'loader': 'sass-loader',
            'options': {
              'sourceMap': true,
              'precision': 8,
              'includePaths': []
            }
          }
        ]
      },
      {
        'include': styleArray,
        'test': /\.css$/,
        'use': [
          'vue-style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          postCssLoader
        ]
      },
      {
        'include': styleArray,
        'test': /\.scss$|\.sass$/,
        'use': [
          'vue-style-loader',
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          postCssLoader,
          {
            'loader': 'sass-loader',
            'options': {
              'sourceMap': true,
              'precision': 8,
              'includePaths': []
            }
          },
          {
            loader: "@epegzz/sass-vars-loader",
            options: {
              vars: {
                
                //'font-path': JSON.stringify('~fsa-style/src/fonts'),
                //'image-path': JSON.stringify('~fsa-style/src/img')

              }
            }
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: styleArray
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '../img',
              outputPath: '../dist/img/',
              name: '[name].[ext]',
              limit: 100000
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '../fonts/',
              outputPath: '../dist/fonts/',
              name: '[name].[ext]',
              limit: 100000
            }
          }
        ]
      }
    ]
  },

  plugins: [
    
    new VueLoaderPlugin(),

    new HTMLWebpackPlugin({
      filename: './index.html',
      template: './src/index.html',
      inject: true,
      chunksSortMode: 'dependency'
    }),

    new WorkboxPlugin.GenerateSW({
      // Do not precache images
      exclude: [/\.(?:png|jpg|jpeg|svg)$/],

      // Define runtime caching rules.
      runtimeCaching: [{
        // Match any request that ends with .png, .jpg, .jpeg or .svg.
        urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

        // Apply a cache-first strategy.
        handler: 'CacheFirst',

        options: {
          // Use a custom cache name.
          cacheName: 'images',

          // Only cache 10 images.
          expiration: {
            maxEntries: 10,
          },
        },
      }],
    }),
/*
    new HTMLBeautifyPlugin({
      config: {
          html: {
              end_with_newline: true,
              indent_size: 2,
              indent_with_tabs: true,
              indent_inner_html: true,
              preserve_newlines: true,
              unformatted: ['p', 'i', 'b', 'span']
          }
      },
      replace: [ ' type="text/javascript"' ]
    }),
*/
    new CopyWebpackPlugin([
      {
        from: './src/static/img/',
        to: './img/'
      },
      {
        from: './src/static/fonts/',
        to: './fonts/'
      }
      
    ]),
    
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "css/[name].css",
      chunkFilename: "[name].css"
    })
  ]
};
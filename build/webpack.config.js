const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const path = require('path');

function resolvePath(dir) {
  return path.join(__dirname, '..', dir);
}

const env = process.env.NODE_ENV || 'development';
const target = process.env.TARGET || 'web';
const host = process.env.MONACA_SERVER_HOST || '0.0.0.0';
const DEFAULT_PORT = 8080;
const port = process.env.PORT || DEFAULT_PORT;

module.exports = {
  mode: env,
  entry: {
    app: './src/js/app.js',
  },
  output: {
    path: resolvePath('www'),
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
    publicPath: '',
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': resolvePath('src'),
    },
  },
  devtool: env === 'production' ? 'source-map' : 'eval',
  devServer: {
    host: host,
    hot: true,
    open: true,
    compress: true,
    port: port,
    allowedHosts: 'all',
    // sockPort: port, // V5 COMMENT
    // contentBase: '/www/', // V5 COMMENT
    // disableHostCheck: true, // V5 COMMENT
    historyApiFallback: true,
    /*watchOptions: { // V5 COMMENT
      poll: 1000,
    },*/
  },
  optimization: {
    minimize: true,
    noEmitOnErrors: true,
    minimizer: [
      new TerserPlugin(),
      //    {
      //    cache: true,
      //    sourceMap: true,
      //    parallel: true,
      //  }
    ],
  },
  module: {
    rules: [
      {
        test: /\.(mjs|js|jsx)$/,
        use: 'babel-loader',
        include: [
          resolvePath('src'),
          resolvePath('node_modules/framework7'),

          resolvePath('node_modules/framework7-react'),

          resolvePath('node_modules/template7'),
          resolvePath('node_modules/dom7'),
          resolvePath('node_modules/ssr-window'),
        ],
      },

      {
        test: /\.css$/,
        use: [
          env === 'development'
            ? 'style-loader'
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '../',
                },
              },
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.styl(us)?$/,
        use: [
          env === 'development'
            ? 'style-loader'
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '../',
                },
              },
          'css-loader',
          'postcss-loader',
          'stylus-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          env === 'development'
            ? 'style-loader'
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '../',
                },
              },
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          env === 'development'
            ? 'style-loader'
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '../',
                },
              },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'images/[name].[ext]',
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac|m4a)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV' : JSON.stringify('production')
    }),

    ...(env === 'production'
      ? [
          new CssMinimizerPlugin(),
          //  Commented out due to change from optimize-css-assets-webpack-plugin
          //    {
          //    cssProcessorOptions: {
          //      safe: true,
          //      map: { inline: false },
          //    },
          //  }
          new webpack.optimize.ModuleConcatenationPlugin(),
        ]
      : [
          //  Development only plugins
          new webpack.HotModuleReplacementPlugin(),
          // new webpack.NamedModulesPlugin(), // V5 COMMENT
        ]),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './src/index.html.ejs',
      externalCSS: ['components/loader.css'],
      externalJS: ['components/loader.js'],
      inject: true,
      minify:
        env === 'production'
          ? {
              collapseWhitespace: true,
              removeComments: true,
              removeRedundantAttributes: true,
              removeScriptTypeAttributes: true,
              removeStyleLinkTypeAttributes: true,
              caseSensitive: true,
              conservativeCollapse: true,
              removeAttributeQuotes: true,
              useShortDoctype: true,
            }
          : false,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          noErrorOnMissing: true,
          from: resolvePath('src/static'),
          to: resolvePath('www/static'),
        },
      ],
    }),
  ],
};

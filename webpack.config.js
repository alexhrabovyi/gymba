const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env) => {
  const isProd = env.production;
  const isShowBundleAnalyzer = env.analyze;

  const mode = isProd ? "production" : "development";
  const entry = path.resolve(__dirname, 'src/static/main.jsx');

  const output = {
    publicPath: '/',
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'bundle'),
    clean: true,
  }

  // module

  const module = {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                isProd && { "useBuiltIns": "usage", "corejs": "3.35.1" }
              ].filter(Boolean),
              [
                '@babel/preset-react',
                { runtime: 'automatic' },
              ],
            ],
            plugins: [!isProd && require.resolve('react-refresh/babel')].filter(Boolean),
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          isProd ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: isProd ? '[hash:base64:8]' : '[path][name]__[local]',
              },
              sourceMap: !isProd,
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: !isProd,
              postcssOptions: {
                plugins: isProd ? ["autoprefixer"] : [],
              }
            }
          },
          "resolve-url-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: `assets/fonts/[name].[contenthash].[ext]`,
        }
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: `assets/images/[name].[contenthash].[ext]`,
        },
        use: isProd ? ['image-webpack-loader'] : [],
      },
      {
        test: /\.svg$/i,
        resourceQuery: { not: [/url/] },
        use: [
          {
            loader: '@svgr/webpack',
            options: { icon: true },
            // outDir: 'assets/images/[name].[contenthash].[ext]',
          },
        ],
      },
      {
        test: /\.svg$/i,
        type: 'asset/resource',
        resourceQuery: /url/i,
        generator: {
          filename: `assets/images/[name].[contenthash].[ext]`,
        },
        use: isProd ? ['image-webpack-loader'] : [],
      },
    ],
  }

  // plugins 

  const plugins = [
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname + '/bundle/index.html'),
      template: path.resolve(__dirname, 'src/static/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].bundle.css',
    }),
    // new FaviconsWebpackPlugin({
    //   logo: "./src/assets/favicons/favicon.png",
    //   outputPath: path.resolve(__dirname + "/bundle/assets/favicons"),
    //   prefix: '../assets/favicons/',
    //   inject: true,
    //   favicons: {
    //     icons: {
    //       yandex: false
    //     }
    //   }
    // }),
  ]

  !isProd && plugins.push(new ReactRefreshWebpackPlugin());
  isShowBundleAnalyzer && plugins.push(new BundleAnalyzerPlugin());

  // devServer

  const devServer = !isProd ? {
    open: true,
    watchFiles: ['src/**/*.html', 'bundle/*.html'],
    client: {
      overlay: true,
      progress: true,
    },
    compress: true,
    hot: true,
    historyApiFallback: true,
  } : undefined;

  // optimization

  const optimization = {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  };

  if (isProd) optimization.minimizer = ['...', new CssMinimizerPlugin()];

  // devtool
  const devtool = !isProd ? "eval-source-map" : false;

  return {
    mode,
    entry,
    output,
    module,
    plugins,
    devServer,
    optimization,
    devtool
  }
}

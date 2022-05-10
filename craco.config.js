const BabelConfig = require('./babel.config');
const CracoAlias = require('craco-alias');

module.exports = {
  // style: {
  //   modules: {
  //     localIdentName: '[local]___[hash:base64:5]',
  //   },
  // },
  eslint: {
    enable: false,
  },
  babel: {
    loaderOptions: (babelLoaderOptions, { env, paths }) => {
      babelLoaderOptions.babelrc = false;
      const extraData = {
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                browsers: ['last 2 chrome versions'],
              },
            },
          ],
          '@babel/preset-react',
        ],
        plugins: BabelConfig.plugins.concat([
          ['@babel/plugin-proposal-class-properties'],
        ]),
      };

      const ix = extraData.plugins.findIndex(
        (v) => v[0] === 'babel-plugin-root-import',
      );

      if (ix >= 0) {
        extraData.plugins[ix][1].paths.push({
          rootPathSuffix: './node_modules/react-native-web/',
          rootPathPrefix: 'react-native/',
        });
        extraData.plugins[ix][1].paths.push({
          rootPathSuffix: './node_modules/react-native-web-linear-gradient',
          rootPathPrefix: 'react-native-linear-gradient',
        });
      }

      Object.keys(BabelConfig).forEach((key) => {
        if (extraData[key]) {
          babelLoaderOptions[key] = extraData[key];
        } else {
          babelLoaderOptions[key] = BabelConfig[key];
        }
      });

      return babelLoaderOptions;
    },
  },
  webpack: {
    configure: (webpackConfig) => {
      const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
        ({ constructor }) =>
          constructor && constructor.name === 'ModuleScopePlugin',
      );
      webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);
      return webpackConfig;
    },
    resolve: {
      alias: {
        'react-native$': 'react-native-web',
        'react-native-svg': 'svgs',
        'react-native-linear-gradient': 'react-native-web-linear-gradient',
      },
    },
  },
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({
                                  webpackConfig,
                                  cracoConfig,
                                  pluginOptions,
                                  context: { env, paths },
                                }) => {
          webpackConfig.module.rules.push({
            test: /\.js$/,
            include: /node_modules\/react-native-/,
            exclude: /node_modules\/react-native-web\//,
            use: [
              {
                loader: 'babel-loader',
                query: { cacheDirectory: true },
              },
            ],
          });
          webpackConfig.module.rules.push({
            test: /\.(gif|jpe?g|png|svg)$/,
            use: [
              // {
              //   loader: 'url-loader',
              //   options: {
              //     name: '[name].[ext]',
              //     esModule: false,
              //   },
              // },
            ],
            //   // options: {
            //   //   name: '[name].[ext]',
            //   //   esModule: false,
            //   //   name: 'static/media/[name].[hash:8].[ext]',
            //   //   scalings: { '@2x': 2, '@3x': 3 },
            //   // },
            //   loader: 'url-loader',
            //   // loader: 'react-native-web-image-loader',
          });
          return webpackConfig;
        },
      },
    },
  ],
};

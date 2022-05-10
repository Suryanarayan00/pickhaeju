module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-proposal-optional-chaining'],
    [
      'babel-plugin-root-import',
      {
        paths: [
          {
            rootPathSuffix: './src/assets',
            rootPathPrefix: '#assets/',
          },
          {
            rootPathSuffix: './src/common',
            rootPathPrefix: '#common/',
          },
          {
            rootPathSuffix: './src/components',
            rootPathPrefix: '#components/',
          },
          {
            rootPathSuffix: './src/data',
            rootPathPrefix: '#data/',
          },
          {
            rootPathSuffix: './src/nav',
            rootPathPrefix: '#nav/',
          },
          {
            rootPathSuffix: './src/pages',
            rootPathPrefix: '#pages/',
          },
          {
            rootPathSuffix: './src/widgets',
            rootPathPrefix: '#widgets/',
          },
          {
            rootPathSuffix: './src/service',
            rootPathPrefix: '#service/',
          },
          {
            rootPathSuffix: './src/customModules',
            rootPathPrefix: '#modules/',
          },
          {
            rootPathSuffix: '.',
            rootPathPrefix: '/',
          },
        ],
      },
    ],
  ],
};

const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Use a web-compatible implementation of react-native-maps when building for web
  config.resolve = config.resolve || {};
  config.resolve.alias = {
    ...(config.resolve.alias || {}),
    'react-native-maps': '@teovilla/react-native-web-maps',
  };

  return config;
};



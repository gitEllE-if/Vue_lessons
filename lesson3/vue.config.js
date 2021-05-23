const path = require('path');

module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set('@', path.join(__dirname, 'src'));
    config.resolve.alias.set('@components', path.join(__dirname, 'src', 'components'));
    config.resolve.alias.set('@core', path.join(__dirname, 'src', 'core'));
    config.resolve.alias.set('@views', path.join(__dirname, 'src', 'views'));
  }
};
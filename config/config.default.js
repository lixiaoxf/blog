/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
const os = require('os');
const path = require('path');
function getIPAdress() {
    var interfaces = os.networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {
    view:{
      defaultViewEngine: 'nunjucks',
      mapping: {
        '.nj': 'nunjucks'
        
        }
    }
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1551162394420_1020';

  // add your middleware config here
  config.middleware = [];

  config.cluster = {
    listen: {
      port: 7001,
      // hostname: getIPAdress(),
      hostname: '127.0.0.1',
    }
  };
  config.siteconfig = {
    cdn:'/'
  }
  config.static = {
    prefix:'/',
    dir:path.join(appInfo.baseDir,'app/public')
  }
  config.security = {
    csrf:{
      headerName: 'x-csrf-token',
    }
  }
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};

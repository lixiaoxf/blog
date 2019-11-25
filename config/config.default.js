/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
const os = require('os');
const path = require('path');
const url = require('url')

const matchTokenUrl = require('../app/common/appUtil/matchTokenUrl')

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
  config.keys = 'zfsofoez-*#*sad;f93240978F:Jdlsd908zvc;lkaj324.,a;pu238947a;fhd;fazcv897bn7ntfhuejth243jhfosudio';
  config.tokenKey = '@ms-webkit-lixiaoblog-mumu-random-sf3kljsdf9324jklsdfsd324jlkjsdzvcmn!@#L:J@#!@#LK!@#LJK%$KLFS_()$#LKJ';
  // add your middleware config here
  config.middleware = [];

  config.cluster = {
    listen: {
      port: 7001,
      // hostname: getIPAdress(),
      hostname: '127.0.0.1',
    }
  };

  config.mongoose = {
    clients: {
      db: {
        url: 'mongodb://root:lixiao@localhost:27017/blogs',
        options: {
          poolSize: 40,
          useNewUrlParser:true
        },
      },
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
      enable: false,
    }
  }
  config.middleware = [ 'checkToken' ]
  config.checkToken = {
    match(ctx){
        const pathName = url.parse(ctx.request.url).pathname;
        if(matchTokenUrl(pathName)){
          return true;
        }else{
          return false;
        }
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

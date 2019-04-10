'use strict';
const path = require('path');
exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks',
};
exports.loadManifest = {
  enable: true,
  path: path.join(__dirname, '../lib/plugin/app-load-manifest'),
};

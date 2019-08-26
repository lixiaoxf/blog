'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.redirect('/', '/index');
  router.get('/index', controller.home.index);
  router.get('/edit', controller.home.edit);
};

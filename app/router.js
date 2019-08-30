'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.redirect('/', '/index');
  router.get('/index', controller.page.home.index);
  router.get('/edit', controller.page.home.edit);
  router.get('/detail', controller.page.home.detail);
};

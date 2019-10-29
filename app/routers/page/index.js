'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.redirect('/', '/index');
  router.get('/index', controller.page.home.index);
  router.get('/edit/:id', controller.page.home.edit);
  router.get('/detail/:id', controller.page.home.detail);
  router.get('/login', controller.page.login.index);
  router.get('/register', controller.page.login.register);
};
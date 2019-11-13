'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.redirect('/', '/index');
  router.get('/index', controller.page.home.index);
  
  router.get('/add',controller.page.home.addBlog)
  router.get('/edit/:id', controller.page.home.edit);
  router.get('/new', controller.page.home.createBlog);
  router.get('/detail/:id', controller.page.home.detail);
  router.get('/login', controller.page.login.index);
  router.get('/register', controller.page.login.register);
};
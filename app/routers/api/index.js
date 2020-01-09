'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // router.post('/api/register',controller.api.auth.register)
  router.post('/api/login',controller.api.auth.login)
  
  router.post('/v/api/createBlog',controller.api.blog.create)
  router.get('/v/api/getBlog/:id', controller.api.blog.index);
  router.post('/v/api/updateBlog/:id', controller.api.blog.update);
  // router.post('/v/api/deleteBlog/:id', controller.api.blog.delete);
};
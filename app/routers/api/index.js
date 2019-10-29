'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/api/register',controller.api.auth.register)
  router.post('/api/login',controller.api.auth.login)
};
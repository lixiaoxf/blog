'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.redirect('/', '/ssr');
  router.get('/ssr', controller.ssr.index);
  router.get('/ssr/detail', controller.ssr.detail);
  router.get('/ssr/news', controller.ssr.news);
  router.get('/spa', controller.spa.index);

  router.get('/pwapush/view', controller.pwapush.view);
  router.post('/pwapush/save',controller.pwapush.index)
  router.post('/pwapush/push',controller.pwapush.push)

  router.resources('news','/api/v1/news',controller.api.news)
  router.resources('videos','/api/v1/videos',controller.api.videos)
  router.resources('detail','/api/v1/detail/:id',controller.api.detail)

};

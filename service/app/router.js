'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  var adminauth = app.middleware.adminauth()
  router.get('/', controller.default.home.index);
  // default
  router.get('/default/index', controller.default.home.getInfo);
  router.get('/default/details/:id', controller.default.home.getDetailsById);
  // admin
  router.post('/admin/login', controller.admin.home.checkLogin);
  router.get('/admin/type',adminauth,controller.admin.home.getType);
  router.post('/admin/addArticle',adminauth,controller.admin.home.addArticle);
  router.put('/admin/updateArticle',adminauth,controller.admin.home.updateArticle);
  router.get('/admin/getList',adminauth,controller.admin.home.getList);
  router.delete('/admin/deleteItem/:id',adminauth,controller.admin.home.deleteItem);
  router.get('/admin/updateById/:id',adminauth,controller.admin.home.updateById);
};

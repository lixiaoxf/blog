'use strict';
const Controller = require('egg').Controller;
class LoginController extends Controller {
  async index() {
    let blogs = await this.ctx.model.Blog.find()
    const { ctx } = this;
    await this.ctx.render('home/index/index.nj',{list:blogs});
  }
}

module.exports = LoginController;

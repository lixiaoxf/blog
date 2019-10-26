'use strict';
const Controller = require('egg').Controller;
class LoginController extends Controller {
  async index() {
    const { ctx } = this;
    await this.ctx.render('auth/login/index.nj');
  }
  async register(){
    const { ctx } = this;
    await this.ctx.render('auth/register/index.nj'); 
  }
}

module.exports = LoginController;

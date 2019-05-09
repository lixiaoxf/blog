'use strict';
const Controller = require('egg').Controller;
class HomeController extends Controller {
  async index() {
    // let a = await this.ctx.model.Test.find({},res=>{})

    // console.log(a)
    
    const { ctx } = this;
    
    await this.ctx.render('home/index/index.nj',{num:1});
  }
}

module.exports = HomeController;

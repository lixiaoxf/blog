'use strict';
const Controller = require('egg').Controller;
class HomeController extends Controller {
  async index() {

    // let a = await this.ctx.model.Blog.create({title:'vue',des:'开始vue',content:'vue的生命周期'});
    let blogs = await this.ctx.model.Blog.find()
    const { ctx } = this;
    await this.ctx.render('home/index/index.nj',{list:blogs});
  }
  async edit() {

    // let a = await this.ctx.model.Test.find({},res=>{})

    // console.log(a)
    
    const { ctx } = this;
    console.log(this)
    await this.ctx.render('home/edit/index.nj');
  }
  async detail() {

    // let a = await this.ctx.model.Test.find({},res=>{})

    // console.log(a)
    
    const { ctx } = this;
    console.log(this)
    await this.ctx.render('home/detail/index.nj');
  }
}

module.exports = HomeController;

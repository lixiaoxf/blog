'use strict';
const jwt = require('jsonwebtoken')
const Controller = require('egg').Controller;
class HomeController extends Controller {
  async index() {
    let blogs = await this.ctx.model.Blog.find()
    const { ctx } = this;
    await this.ctx.render('home/index/index.nj',{list:blogs},{ expiresIn: 3600});
  }
  async addBlog() {

    // let a = await this.ctx.model.Test.find({},res=>{})

    // console.log(a)
    
    const { ctx } = this;
    
    await this.ctx.render('home/edit/index.nj');
  }
  async edit() {

    // let a = await this.ctx.model.Test.find({},res=>{})

    // console.log(a)
    
    const { ctx } = this;
    let id = ctx.params.id;
    let blog = await this.ctx.model.Blog.update({ _id: id },{title:'vuehahahah'})
    
    await this.ctx.render('home/edit/index.nj',{ blog });
  }
  async detail() {

    // let a = await this.ctx.model.Test.find({},res=>{})

    // console.log(a)
    
    const { ctx } = this;
    let id = ctx.params.id;
    let blog = await this.ctx.model.Blog.findOne({ _id: id })
    await this.ctx.render('home/detail/index.nj',{ blog });
  }
  async createBlog() {

    
    await this.ctx.render('home/edit/index.nj');
  }
}

module.exports = HomeController;

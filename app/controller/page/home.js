'use strict';
const jwt = require('jsonwebtoken')
const Controller = require('egg').Controller;
class HomeController extends Controller {
  async index() {
    let blogs = await this.ctx.model.Blog.find()
    const { ctx } = this;
    let formatBlogs = blogs.map(item => {
      let createData = item.created
      item.createTime = `${createData.getFullYear()}年${createData.getMonth()+1}月${createData.getDate()}日`;
    })
    // let tagsBlog = await this.ctx.model.Blog.find({labels:{'$all':['vue']}})
    
    console.log(this.ctx);
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
    console.log(blog);
    await this.ctx.render('home/detail/index.nj',{ blog });
  }
  async createBlog() {

    
    await this.ctx.render('home/edit/index.nj');
  }
}

module.exports = HomeController;

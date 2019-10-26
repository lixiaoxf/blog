'use strict';
const jwt = require('jsonwebtoken')
const Controller = require('egg').Controller;
class HomeController extends Controller {
  async index() {

    // let a = await this.ctx.model.Blog.create({title:'vue2',des:'开始vue2',content:'vue的生命周期hhha'});
    let blogs = await this.ctx.model.Blog.find()
    let a = jwt.sign({
      name:'lixiao',
      id:'12321'
    },'lixiaobloghas')
    console.log(a)
    let b = jwt.verify(a, 'lixiaobloghas');
    console.log(b)
    const { ctx } = this;
    await this.ctx.render('home/index/index.nj',{list:blogs},{ expiresIn: 3600});
  }
  async edit() {

    // let a = await this.ctx.model.Test.find({},res=>{})

    // console.log(a)
    
    const { ctx } = this;
    let id = ctx.params.id;
    let blog = await this.ctx.model.Blog.update({ _id: id },{title:'vuehahahah'})
    console.log(blog)
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
}

module.exports = HomeController;

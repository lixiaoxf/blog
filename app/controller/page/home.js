'use strict';
const Controller = require('egg').Controller;
class HomeController extends Controller {
  async index() {

    let a = await this.ctx.model.Test.find({});
    console.log(a)
    const { ctx } = this;
    console.log(this)
    await this.ctx.render('home/index/index.nj',{list:['adf','adf22','bb','asfdff333','cvzv55']});
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

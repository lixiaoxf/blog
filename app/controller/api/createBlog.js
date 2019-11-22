

const Controller = require('egg').Controller;

class ApiController extends Controller {
  constructor(ctx) {
    super(ctx);  
  }
  async index() {
    const { ctx } = this;
    console.log(ctx.request.body)
    let blog = await this.ctx.model.Blog.create({
        title:ctx.request.body.title,
        content:ctx.request.body.content,
        desc:ctx.request.body.desc,
        labels:ctx.request.body.labels
    })
    // let tgroup = await this.ctx.model.Blog.aggregate([
    //   {$unwind:"$labels"},
    //   {$group:{_id:"$labels",num_of_tag:{$sum:1}}}
    // ])
    console.log(tgroup)
    ctx.body = {
        error:0,
        data:''
    }
  }
}

module.exports = ApiController;



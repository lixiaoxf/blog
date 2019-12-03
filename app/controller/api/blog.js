

const Controller = require('egg').Controller;

class ApiController extends Controller {
  constructor(ctx) {
    super(ctx);  
  }
  async create() {
    const { ctx } = this;
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
    ctx.body = {
        error:0,
        data:''
    }
  }
  async update(){
    const { ctx } = this;
    
    let blog = await this.ctx.model.Blog.update({ _id: ctx.params.id },{
      title:ctx.request.body.title,
      content:ctx.request.body.content,
      desc:ctx.request.body.desc,
      labels:ctx.request.body.labels
  })

    ctx.body = {
        error:0,
        data:''
    }
  }
  async index() {
    const { ctx } = this;
    if(!ctx.params.id){
        ctx.body = {
            error:0,
            data:null
        }
        return ;
    }
    let blog = await this.ctx.model.Blog.findOne({ _id: ctx.params.id })
    ctx.body = {
        error:0,
        data:blog
    }
  }
}

module.exports = ApiController;



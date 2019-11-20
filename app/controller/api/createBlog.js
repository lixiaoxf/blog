

const Controller = require('egg').Controller;

function formatSaveData(body){
  let reg = /<p><\/p>/g
}

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
    console.log(blog)
    ctx.body = {
        error:0,
        data:''
    }
  }
}

module.exports = ApiController;



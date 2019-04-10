

const Controller = require('egg').Controller;

class ApiController extends Controller {
  constructor(ctx) {
    super(ctx);  
  }
  async index() {
    const { ctx } = this;
    const { list } = await ctx.service.video.getData()
    ctx.body = {
        error:0,
        data:list
    }
  }
}

module.exports = ApiController;



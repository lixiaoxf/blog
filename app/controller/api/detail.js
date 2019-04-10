

const Controller = require('egg').Controller;

class ApiController extends Controller {
  constructor(ctx) {
    super(ctx);  
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
    const { data } = await ctx.service.video.getDetail(ctx.params.id);
    ctx.body = {
        error:0,
        data
    }
  }
}

module.exports = ApiController;



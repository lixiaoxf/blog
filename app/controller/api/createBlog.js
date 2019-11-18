

const Controller = require('egg').Controller;

class ApiController extends Controller {
  constructor(ctx) {
    super(ctx);  
  }
  async index() {
    const { ctx } = this;
    console.log(ctx.request.body)
    ctx.body = {
        error:0,
        data:''
    }
  }
}

module.exports = ApiController;



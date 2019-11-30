

const Controller = require('egg').Controller;

const jwt = require('jsonwebtoken')

class ApiController extends Controller {
  constructor(ctx) {
    super(ctx);  
  }
  async login() {

    const { ctx, service } = this;

    const loginUser = ctx.request.body

    if(!loginUser){
        return {
            error:'3',
            data:'用户登录信息错误'
        }
    }

    let { error, data } = await service.auth.login(loginUser)
    
    ctx.body = {
        error,
        data
    }
    
  }
  async register() {
    const { ctx } = this;
    
    let res = await this.ctx.model.User.find({

        name:ctx.request.body.name

    })

    if(res.length==0){

        let res = await this.ctx.model.User.create({

            name:ctx.request.body.name,

            password:ctx.request.body.password

        })

        ctx.body = {

            error:0,

            msg:"注册成功"
        }
    }else{

        ctx.body = {

            error:1,

            msg:"用户名已使用"
        }
    }
  }
}

module.exports = ApiController;



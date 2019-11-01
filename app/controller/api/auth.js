

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken')

class ApiController extends Controller {
  constructor(ctx) {
    super(ctx);  
  }
  async login() {
    const { ctx } = this;
    
    let res = await this.ctx.model.User.find({
        name:ctx.request.body.name
    })
    let curUser = res[0];
    let reqUser = ctx.request.body;
    if(
        curUser && reqUser.name == curUser.name && 
        reqUser.password == curUser.password
    ){ 
        let token = jwt.sign({
            id:curUser._id,
            name: reqUser.name,
            password: reqUser.password
          },ctx.app.config.tokenKey); 

        let res = await this.ctx.model.Token.findOneAndUpdate({
            uid:curUser._id,
            token:token
        })
        
        if(!res){
            let res = await this.ctx.model.Token.create({
                uid:curUser._id,
                token:token
            })
        }
        
        ctx.cookies.set('token',token,{
            maxAge:1000*3600*24*7,
            signed:true,
            encrypt:true
        });  
        
        ctx.body = {
            error:0,
            msg:"登陆成功"
        }  
    }else{
        ctx.body = {
            error:1,
            msg:"用户名或密码错误"
        }
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



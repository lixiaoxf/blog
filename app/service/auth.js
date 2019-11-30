const jwt = require('jsonwebtoken')

const Service = require('egg').Service;

class AuthService extends Service {

    async checkUserPassword(reqUser){
       
        if( !reqUser ){

            return {
                error:1,
                data:'账号或密码错误'
            };
        }

        let res = await this.ctx.model.User.find({

            name:reqUser.name
        })

        let findUser = res[0];

        if(

            findUser && reqUser.name == findUser.name && 

            reqUser.password == findUser.password
        ){ 
            
            return {

                error:0,

                data:findUser
            };

        } else {

            return {
                error:1,
                data:'账号或密码错误'
            };

        }
       
    }

    async login(reqUser){

        let timeout = 60*60*24;

        let {error, data: dbUser}  = await this.checkUserPassword(reqUser)
        
        if(error){
            return {
                error:1,

                data:'账号密码错误'
            };
        }
        
        let token = jwt.sign({

            id:dbUser._id,

            name: reqUser.name,

            password: reqUser.password

          },this.ctx.app.config.tokenKey, { expiresIn: timeout }); 

        let res = await this.ctx.model.Token.findOneAndUpdate({

            uid:dbUser._id,

            token:token
        })
       
        if( !res ){
            
            let res = await this.ctx.model.Token.create({

                uid:dbUser._id,

                token:token
            })
        }
        
        this.ctx.cookies.set('token',token,{

            maxAge:1000*timeout,

            signed:true,

            encrypt:true
        }); 
        
        return {
            error:0,
            data:'登录成功'
        }
    }

    async checkToken(){
        
        const { ctx } = this

        let cookieToken = ctx.cookies.get('token',{

            encrypt:true,

            signed:true,

        });
        
        if(!cookieToken){
           
            return {

                error:2,

                data:'用户未登陆'

            }
        }
        
        try{

            let tokenMsg = jwt.verify(cookieToken, ctx.app.config.tokenKey);

            if(!tokenMsg){

                return {

                    error:2,

                    data:'用户未登陆'
                }
            }
            
            let cacheToken = await ctx.model.Token.findOne({uid:tokenMsg.id})
    
            if( cacheToken.token == cookieToken ){
    
                return {

                    error:0,

                    data:'登录成功'

                };
    
            }else{

                return {

                    error:4,

                    data:'未知登录错误'

                };

            }

        }catch(e){

            return {
                
                error:3,

                data:'登录过期从新登录'

            };

        }
    }
}

module.exports = AuthService
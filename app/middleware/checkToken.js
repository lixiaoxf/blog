const jwt = require('jsonwebtoken')
module.exports = options => {
    return async function checkToken(ctx, next) {
        
        let cookieToken = ctx.cookies.get('token',{
            encrypt:true,
            signed:true,
        });

        let tokenMsg = jwt.verify(cookieToken, ctx.app.config.tokenKey);

        let cacheToken = await ctx.model.Token.findOne({uid:tokenMsg.id})
           
        if(cacheToken.token == cookieToken){
            await next();    
        }else{
            ctx.body = {
                error:1,
                msg:'用户未登录'
            }
        }

        
    };
  };
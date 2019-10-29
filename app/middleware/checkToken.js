const jwt = require('jsonwebtoken')
module.exports = options => {
    return async function checkToken(ctx, next) {
        
        let scrToken = ctx.cookies.get('token',{
            encrypt:true,
            signed:true,
        });
        let tokenMsg = jwt.verify(scrToken, ctx.app.config.tokenKey);
        let tokenMap = ctx.model.Token.find({uid:tokenMsg.id})
        console.log(tokenMap.token == scrToken)
        await next();
    };
  };
const urls = [
    '/v/api/'
]
function isAuthUrl(url){

    return urls.some(item => {

        if(url.indexOf(item)>-1){

            return true;

        }else {

            return false;

        }
    })
}
module.exports = options => {

    return async function checkToken(ctx, next) {
       
        if(!isAuthUrl(ctx.request.url)){

            await next()

            return ;
        }

        let { error, data } = await ctx.service.auth.checkToken();
        
        if( error == 0 ){

            await next(); 
            
        }else{

            ctx.body = {

                error,

                data

            }

        }

        
    };
};
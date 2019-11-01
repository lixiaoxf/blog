const urls = [
    '/api/'
]
module.exports = function(url){
    return urls.some(item => {
        if(url.indexOf(item)>-1){
            return true;
        }else {
            return false;
        }
    })
}
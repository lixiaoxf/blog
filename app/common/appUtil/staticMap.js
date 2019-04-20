let cache = {}
const fs = require('fs')
const staticName = function(name){
    return cache[name] || null
}
module.exports = {
    loadManifest:{
        staticName,
        init(url){
            return new Promise((resolve,reject)=>{
                try{
                    let readStream = fs.createReadStream(url)
                    readStream.on('data',(file)=>{
                        cache = JSON.parse(file.toString())
                        resolve()
                    })
                }catch(e){
                    reject(e)
                    throw 'map static fail'
                }
            })


        }
    }
};
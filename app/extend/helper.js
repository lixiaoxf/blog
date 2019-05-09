
module.exports = {
    staticMap(){
        console.log(process.env.WEB_V)
        let m = require(`${process.cwd()}/webpack-config/mod.js`)
        console.log(m.getVStr())
    }
}
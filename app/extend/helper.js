const path = require('path')
module.exports = {
    includeView(file){
        return path.resolve(this.ctx.app.baseView,file)
    }
}
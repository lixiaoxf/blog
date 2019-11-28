import $ from 'jquery';
import Editor from 'wangeditor';
function getDesc(body){
    let reg = /<p>(.*?)<\/p>/g
    let ptags = body.match(reg);
    let resArr = []
    for(var i = 0; i < 3; i++){
        var item = ptags[i];
        item?resArr.push(item):'';
    }
    return resArr.join('')
  }
function getBlogId(){
    var url = window.location.href;
    var reg = /\/edit\/(\w+)/g;
    if(reg.test(url)){
        return RegExp.$1
    }else{
        return null
    }
}  
var api = {
    createBlog(postData){
        return $.ajax({
            url:'/v/api/createBlog',
            method:'post',
            data:postData,
            success(res){
                console.log(res)
            }
        })
    },
    updateBlog(id,postData){
        return $.ajax({
            url:'/v/api/updateBlog/'+id,
            method:'post',
            data:postData,
            success(res){
                console.log(res)
            }
        })
    },
    getBlog(id){
        return $.ajax({
            url:'/v/api/getBlog/'+id,
            method:'get'
        })
    }
}

var blogId = getBlogId();

var initData = {
    init(edit){
        
        this.editor = edit;
        if(blogId&&edit){
            api.getBlog(blogId).done(res => {
                if(res.error == 0){
                    this.initEditPage(res.data)
                }
                
            })
        }
    },
    initEditPage(data){
        console.log(data);
        $('#labels').val(data.labels.join(','))
        this.editor.txt.html($(data.content).html())
    },
    
}  
var edit = {
    init(){
        this.editor = new Editor('#editor')
        this.editor.create();
        this.initEvt();
    },
    initEvt(){
        $('#save').on('click',()=>{
            var labels = $("#labels").val();
            var htmlContent = this.editor.txt.html();
            var editorJSON = this.editor.txt.getJSON();
            var title = ''
            for(var i = 0; i<editorJSON.length; i++){
                var item = editorJSON[i];
                if(item.tag == 'h1'){
                    title = item.children[0];
                    break;
                }
            }
            var postData = {
                title:title,
                labels:labels.split(','),
                desc:getDesc(htmlContent),
                content:'<div class="site-text">'+htmlContent+'</div>'
            }
            if(blogId){
                api.updateBlog(blogId,postData)
            }else{
                api.createBlog(postData)
            }
            
            
        })
    }
}
function init(){
    edit.init();
    initData.init(edit.editor)
}
init()



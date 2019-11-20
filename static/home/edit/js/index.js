import $ from 'jquery';
import Editor from 'wangEditor';
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

$(function(){
    var editor = new Editor('#editor')
    editor.create();
    $('#save').on('click',function(){
        var labels = $("#labels").val();
        var htmlContent = editor.txt.html();
        var editorJSON = editor.txt.getJSON();
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
            labels:labels,
            desc:getDesc(htmlContent),
            content:'<div class="site-text">'+htmlContent+'</div>'
        }
        $.ajax({
            url:'/v/api/createBlog',
            method:'post',
            data:postData,
            success(res){
                console.log(res)
            }
        })
    })
})
import $ from 'jquery';
import Editor from 'wangEditor';

$(function(){
    var editor = new Editor('#editor')
    editor.create();
    $('#save').on('click',function(){
        var labels = $("#labels").val();
        var postData = {
            labels:labels,
            content:'<div class="site-text">'+editor.txt.html()+'</div>'
        }
        $.ajax({
            url:'/v/api/createBlog',
            method:'post',
            data:postData,
            success(res){
                console.log(res)
            }
        })
        console.log(postData)
    })
})
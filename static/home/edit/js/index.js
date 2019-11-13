import $ from 'jquery';
import Editor from 'wangeditor'
var editor = new Editor('#editor')
editor.create()
$('#save').on('click',function(){
    $('#outMsg').html(editor.txt.html())
})
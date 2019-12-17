import $ from 'jquery';
var card = {
    'init':function(){
        $('.blog-list-card').on('click','[blog-delete]',function(){
            var id = $(this).attr('blog-delete')
            $.ajax({
                url:'/v/api/deleteBlog/'+id,
                type:'post'
            }).done(function(res){
                if(res.error==0){
                    location.href = '/'
                }
            })
        })
    }
}
card.init();
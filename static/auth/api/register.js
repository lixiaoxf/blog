import $ from 'jquery'
export default {
    register(data){
        return $.ajax({
            url:'/api/register',
            type:'post',
            data:data
        })
    }
}
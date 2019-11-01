import $ from 'jquery'
export default {
    login(data){
        return $.ajax({
            url:'/api/login',
            type:'post',
            data:data
        })
    }
}
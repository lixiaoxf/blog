import $ from 'jquery'
export default {
    login(data){
        return $.ajax({
            url:'/api/login?name=213&fs=233',
            type:'post',
            data:data
        })
    }
}
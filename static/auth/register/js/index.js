import $ from 'jquery'
import api from '@/auth/api/register'
$(function(){
    $('#btn').on('click',function(){
        let name = $('#name').val();
        let password = $('#password').val();
        api.register({
            'name':name,
            'password':password
        }).then(res=>{
            console.log(res)
        })
    })
})
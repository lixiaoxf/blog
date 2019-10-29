import $ from 'jquery'
import api from '@/auth/api/login'
$(function(){
    $('#btn').on('click',function(){
        let name = $('#name').val();
        let password = $('#password').val();
        api.login({
            'name':name,
            'password':password
        }).then(res=>{
            console.log(res)
        })
    })
})


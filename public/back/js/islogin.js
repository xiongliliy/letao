//判断用户是否是登录状态 如果是登录 直接进入页面 如果未登录 跳转到登录页面
$.ajax({
    type:"get",
    url:"/employee/checkRootLogin",
    dataType:"json",
    success:function(info){
        if(info.error == "400"){
            location.href = "login.html";
        }
    }
})
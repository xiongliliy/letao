//ajax全局事件
$(document).ajaxStart(function(){
    NProgress.start();
})
$(document).ajaxStop(function(){
    setTimeout(function(){
        NProgress.done();
    },500)
    
})
//点击退出按钮
$(function(){
    //点击退出按钮
    $('.icon_out').on('click',function(){
        $('#myModal').modal('show');
    })

    $(".loginBtn").on('click',function(){
        $.ajax({
            type:"get",
            url:"/employee/employeeLogout",
            dataType:"json",
            success:function(info){
                if(info.success){
                    location.href = "login.html";
                }
            }
        })
    })


    //点击菜单按钮
    $(".icon_menu").on('click',function(){
        $(".lt_aside").toggleClass("hidemenu");
        $(".lt_main").toggleClass("hidemenu");
        $(".lt_toopbar").toggleClass("hidemenu");
    })

    $(".category").on('click',function(){
        $(this).next().stop().slideToggle();
    })
})
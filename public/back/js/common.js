//ajax 全局事件 ajaxStart()  ajaxStop
$(document).ajaxStart(function(){
    NProgress.start();
  
})
$(document).ajaxStop(function(){
    NProgress.done();
})


$(function(){
   // 三个功能需要实现
   //1.分类管理二级菜单的显示与隐藏
   $(".lt_aside .category").click(function(){
    $(this).next().stop().slideToggle();
   })
   //2.点击主体左侧menu 菜单小图标 侧边栏左移 并且main部分变大
   $(".icon_menu").on("click",function(){
       $(".lt_aside").toggleClass('hidemenu');
       $(".lt_main").toggleClass('hidemenu');
       $(".lt_main .lt_toopbar").toggleClass('hidemenu');
   })
   //3.点击右侧退出小图标,弹出模态框,点击退出然后发送ajax 请求像后台发送数据,删除登录记录
   $(".logoutBtn").on('click',function(){
      
    $('#myModal').modal('show');
   })

   $("#btnLogout").on('click',function(){
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
})
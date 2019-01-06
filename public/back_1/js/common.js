$(document).ajaxStart(function() {
    // 开启进度条
    NProgress.start();
  })
  $(document).ajaxStop(function() {
    // 模拟网络延迟
    setTimeout(function() {
      // 结束进度条
      NProgress.done();
    }, 500)
  })
  



$(function(){

  //点击菜单事件
  $(".icon_menu").on("click",function(){
      $(".lt_aside").toggleClass("current");
      $(".lt_main").toggleClass("current");
      $(".lt_toopbar").toggleClass("current");
  })


  //点击分类管理 切换显示或者隐藏
  $(".category").on("click",function(){
      $(this).next().stop().slideToggle();
  })



 //点击退出按钮,弹出模态框
 $(".icon_out").on("click",function(){
    $('#myModal').modal('show');
 });

 $(".logoutBtn").on("click",function(){
    
     $.ajax({
         type:'get',
         url:"/employee/employeeLogout",
         dataType:"json",
         success:function(info){
             if(info.success){
                 location.href="login.html";
             }
         }
        
        
        })
 })
})
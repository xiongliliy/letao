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
 //进度条控制
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
 //图表的配置
 var myChart = echarts.init(document.querySelector('.echarts_left'));

 // 指定图表的配置项和数据
 var option = {
     title: {
         text: '2019销量状况'
     },
     tooltip: {},
     legend: {
         data:['销量']
     },
     xAxis: {
         data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
     },
     yAxis: {},
     series: [{
         name: '销量',
         type: 'bar',
         data: [5, 20, 36, 10, 10, 20]
     }]
 };

 // 使用刚指定的配置项和数据显示图表。
 myChart.setOption(option);
})
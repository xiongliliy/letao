$(function(){

    var currentPage = 1;
    var pageSize = 5;
    var currentId;
    var isDelete;
  
 //发送ajax 请求 渲染页面
 render();

 function render(){
    $.ajax({
        type:'get',
        url:"/user/queryUser",
        data:{
            page : currentPage,
            pageSize : pageSize
        },
        dataType:"json",
        success:function(info){
            var htmlstr = template("userTpl",info);
            $("tbody").html(htmlstr);
            //处理分页的逻辑
            $(".paginator").bootstrapPaginator({
                bootstrapMajorVersion:3 ,
                //显示高亮的页面
                currentPage:info.page,
                totalPages: Math.ceil(info.total / 5),

                //为按钮绑定点击事件
                onPageClicked:function(a,b,c,page){
                    currentPage = page;
                    //重新渲染页面
                    render();
                }

            })   
        }
      })
    }
  //点击禁用启用按钮 弹出模态框 给tbody 注册事件 tr td 是动态渲染的 需要事件委托
  $('tbody').on('click','.btn',function(){
      $("#updateModal").modal('show');
      currentId = $(this).parent().data("id");
      isDelete = $(this).hasClass('btn-danger') ? 0 : 1;
     
  })
  //点击模态框的确认按钮 发送ajax 请求 更改当前状态
  $('.updateBtn').on('click',function(){

      $.ajax({
          type:"post",
          url:"/user/updateUser",
          dataType:"json",
          data:{
              id : currentId,
              isDelete : isDelete,
          },
          success:function(info){
             //关闭模态框
             $("#updateModal").modal('hide'); 
             //重新渲染页面
             render();
          }
      })
     
  })
})
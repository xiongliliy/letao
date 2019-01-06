$(function(){
 
    var currentPage = 1;
    var pageSize = 5;

  render();

   function render(){
     $.ajax({
        type:"get",
        url:"/category/querySecondCategoryPaging",
        data:{
            page : currentPage,
            pageSize: pageSize
        },
        dataType:"json",
        success:function(info){
            console.log(info);
         var htmlstr = template("secondTpl",info);
         $('tbody').html(htmlstr);

          //分页渲染
          $(".paginator").bootstrapPaginator({
          //设置对应的版本
             bootstrapMajorVersion:3,
             currentPage : info.page,
             totalPages : Math.ceil(info.total/5),
             //为按钮注册点击事件
             onPageClicked:function(a,b,c,page){
                
                currentPage = page;
                
                render();
             }

    
          })

        }


     })
   }
 
   //点击添加分类 显示模态框
   $("#addCategory").on("click",function(){
       $("#addModal").modal('show');
       //为了客户体验,在点击添加分类 显示模态框的时候,发送ajax请求 分类的数据
       $.ajax({
         type:"get",
         url:"/category/queryTopCategoryPaging",
         data:{
           page:1,
           pageSize:100  
         },
         dataType:"json",
         success:function(info){
             console.log(info);
             var htmlstr = template("menuTpl",info);
             $(".dropdown-menu").html(htmlstr);
         }
      })

   })

   //注册事件委托
   $(".dropdown-menu").on('click','a',function(){
       var txt = $(this).text();
       $(".dropdown .categoryText").text(txt);
   })
 
 //配置fileUpload 进行初始化
 $("#fileUpload").fileupload({
     dataType:"json",
     done:function(e,data){

      
        var src = data.result.picAddr;
        $("#imgBox img").attr('src',src);
     }

    })

})
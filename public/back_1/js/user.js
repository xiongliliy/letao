$(function(){
  var currentPage = 1;
  var pageSize = 5;
  var currentId ;
  var isDelete;
   render();

   function render(){
    $.ajax({
        type:"get",
        url:"/user/queryUser",
        data:{
            page:currentPage,
            pageSize:pageSize
        },
        dataType:"json",
        success:function(info){
            var htmlstr = template("userTpl",info);
            $("tbody").html(htmlstr);
     
            $(".paginator").bootstrapPaginator({
               bootstrapMajorVersion:3,
               currentPage : info.page,
               totalPages : Math.ceil(info.total / 5),

               onPageClicked:function(a,b,c,page){
                   currentPage = page;
                   render();
               }
            })
        }
     
       })
     
   }

   $('tbody').on('click','.btn',function(){
     $("#updateModal").modal('show');
     currentId = $(this).parent().data('id');
     isDelete = $(this).hasClass('btn-danger')? 0 : 1;
   })

   $(".updateBtn").on('click',function(){
      $.ajax({
          type : 'post',
          url : '/user/updateUser',
          data : {
              id : currentId ,
              isDelete : isDelete
          },
          dataType :"json",
          success:function(info){
             if(info.success){
                $("#updateModal").modal('hide');  
                render();
             }

          }
      })


   })












})
$(function(){
 
var currentPage = 1;
var pageSize = 5;
render()
function render(){
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      data:{
          page:currentPage,
          pageSize : pageSize
      },

      dataType:"json",
      success:function(info){
          var htmlstr = template("secondTpl",info);
          $("tbody").html(htmlstr);

          $(".paginator").bootstrapPaginator({
            bootstrapMajorVersion:3,
            currentPage : info.page,
            totalPages : Math.ceil(info.total/5),
            onPageClicked:function(a,b,c,page){
                currentPage = page;
                render();
            }
          })
      }


    })
}

//点击添加分类 弹出模态框
$('.secondAdd').on('click',function(){
    $("#secondModal").modal('show');

    $.ajax({
       type:"get",
       url:"/category/queryTopCategoryPaging" ,
       data:{
           page:1,
           pageSize:100,
       },
       dataType:"json",
       success:function(info){
          var  htmlstr = template("cateTpl",info);
          $(".dropdown-menu").html(htmlstr);
           
       }
    })
})

$(".dropdown-menu").on('click','a',function(){
    var txt = $(this).text();
    $('.dropdown .textadd').text(txt);
})

$("#fileupload").fileupload({
    dataType : "json",
    done:function(e,data){
    //    console.log(data);
     var src = data.result.picAddr;
     $('.imgBox img').attr('src',src);
    }
})






})
$(function(){

    var currentPage = 1;
    var pageSize = 5;

    render();

  function render(){
    $.ajax({

        type:"get",
        url:"/category/queryTopCategoryPaging",
        data:{
            page:currentPage,
            pageSize:pageSize,
        },
        dataType:"json",
        success:function(info){
            console.log(info);
            var htmlstr = template("firstTpl",info);
            $('tbody').html(htmlstr);
           $(".paginator").bootstrapPaginator({
              bootstrapMajorVersion : 3,
              currentPage : info.page,
              totalPages : Math.ceil(info.total / 5),
              onPageClicked:function(a,b,c,page){
                //记录此时的页码
                  currentPage = page;
                //重新渲染页面
                render();
              }
           })
    
        }
    
      })
  }
 
//点击添加分类,弹出模态框
$("#addCategory").on('click',function(){
   $('#addModal').modal('show');
})

  $("#form").bootstrapValidator({
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
     fields:{
        categoryName:{
            validators:{
                notEmpty:{
                    message:"请填写一级分类名"
                }
            }
        } 
     }

  })

  //注册表单校验成功事件
  $("#form").on('success.form.bv',function(e){
     e.preventDefault(); 
    $.ajax({
        type:"post",
        url:"/category/addTopCategory",
        data:$("#form").serialize(),
        dataType:"json",
        success:function(info){
           if(info.success){
            $('#addModal').modal('hide'); 
            currentPage = 1;
            render();
            //重置表单内容
            
            $("#form").data('bootstrapValidator').resetForm(true);
           } 
        }
    })
    
  })








})
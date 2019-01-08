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
            // console.log(info);
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
            //  console.log(info);
             var htmlstr = template("menuTpl",info);
             $(".dropdown-menu").html(htmlstr);
         }
      })

   })

   //注册事件委托
   $(".dropdown-menu").on('click','a',function(){
       var txt = $(this).text();
       $(".dropdown .categoryText").text(txt);

       var id = $(this).data("id");
       $("[name='categoryId']").val(id);

      //  由于已经对隐藏域赋值,所以要将状态改为成功
      $("#form").data("bootstrapValidator").updateStatus('categoryId','VALID');
     
      

   })
 
 //配置fileUpload 进行初始化
 $("#fileUpload").fileupload({
     dataType:"json",
     done:function(e,data){

      
        var src = data.result.picAddr;
        $("#imgBox img").attr('src',src);
         $('[name="brandLogo"]').val(src); 
         $("#form").data("bootstrapValidator").updateStatus('brandLogo','VALID');
     }

    })

     
    // 表单验证
    $("#form").bootstrapValidator({

        excluded: [],

        // 配置图标
        feedbackIcons: {
          valid: 'glyphicon glyphicon-ok',    // 校验成功
          invalid: 'glyphicon glyphicon-remove',   // 校验失败
          validating: 'glyphicon glyphicon-refresh'  // 校验中
        },
        fields: {
            categoryId: {
              validators: {
                notEmpty: {
                  message: "请选择一级分类"
                }
              }
            },
            brandName: {
              validators: {
                notEmpty: {
                  message: "请输入二级分类名称"
                }
              }
            },
            brandLogo: {
              validators: {
                notEmpty: {
                  message: "请上传图片"
                }
              }
            }
          }



    })

     $("#form").on('success.form.bv',function(e){
       e.preventDefault();
       $.ajax({
         type:"post",
         url:"/category/addSecondCategory",
         data:$("#form").serialize(),
         dataType:"json",
         success:function(info){
           if(info.success){
             $("#addModal").modal('hide');
             currentPage = 1;
             render();

             //添加成功,将表单所有内容重置
             $("#form").data('bootstrapValidator').resetForm(true);
             //由于下拉菜单里面得 及 图片 不是form表单元素 所以要单独重置一下
             $(".categoryText").text("请选择一级分类");
             $('#imgBox img').attr("src", "./images/default.png");
           }
         }
       })

     })

})
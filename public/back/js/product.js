$(function(){
   
   var  currentPage = 1;
   var pageSize = 2;
   var picArr =[];
   render();
   function render(){
     $.ajax({
        type:'get' ,
        url:"/product/queryProductDetailList",
        data:{
            page:currentPage,
            pageSize:pageSize
        },
        dataType:"json",
        success:function(info){
            // console.log(info);
            var htmlstr = template("productTpl",info);
            $("tbody").html(htmlstr);
           $(".paginator").bootstrapPaginator({
               bootstrapMajorVersion : 3,
               currentPage : info.page,
               totalPages : Math.ceil(info.total / info.size),
               onPageClicked:function(a,b,c,page){
                   currentPage = page;
                   render();
               }
           })
        }


     })

   }

//点击添加分类按钮 显示模块框
$("#addCategory").click(function(){
   $("#addModal").modal('show');
   $.ajax({
      type:'get',
      url:"/category/querySecondCategoryPaging",
      data:{
          page:1,
          pageSize:100
      },
      dataType:"json",
      success:function(info){
         
          var htmlstr = template("liTpl",info);
          $(".dropdown-menu").html(htmlstr);
      }

   })
})
   
//dropdown 区域点击设置内容
$(".dropdown-menu").on('click','a',function(){
    var txt = $(this).text();
    $(".categoryText").text(txt);
    var id = $(this).data("id");
   
    $('[name="brandId"]').val(id);
    $("#form").data('bootstrapValidator').updateStatus('brandId','VALID')
})
$("#fileUpload").fileupload({
    dataType :"json",
    done : function(e,data){
        var picUrl = data.result.picAddr;//返回的图片地址
       $("#imgBox").prepend(' <img  style="width: 100px" src="'+picUrl+'" alt="">')
       picArr.unshift(data.result);
      if(picArr.length > 3){
          picArr.pop();  //删除最后一张
          $('#imgBox img:last-of-type').remove();

      }
      if(picArr.length == 3){
        $('#form').data("bootstrapValidator").updateStatus("picStatus", "VALID");
      }
    }
    
})


$("#form").bootstrapValidator({
    excluded: [],

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',    // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },
    //配置校验字段
  // 配置校验字段
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品库存"
          },
          // 商品库存格式, 必须是非零开头的数字
          // 需要添加正则校验
          // 正则校验
          // 1,  11,  111,  1111, .....
          /*
          *   \d 表示数字 0-9
          *   +     表示出现1次或多次
          *   ?     表示出现0次或1次
          *   *     表示出现0次或多次
          *   {n}   表示出现 n 次
          *   {n,m} 表示出现 n 到 m 次
          * */
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存格式, 必须是非零开头的数字'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: "请输入商品尺码"
          },
          // 要求: 必须是 xx-xx 的格式, xx为两位的数字
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '必须是 xx-xx 的格式, xx为两位的数字, 例如: 36-44'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品现价"
          }
        }
      },
      picStatus: {
        validators: {
          notEmpty: {
            message: "请上传三张图片"
          }
        }
      }
    }
    
})


$("#form").on('success.form.bv',function(e){
 
    e.preventDefault();
    var pramarstr = $("#form").serialize();
    pramarstr += "&picArr=" + JSON.stringify(picArr);
     
    $.ajax({
        type:"post",
        url:"/product/addProduct",
        data:pramarstr,
        dataType :"json",
        success:function(info){
            if(info.success){
                $("#addModal").modal('hide');
                currentPage = 1;
                render();
                $("#form").data('bootstrapValidator').resetForm(true);
                $(".categoryText").text("请输入二级分类名称");
                $("#imgBox img").remove();
            }
        }
    })
})

})
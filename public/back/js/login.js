$(function(){
  $("#form").bootstrapValidator({

    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      //指定校验字段
      fields:{
          username:{
            validators:{
                  notEmpty:{
                      message:"用户名不能为空"
                  },
                //长度校验
                stringLength:{
                    min:2,
                    max:6,
                    message:"用户名长度必须2-6位"
                },
                //专门用于校验的提示信息
                callback:{
                    message:"用户名不存在"
                }
              }
          },

          password:{
              validators:{
                  notEmpty:{
                      message:"密码不能为空"
                  },
                  stringLength:{
                      min:6,
                      max:10,
                      message:"密码长度必须6-12位"
                  },

                  callback:{
                    message:"密码错误"
                }
              }
          }
          

      }
  })

  //点击登录发送ajax 请求,但是表单有一个默认的submit提交会跳转,所以需要禁用,如果改为button 提交后又不会清空里面的信息 所以会用到表校验里面的事件

  $("#form").on('success.form.bv',function(e){
     
      e.preventDefault();
      $.ajax({
          type:"post",
          url:"/employee/employeeLogin",
          data:$('#form').serialize(),
          dataType:'json',
          success:function(info){
             if(info.error=="1000"){
               $("#form").data('bootstrapValidator').updateStatus('username','INVALID','callback');
               return;
             } 
             if(info.error=="1001"){
                $("#form").data('bootstrapValidator').updateStatus('password','INVALID','callback');
                return;
             } 
             if(info.success){
                 location.href="index.html";
                 return;
             }
          
          }
      })
  })
 
  //重置功能,type="reset" 点击时已经将表单里面的内容重置,但是状态没有没有重置
  $('[type="reset"]').click(function(){
      $("#form").data('bootstrapValidator').resetForm();
  })


})
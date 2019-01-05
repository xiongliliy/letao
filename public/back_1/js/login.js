//完成表单校验
$(function () {
    $("#form").bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: "用户名不能空"
                    },
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: "用户名长度必须在2~6位"
                    },
                    callback: {
                        message: "用户名不存在"
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: "密码不能为空"
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: "密码长度必须在6~12位"
                    },
                    callback: {
                        message: "密码错误"
                    }
                }
            }
        }
    })

    //点击登录 发送ajax请求
    $("#form").on('success.form.bv', function (e) {
        //阻止浏览器的默认行为
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/employee/employeeLogin",
            data: $("#form").serialize(),
            dataType: "json",
            success: function (info) {
                if (info.error == "1000") {
                    $("#form").data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback')
                }
                if (info.error == "1001") {
                    $("#form").data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback')
                }
                if (info.success) {
                    location.href = "index.html";
                }
            }
        })
    })
    //点击重置按钮,重置表单的状态 submit 有自动清空内容的作用
    $('[type="reset"]').on('click',function(){
         $("#form").data('bootstrapValidator').resetForm();
    })
   
})
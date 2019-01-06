$(function () {

    var currentPage = 1;
    var pageSize = 5;

    render();

    function render() {
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function (info) {

                var htmlstr = template("firstTpl", info);
                $('tbody').html(htmlstr);

                $(".pahinator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: info.page,
                    totalPages: Math.ceil(info.total / 5),
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page;
                        render();
                    }

                })
            }





        })

    }

    //点击添加分类按钮 显示模态框
    $(".categoryAdd").on('click', function () {
        $("#categoryModal").modal('show');
    })
    //进行表单验证
    $("#form").bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            categoryName: {
                validators: {
                    notEmpty: {
                        message: "内容不能为空"
                    }
                }
            }
        },
    })

    $("#form").on('success.form.bv',function(e){
        e.preventDefault();
        $.ajax({
            type:"post",
            url:"/category/addTopCategory",
            data:$("#form").serialize(),
            dataType:"json",
            success:function(info){
               if(info.success){
                 //关闭模态框
                 $("#categoryModal").modal('hide');
                 $("#form").data('bootstrapValidator').resetForm(true);
                  render();
               }
            }
        })

    })

})
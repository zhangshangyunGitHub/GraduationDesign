<%--
  Created by IntelliJ IDEA.
  User: admin
  Date: 2019/3/19
  Time: 15:36
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>教材编辑</title>
</head>
<link href="layui/css/layui.css" rel="stylesheet">
<script src="layui/layui.js" type="text/javascript"></script>
<script src="js/jquery-3.2.1.min.js"></script>
<body>
    <div id="form_div" style="margin: 0 auto;width: 350px;height:auto">
        <div style="width: 300px; height: auto">
            <form class="layui-form" lay-filter="popurFilter" style="margin-top: 10px;" id="myForm">
                <div class="layui-form-item">
                    <label class="layui-form-label">教材名称</label>
                    <div class="layui-input-block">
                        <input type="text" id="bname" name="bname" placeholder="请输入..." autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">出版社</label>
                    <div class="layui-input-block">
                        <input type="text" id="publish" name="publish" placeholder="请输入..." autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">主编</label>
                    <div class="layui-input-block">
                        <input type="text" id="author" name="author" placeholder="请输入..." autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">价格</label>
                    <div class="layui-input-block">
                        <input type="text" id="price" name="price" placeholder="请输入..." autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">教材版本</label>
                    <div class="layui-input-block">
                        <input type="text" id="edition" name="edition" placeholder="请输入..." autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">教材类别</label>
                    <div class="layui-input-block">
                        <select name="category" id="categoryOption">
                            <option value=""></option>
                        </select>
                    </div>
                </div>
            </form>
        </div>
    </div>
<script>
    $(function () {
        loadCategory();
        //进入首页加载出所有的教材分类
        function loadCategory() {
            $.ajax({
                url:"/loadCategory.do",
                type:"get",
                success:function (data) {
                    var result=$.parseJSON(data);
                    var categoryList=result.categoryList;
                    var str='';
                    $.each(categoryList,function (i,o) {
                        str+='<option value="'+o.categoryId+'">'+o.categoryName+'</option>';
                    });
                    $("#categoryOption").append(str);
                }
            });
        }
    });
    layui.use('form',function () {
        var form=layui.form;
        form.render();
    })
</script>
</body>
</html>

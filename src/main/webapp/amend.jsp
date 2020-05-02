<%--
  Created by IntelliJ IDEA.
  User: admin
  Date: 2019/3/15
  Time: 15:20
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>个人信息修改</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Free HTML5 Template by FreeHTML5.co" />
    <meta name="keywords" content="free html5, free template, free bootstrap, html5, css3, mobile first, responsive" />
    <!-- Facebook and Twitter integration -->
    <meta property="og:title" content=""/>
    <meta property="og:image" content=""/>
    <meta property="og:url" content=""/>
    <meta property="og:site_name" content=""/>
    <meta property="og:description" content=""/>
    <meta name="twitter:title" content="" />
    <meta name="twitter:image" content="" />
    <meta name="twitter:url" content="" />
    <meta name="twitter:card" content="" />
    <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,700,300' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/animate.css">
    <link rel="stylesheet" href="css/style.css">
    <!-- Modernizr JS -->
    <script src="js/modernizr-2.6.2.min.js"></script>
    <!-- FOR IE9 below -->
    <!--[if lt IE 9]>
    <script src="js/respond.min.js"></script>
    <![endif]-->
    <link rel="stylesheet" href="layui/css/layui.css">
    <script src="js/jquery-3.2.1.min.js" type="text/javascript"></script>
    <script src="layui/layui.js"></script>
    <script src="js/amend.js"></script>

</head>
<style>
    .img{
        margin-left: 20px;
        width:50px;
        height:50px;
        border-radius: 50%;
    }
</style>
<body>
<div class="container">
    <div class="row">
        <div class="col-md-4 col-md-offset-4">
            <!-- 修改个人信息表单开始 -->
            <form enctype="multipart/form-data" method="post" id="myForm"
                  class="fh5co-form animate-box" data-animate-effect="fadeIn">
                <h2>个人信息修改</h2>
                <div class="form-group">
                    <label for="username">姓名</label>
                    <input type="text" class="form-control" id="username" name="username" autocomplete="off"
                           value="${user.username}">
                </div>
                <div class="form-group">
                    <label for="account">账号</label>
                    <input type="text" onblur="validateLength(this);validateNum(this)" class="form-control" id="account" name="account" autocomplete="off"
                    value="${user.account}">
                </div>
                <div class="form-group">
                    <label for="password">密码</label>
                    <input type="password" class="form-control" id="password" name="password" autocomplete="off"
                    value="${user.password}">
                </div>
                <div class="form-group">
                    <label for="img">头像</label>
                    <img src="${user.img}" class="img" id="img">
                    <input type="file" class="form-control" name="img" autocomplete="off" id="file" onchange="changeImg(this)">
                </div>
                <div class="form-group">
                    <input type="button" value="保 存" class="btn btn-primary" onclick="saveMsg()">
                    <input type="button" value="取 消" class="btn btn-primary" style="margin-left: 30px;"
                          <%-- style="margin-left:20px;background-color: #eeeeee;color:#555555;"--%> onclick="cancel()">
                </div>
            </form>
            <!-- 修改个人信息表单结束 -->
        </div>
    </div>
</div>
<script>
    layui.use([ 'layer'], function(){
        var layer=layui.layer;
    });
    /*验证输入的是否为数字*/
    function validateNum(obj){
        var val=obj.value;
        var id=obj.id;
        var object=$("#"+id+"");
        var name=object.prev().text();/*获取当前input框同级的prev的值*/
        if(isNaN(val)){
            layer.alert("“"+name+"”"+"只能输入数字！",{icon:5});
        }
    }
    /*输入账号的长度限制*/
    function validateLength(obj) {
        var val=obj.value;
        if(isNaN(val))
            return;
        if(val.length<=5 || val.length>=10){
            layer.alert("请输入6-9位的账号！",{icon:5});
        }
    }
</script>
<!-- jQuery -->
<script src="js/jquery-3.2.1.min.js"></script>
<!-- Bootstrap -->
<script src="js/bootstrap.min.js"></script>
<!-- Placeholder -->
<script src="js/jquery.placeholder.min.js"></script>
<!-- Waypoints -->
<script src="js/jquery.waypoints.min.js"></script>
<!-- Main JS -->
<script src="js/main.js"></script>
</body>
</html>

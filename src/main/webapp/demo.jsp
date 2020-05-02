<%--
  Created by IntelliJ IDEA.
  User: admin
  Date: 2019/3/25
  Time: 16:38
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<link href="layui/css/layui.css">
<script src="layui/layui.js"></script>
<script>
    layui.use('layer',function () {
        function test() {
            layer.alert(1);
        }
    });
</script>
<body>
<button onclick="test()" style="width: 50px;height: 30px;">测试</button>

</body>
</html>

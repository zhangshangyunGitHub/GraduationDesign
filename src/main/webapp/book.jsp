<%--
  Created by IntelliJ IDEA.
  User: admin
  Date: 2019/3/27
  Time: 14:06
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>书籍详情</title>
</head>
<%
Integer bid= Integer.valueOf(request.getParameter("bid"));
session.setAttribute("bid",bid);
%>
<body>
书籍详情页面
<input type="hidden" value="${bid}">
</body>
</html>

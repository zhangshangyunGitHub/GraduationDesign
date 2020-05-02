<%--
  Created by IntelliJ IDEA.
  User: admin
  Date: 2019/3/1
  Time: 14:49
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>首页</title>
</head>
<link rel="stylesheet" href="layui/css/layui.css">
<link rel="stylesheet" href="css/index.css">
<%--<script src="js/jquery-3.2.1.min.js" type="text/javascript"></script>--%>
<script src="layui/layui.js"></script>
<script src="js/index.js"></script>
<script src="js/jquery-3.2.1.min.js"></script>
<script src="js/common.js"></script>
<%
  String ContextPath=request.getContextPath();
  request.setAttribute("ContextPath",ContextPath);
%>
<body>
<div id="content">
    <div id="header" style="position:relative">
        <%--<img src="images/content.jpg" width="100%" height="100%">--%>
        <div id="logo">
            <div id="logo1">
                <img src="images/logo1.jpg" style="width: 100%;height: 80%;">
            </div>
            <div id="logo2">
                <img src="images/logo2.png" style="width: 100%;height: 35%;">
            </div>
            <div id="logo3">科学技术学院</div>
            <div id="logo4">教材征订管理系统</div>
        </div>
    </div>
    <div id="nav">
        <ul class="layui-nav">
            <li class="layui-nav-item layui-this" style="margin-left: 13%;">
                <a href="index.jsp"><span>首页</span></a>
            </li>
            <c:if test="${user.flag==1}">
            <li class="layui-nav-item">
                <a href="backstage.jsp"><span>后台管理</span></a>
            </li>
            </c:if>
            <li class="layui-nav-item" style="margin-left: 55%">
                <a href="javascript:void(0)"><img src="${user.img}" class="layui-nav-img">${user.username}</a>
                <dl class="layui-nav-child">
                    <dd><a href="amend.jsp">修改信息</a></dd>
                    <dd><a href="/exit.do">注销</a></dd>
                </dl>
            </li>
        </ul>
    </div>
    <div id="container">
        <div id="form_div">
            <fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
                <legend>常用教材搜索</legend>
            </fieldset>
            <form class="layui-form" style="margin-top: 10px;" id="myForm">
                <div class="layui-form-item">
                    <div class="layui-inline">
                        <label class="layui-form-label">教材名称</label>
                        <div class="layui-input-block">
                            <input type="text" id="bname" name="bname" placeholder="请输入..." autocomplete="off" class="layui-input">
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">教材版本号</label>
                        <div class="layui-input-block">
                            <input type="text" id="edition" name="edition" placeholder="请输入..." autocomplete="off" class="layui-input">
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">价格</label>
                        <div class="layui-input-block">
                            <input type="text" id="price" name="price" placeholder="请输入..." autocomplete="off" class="layui-input">
                        </div>
                    </div>
                </div>
                <div class="layui-form-item">
                    <div class="layui-inline">
                        <label class="layui-form-label">出版社</label>
                        <div class="layui-input-block">
                            <input  type="text" id="publish" name="publish" placeholder="请输入..." autocomplete="off" class="layui-input">
                        </div>
                    </div>
                    <div class="layui-inline">
                        <label class="layui-form-label">教材类别</label>
                        <div class="layui-input-block" style="width: 57%">
                            <select name="categoryId" id="categoryOption">
                                <option value=""></option>
                            </select>
                        </div>
                    </div>
                </div>
            </form>
            <div class="layui-inline" style="margin-bottom: 10px;">
                <div class="layui-input-block">
                    <button class="layui-btn" id="reload" data-type="reload">点击搜索</button>
                    <button type="reset" class="layui-btn layui-btn-primary" form="myForm">重置</button>
                </div>
            </div>
        </div>
        <div id="table_div">
            <fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
                <legend>教材数据展示</legend>
            </fieldset>
            <table id="MyTable" lay-filter="test"></table>
        </div>
    </div>
</div>
<%--点击表格中某行数据是弹出的表单--%>
<div id="apply_div" style="width: 700px;height: auto; margin: 0 auto; display: none;">
    <div id="apply_div_sub" style="width: 95%; height: auto; margin: 0 auto; margin: 20px 0 0 30px;">
        <form class="layui-form layui-form-pane" lay-filter="applyFilter" id="applyForm">
            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label">教材名称</label>
                    <div class="layui-input-inline">
                        <input type="text" readonly name="bname" id="bnamePop" autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">出版社</label>
                    <div class="layui-input-inline">
                        <input type="text" readonly name="publish" id="publishPop" autocomplete="off" class="layui-input">
                    </div>
                </div>
            </div>
            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label">主编</label>
                    <div class="layui-input-inline">
                        <input type="text" readonly name="author" id="authorPop" autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">价格</label>
                    <div class="layui-input-inline">
                        <input type="text" onblur="validateNum(this)" readonly name="price" id="pricePop" autocomplete="off" class="layui-input">
                    </div>
                </div>
            </div>
            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label">教材版本</label>
                    <div class="layui-input-inline">
                        <input type="text" readonly name="edition" id="editionPop" autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">教材库存</label>
                    <div class="layui-input-inline">
                        <input type="text" onblur="validateNum(this)" readonly name="inventory" id="inventoryPop" autocomplete="off" class="layui-input">
                    </div>
                </div>
            </div>
            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label">教材类别</label>
                    <div class="layui-input-inline">
                        <input type="hidden" name="categoryId" id="categoryIdPop" autocomplete="off" class="layui-input">
                        <input type="text" readonly name="categoryName" id="categoryNamePop" autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">ISBN</label>
                    <div class="layui-input-inline">
                        <input type="text" readonly name="isbn" id="isbnPop" autocomplete="off" class="layui-input">
                    </div>
                </div>
            </div>
            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label">所用课程</label>
                    <div class="layui-input-inline">
                        <select name="course" id="coursePop">
                            <option value=""></option>
                        </select>
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">申请数量</label>
                    <div class="layui-input-inline">
                        <input type="text" onblur="validateNum(this)" name="account" id="accountPop" autocomplete="off" class="layui-input">
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>
</body>
</html>

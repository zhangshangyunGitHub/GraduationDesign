<%--
  Created by IntelliJ IDEA.
  User: admin
  Date: 2019/3/18
  Time: 10:59
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>后台管理</title>
</head>
<style>
    .img{
        margin-left: 20px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
</style>
<link rel="stylesheet" href="layui/css/layui.css">
<link rel="stylesheet" href="css/backstage.css">
<script src="js/jquery-3.2.1.min.js"></script>
<script src="layui/layui.js"></script>
<script src="js/backstage.js"></script>
<script src="js/common.js"></script>

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
            <li class="layui-nav-item" style="margin-left: 13%;">
                <a href="index.jsp"><span>首页</span></a>
            </li>
            <li class="layui-nav-item layui-this">
                <a href="backstage.jsp"><span>后台管理</span></a>
            </li>
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
        <div class="layui-tab">
            <ul class="layui-tab-title">
                <li class="layui-this">教材管理</li>
                <li>用户管理</li>
                <li>申请审核</li>
            </ul>
            <div class="layui-tab-content">
                <div class="layui-tab-item layui-show">
                    <%--用于根据各种查询条件搜索（book）--%>
                    <div class="form_div">
                        <fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
                            <legend>常用教材搜索</legend>
                        </fieldset>
                        <form class="layui-form" style="margin-top: 10px;" id="bookForm">
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
                                <button class="layui-btn" id="bookReload" data-type="reload">点击搜索</button>
                                <button type="reset" class="layui-btn layui-btn-primary" form="bookForm">重置</button>
                            </div>
                        </div>
                    </div>
                        <%--主体表格（book）--%>
                    <div class="table_div">
                        <fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
                            <legend>教材数据管理</legend>
                        </fieldset>
                        <%--字体图标自定义--%>
                        <%--<i class="layui-icon layui-icon-face-smile" style="font-size: 30px; color: #1E9FFF;"></i>--%>
                        <table id="bookTable" lay-filter="bookFilter"></table>
                    </div>
                        <%--头部工具栏--%>
                    <script type="text/html" id="toolbarBook">
                        <div class="layui-btn-container">
                            <button class="layui-btn layui-btn-sm" lay-event="add">添加</button>
                            <button class="layui-btn layui-btn-sm" lay-event="delete">批量删除</button>
                        </div>
                    </script>
                        <%--行操作--%>
                    <script type="text/html" id="toolBook">
                        <div class="layui-btn-container">
                            <button class="layui-btn layui-btn-xs" lay-event="edit">编辑</button>
                            <button class="layui-btn layui-btn-xs layui-btn-danger" lay-event="delete">删除</button>
                            <button class="layui-btn layui-btn-xs layui-btn-primary" lay-event="detail">查看</button>
                        </div>
                    </script>
                </div>
                <div class="layui-tab-item">
                    <%--用于根据各种查询条件搜索（user）--%>
                    <div class="form_div">
                        <fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
                            <legend>常用用户搜索</legend>
                        </fieldset>
                        <form class="layui-form" style="margin-top: 10px;" id="userForm">
                            <div class="layui-form-item">
                                <div class="layui-inline">
                                    <label class="layui-form-label">姓名</label>
                                    <div class="layui-input-block">
                                        <input type="text" id="username" name="username" placeholder="请输入..." autocomplete="off" class="layui-input">
                                    </div>
                                </div>
                                <div class="layui-inline">
                                    <label class="layui-form-label">账号</label>
                                    <div class="layui-input-block">
                                        <input type="text" id="account" name="account" placeholder="请输入..." autocomplete="off" class="layui-input">
                                    </div>
                                </div>
                                <div class="layui-inline">
                                    <label class="layui-form-label">角色</label>
                                    <div class="layui-input-block" style="width: 57%">
                                        <select name="flag" id="flag">
                                            <option value=""></option>
                                            <option value="0">教师</option>

                                            <option value="1">管理员</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div class="layui-inline" style="margin-bottom: 10px;">
                            <div class="layui-input-block">
                                <button class="layui-btn" id="userReload" data-type="reload">点击搜索</button>
                                <button type="reset" class="layui-btn layui-btn-primary" form="userForm">重置</button>
                            </div>
                        </div>
                    </div>
                        <%--主体表格（user）--%>
                    <div class="table_div">
                        <fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
                            <legend>用户数据管理</legend>
                        </fieldset>
                        <table id="userTable" lay-filter="userFilter"></table>
                    </div>
                        <%--头部工具栏--%>
                    <script type="text/html" id="toolbarUser">
                        <div class="layui-btn-container">
                            <button class="layui-btn layui-btn-sm" lay-event="add">添加</button>
                            <button class="layui-btn layui-btn-sm" lay-event="delete">批量删除</button>
                        </div>
                    </script>
                        <%--行操作--%>
                    <script type="text/html" id="toolUser">
                        <div class="layui-btn-container">
                            <button class="layui-btn layui-btn-xs" lay-event="edit">编辑</button>
                            <button class="layui-btn layui-btn-xs layui-btn-danger" lay-event="delete">删除</button>
                            <button class="layui-btn layui-btn-xs layui-btn-primary" lay-event="detail">查看</button>
                        </div>
                    </script>
                </div>
                <div class="layui-tab-item">
                    <%--用于根据各种查询条件搜索（apply）--%>
                    <div class="form_div">
                        <fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
                            <legend>常用搜索</legend>
                        </fieldset>
                        <form class="layui-form" style="margin-top: 10px;" id="applyForm">
                            <div class="layui-form-item">
                                <div class="layui-inline">
                                    <label class="layui-form-label">申请者</label>
                                    <div class="layui-input-block">
                                        <input type="text" id="usernameApply" name="username" placeholder="请输入..." autocomplete="off" class="layui-input">
                                    </div>
                                </div>
                                <div class="layui-inline">
                                    <label class="layui-form-label">申请书籍</label>
                                    <div class="layui-input-block">
                                        <input type="text" id="bnameApply" name="bname" placeholder="请输入..." autocomplete="off" class="layui-input">
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div class="layui-inline" style="margin-bottom: 10px;">
                            <div class="layui-input-block">
                                <button class="layui-btn" id="applyReload" data-type="reload">点击搜索</button>
                                <button type="reset" class="layui-btn layui-btn-primary" form="applyForm">重置</button>
                            </div>
                        </div>
                    </div>
                    <%--主体表格（apply）--%>
                    <div class="table_div">
                        <fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
                            <legend>申请信息管理</legend>
                        </fieldset>
                        <table id="applyTable" lay-filter="applyFilter"></table>
                    </div>
                    <%--头部工具栏--%>
                    <script type="text/html" id="toolbarApply">
                        <div class="layui-btn-container">
                            <button class="layui-btn layui-btn-sm" lay-event="delete">批量删除</button>
                        </div>
                    </script>
                    <%--行操作--%>
                    <script type="text/html" id="toolApply">
                        <div class="layui-btn-container">
                            <button id="agreeApply" class="layui-btn layui-btn-xs" lay-event="agree">通过</button>
                            <button id="rejectApply" class="layui-btn layui-btn-xs layui-btn-danger" lay-event="reject">驳回</button>
                        </div>
                    </script>
                </div>
            </div>
        </div>
    </div>
    <%--编辑时弹出的页面（书籍页面）还复用与添加、查看时弹出的页面--%>
    <div id="form_div" style="margin: 0 auto;width: 350px;height:auto;display: none;">
        <div style="width: 300px; height: auto">
            <form class="layui-form" lay-filter="popurFilter" style="margin-top: 10px;" id="updateForm">
                <div class="layui-form-item">
                    <label class="layui-form-label">教材类别</label>
                    <div class="layui-input-block">
                        <select name="categoryId" id="categoryOptionPop">
                            <option value=""></option>
                        </select>
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">教材名称</label>
                    <div class="layui-input-block">
                        <input type="text" id="bnamePop" name="bname" placeholder="请输入..." autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">出版社</label>
                    <div class="layui-input-block">
                        <input type="text" id="publishPop" name="publish" placeholder="请输入..." autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">主编</label>
                    <div class="layui-input-block">
                        <input type="text" id="authorPop" name="author" placeholder="请输入..." autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">价格</label>
                    <div class="layui-input-block">
                        <input type="text" onblur="validateNum(this)" id="pricePop" name="price" placeholder="请输入..." autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">ISBN</label>
                    <div class="layui-input-block">
                        <input type="text" onblur="validateISBN(this)" id="isbnPop" name="isbn" placeholder="请输入..." autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">教材版本</label>
                    <div class="layui-input-block">
                        <input type="text" id="editionPop" name="edition" placeholder="请输入..." autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">教材库存</label>
                    <div class="layui-input-block">
                        <input type="text" onblur="validateNum(this)" id="inventoryPop" name="inventory" placeholder="请输入..." autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item" style="display: none">
                    <label class="layui-form-label">bid</label>
                    <div class="layui-input-block">
                        <input type="text" id="bid" name="bid" placeholder="请输入..." autocomplete="off" class="layui-input">
                    </div>
                </div>
            </form>
        </div>
    </div>
    <%--编辑时弹出的页面（用户页面）还复用与添加、查看时弹出的页面--%>
    <div id="form_div_user" style="margin: 0 auto;width: 350px;height:auto;display: none;">
        <div style="width: 300px; height: auto">
            <form class="layui-form" lay-filter="popurUser" style="margin-top: 10px;" id="updateUserForm">
                <div class="layui-form-item">
                    <label class="layui-form-label">用户角色</label>
                    <div class="layui-input-block">
                        <select name="flag" id="flagPop">
                            <option value=""></option>
                            <option value="0">教师</option>
                            <option value="1">管理员</option>
                        </select>
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">用户名</label>
                    <div class="layui-input-block">
                        <input type="text" id="usernamePop" name="username" placeholder="请输入..." autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">账号</label>
                    <div class="layui-input-block">
                        <input type="text" onblur="validateNum(this);validateLength(this)" id="accountPop" name="account" placeholder="请输入..." autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">密码</label>
                    <div class="layui-input-block">
                        <input type="password" id="passwordPop" name="password" placeholder="请输入..." autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">头像</label>
                    <div class="layui-input-block">
                        <img src="" class="img" id="img">
                    </div>
                </div>
                <div class="layui-form-item" id="chooseImg">
                    <label class="layui-form-label">选择头像</label>
                    <div class="layui-input-block">
                        <input type="file" id="imgPop" name="img" placeholder="请输入..." autocomplete="off" class="layui-input" onchange="changeImg(this)">
                    </div>
                </div>
                <div class="layui-form-item" style="display: none">
                    <label class="layui-form-label">用户ID</label>
                    <div class="layui-input-block">
                        <input type="text" id="id" name="id" placeholder="请输入..." autocomplete="off" class="layui-input">
                    </div>
                </div>
               <%-- <div class="layui-form-item" style="display: none">
                    <label class="layui-form-label">bid</label>
                    <div class="layui-input-block">
                        <input type="text" id="bid" name="bid" placeholder="请输入..." autocomplete="off" class="layui-input">
                    </div>
                </div>--%>
            </form>
        </div>
    </div>
</div>
</body>
</html>

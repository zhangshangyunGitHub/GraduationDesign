/*后台界面的js文件*/

layui.use([ 'layer', 'table', 'element','form','jquery','laypage'], function(){
    var layer = layui.layer //弹层
        ,table = layui.table //表格
        ,element = layui.element //元素操作
        ,form=layui.form//表单
        ,$=layui.$//jquery
        ,laypage=layui.laypage;

        loadCategory();
        loadCategoryPop();
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
                    form.render('select');
                }
            });
        }
        function loadCategoryPop() {
            $.ajax({
                url:"/loadCategory.do",
                type:"get",
                success:function (data) {
                    var result=$.parseJSON(data);
                    var categoryList=result.categoryList;
                    var str='<option value=""></option>';
                    $.each(categoryList,function (i,o) {
                        str+='<option value="'+o.categoryId+'">'+o.categoryName+'</option>';
                    });
                    $("#categoryOptionPop").html(str);
                    form.render('select');

                }
            });
        }
    form.render();
/*===================================bookTable=============================================*/
    //bookTable实例
    table.render({
        elem: '#bookTable'
        ,height: 420
        ,url: '/searchBook.do' //数据接口
        ,title: '教材表'
        ,toolbar:"#toolbarBook"//开启头部工具栏
        ,page: true //开启分页
        ,parseData:function(obj){
            return{
                "code":obj.code,
                "msg":obj.message,
                "count":obj.count,
                "data":obj.data
            }
        }
        ,cols: [[ //表头
            {type:'checkbox',fixed:'left'}
            ,{field: 'bid', title: 'ID', sort: true, fixed: 'left',align:'center'}
            ,{field: 'bname',align:'center',width:'150', title: '教材名称'}
            ,{field: 'categoryName',align:'center',width:'150', title: '教材类别',templet:function (data) {
                return '<div>'+data.category.categoryName+'</div>'
            }}
            ,{field: 'publish',align:'center', width:'150',title: '出版社'}
            ,{field: 'author',align:'center',width:'150', title: '主编'}
            ,{field: 'isbn',align:'center',width:'150',title:'ISBN'}
            ,{field: 'price',align:'center',width:'150',title: '价格',  sort: true}
            ,{field: 'edition',align:'center',width:'150', title: '版本'}
            ,{field:'inventory',align:'center',width:'150',title:'库存'}
            ,{fixed:'right',align:'center',width:'150',toolbar:'#toolBook',title:'操作'}
        ]]
        ,id:'bookId'
        ,limits: [5,10,15]
        ,limit :5
    });
    //bookTable重载
    $("#bookReload").click(function () {
        table.reload('bookId',{
            where:{
                bname:$("#bname").val(),
                edition:$("#edition").val(),
                price:$("#price").val(),
                publish:$("#publish").val(),
                categoryId:$("#categoryOption").val()
            }
        });
    });
    //监听头工具栏事件
    table.on('toolbar(bookFilter)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id)
            ,data = checkStatus.data; //获取选中的数据
        var layEvent=obj.event;
            if (layEvent==="add"){
                // 清空表单 （“updateForm”是表单的id）
                $("#updateForm")[0].reset();
                form.render();
                layer.open({
                    type:1
                    ,anim:1
                    ,title:'添加教材'
                    ,area:['350px','500px']
                    ,content:$("#form_div")
                    ,btn:['确定','取消']
                    ,yes:function (index,layero) {
                        var categoryId=$("#categoryOptionPop").val();
                        var bname=$("#bnamePop").val();
                        var publish=$("#publishPop").val();
                        var author=$("#authorPop").val();
                        var price=$("#pricePop").val();
                        var isbn=$("#isbnPop").val();
                        var edition=$("#editionPop").val();
                        var inventory=$("#inventoryPop").val();
                        if(categoryId===null||categoryId===""||categoryId===undefined){
                            layer.alert("请选择教材类别！",{icon:5});
                        }else if(bname===null||bname===""||bname===undefined){
                            layer.alert("教材名称不能为空！",{icon:5});
                        }else if(publish===null||publish===""||publish===undefined){
                            layer.alert("出版社不能为空！",{icon:5});
                        }else if(author===null||author===""||author===undefined){
                            layer.alert("主编不能为空！",{icon:5});
                        }else if(price===null||price===""||price===undefined){
                            layer.alert("教材价格不能为空！",{icon:5});
                        }else if(isbn===null||isbn===""||isbn===undefined){
                            layer.alert("ISBN不能为空！",{icon:5})
                        } else if(edition===null||edition===""||edition===undefined){
                            layer.alert("教材版本号不能为空！",{icon:5});
                        }else if(inventory===null||inventory===""||inventory===undefined){
                            layer.alert("教材库存不能为空！",{icon:5});
                        }else {
                            $.ajax({
                                url:"/addBook.do",
                                type:"post",
                                data:{
                                    categoryId:categoryId,
                                    bname:bname,
                                    publish:publish,
                                    author:author,
                                    price:price,
                                    isbn:isbn,
                                    edition:edition,
                                    inventory:inventory
                                } ,
                                success:function (data) {
                                    var result=$.parseJSON(data);
                                    var flag=result.flag;
                                    if(flag){
                                        layer.alert("添加成功",{icon:1});
                                        layer.close(index);
                                        //及时刷新表格中的数据
                                        table.reload('bookId',{
                                            where:{
                                                bname:$("#bname").val(),
                                                edition:$("#edition").val(),
                                                price:$("#price").val(),
                                                publish:$("#publish").val(),
                                                categoryId:$("#categoryOption").val()
                                            }
                                        });
                                    }else {
                                        layer.alert("添加失败",{icon:5});
                                        layer.close(index);
                                    }
                                }
                            });
                        }
                    }
                });
            }else if (layEvent==='delete'){
                if(data.length === 0){
                    layer.msg('请选择一行');
                } else {
                    layer.confirm('确定删除选中的所有数据吗？',function (index) {
                        var bid=[];
                        for (var i=0;i<data.length;i++){
                            bid.push(data[i].bid)
                        }
                        $.ajax({
                            url:"/batchDelBook.do",
                            type:"post",
                            data:{
                                bid:bid
                            },
                            success:function (data) {
                                var result=$.parseJSON(data);
                                var flag=result.flag;
                                if(flag){
                                    layer.alert("删除成功",{icon:1});
                                    layer.close(index);
                                    //及时刷新表格中的数据
                                    table.reload('bookId',{
                                        where:{
                                            bname:$("#bname").val(),
                                            edition:$("#edition").val(),
                                            price:$("#price").val(),
                                            publish:$("#publish").val(),
                                            categoryId:$("#categoryOption").val()
                                        }
                                    });
                                }else {
                                    layer.alert("删除失败",{icon:5});
                                    layer.close(index);
                                }
                            }
                        });
                    });
                }
            }
});

    //监听行工具事件
    table.on('tool(bookFilter)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data //获得当前行数据
            ,layEvent = obj.event; //获得 lay-event 对应的值
        if(layEvent === 'detail'){
            layer.open({
                type:1
                ,anim:1
                ,title:'查看教材'
                ,area:['350px','500px']
                ,content:$("#form_div")
                ,btn:['确定']
                ,yes:function (index,layero) {
                    layer.close(index);
                }
            });
            setFormValue(data);/*动态的向表单赋值*/
        } else if(layEvent === 'delete'){
            layer.confirm('确定删除吗？', function(index){
                layer.close(index);
                //向服务端发送删除指令
                $.ajax({
                    url:"/deleteBook.do"
                    ,type:"get"
                    ,data:{
                     bid:data.bid
                    }
                    ,success:function (data) {
                        var result=$.parseJSON(data);
                        var flag=result.flag;
                        if(flag){
                            layer.alert("删除成功",{icon:1});
                            /*obj.del(); //删除对应行（tr）的DOM结构*/
                            table.reload('bookId',{
                                where:{
                                    bname:$("#bname").val(),
                                    edition:$("#edition").val(),
                                    price:$("#price").val(),
                                    publish:$("#publish").val(),
                                    categoryId:$("#categoryOption").val()
                                }
                            });
                        }else {
                            layer.alert("删除失败",{icon:6});
                        }
                    }
                });
            });
        } else if(layEvent === 'edit'){
            layer.open({
                type:1
                ,anim:1
                ,title:'编辑教材'
                ,area:['350px','500px']
                ,content:$("#form_div")
                ,btn:['保存','取消']
                ,success:function (layero,index) {
                    // 添加form标识
                    layero.addClass('layui-form');
                    // 将保存按钮改变成提交按钮
                    layero.find('.layui-layer-btn0').attr({
                        'lay-filter' : 'updateSubmit',
                        'lay-submit' : ''
                    });
                }
                ,yes:function (index,layero) {
                    form.on('submit(updateSubmit)',function (data) {
                        $.ajax({
                            url:"/updateBook.do"
                            ,type:"post"
                            ,data:{
                                bid:data.field.bid,
                                bname:data.field.bname,
                                publish:data.field.publish,
                                author:data.field.author,
                                price:data.field.price,
                                edition:data.field.edition,
                                inventory:data.field.inventory,
                                categoryId:data.field.categoryId,
                                isbn:data.field.isbn
                            }
                            ,success:function (data) {
                                var result=$.parseJSON(data);
                                var flag=result.flag;
                                if(flag){
                                    layer.close(index);
                                    layer.alert("修改成功",{icon:1});
                                    //及时刷新表格中的数据
                                    table.reload('bookId',{
                                        where:{
                                            bname:$("#bname").val(),
                                            edition:$("#edition").val(),
                                            price:$("#price").val(),
                                            publish:$("#publish").val(),
                                            categoryId:$("#categoryOption").val()
                                        }
                                    });
                                }else {
                                    layer.close(index);
                                    layer.alert("修改失败",{icon:5})
                                }
                            }
                        });
                    });
                }
                ,btn2:function (index) {
                    layer.close(index);
                }
            });
            setFormValue(data);/*动态的向表单赋值*/
        }
    });
    /*给弹出的书籍表单赋初始值*/
    function setFormValue(data) {
        form.val("popurFilter",{
            "bid":data.bid
            ,"bname":data.bname
            ,"publish":data.publish
            ,"author":data.author
            ,"price":data.price
            ,"edition":data.edition
            ,"inventory":data.inventory
            ,"categoryId":data.category.categoryId
            ,"isbn":data.isbn
        });
        form.render(null,'popurFilter')
    }
/*======================================userTable=====================================================*/
    //userTable实例
    table.render({
        elem: '#userTable'
        ,height: 420
        ,url: '/searchUser.do' //数据接口
        ,title: '用户表'
        ,toolbar:"#toolbarUser"//开启头部工具栏
        ,page: true //开启分页
        ,parseData:function(obj){
            return{
                "code":obj.code,
                "msg":obj.msg,
                "count":obj.count,
                "data":obj.data
            }
        }
        ,cols: [[ //表头
            {type:'checkbox',fixed:'left'}
            ,{field: 'id', title: 'ID', sort: true, fixed: 'left',align:'center',width:'150'}
            ,{field: 'username',align:'center', title: '姓名',width:'150'}
            ,{field: 'flag',align:'center', title: '角色',width:'150',templet:function (d) {
                if(d.flag==0){
                    return '<span>教师</span>'
                }else {
                    return '<span>管理员</span>'
                }
            }}
            ,{field: 'account',align:'center', title: '账号',totalRow: true,width:'150'}
            ,{field: 'img',align:'center', title: '头像',width:'150',
                templet:'<div><img style="width: 30px;height: 30px;-webkit-border-radius: 50%;-moz-border-radius: 50%;border-radius: 50%;" src="{{d.img}}"></div>'}
            ,{fixed:'right',align:'center',width:'235',toolbar:'#toolUser',title:'操作'}
        ]]
        ,id:'userId'
        ,limits: [5,10,15]
        ,limit :5
    });
    //userTable重载
    $("#userReload").click(function () {
        table.reload('userId',{
            where:{
                username:$("#username").val(),
                account:$("#account").val(),
                flag:$("#flag").val()
            }
        });
    });
    //监听头工具栏事件
    table.on('toolbar(userFilter)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id)
            ,data = checkStatus.data; //获取选中的数据
        switch(obj.event){
            case 'add':
                // 清空表单 （“updateUserForm”是表单的id）
                $("#updateUserForm")[0].reset();
                $("#img").attr("src","");
                $("#chooseImg").show();
                $("[name='account']").attr("readonly",false);
                form.render();
                layer.open({
                    type:1
                    ,anim:1
                    ,title:'添加用户'
                    ,area:['350px','500px']
                    ,content:$("#form_div_user")
                    ,btn:['确定','取消']
                    ,yes:function (index,layero) {
                        var formData=new FormData($("#updateUserForm")[0]);
                        var username=formData.get("username");
                        var account=formData.get("account");
                        var password=formData.get("password");
                        var img=$("#imgPop").val();
                        var role=formData.get("flag");
                        if(username===""||username===undefined||username===null){
                            layer.msg("姓名不能为空！",{icon:5})
                        }else if(role===""||role===undefined||role===null){
                            layer.msg("请选择角色！",{icon:5});
                        } else if(account===""||account===undefined||account===null){
                            layer.msg("账号不能为空！",{icon:5});
                        }else if(password===""||password===undefined||password===null) {
                            layer.msg("密码不能为空！",{icon:5});
                        }else if(img===""||img===undefined||img===null){
                            layer.msg("请选择图片！",{icon:5});
                        }else {
                            $.ajax({
                                url:"/register.do",
                                type:"post",
                                contentType:false,
                                processData:false,
                                data:formData,
                                success:function (data) {
                                    var result=JSON.parse(data);
                                    var flag=result.flag;
                                    var message=result.message;
                                    if(message===null||message===""||message===undefined){
                                        if (flag){
                                            layer.alert("添加成功",{icon:1});
                                            layer.close(index);
                                            /*添加完成后刷新数据*/
                                            table.reload('userId',{
                                                where:{
                                                    username:$("#username").val(),
                                                    account:$("#account").val(),
                                                    flag:$("#flag").val()
                                                }
                                            });
                                        }else {
                                            layer.alert("注册失败",{icon:5});
                                        }
                                    }else {
                                        layer.alert(message,{icon:5});
                                    }
                                }
                            });
                        }
                    }
                });
                break;
            case 'delete':
                if(data.length === 0){
                    layer.msg('请选择一行');
                } else {
                    layer.confirm('确定删除选中的所有数据吗？',function (index) {
                        var id=[];
                        for (var i=0;i<data.length;i++){
                            id.push(data[i].id)
                        }
                        $.ajax({
                            url:"/batchDelUser.do",
                            type:"post",
                            data:{
                                id:id
                            },
                            success:function (data) {
                                var result=$.parseJSON(data);
                                var flag=result.flag;
                                if(flag){
                                    layer.alert("删除成功",{icon:1});
                                    layer.close(index);
                                    //及时刷新表格中的数据
                                    table.reload('userId',{
                                        where:{
                                            username:$("#username").val(),
                                            account:$("#account").val(),
                                            flag:$("#flag").val()
                                        }
                                    });
                                }else {
                                    layer.alert("删除失败",{icon:5});
                                    layer.close(index);
                                }
                            }
                        });
                    });
                }
                break;
        }
    });

    //监听行工具事件
    table.on('tool(userFilter)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data //获得当前行数据
            ,layEvent = obj.event; //获得 lay-event 对应的值
        if(layEvent === 'detail'){
            $("#chooseImg").hide();
            layer.open({
                type:1
                ,anim:1
                ,title:'查看用户'
                ,area:['350px','500px']
                ,content:$("#form_div_user")
                ,btn:['确定']
                ,yes:function (index,layero) {
                    layer.close(index);
                }
            });
            setFormValueUser(data);/*动态的向表单赋值*/
        } else if(layEvent === 'delete'){
            layer.confirm('真的删除行么', function(index){
                layer.close(index);
                //向服务端发送删除指令
                $.ajax({
                    url:"/deleteUser.do"
                    ,type:"get"
                    ,data:{
                        id:data.id
                    }
                    ,success:function (data) {
                        var result=$.parseJSON(data);
                        var flag=result.flag;
                        if(flag){
                            layer.alert("删除成功",{icon:1});
                            table.reload('userId',{
                                where:{
                                    username:$("#username").val(),
                                    account:$("#account").val(),
                                    flag:$("#flag").val()
                                }
                            });
                        }else {
                            layer.alert("删除失败",{icon:5});
                        }
                    }
                });
            });
        } else if(layEvent === 'edit'){
            $("#updateUserForm")[0].reset();
            $("#chooseImg").show();
            $("[name='account']").attr("readonly",true);
            layer.open({
                type:1
                ,anim:1
                ,title:'编辑用户'
                ,area:['350px','500px']
                ,content:$("#form_div_user")
                ,btn:['确定','取消']
                ,yes:function (index,layero) {
                    var formData=new FormData($("#updateUserForm")[0]);
                    var username=formData.get("username");
                    var account=formData.get("account");/*获取到的是点击提交时的account（可能已经改变）*/
                    var password=formData.get("password");
                    var img=$("#imgPop").val();
                    var role=formData.get("flag");
                    if(username===""||username===undefined||username===null){
                        layer.msg("姓名不能为空！",{icon:5})
                    } else if(account===""||account===undefined||account===null){
                        layer.msg("账号不能为空！",{icon:5});
                    }else if(password===""||password===undefined||password===null) {
                        layer.msg("密码不能为空！",{icon:5});
                    }else if(role===""||role===undefined||role===null){
                        layer.msg("请选择角色！",{icon:5});
                    }else {
                        $.ajax({
                            url:"/updateUser.do",
                            type:"post",
                            contentType:false,
                            processData:false,
                            data:formData,
                            success:function (data) {
                                var result=JSON.parse(data);
                                var flag=result.flag;
                                var message=result.message;
                                /*if(message===null||message===""||message===undefined){*/
                                    if (flag){
                                        layer.alert("修改成功",{icon:1});
                                        layer.close(index);
                                        /*添加完成后刷新数据*/
                                        table.reload('userId',{
                                            where:{
                                                username:$("#username").val(),
                                                account:$("#account").val(),
                                                flag:$("#flag").val()
                                            }
                                        });
                                    }else {
                                        layer.alert("修改失败",{icon:5});
                                    }
                               /* }else {
                                    layer.alert(message,{icon:5});
                                }*/
                            }
                        });
                    }
                }
            });
            setFormValueUser(data);/*动态的向弹出的form表单赋值*/
        }
    });
    /*动态的向用户表单赋值*/
    function setFormValueUser(data) {
        $("#img").attr("src",data.img);
        form.val("popurUser",{
            "id":data.id
            ,"username":data.username
            ,"account":data.account
            ,"password":data.password
            /*,"img":data.img*/
            ,"flag":data.flag
        });
        form.render(null,'popurUser')
    }
    /*=======================================applyTable========================================*/
//applyTable实例
    table.render({
        elem: '#applyTable'
        ,height: 420
        ,url: 'searchApply.do' //数据接口
        ,title: '申请表'
        ,toolbar:"#toolbarApply"//开启头部工具栏
        ,page: true //开启分页
        ,parseData:function(obj){
            return{
                "code":obj.code,
                "msg":obj.msg,
                "count":obj.count,
                "data":obj.data
            }
        }
        ,cols: [[ //表头
            {type:'checkbox',fixed:'left'}
            ,{field: 'id', title: 'ID', sort: true, fixed: 'left',align:'center',width:'150'}
            ,{field: 'username',align:'center', title: '申请者',width:'150',
                templet:'<div>{{d.user.username}}</div>'}
            ,{field: 'bname',align:'center', title: '教材名',width:'150',
                templet:'<div>{{d.book.bname}}</div>'}
            ,{field: 'account',align:'center', title: '申请数量',totalRow: true,width:'150'}
            ,{field: 'cname',align:'center', title: '课程名',width:'150',
                templet:'<div>{{d.course.cname}}</div>'}
            ,{field:'flag',align:'center',title:'申请状态',width:'150',
                templet:function (d) {
                    if(d.flag===0){
                        return '<div>申请中</div>'
                    }else if(d.flag===1){
                        return '<div>已通过</div>'
                    }else if(d.flag===2){
                        return '<div>已驳回</div>'
                    }
                }}
            ,{align:'center',width:'150',toolbar:'#toolApply',title:'操作',fixed:'right'}
        ]]
        ,id:'applyId'
        ,limits: [5,10,15]
        ,limit :5
    });
    /*数据表格重载（apply）*/
    $("#applyReload").click(function () {
        table.reload('applyId',{
            where:{
                bname:$("#bnameApply").val(),
                username:$("#usernameApply").val()
            }
        })
    });
    /*监听行工具事件*/
    table.on('tool(applyFilter)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data //获得当前行数据
            ,layEvent = obj.event; //获得 lay-event 对应的值
        if(data.flag!==0){
            layer.alert("当前状态不能执行相关操作！");
            return;
        }
        if(layEvent === 'agree'){
            $.ajax({
               url:"/searchBookAccountById.do",
               type:"post",
               data:{
                  id:data.book.bid
               } ,
                success:function (d) {
                    var result=$.parseJSON(d);
                    var inventory=result.account;/*获取这本书的库存*/
                    var account=data.account;/*得到申请的数量*/
                    /*layer.alert("该书的库存："+inventory+",申请的数量："+account);*/
                    if(account>inventory){
                        /*如果申请的数量大于库存，就提示库存不足*/
                        layer.alert("库存不足！",{icon:5})
                    }else {
                        layer.confirm("确定执行此操作吗？",function (index) {
                            /*执行更新操作*/
                            $.ajax({
                                url:"/agreeApply.do"
                                ,type:"post"
                                ,data:{
                                    id:data.id,
                                    inventory:inventory,
                                    account:account,
                                    bid:data.book.bid
                                }
                                ,success:function (d) {
                                    var result=$.parseJSON(d);
                                    var flag=result.flag;
                                    if(flag){
                                        layer.alert("操作成功！",{icon:1});
                                        table.reload('applyId');
                                    }else {
                                        layer.alert("操作失败！",{icon:5})
                                    }
                                }
                            })
                        });
                    }
                }
            });
        } else if(layEvent === 'reject'){
            /*if(data.flag===1){
                $("#rejectApply").addClass("layui-btn-disabled");
                $("#rejectApply").attr("disabled","true");
            }*/
            layer.confirm("确定执行此操作吗?",function (index) {
                $.ajax({
                    url:"rejectApply.do"
                    ,type:"post"
                    ,data:{
                        id:data.id
                    },
                    success:function (d) {
                        var result=$.parseJSON(d);
                        var flag=result.flag;
                        if(flag){
                            layer.alert("操作成功！",{icon:1});
                            table.reload('applyId');
                        }else {
                            layer.alert("操作失败！",{icon:5})
                        }
                    }
                })
            });
        }
    });
    /*监听头部工具栏事件*/
    table.on('toolbar(applyFilter)',function (obj) {
        var checkStatus = table.checkStatus(obj.config.id)
            ,data = checkStatus.data; //获取选中的数据
        var layEvent=obj.event;
        if(layEvent==='delete'){
            if(data.length === 0){
                layer.msg('请选择一行');
            } else {
                layer.confirm('确定删除选中的所有数据吗？',function (index) {
                    var id=[];
                    for (var i=0;i<data.length;i++){
                        id.push(data[i].id)
                    }
                    $.ajax({
                        url:"/batchDelApply.do",
                        type:"post",
                        data:{
                            id:id
                        },
                        success:function (data) {
                            var result=$.parseJSON(data);
                            var flag=result.flag;
                            if(flag){
                                layer.alert("删除成功",{icon:1});
                                layer.close(index);
                                //及时刷新表格中的数据
                                table.reload('applyId');
                            }else {
                                layer.alert("删除失败",{icon:5});
                                layer.close(index);
                            }
                        }
                    });
                });
            }
        }
    });

});


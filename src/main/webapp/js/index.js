layui.use([ 'layer', 'table', 'element','form','jquery','laypage'], function(){
    var layer = layui.layer //弹层
        ,table = layui.table //表格
        ,element = layui.element //元素操作
        ,form=layui.form//表单
        ,$=layui.$//jquery
        ,laypage=layui.laypage;

        loadCategory();
        loadCourse();
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
        /*弹出教材申请页面时加载出所有的课程*/
        function loadCourse() {
            $.ajax({
               url:"/loadCourse.do" ,
                type:"get",
                success:function (data) {
                    var result=$.parseJSON(data);
                    var courseList=result.courseList;
                    var str='';
                    $.each(courseList,function (i,o) {
                        str+='<option value="'+o.cid+'">'+o.cname+'</option>';
                    });
                    $("#coursePop").append(str);
                    form.render('select');
                }
            });
        }
    form.render();

    //执行一个 table 实例
    table.render({
        elem: '#MyTable'
        ,height: 420
        ,url: 'searchBook.do' //数据接口
        ,title: '教材表'
        //,toolbar:"#toolbarDemo"//开启头部工具栏
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
            //{type:'checkbox',fixed:'left'}
            {field: 'bid', title: 'ID', sort: true, fixed: 'left',align:'center'}
            ,{field: 'bname',align:'center', title: '教材名称',width:'150'}
            ,{field: 'categoryName',align:'center', title: '教材类别',width:'150',templet:'<div>{{d.category.categoryName}}</div>'}
            ,{field: 'publish',align:'center', title: '出版社',width:'150',totalRow: true}
            ,{field: 'author',align:'center', title: '主编',width:'150'}
            ,{field: 'isbn',align:'center',title:'ISBN',width:'150'}
            ,{field: 'price',align:'center', title: '价格',width:'150',  sort: true}
            ,{field: 'edition',align:'center', title: '版本',width:'150'}
            ,{field:'inventory',align:'center',title:'库存',width:'150'}
        ]]
        ,id:'idTest'
        ,limits: [5,10,15]
        ,limit :5
    });


    //执行表格重载（根据输入的查询条件来显示数据）
    $("#reload").click(function () {
        table.reload('idTest',{
            where:{
                bname:$("#bname").val(),
                edition:$("#edition").val(),
                price:$("#price").val(),
                publish:$("#publish").val(),
                categoryId:$("#categoryOption").val()
            }
        });
    });
    //监听行单击事件（双击事件为：rowDouble）
    table.on('row(test)', function(obj) {
        var data = obj.data;
        $("#applyForm")[0].reset();
       /* layer.alert(JSON.stringify(data.bid), {
            title: '当前行数据：'
        });*/
        layer.open({
            type:1
            ,anim:1
            ,title:'教材申请'
            ,area:['700px','500px']
            ,content:$("#apply_div")
            ,btn:['提交申请','取消']
            ,yes:function (index,layero) {
                var formData=new FormData($("#applyForm")[0]);
                var inventory=formData.get("inventory");
                var account=formData.get("account");
                var course=formData.get("course");
                if(isNaN(account)){
                    layer.alert("“申请数量”只能输入数字！");
                }else {
                    if(course===""){
                        layer.alert("请选择课程！",{icon:5});
                    }else if(account===""){
                        layer.alert("请输入申请数量！",{icon:5});
                    }else if(parseInt(account)<=0){
                        layer.alert("教材数量不能为0或负数！",{icon:5})
                    }else if(parseInt(account)>parseInt(inventory)){
                        layer.alert("申请的教材数量不能多于库存！",{icon:5})
                    }else {
                        /*layer.alert("教材数量正确",{icon:1});*/
                        $.ajax({
                            url:"/addApply.do",
                            type:"post",
                            data:{
                                bid:data.bid,
                                cid:$("#coursePop").val(),
                                account:$("#accountPop").val()
                            },
                            success:function (data) {
                                var result=$.parseJSON(data);
                                var flag=result.flag;
                                if(flag){
                                    layer.alert("提交申请成功！",{icon:1});
                                    layer.close(index);
                                }else {
                                    layer.alert("提交申请失败！",{icon:5});
                                }
                            }
                        });
                    }
                }

            }

        });
        setFormValue(data);
    });
    function setFormValue(data) {
        form.val("applyFilter",{
            "bid":data.bid
            ,"bname":data.bname
            ,"publish":data.publish
            ,"author":data.author
            ,"price":data.price
            ,"edition":data.edition
            ,"inventory":data.inventory
            ,"categoryId":data.category.categoryId
            ,"categoryName":data.category.categoryName
            ,"isbn":data.isbn
        });
        form.render(null,'applyFilter');
    }
});

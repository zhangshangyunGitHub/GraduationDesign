/*修改信息页面的js文件*/
layui.use(['layer','jquery'],function () {
    var layer=layui.layer,
        $=layui.$;

});
/*选择图片之后将图片回显到img中*/
function changeImg(e){
    var reads= new FileReader();
    f=document.getElementById('file').files[0];
    reads.readAsDataURL(f);
    reads.onload=function (e) {
        $("#img").attr("src",this.result)
    };
}
function saveMsg() {
    var formData=new FormData($("#myForm")[0]);
    var username=formData.get("username");
    var account=formData.get("account");
    var password=formData.get("password");
    if(username===""||username===undefined||username===null){
        layer.msg("姓名不能为空！",{icon:5})
    }else if(account===""||account===undefined||account===null){
        layer.msg("账号不能为空！",{icon:5});
    }else if(password===""||password===undefined||password===null) {
        layer.msg("密码不能为空！",{icon:5});
    }else {
        $.ajax({
            url:"/saveMsg.do",
            type:"post",
            contentType:false,
            processData:false,
            data:formData,
            success:function (data) {
                var result=$.parseJSON(data);
                var flag=result.flag;
                if(flag){
                    layer.open({

                        content: "<div>保存信息成功</div>",

                        yes:function(index,layero){

                            window.location.href="index.jsp";

                            layer.close(index); //关闭弹出框

                        }

                    })

                }else {
                    layer.alert("保存信息失败！",{icon:5});
                }
            }
        });
    }
}
function cancel() {
    window.location.href="index.jsp";
}
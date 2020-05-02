/*注册页面的js文件*/
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
function register() {
    var formData=new FormData($("#myForm")[0]);
    var username=formData.get("username");
    var account=formData.get("account");
    var password=formData.get("password");
    var img=$("#file").val();
    var role=formData.get("flag");
    if(username===""||username===undefined||username===null){
        layer.msg("姓名不能为空！",{icon:5})
    }else if(account===""||account===undefined||account===null){
        layer.msg("账号不能为空！",{icon:5});
    }else if(password===""||password===undefined||password===null) {
        layer.msg("密码不能为空！",{icon:5});
    }else if(img===""||img===undefined||img===null){
        layer.msg("请选择图片！",{icon:5});
    }else if(role===""||role===undefined||role===null){
        layer.msg("请选择角色！",{icon:5});
    } else {
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
                       layer.open({
                           content:"<div>注册成功！</div>",
                           yes:function(index,layero){
                               window.location.href="login.jsp";
                               layer.close(index); //关闭弹出框
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

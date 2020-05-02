/*包括一些通用的js代码，比如数字的验证，长度的限制等*/
layui.use([ 'layer', 'table', 'element','form','jquery','laypage'], function(){
    var layer=layui.layer;
});
/*选择图片之后将图片回显到img中*/
function changeImg(e){
    var reads= new FileReader();
    f=document.getElementById('imgPop').files[0];
    reads.readAsDataURL(f);
    reads.onload=function (e) {
        $("#img").attr("src",this.result)
    };
}
/*验证输入的是否为数字*/
function validateNum(obj){
    var val=obj.value;
    var id=obj.id;
    var object=$("#"+id+"");
    var name=object.parent().prev().text();/*获取当前input框父节点的上一级的value*/
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
/*验证ISBN的格式的规范性*/
function validateISBN(obj) {
    var val=obj.value;
    var ary=[];/*用于存储ISBN码的数组*/
    ary=val.split("");/*获取ISBN码中的字符，组成一个数组*/
    var aryNum=[];/*用于存储ISBN码中除了“-”之外的其他数字*/
    aryNum=val.split("-");/*获取ISBN中除了“-”外的其他数字*/
    var strNum=aryNum.join("");
    console.log(ary.indexOf("-"));
    if(ary[1]!=="-"||ary[5]!=="-"||ary[11]!=="-"||isNaN(strNum)){
        layer.alert("ISBM码的格式不正确！");
    }
}
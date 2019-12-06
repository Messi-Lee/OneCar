var userId;
window.onload = function () {
    userId = location.href.split("=")[1];
    var name =  location.href.split("?")[1].split("=")[0];
    if (name != "id"){
        alert("请先登录!!5秒后进入登录页面...")
        setTimeout(function () {
            location.href = "login.html";
        },5000)
    }
    chooseTag();
}
/**
 * 返回前一页面
 */
function returnCom() {
    location.href = "../index.html?id="+userId;
};
/**
*将选择发布的图片展示出来
* 监听，当file-input的value值改变时，运行
 */
var i = -1;
// var fileArr = [];
var src;
$("#chooseImg").on("change",function () {
    i++;
    var filePath = $(this).val();
    fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase();
    src= window.URL.createObjectURL(this.files[0]);
    //转成可以在本地预览的格式
    renderImg();
});
/**
 * 渲染图片
 */
function renderImg() {
    $(".imgPreviewBox").append("<div class=\"imgPreview\" id=\"imgPreview"+j+"\">\n" +
        "                        <img src=\"#\" class=\"cropedBigImg\" id=\"cropedBigImg\" />\n" +
        "                        <span class=\"mui-icon mui-icon-close icon-close\" id=\"icon-close\" onclick=\"deleteFile()\"></span>\n" +
        "                    </div>");
    $('#imgPreview'+j).css('display','block');
    $('#cropedBigImg'+j).css('display','block');
    $('#cropedBigImg'+j).attr('src', src);
    // for(var j = 0;j<=i;j++){
    //     fileArr[j] = src[j];
    //
    // }
}
/**
*删除渲染出来的图片
 */
function deleteFile() {
    $('#cropedBigImg').attr('src','#');
    $('#imgPreview').css('display','none');
    $('#cropedBigImg').css('display','none');
    // renderImg();
}
/**
 *弹出
 * 点击弹出标签选择框
 */
function tagBoxIn(){
    $(".chooseTagBox")[0].style.display = "block";
}
/**
 *删除
 * 删除弹出的选择标签弹框
 */
function tagBoxOut() {
    $(".chooseTagBox")[0].style.display = "none";
}
/**
 *选择
 * 在弹出框中选择标签
 * 同时渲染到标签处
 */
var tagArr = [];
var tagIndex = 0;
function chooseTag(){
    var list = $(".tag");
    var flag = 0;//没有重复为0，有重复为1
    // console.log(list);
    for (var j = 0;j<list.length;j++){
        list[j].addEventListener('click',function (e) {
            //判断标签是否有重复出现的
            if(tagIndex > 0){
                for(var num = tagIndex - 1;num > -1;num--){
                    if(tagArr[num] == e.target.innerText){
                        alert("不可重复添加同一标签!");
                        flag = 1;
                        break;
                    }else{
                        flag = 0;
                    }
                }
            }
            if (flag == 0){
                renderTag(e.target.innerText,tagIndex);
                tagArr[tagIndex] = e.target.innerText;
                tagIndex++;
            }
        })
    }
}
/**
 *将获取到的标签渲染到页面中
 */
function renderTag(data,index) {
    $(".TagBox").append("<div class=\"Tag\" id=\""+index+"\">\n" +
        "                        <span class=\"TagText\">"+data+"</span>\n" +
        "                        <span class=\"mui-icon mui-icon-closeempty icon-closeempty\" onclick=\"deleteTag("+index+")\"></span>\n" +
        "                    </div>")
}
/**
 *删除
 * 删除添加的标签
 */
function deleteTag(index) {
    $("#"+index+"")[0].style.display ="none";
    tagArr.splice(index,1);
}
/**
 * 上传
 * 上传发布的问答到后台
 */
function upThought() {
    var content = $(".thoughtText").val();
    var formData = new FormData();
    formData.append("file",$("#chooseImg").get(0).files[0]);
    formData.append("labelsId",tagArr);
    formData.append("content",content);
    formData.append("imgSrc",src);
    formData.append("userId",userId);
    formData.append("viewNum","0");
    formData.append("likeNum","0");
    $.ajax({
        url:Url+"/draft",
        type:"post",
        data:formData,
        async:true,//true 异步请求（默认）；false 同步请求
        dataType:"json",
        processData: false, // 告诉jQuery不要去处理发送的数据
        contentType: false, // 告诉jQuery不要去设置Content-Type请求头
        // beforeSend:function (XMLHttpRequest) {
        //    XMLHttpRequest.setRequestHeader("token","token") //在请求之前的操作
        // },
        success:function (res/*,status,xhr*/) {
            //请求成功之后的操作，res是成功后的数据
            console.log(res);
            console.log("成功");
            // location.href = "../pages/index.html?id="+res;
        },
        error:function (res) {
            //请求失败之后的操作，res是失败后的数据
            console.log(res)
        }
    })
}

/**
 *检查
 * 文字内容不可为空
 */
function checkForm() {
    if($(".thoughtText").val().trim() == ""){
        alert("内容不可为空！！！");
    } else{
        upThought();
    }
}
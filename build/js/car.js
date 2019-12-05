var typeData = {
    1: "Vehicle_type",
    2: "Vehicle_damage",
    3:"Vehicle_detection",
};
window.onload = function () {
//判断是属于哪种识别
    var persentType = location.href.split("=")[1];
    renderCarPage(persentType);
    uploadImg(persentType);
}
/**
 *渲染
 * 根据前一页面上传的数据
 * 渲染整个图片上传扫描页面
 */
function renderCarPage(num) {
    $(".oneCar_main").empty();
    $(".oneCar_main").append("<header class=\"mui-bar mui-bar-nav oneCar_head\">\n" +
        "            <span class=\"mui-icon mui-icon-undo\" onclick=\"function Reback() {\n" +
        "                  location.href = '../index.html';\n" +
        "                  };Reback()\"></span>\n" +
        "            <span class=\"mui-title oneCar_title\" style=\"left: 6.25rem;right: 6.25rem;color: white;\">"+typeData[num]+"</span>\n" +
        "        </header>\n" +
        "        <!--页面功能主题区-->\n" +
        "        <div class=\"recognitionBox\">\n" +
        "            <!--图片上传并展示-->\n" +
        "            <div class=\"imgUpBox\">\n" +
        "                <div class=\"conshowed\"></div>\n" +
        "                <img src=\"../../images/community/car.png\" class=\"imgUp\" id=\"imgUp\">\n" +
        "            </div>\n" +
        "             <!--返回信息展示-->\n" +
        "            <div class=\"displayInf\"></div>\n" +
        "             <!--添加图片实现按钮-->\n" +
        "            <button class=\"addImgButton\">上传</button>\n" +
        "            <input type=\"file\" accept=\"image/jpg,image/jpeg,image/png,image/PNG\" class=\"addImg\" id=\"addImg\">"+
        "        </div>")
}
/**
 * 上传
 * 上传图片进行扫描
 * 获得相关信息
 */
function uploadImg(num) {
    // $.ajax({
    //     url:Url+"/picture1",
    //     type:"get",
    //     data:{
    //
    //     },
    //     async:true,//true 异步请求（默认）；false 同步请求
    //     dataType:"json",
    //     // beforeSend:function (XMLHttpRequest) {
    //     //    XMLHttpRequest.setRequestHeader("token","token") //在请求之前的操作
    //     // },
    //     success:function (res/*,status,xhr*/) {
    //         //请求成功之后的操作，res是成功后的数据
    //         console.log(res);
    //         location.href = "../pages/index.html?account="+formData.account;
    //     },
    //     error:function (res) {
    //         //请求失败之后的操作，res是失败后的数据
    //         console.log(res)
    //     }
    // })
}
/**
 * 渲染
 * 上传图片渲染到页面内
 */
$("#addImg").on("change",function () {
    console.log("123");
    $("#imgUp").attr("src", "#");
    var filePath = $(this).val();
    fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase();
    var src= window.URL.createObjectURL(this.files[0]);
    //转成可以在本地预览的格式
    $("#imgUp").attr("src", src);
});

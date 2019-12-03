/**
*将上传的图片展示出来
* 监听，当file-input的value值改变时，运行
 */
var i = -1;
var fileArr = [];
var src = [];
$("#chooseImg").on("change",function () {
    i++;
    var filePath = $(this).val();
    fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase();
    src[i] = window.URL.createObjectURL(this.files[0]);
    //转成可以在本地预览的格式
    renderImg();
});
/**
 * 渲染图片
 */
function renderImg() {
    for(var j = 0;j<=i;j++){
        fileArr[j] = src[j];
        $(".imgPreviewBox").append("<div class=\"imgPreview\" id=\"imgPreview"+j+"\">\n" +
            "                        <img src=\"#\" class=\"cropedBigImg\" id=\"cropedBigImg"+j+"\" />\n" +
            "                        <span class=\"mui-icon mui-icon-close icon-close\" id=\"icon-close"+j+"\" onclick=\"deleteFile("+j+")\"></span>\n" +
            "                    </div>");
        $('#imgPreview'+j).css('display','block');
        $('#cropedBigImg'+j).css('display','block');
        $('#cropedBigImg'+j).attr('src', src[j]);
    }
}
/**
*删除渲染出来的图片
 */
function deleteFile(index) {
    $('#cropedBigImg'+index).attr('src','#');
    $('#imgPreview'+index).css('display','none');
    $('#cropedBigImg'+index).css('display','none');
    fileArr.splice(index,1);
    i--;
    renderImg();
}
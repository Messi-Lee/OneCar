var typeData = {
    0: "Vehicle_type",
    1: "Vehicle_damage",
    4:"Vehicle_detection",
};
var userId;
var persentType;
window.onload = function () {
    var name =  location.href.split("?")[1].split("=")[0];
    if (name != "id"){
        alert("请先登录!!5秒后进入登录页面...")
        setTimeout(function () {
            location.href = "login.html";
        },5000)
    }
//判断是属于哪种识别
    persentType = location.href.split("=",)[2];
    userId = location.href.split("=",)[1].split("&&")[0];
    renderCarPage(persentType);
    startInputListen();
}
/**
 *渲染
 * 根据前一页面上传的数据
 * 渲染整个图片上传扫描页面
 */
function renderCarPage(num) {
    $(".oneCar_main").empty();
    if (persentType == "0"){
        $(".oneCar_main").append("<header class=\"mui-bar mui-bar-nav oneCar_head\">\n" +
            "            <span class=\"mui-icon mui-icon-undo\" onclick=\"function Reback() {\n" +
            "                  location.href = '../index.html?id='+ userId;\n" +
            "                  };Reback()\"></span>\n" +
            "            <span class=\"mui-title oneCar_title\" style=\"left: 6.25rem;right: 6.25rem;color: white;\">"+typeData[num]+"</span>\n" +
            "        </header>\n" +
            "        <!--页面功能主题区-->\n" +
            "        <div class=\"recognitionBox\">\n" +
            "            <!--图片上传并展示-->\n" +
            "            <div class=\"imgUpBox\">\n" +
            "                <div class=\"conshowed\"></div>\n" +
            "                <img src=\"../../images/car/car1.jpg\" class=\"imgUp\" id=\"imgUp\">\n" +
            "            </div>\n" +
            "             <!--返回信息展示-->\n" +
            "            <div class=\"displayInf\">\n" +
            "               <table class=\"disTable\">\n" +
            "                    <tr>\n" +
            "                        <td>score</td>\n" +
            "                        <td>0.9998834</td>\n" +
            "                    </tr>\n" +
            "                    <tr>\n" +
            "                        <td>name</td>\n" +
            "                        <td>name</td>\n" +
            "                    </tr>\n" +
            "                    <tr>\n" +
            "                        <td>year</td>\n" +
            "                        <td>2016-2017</td>\n" +
            "                    </tr>\n" +
            "                    <tr>\n" +
            "                        <td>color_result</td>\n" +
            "                        <td>蓝色</td>\n" +
            "                    </tr>\n" +
            "                </table>" +
            "            </div>\n" +
            "             <!--添加图片实现按钮-->\n" +
            "            <button class=\"addImgButton\">上传</button>\n" +
            "            <input type=\"file\" accept=\"image/jpg,image/jpeg,image/png,image/PNG\" class=\"addImg\" id=\"addImg\">"+
            "        </div>")
    }else if (persentType == "1"){
        $(".oneCar_main").append("<header class=\"mui-bar mui-bar-nav oneCar_head\">\n" +
            "            <span class=\"mui-icon mui-icon-undo\" onclick=\"function Reback() {\n" +
            "                  location.href = '../index.html?id='+ userId;\n" +
            "                  };Reback()\"></span>\n" +
            "            <span class=\"mui-title oneCar_title\" style=\"left: 6.25rem;right: 6.25rem;color: white;\">"+typeData[num]+"</span>\n" +
            "        </header>\n" +
            "        <!--页面功能主题区-->\n" +
            "        <div class=\"recognitionBox\">\n" +
            "            <!--图片上传并展示-->\n" +
            "            <div class=\"imgUpBox\">\n" +
            "                <div class=\"conshowed\"></div>\n" +
            "                <img src=\"../../images/car/QQ截图20191204101213.jpg\" class=\"imgUp\" id=\"imgUp\">\n" +
            "            </div>\n" +
            "             <!--返回信息展示-->\n" +
            "            <div class=\"displayInf\">\n" +
            "               <table class=\"disTable\">\n" +
            "                    <tr>\n" +
            "                        <td>parts</td>\n" +
            "                        <td>前保险杠</td>\n" +
            "                    </tr>\n" +
            "                    <tr>\n" +
            "                        <td>probability</td>\n" +
            "                        <td>82</td>\n" +
            "                    </tr>\n" +
            "                    <tr>\n" +
            "                        <td>type</td>\n" +
            "                        <td>乱擦</td>\n" +
            "                    </tr>\n" +
            "                </table>" +
            "            </div>\n" +
            "             <!--添加图片实现按钮-->\n" +
            "            <button class=\"addImgButton\">上传</button>\n" +
            "            <input type=\"file\" accept=\"image/jpg,image/jpeg,image/png,image/PNG\" class=\"addImg\" id=\"addImg\">"+
            "        </div>")
    }else if (persentType == "4"){
        $(".oneCar_main").append("<header class=\"mui-bar mui-bar-nav oneCar_head\">\n" +
            "            <span class=\"mui-icon mui-icon-undo\" onclick=\"function Reback() {\n" +
            "                  location.href = '../index.html?id='+ userId;\n" +
            "                  };Reback()\"></span>\n" +
            "            <span class=\"mui-title oneCar_title\" style=\"left: 6.25rem;right: 6.25rem;color: white;\">"+typeData[num]+"</span>\n" +
            "        </header>\n" +
            "        <!--页面功能主题区-->\n" +
            "        <div class=\"recognitionBox\">\n" +
            "            <!--图片上传并展示-->\n" +
            "            <div class=\"imgUpBox\">\n" +
            "                <div class=\"conshowed\"></div>\n" +
            "                <img src=\"../../images/car/QQ截图20191204114109.jpg\" class=\"imgUp\" id=\"imgUp\">\n" +
            "            </div>\n" +
            "             <!--返回信息展示-->\n" +
            "            <div class=\"displayInf\">\n" +
            "               <table class=\"disTable\">\n" +
            "                    <tr>\n" +
            "                        <td>cars</td>\n" +
            "                        <td>13</td>\n" +
            "                    </tr>\n" +
            "                    <tr>\n" +
            "                        <td>bus</td>\n" +
            "                        <td>2</td>\n" +
            "                    </tr>\n" +
            "                </table>" +
            "            </div>\n" +
            "             <!--添加图片实现按钮-->\n" +
            "            <button class=\"addImgButton\">上传</button>\n" +
            "            <input type=\"file\" accept=\"image/jpg,image/jpeg,image/png,image/PNG\" class=\"addImg\" id=\"addImg\">"+
            "        </div>")
    }

}
/**
 * 上传
 * 上传图片进行扫描
 * 获得相关信息
 */
function uploadImg(num) {
    var formData = new FormData();
    formData.append("file",$("#addImg").get(0).files[0]);
    formData.append("type",num);
    $.ajax({
        url:Url+"/picture2",
        type:"post",
        data:formData,
        async:true,//true 异步请求（默认）；false 同步请求
        dataType:"json",
        // beforeSend:function (XMLHttpRequest) {
        //    XMLHttpRequest.setRequestHeader("token","token") //在请求之前的操作
        // },
        processData: false, // 告诉jQuery不要去处理发送的数据
        contentType: false, // 告诉jQuery不要去设置Content-Type请求头
        success:function (res/*,status,xhr*/) {
            //请求成功之后的操作，res是成功后的数据
            console.log(res);
            renderBackInf(res.data);
        },
        error:function (res) {
            //请求失败之后的操作，res是失败后的数据
            console.log(res)
        }
    })
}
/**
 * 渲染
 * 上传图片渲染到页面内
 */
function startInputListen() {
    $("#addImg").on("change",function (e) {
        $("#imgUp").attr("src", "#");
        var filePath = $(this).val();
        fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase();
        var src= window.URL.createObjectURL(this.files[0]);
        //转成可以在本地预览的格式
        $("#imgUp").attr("src", src);
        uploadImg(persentType);
    });
}

/**
 *渲染
 * 渲染返回信息
 */
function renderBackInf(data) {
    $(".displayInf")[0].style.display = "block";
    $(".disTable").empty();
    if (persentType == "0"){
        for (let i in data){
            if (i==="color_result"){
                $(".disTable").append("<tr>\n" +
                    "    <td>"+i+"</td>\n" +
                    "    <td>"+data[i]+"</td>\n" +
                    "</tr>")
            }
            else if(i==="result"){
                for(let j in data[i][0]){
                    if (j==="name"){
                        $(".disTable").append("<tr>\n" +
                            "    <td>"+j+"</td>\n" +
                            "    <td>"+data[i][0][j]+"</td>\n" +
                            "</tr>")
                    }else if (j==="score"){
                        $(".disTable").append("<tr>\n" +
                            "    <td>"+j+"</td>\n" +
                            "    <td>"+data[i][0][j]+"</td>\n" +
                            "</tr>")
                    }else if (j==="year"){
                        $(".disTable").append("<tr>\n" +
                            "    <td>"+j+"</td>\n" +
                            "    <td>"+data[i][0][j]+"</td>\n" +
                            "</tr>")
                    }
                }
            }
        }
    }else if (persentType == "1"){
        for (let i in data){
            if(i==="result"){
                for(let j in data[i].damage_info[0]){
                    if (j==="parts"){
                        $(".disTable").append("<tr>\n" +
                            "    <td>"+j+"</td>\n" +
                            "    <td>"+data[i].damage_info[0][j]+"</td>\n" +
                            "</tr>")
                    }else if (j==="prosibability"){
                        $(".disTable").append("<tr>\n" +
                            "    <td>"+j+"</td>\n" +
                            "    <td>"+data[i].damage_info[0][j]+"</td>\n" +
                            "</tr>")
                    }else if (j==="type"){
                        $(".disTable").append("<tr>\n" +
                            "    <td>"+j+"</td>\n" +
                            "    <td>"+data[i].damage_info[0][j]+"</td>\n" +
                            "</tr>")
                    }
                }
            }
        }
    }else if (persentType == "4"){
        let carNum = 0;
        let busNum = 0;
        for (let i in data){
            if(i==="vehicle_info"){
                for(let j = 0;j<data[i].length;j++){
                    if (data[i][j].type == "car"){
                        carNum++;
                    }else if (data[i][j].type == "bus"){
                        busNum++;
                    }
                }
            }
        }
        $(".disTable").append(
            "                    <tr>\n" +
            "                        <td>cars</td>\n" +
            "                        <td>"+carNum+"</td>\n" +
            "                    </tr>\n" +
            "                    <tr>\n" +
            "                        <td>bus</td>\n" +
            "                        <td>"+busNum+"</td>\n" +
            "                    </tr>\n")
    }

}
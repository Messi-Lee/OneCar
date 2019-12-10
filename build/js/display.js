var userId;
window.onload = function () {
    var name =  location.href.split("?")[1].split("=")[0];
    if (name != "id"){
        alert("请先登录!!5秒后进入登录页面...")
        setTimeout(function () {
            location.href = "login.html";
        },5000)
    }
	userId = location.href.split("=",)[1].split("&&")[0];
	draftId = location.href.split("=",)[2];
	getThought(draftId);
}
function Reback() {
	location.href = '../index.html?id='+userId;
};
function getThought(draftId){
	$.ajax({
		url: Url+"/draft/"+draftId,
		type:"get",
		data:{
			id:draftId,
		},
		async:false,
		dataType:"json",
		success:function(res){
			console.log(res.data);
			render(res.data);
			renderTag(res.data.labels);
			renderComent(res.data.replyList);
		},
		error:function(res){
			console.log(res);
		}
	
	})
}
function render(data){
	$(".thought").empty();
	var id = data.draftId;
	$(".thought").append("<div class=\"mui-content-padded oneCom_padded\" id=\""+id+"\">\n" +
			"\t\t\t\t\t\t\t<div class=\"oneCom_pageTitle\">\n" +
			"\t\t\t\t\t\t\t\t<div class=\"ID_image oneCom_image\">\n" +
			"\t\t\t\t\t\t\t\t\t<img src=\"../../images/person/people.png\" />\n" +
			"\t\t\t\t\t\t\t\t</div>\n" +
			"\t\t\t\t\t\t\t\t<div class=\"ID_name oneCom_name\">\n" +
			"\t\t\t\t\t\t\t\t\t<div>"+data.username+"</div>\n" +
			"\t\t\t\t\t\t\t\t</div>\n" +
			"\t\t\t\t\t\t\t</div>\n" +
			"\t\t\t\t\t\t\t<div class=\"oneCom_pageText\">\n" +
			"\t\t\t\t\t\t\t\t<p>&nbsp;&nbsp;&nbsp;&nbsp;"+data.content+"</p>\n" +
		     "\t\t\t\t\t\t\t\t<img src=\""+data.imgSrc+"\">\n" +
			"\t\t\t\t\t\t\t</div>\n" +
		    "\t\t\t\t\t\t\t<div class=\"Tag\">\n" +
		    "                    </div>"+
			"\t\t\t\t\t\t\t<div class=\"oneCom_pageLike\">\n" +
			"\t\t\t\t\t\t\t<span class=\"mui-icon iconfont icon-like\" id=\"like"+data.draftId+"\" onclick=\"doLike('"+id+"')\">\n" +
			"\t\t\t\t\t\t\t\t<span class=\"mui-badge\" id=\"likeNum"+id+"\">"+data.likeNum+"</span>\n" +
			"\t\t\t\t\t\t\t</span>\n" +
			"\t\t\t\t\t\t\t\t<span class=\"mui-icon iconfont icon-news\" id=\"view"+data.draftId+"\" onclick=\"dofocus('"+id+"')\">\n" +
			"\t\t\t\t\t\t\t\t<span class=\"mui-badge\" id=\"viewNum"+id+"\" >"+data.viewNum+"</span>\n" +
			"\t\t\t\t\t\t\t</span>\n" +
			"\t\t\t\t\t\t\t</div>\n" +
			"\t\t\t\t\t\t\t<div class=\"oneCom_pageComment\">\n" +
			"\t\t\t\t\t\t\t\t<input type=\"text\" name=\"comment\" class=\"commentText"+id+"\">\n" +
			"\t\t\t\t\t\t\t\t<button class=\"commentButton\" onclick=\"writeComment()\">comment</button>\n" +
			"\t\t\t\t\t\t\t</div>\n" +
			"\t\t\t\t\t\t</div>")
}
function renderTag(data) {
	$(".Tag").empty();
	for (let i = 0;i<data.length;i++){
		$(".Tag").append("<span class=\"TagText\">"+data[i].labelName+"</span>")
	}

}
function writeComment() {
	$.ajax({
		url: Url+"/reply/",
		type:"post",
		data:{
			draftId:draftId,
			parentId:"0000",
			replyContent: $(".commentText"+draftId).val(),
			replyUserId:userId,
		},
		async:false,
		dataType:"json",
		success:function(res){
			console.log(res.data);
			$(".commentBox").append("<div class=\"userComment\">\n" +
				"            <div class=\"oneCom_pageTitle\">\n" +
				"                <div class=\"ID_image oneCom_image\">\n" +
				"                    <img src=\"../../images/person/people.png\" />\n" +
				"                </div>\n" +
				"                <div class=\"ID_name oneCom_name\">\n" +
				"                    <div>"+localStorage['user_name']+"</div>\n" +
				"                </div>\n" +
				"                <div class=\"replyTime\">\n" +
				"                    <div>"+res.data.createTime.substr(0,19)+"</div>\n" +
				"                </div>\n" +
				"            </div>\n" +
				"            <div class=\"commentText\">"+res.data.replyContent+"</div>\n" +
				"        </div>")
			location.reload();
		},
		error:function(res){
			console.log(res);
		}

	})
}
function renderComent(data) {
	$(".commentBox").empty();
	for (let i = 0;i<data.length;i++){
		$(".commentBox").append("<div class=\"userComment\">\n" +
			"            <div class=\"oneCom_pageTitle\">\n" +
			"                <div class=\"ID_image oneCom_image\">\n" +
			"                    <img src=\"../../images/person/people.png\" />\n" +
			"                </div>\n" +
			"                <div class=\"ID_name oneCom_name\">\n" +
			"                    <div>"+data[i].replyUsername+"</div>\n" +
			"                </div>\n" +
			"                <div class=\"replyTime\">\n" +
			"                    <div>"+data[i].replyTime.substr(0,20)+"</div>\n" +
			"                </div>\n" +
			"            </div>\n" +
			"            <div class=\"commentText\">"+data[i].replyContent+"</div>\n" +
			"        </div>")
	}
}
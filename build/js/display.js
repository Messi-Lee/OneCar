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
	getThought(draftId)
}
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
		},
		error:function(res){
			console.log(res);
		}
	
	})
}
function render(data){
	$(".thought").empty();
	var id = data[i].draftId;
	$(".thought").append("<div class=\"mui-content-padded oneCom_padded\" id=\""+id+"\" onclick=\"oneThought("+id+")\">\n" +
			"\t\t\t\t\t\t\t<div class=\"oneCom_pageTitle\">\n" +
			"\t\t\t\t\t\t\t\t<div class=\"ID_image oneCom_image\">\n" +
			"\t\t\t\t\t\t\t\t\t<img src=\"../images/person/people.png\" />\n" +
			"\t\t\t\t\t\t\t\t</div>\n" +
			"\t\t\t\t\t\t\t\t<div class=\"ID_name oneCom_name\">\n" +
			"\t\t\t\t\t\t\t\t\t<div>"+data[i].username+"</div>\n" +
			"\t\t\t\t\t\t\t\t</div>\n" +
			"\t\t\t\t\t\t\t</div>\n" +
			"\t\t\t\t\t\t\t<div class=\"oneCom_pageText\">\n" +
			"\t\t\t\t\t\t\t\t<p>&nbsp;&nbsp;&nbsp;&nbsp;"+data[i].content+"</p>\n" +
			"\t\t\t\t\t\t\t</div>\n" +
			"\t\t\t\t\t\t\t<div class=\"oneCom_pageLike\">\n" +
			"\t\t\t\t\t\t\t<span class=\"mui-icon iconfont icon-like\" id=\"like"+data[i].draftId+"\" onclick=\"doLike("+id+")\">\n" +
			"\t\t\t\t\t\t\t\t<span class=\"mui-badge\" id=\"likeNum"+id+"\">"+data[i].likeNum+"</span>\n" +
			"\t\t\t\t\t\t\t</span>\n" +
			"\t\t\t\t\t\t\t\t<span class=\"mui-icon iconfont icon-news\" id=\"view"+data[i].draftId+"\" onclick=\"dofocus("+id+")\">\n" +
			"\t\t\t\t\t\t\t\t<span class=\"mui-badge\" id=\"viewNum"+id+"\" >"+data[i].viewNum+"</span>\n" +
			"\t\t\t\t\t\t\t</span>\n" +
			"\t\t\t\t\t\t\t</div>\n" +
			"\t\t\t\t\t\t\t<div class=\"oneCom_pageComment\">\n" +
			"\t\t\t\t\t\t\t\t<input type=\"text\" name=\"comment\" class=\"commentText"+id+"\">\n" +
			"\t\t\t\t\t\t\t\t<button class=\"commentButton\">comment</button>\n" +
			"\t\t\t\t\t\t\t</div>\n" +
			"\t\t\t\t\t\t</div>")
	}
}
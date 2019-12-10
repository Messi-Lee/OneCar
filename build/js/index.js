mui.init();
/**
 * 页面自动执行的函数
 */
var userId;
// var divActive;
window.onload = function () {
	userId = location.href.split("=")[1];
	var name =  location.href.split("?")[1].split("=")[0];
	if (name != "id"){
		alert("请先登录!!5秒后进入登录页面...")
		setTimeout(function () {
			location.href = "login.html";
		},5000)
	}
	//定位问题
	var myCity = new BMap.LocalCity();
	myCity.get(MyPosition);
	//时间问题
	getDate();
	getAllThought();//获得所有帖子
	getAllmessage();//获取所有消息
	getInf();//获取所有用户信息
	getThought(userId);
}
// mui.ready(function(){
// 	
// })
//获取时间
function getDate() {
	var myDate = new Date;
	var year = myDate.getFullYear();//获取当前年
	var yue = myDate.getMonth()+1;//获取当前月
	var date = myDate.getDate();//获取当前日
	$(".oneCar_date").empty();
	$(".oneCar_date").append("<span>"+year+"/"+yue+"/"+date+"</span>")
}
/**
*解决定位问题
 */
function MyPosition(result) {
	$(".oneCar_adress").empty();
	$(".oneCar_adress").append("<span class=\"mui-icon iconfont icon-location\" style=\"font-size: 1rem;\"></span>\n" +
		"\t\t\t\t    <span>"+result.name+"</span>")
}
/**
 * car
 * 点击跳转页面
 * 向页面传送值，确定其功能
 */
function recon_num(data) {
	location.href = "Car/car.html?id="+userId+"&&type="+data;
}

/**
 * community
 * 获取所有的想法
 */
function getAllThought() {
	mui.ajax({
		url: Url+"/drafts",
		type:"get",
		data:{},
		async:false,
		dataType:"json",
		success:function(res){
			console.log(res.data);
			renderThought(res.data);
		},
		error:function(res){
			console.log(res);
		}
	})
}

/**
 * community
 * 渲染所有帖子
 */
function renderThought(data) {
	$(".thoughtBox").empty();
	for (var i = 0;i<data.length;i++){
		var id = data[i].draftId;
		$(".thoughtBox").append("<div class=\"mui-content-padded oneCom_padded\" id=\""+id+"\" >\n" +
			"\t\t\t\t\t\t\t<div class=\"oneCom_pageTitle\">\n" +
			"\t\t\t\t\t\t\t\t<div class=\"ID_image oneCom_image\">\n" +
			"\t\t\t\t\t\t\t\t\t<img src=\"../images/person/people.png\" />\n" +
			"\t\t\t\t\t\t\t\t</div>\n" +
			"\t\t\t\t\t\t\t\t<div class=\"ID_name oneCom_name\">\n" +
			"\t\t\t\t\t\t\t\t\t<div>"+data[i].username+"</div>\n" +
			"\t\t\t\t\t\t\t\t</div>\n" +
			"\t\t\t\t\t\t\t</div>\n" +
			"\t\t\t\t\t\t\t<div class=\"oneCom_pageText\" onclick=\"oneThought('"+id+"')\">\n" +
			"\t\t\t\t\t\t\t\t<p>&nbsp;&nbsp;&nbsp;&nbsp;"+data[i].content.substr(0,40)+'...'+"</p>\n" +
			"\t\t\t\t\t\t\t</div>\n" +
			"\t\t\t\t\t\t\t<div class=\"oneCom_pageLike\">\n" +
			"\t\t\t\t\t\t\t<span class=\"mui-icon iconfont icon-like\" id=\"like"+data[i].draftId+"\" onclick=\"doLike('"+id+"')\">\n" +
			"\t\t\t\t\t\t\t\t<span class=\"mui-badge\" id=\"likeNum"+id+"\">"+data[i].likeNum+"</span>\n" +
			"\t\t\t\t\t\t\t</span>\n" +
			"\t\t\t\t\t\t\t\t<span class=\"mui-icon iconfont icon-news\" id=\"view"+data[i].draftId+"\" onclick=\"dofocus('"+id+"')\">\n" +
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
/**
 * community
 * 点击跳转到写想法的页面
 */
function writePage() {
	window.location.href = "Community/writeThought.html?id="+userId;
}
/**
 * community
 * 实现点赞功能
 */
function doLike(id){
	var color = document.getElementById("like"+id);
	console.log(color);
	if(color.style.color == "red"){
		color.style.color = "#8f8f94";
		// likeDone(id,0);
	}else{
		color.style.color = "red";
		likeDone(id);
	}
}

function likeDone(id){
	mui.ajax({
		url:Url+"/draft/like/"+id,
		type:"get",
		data:{
			id:id,
			},
		async:false,
		dataType:"json",
		success:function(res){
			console.log("成功");
			$("#likeNum"+id).text(parseInt($("#likeNum"+id).text())+1);
		},
		error:function(res){
			console.log("失败");
		}
	})
}
/**
 * community
 * 点击评论图标，聚焦于input框
 */
function dofocus(id){
	$(".commentText"+id).focus();
}
/**
 * community
 * 从写页面进入该页面
 */
// function Access_page() {
// 	// $("#car").removeClass("mui-active");
// 	// $("#oneCar")[0].style.display = "none";
// 	// $("#community").addClass("mui-active");
// 	// $("#oneCar-with-community")[0].style.display = "block";
// 	// location .href = "index.html?id="+userId;
// }
/**
 * community
 * 跳入指定帖子
 */
function oneThought(id){
	location.href = "Community/display.html?id="+userId+"&&draftId="+id;
}
/**
 * messages
 * 获取所有消息
 */
function getAllmessage() {
	mui.ajax({
		url: Url+"/userMessage/"+userId,
		type:"get",
		data:{
			id:userId,
		},
		async:false,
		dataType:"json",
		success:function(res){
			console.log(res.data);
			renderMessage(res.data);
			$(".mui-badge").text(res.data.length);
		},
		error:function(res){
			console.log(res);
		}

	})
}

/**
 * message
 * 渲染所有消息
 */
function renderMessage(data){
	$(".messageBox").empty();
	for (let i = 0;i<data.length;i++){
		$(".messageBox").append("<div class=\"message\">\n" +
			"\t\t\t\t\t\t\t<p>"+data[i].messageContent+"</p>\n" +
			"\t\t\t\t\t\t\t<span>"+data[i].createTime.substr(0,19)+"</span>\n" +
			"\t\t\t\t\t\t</div>")
	}

}

/**
 * person
 * 获取用户信息
 * 进入页面立即获取
 */
function getInf(){
	mui.ajax({
		url: Url+"/user/"+userId,
		type:"get",
		data:{
			id:userId,
		},
		async:false,
		dataType:"json",
		success:function(res){
			renderInf(res.data);
			localStorage["user_name"] = res.data.username;
		},
		error:function(res){
			console.log(res);
		}

	})
};
/**
 * person
 * 渲染用户信息
 */
function renderInf(data) {
	$("#oneCar-with-person").empty();
	$("#oneCar-with-person").append("<div class=\"oneCar_informationBox\">\n" +
		"                        <!--personInf-->\n" +
		"\t\t\t\t\t\t<div class=\"personInf\">\n" +
		"\t\t\t\t\t\t\t<div class=\"informationImg\">\n" +
		"\t\t\t\t\t\t\t\t<div class=\"ID_image\">\n" +
		"\t\t\t\t\t\t\t\t\t<img src=\"../images/person/people.png\" />\n" +
		"\t\t\t\t\t\t\t\t</div>\n" +
		"\t\t\t\t\t\t\t</div>\n" +
		"\t\t\t\t\t\t\t<div class=\"informationText\">\n" +
		"\t\t\t\t\t\t\t\t<div class=\"ID_name\">\n" +
		"\t\t\t\t\t\t\t\t\t<h2>"+data.username+"</h2>\n" +
		"\t\t\t\t\t\t\t\t</div>\n" +
		"\t\t\t\t\t\t\t\t<span class=\" mui-icon mui-icon-forward Inf-next\" onclick=\"InfGetout()\"></span>\n" +
		"\t\t\t\t\t\t\t\t<span class=\" mui-icon iconfont icon-logout\" style=\"font-size: 21px;\" onclick=\"logOut()\"></span>\n" +
		"\t\t\t\t\t\t\t</div>\n" +
		"\t\t\t\t\t\t</div>\n" +
		"                        <!--personal information-->\n" +
		"\t\t\t\t\t\t<div class=\"oneCar_informationTable\">\n" +
		"\t\t\t\t\t\t\t<table class=\"inf-table\">\n" +
		"\t\t\t\t\t\t\t\t<tr>\n" +
		"\t\t\t\t\t\t\t\t\t<td>userName</td>\n" +
		"\t\t\t\t\t\t\t\t\t<td>\n" +
		"\t\t\t\t\t\t\t\t\t\t<input type=\"text\" name=\"userName\" id=\"userName\" value=\""+data.username+"\"\n" +
		"\t\t\t\t\t\t\t\t\t\t\t   readonly=\"readonly\"/>\n" +
		"\t\t\t\t\t\t\t\t\t</td>\n" +
		"\t\t\t\t\t\t\t\t</tr>\n" +
		"\t\t\t\t\t\t\t\t<tr>\n" +
		"\t\t\t\t\t\t\t\t\t<td>passWord</td>\n" +
		"\t\t\t\t\t\t\t\t\t<td>\n" +
		"\t\t\t\t\t\t\t\t\t\t<input type=\"password\" name=\"passWord\" id=\"passWord\" value=\""+data.password+"\"\n" +
		"\t\t\t\t\t\t\t\t\t\t\t   readonly=\"readonly\"/>\n" +
		"\t\t\t\t\t\t\t\t\t</td>\n" +
		"\t\t\t\t\t\t\t\t</tr>\n" +
		"\t\t\t\t\t\t\t\t<tr>\n" +
		"\t\t\t\t\t\t\t\t\t<td>email</td>\n" +
		"\t\t\t\t\t\t\t\t\t<td>\n" +
		"\t\t\t\t\t\t\t\t\t\t<input type=\"email\" name=\"email\" id=\"email\" value=\""+data.email+"\"\n" +
		"\t\t\t\t\t\t\t\t\t\t\t   readonly=\"readonly\"/>\n" +
		"\t\t\t\t\t\t\t\t\t</td>\n" +
		"\t\t\t\t\t\t\t\t</tr>\n" +
		"\t\t\t\t\t\t\t</table>\n" +
		"\t\t\t\t\t\t\t<button id=\"edit_inf\" onclick=\"editInf()\">Edit</button>\n" +
		"\t\t\t\t\t\t\t<button id=\"ok_Inf\" onclick=\"okInf()\">OK</button>\n" +
		"\t\t\t\t\t\t</div>\n" +
		"                        <!--personalThought-title-->\n" +
		"\t\t\t\t\t\t<div class=\"personalThought-title\">\n" +
		"\t\t\t\t\t\t\tmyself thought\n" +
		"\t\t\t\t\t\t</div>\n" +
		"                        <!--personalThought-->\n" +
		"\t\t\t\t\t\t<div class=\"personalThought\">\n" +
		"\t\t\t\t\t\t</div>\n" +
		"\t\t\t\t\t</div>")
}

/**
 * person
 * 获取问答
 */
function getThought(id) {
	mui.ajax({
		url: Url+"/userDrafts/"+userId,
		type:"get",
		data:{
			userId:id,
		},
		async:false,
		dataType:"json",
		success:function(res){
			renderThoughtId(res.data);
		},
		error:function(res){
			console.log(res);
		}

	})
}

/**
 * person
 * 渲染根据ID获取的问答
 */
function renderThoughtId(data) {
	if (data == ""){
		$("personalThought").html("NULL!!");
	}else{
		$("personalThought").empty();
		for (let i = 0;i<data.length;i++){
			let id = data[i].draftId;
			$(".personalThought").append("<div class=\"mui-content-padded oneCom_padded\" id=\""+id+"\" >\n" +
				"\t\t\t\t\t\t\t<div class=\"oneCom_pageTitle\">\n" +
				"\t\t\t\t\t\t\t\t<div class=\"ID_image oneCom_image\">\n" +
				"\t\t\t\t\t\t\t\t\t<img src=\"../images/person/people.png\" />\n" +
				"\t\t\t\t\t\t\t\t</div>\n" +
				"\t\t\t\t\t\t\t\t<div class=\"ID_name oneCom_name\">\n" +
				"\t\t\t\t\t\t\t\t\t<div>"+data[i].username+"</div>\n" +
				"\t\t\t\t\t\t\t\t</div>\n" +
				"\t\t\t\t\t\t\t</div>\n" +
				"\t\t\t\t\t\t\t<div class=\"oneCom_pageText\" onclick=\"oneThought('"+id+"')\">\n" +
				"\t\t\t\t\t\t\t\t<p>&nbsp;&nbsp;&nbsp;&nbsp;"+data[i].content.substr(0,40)+'...'+"</p>\n" +
				"\t\t\t\t\t\t\t</div>\n" +
				"\t\t\t\t\t\t\t<div class=\"oneCom_pageLike\">\n" +
				"\t\t\t\t\t\t\t<span class=\"mui-icon iconfont icon-like\" id=\"like"+data[i].draftId+"\" onclick=\"doLike('"+id+"')\">\n" +
				"\t\t\t\t\t\t\t\t<span class=\"mui-badge\" id=\"likeNum"+id+"\">"+data[i].likeNum+"</span>\n" +
				"\t\t\t\t\t\t\t</span>\n" +
				"\t\t\t\t\t\t\t\t<span class=\"mui-icon iconfont icon-news\" id=\"view"+data[i].draftId+"\" onclick=\"dofocus('"+id+"')\">\n" +
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
}

/**
 * person
 * 编辑功能实现
 * 编辑按钮实现编辑
 */


function editInf(){
	var usern = document.getElementById("userName");
	var passw = document.getElementById("passWord");
	var e_mail = document.getElementById("email");
	var ok_Inf =  document.getElementById("ok_Inf");
	usern.removeAttribute("readonly");
	usern.style.background = "#fff";
	usern.style.border = "1px solid rgba(0,0,0,.2)";
	usern.focus();
	passw.removeAttribute("readonly");
	passw.style.background = "#fff";
	passw.style.border = "1px solid rgba(0,0,0,.2)";
	e_mail.removeAttribute("readonly");
	e_mail.style.background = "#fff";
	e_mail.style.border = "1px solid rgba(0,0,0,.2)";
	ok_Inf.style.display = "block";
}
/**
 * person
 * 编辑功能实现
 * ok按钮实现数据上传
 */
function okInf(){
	var usern = document.getElementById("userName");
	var passw = document.getElementById("passWord");
	var e_mail = document.getElementById("email");
	var ok_Inf =  document.getElementById("ok_Inf");
	console.log(userName);
	usern.readonly = "readonly";
	usern.style.background = "rgba(247, 247, 247, 0)";
	usern.style.border = "rgba(247, 247, 247, 0)";
	passw.readonly = "readonly";
	passw.style.background = "rgba(247, 247, 247, 0)";
	passw.style.border = "rgba(247, 247, 247, 0)";
	e_mail.readonly = "readonly";
	e_mail.style.background = "rgba(247, 247, 247, 0)";
	e_mail.style.border = "rgba(247, 247, 247, 0)";
	ok_Inf.style.display = "none";
	var formData = new FormData;
	localStorage["username"]=usern.value;
	localStorage["user_password"]=passw.value;
	localStorage["user_email"]=e_mail.value;
	upInf();
	getInf();
	localStorage.removeItem("username");
	localStorage.removeItem("user_password");
	localStorage.removeItem("user_email");
}

/**
 * person
 * 修改
 * 修改个人信息
 */
function upInf(){
	$.ajax({
		url:Url+"/v1/unpub/user/"+userId,
		type:"put",
		data:{
			id:userId,
			username:JSON.stringify(localStorage["username"]).replaceAll("\"",""),
			password:JSON.stringify(localStorage["user_password"]).replaceAll("\"",""),
			email:JSON.stringify(localStorage["user_email"]).replaceAll("\"",""),
		},
		async:false,
		dataType:"json",
		success:function (res){
			alert("修改成功");
		},
		error:function (res){
			console.log(res);
		}

	})
}
/*
*person
* 个人信息展示弹出
 */
var inf_table_status = 0;//声明变量，个人信息的开关状态
function InfGetout(){
	var informationTable = $(".oneCar_informationTable")["0"];
	var InfNext = $(".Inf-next")["0"];
	if (informationTable.style.display == "none" || inf_table_status == 0){
		informationTable.style.display = "block";
		InfNext.style.transform = "rotate(90deg)";
		inf_table_status = 1;
	}else{
		informationTable.style.display = "none";
		InfNext.style.transform = "rotate(0deg)";
		inf_table_status = 0
	}
	// console.log("个人信息的开关状态"+inf_table_status);
}
/*
*person
* 滚动监听
* 监听实现myself thought固定
 */
window.onscroll = function() {
	//为了保证兼容性，这里取两个值，哪个有值取哪一个
	//scrollTop就是触发滚轮事件时滚轮的高度
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	var scrollOffest;//声明变量，向上滚动的距离
	if (inf_table_status == 0){
		scrollOffest = document.getElementsByClassName("personInf")["0"].scrollHeight;
	}else if (inf_table_status == 1){
		scrollOffest = document.getElementsByClassName("personInf")["0"].scrollHeight+ document.getElementsByClassName("oneCar_informationTable")["0"].scrollHeight;
	};
	// console.log("向上滚动的距离"+scrollOffest);
	fixpersonalThought_title(scrollTop,scrollOffest);
}
function fixpersonalThought_title(scrollTop,scrollOffest) {
	var personalThought_title = $(".personalThought-title")["0"].style;
	if(scrollTop >= scrollOffest){
		personalThought_title.position = "fixed";
		personalThought_title.zIndex = "12";
		personalThought_title.top = "40px";
		personalThought_title.backgroundColor = "#38f2d2";
		if (inf_table_status == 1){
			InfGetout();
		}
	}else{
		// console.log(scrollTop);
		personalThought_title.position = "relative";
		personalThought_title.zIndex = "";
		personalThought_title.top = "";
		personalThought_title.backgroundColor = "";
	}
}
/**
 * person
 * 退出
 * 退出登录的同时
 * 如果有自动登录功能，则关闭
 */
function logOut(){
	var account = localStorage['local-account'];
	if(account != ""){
		localStorage.removeItem("local-account");
		localStorage.removeItem("local-password");
	}
	location.href = "../pages/login.html"
	// mui.openWindow({
	// 	url:"../pages/login.html",
	// 	// id: ,
	// 	styles:{
	// 		top:0,//新页面顶部位置
	// 		bottom:0,//新页面底部位置
	// 	},
	// 	// extras:{
	// 	// 	userId:res.data.userId,
	// 	// },
	// 	createNew:false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
	// 	show:{
	// 		autoShow:true,//页面loaded事件发生后自动显示，默认为true
	// 		aniShow:"slide-in-right",//页面显示动画，默认为”slide-in-right“；
	// 		// duration:animationTime//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
	// 	},
	// 	waiting:{
	// 		autoShow:true,//自动显示等待框，默认为true
	// 		title:'正在加载...',//等待对话框上显示的提示内容
	// 		options:{
	// 			// width:waiting-dialog-widht,//等待框背景区域宽度，默认根据内容自动计算合适宽度
	// 			// height:waiting-dialog-height,//等待框背景区域高度，默认根据内容自动计算合适高度
	// 			// ......
	// 		}
	// 	}
	// });
	
}
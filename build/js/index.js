/**
 * 页面自动执行的函数
 */
var account;
window.onload = function(){
	// 获取account
	//  split()
	account = location.href.split("=")[1];
	// renderInf();
	//定位问题
	// var myCity = new BMap.LocalCity();
	// myCity.get(MyPosition);
}
/*
*解决定位问题
 */
// function MyPosition(result) {
// 	$(".oneCar_adress").empty();
// 	$(".oneCar_adress").append("<span class=\"mui-icon iconfont icon-location\" style=\"font-size: 1rem;\"></span>\n" +
// 		"\t\t\t\t    <span>"+result.name+"</span>")
// }
/**
 * community
 * 实现点赞功能
 */
// function doLike(id){
// 	var data = document.getElementById(id);
// 	if(data.style.color == "red"){
// 		data.style.color = "#8f8f94";
// 		likeDone(id,0);
// 	}else{
// 		data.style.color = "red";
// 		likeDone(id,1);
// 	}
// }

// function likeDone(id,status){
// 	$.ajax({
// 		url:"",
// 		type:,
// 		data:{id:id;},
// 		async:false,
// 		dataType:"json",
// 		success:function(res){
// 		},
// 		error:function(res){
// 			
// 		}		
// 	})
// }
/**
 * community
 * 点击评论图标，聚焦于input框
 */
// function dofocus(){
// 	$(".commentText").focus();
// }
/**
 * person
 * 获取用户信息
 * 进入页面立即获取
 */
// function getInf(id){
// 	$.ajax({
// 		url:"",
// 		type:,
// 		data:{id:id;},
// 		async:false,
// 		dataType:"json",
// 		success:function(res){
// 			renderInf(data);
// 		},
// 		error:function(res){
// 			
// 		}
// 		
// 	})
// },
/**
 * person
 * 渲染用户信息
 */
function renderInf() {
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
	var okInf =  document.getElementById("okInf");
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
	okInf.style.display = "block";
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
	var okInf =  document.getElementById("okInf");
	console.log(usern.value);
	// upInf();
	usern.readonly = "readonly";
	usern.style.background = "rgba(247, 247, 247, 0)";
	usern.style.border = "rgba(247, 247, 247, 0)";
	passw.readonly = "readonly";
	passw.style.background = "rgba(247, 247, 247, 0)";
	passw.style.border = "rgba(247, 247, 247, 0)";
	e_mail.readonly = "readonly";
	e_mail.style.background = "rgba(247, 247, 247, 0)";
	e_mail.style.border = "rgba(247, 247, 247, 0)";
	okInf.style.display = "none";
}
// function upInf(){
// 	$.ajax({
// 		url:"",
// 		type:"get",
// 		data:{
// 			username:usern.value,
// 			Password:passw,value,
// 			email:e_mail.value
// 		},
// 		async:false,
// 		dataType:"json",
// 		success:function (){
// 			
// 		},
// 		error:function (){
// 			
// 		}
// 		
// 	})
// }
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
 *退出
 * 退出登录的同时
 * 如果有自动登录功能，则关闭
 */
function logOut(){
	var account = localStorage['local-account'];
	if(account != ""){
		localStorage.removeItem("local-account");
		localStorage.removeItem("local-password");
	}
	location.href = "login.html";
}
/**
 * 页面自动执行的函数
 */
window.onload = function(){
	// getId();
	// renderInf();
}
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
 * 获取id
 * split()
 */
// function getId(){
// 	var id = location.href.split("?")[1];
// 	getInf(id);
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
function renderInf(){
	$(".oneCar_informationBox").empty();
	$(".oneCar_informationBox").append("<div class=\"oneCar_ID\">"+
				"			<div class=\"ID_image\">"+
				"				<img src=\"../images/person/people.png\" >"+
				"			</div>"+
				"			<div class=\"ID_name\">"+
				"				<h2>Missi</h2>"+
				"			</div>"+
				"		</div>"+
				"		<div class=\"oneCar_informationTable\">"+
				"			<table class=\"inf-table\">"+
				"				<tr>"+
				"					<td>userName</td>"+
				"					<td>"+
				"						<input type=\"text\" name=\"userName\" id=\"userName\" value=\"Missi\" readonly=\"readonly\"/>"+
				"					</td>"+
				"				</tr>"+
				"				<tr>"+
				"					<td>passWord</td>"+
				"					<td>"+
				"						<input type=\"password\" name=\"passWord\" id=\"passWord\" value=\"123456\" readonly=\"readonly\"/>"+
				"					</td>"+
				"				</tr>"+
				"				<tr>"+
				"					<td>email</td>"+
				"					<td>"+
				"						<input type=\"email\" name=\"email\" id=\"email\" value=\"3535763658@qq.com\" readonly=\"readonly\"/>"+
				"					</td>"+
				"				</tr>"+
				"			</table>"+
				"			<button id=\"edit_inf\" onclick=\"editInf()\">Edit</button>"+
				"			<button id=\"okInf\" onclick=\"okInf()\">OK</button>"+
				"		</div>"+
				"		<div class=\"oneCar_num\">"+
				"			<div class=\"numThink\">"+
				"				<p style=\"color: #000000;\">think</p>"+
				"				<p style=\"color: #000000;\">20</p>"+
				"			</div>"+
				"			<div class=\"numLike\">"+
				"				<p style=\"color: #000000;\">likes</p>"+
				"				<p style=\"color: #000000;\">30</p>"+
				"			</div>"+
				"		</div>")
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
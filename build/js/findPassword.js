/**
 * 验证表单
 * */
function checkForm(){
	var formData = $("#login-form").serializeJson();
	// console.log(formData);
	if(formData.password.trim()==""){
		alert("用户名不能为空");
	}else if(formData.password_confirm.trim() ==""){
		alert("密码不能为空");
	}else{
		resetPw(formData);
	}
}
/**
 * 实现重置密码功能
 */
function resetPw(formData){
	$.ajax({
		url:Url+"/v1/pub/user",
		type:"post",
		data:{
			password:formData.password,
			email:formData.email,
			code: formData.verificationCode
		},
		async:true,//true 异步请求（默认）；false 同步请求
		dataType:"json",
		success:function (res/*,status,xhr*/) {
			//请求成功之后的操作，res是成功后的数据
			console.log(res);
			alert("修改成功，5秒后进入登录页面.....")
			setTimeout(function () {
				location.href = "../pages/login.html";
			},5*1000);
		},
		error:function (res) {
			//请求失败之后的操作，res是失败后的数据
			console.log(res);
		}
	})
}
$.fn.serializeJson = function(){
	var arr = this.serializeArray();
	var json = {};
	arr.forEach(function(item){
		var name = item.name;
		var value = item.value;
		if (!json[name]) {
			json[name] = value;
		} else if ($.isArray(json[name])) {
			json[name].push(value);
		} else {
			json[name] = [json[name], value];
		}
	});
	return json;
};
/**
 * 实时监听两次密码是否一致
 */
var password = document.getElementById("password");
var comfirm = document.getElementById("password_confirm");
comfirm.addEventListener('keyup',function (){
	var regIntruction_pw = document.getElementById("regIntruction_pw")
	if(password.value != comfirm.value){
		regIntruction_pw.style.display = "block";
	}else{
		regIntruction_pw.style.display = "none";
	}
})
/**
*检查邮箱是否合法
*/
$("#email").blur(function(){
	var email = this.value;
	// var email = email || '';
	var regIntruction_email = document.getElementById('regIntruction_email');
	var status = (email.length > 3 && email.indexOf('@') > -1);
	if(status == false){
		// console.log(regIntruction_email.style.display);
		regIntruction_email.style.display = "block";
	}else{
		regIntruction_email.style.display = "none";
	};
})
/**
 * 获取验证码
 */
function getSendCode(){
	var emailBox = document.getElementById('email');//邮箱
	email = emailBox.value;
	if(email == ""){
		alert("邮箱不能为空！！")
	}else{
		$.ajax({
			url:Url+"/v1/pub/sendCode",
			type:"post",
			data:{
				email:email,
				type:"0",//0为注册。1为忘记密码
			},
			async:true,//true 异步请求（默认）；false 同步请求
			dataType:"json",
			success:function (res/*,status,xhr*/) {
				//请求成功之后的操作，res是成功后的数据
				console.log(res);
				console.log("成功");
				// location.href = "../pages/login.html?id="+res;
			},
			error:function (res) {
				//请求失败之后的操作，res是失败后的数据
				console.log(res);
			}
		})
	}
}

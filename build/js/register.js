/**
 * 获取表单中内容，
 * 检查邮箱是否符合规范
 * 注册功能
 */
function checkInf(){
	var emailBox = document.getElementById('email');//邮箱
	var verificationCode = document.getElementById('verificationCode');//验证码
	var usernameBox = document.getElementById('username');//用户名
	var passwordBox = document.getElementById('password');//密码
	var passwordConfirmBox = document.getElementById('password_confirm');//确认密码
	var regButton = document.getElementById('reg');//注册按钮
	//声明对象
	var regInfo = {
		code:verificationCode.value,
		email: emailBox.value,
		password: passwordBox.value,
		username: usernameBox.value,
	};
    var passwordConfirm = passwordConfirmBox.value;
	var password = passwordBox.value;
	var regIntruction_pw = document.getElementById('regIntruction_pw');
	//判断密码和确认密码窗口填写是否一致
	if(regInfo.email == "" || regInfo.password == "" ||regInfo.username == ""){
		alert("邮箱、用户名、密码不能为空！！");
	}else{
		if (passwordConfirm == password) {
		    registerSuc(regInfo);
		    regIntruction_pw.style.display = "none";
		
	    }else{
	        regIntruction_pw.style.display = "block";
	    }
	}
}
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
 * 注册功能实现
 */
function registerSuc(regInfo){
	$.ajax({
		url:Url+"/v1/pub/user",
		type:"post",
		data:{
			username: regInfo.username,
			password:regInfo.password,
			email:regInfo.email,
			code: regInfo.code
		},
		async:true,//true 异步请求（默认）；false 同步请求
		dataType:"json",
		success:function (res/*,status,xhr*/) {
			//请求成功之后的操作，res是成功后的数据
			console.log(res);
			alert("5秒后进入登录页面.....")
			setTimeout(function () {
				location.href = "../pages/login.html?email="+regInfo.email+"&&password="+regInfo.password;
			},5*1000);
		},
		error:function (res) {
			//请求失败之后的操作，res是失败后的数据
			console.log(res);
		}
	})
}
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
				email:email
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
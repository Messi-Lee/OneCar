/**
 * 实现重置密码功能
 */
function resetPw(){
	$.ajax({
		url: Url +"",
	    type:"",
	    data:{
	        
	    },
	    async:true,//true 异步请求（默认）；false 同步请求
	    dataType:"json",
	    // beforeSend:function () {
	    //    XMLHttpRequest.setRequestHeader("token",$.cookie("token")) //在请求之前的操作
	    // },
	    success:function (res/*,status,xhr*/) {
	        //请求成功之后的操作，res是成功后的数据
			console.log(res);
			console.log("成功");
			// location.href = "../pages/index.html?id="+res;
	    },
	    error:function (res) {
	        //请求失败之后的操作，res是失败后的数据
	        console.log(res)
	    },
	})
}
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

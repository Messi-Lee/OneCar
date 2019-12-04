var storage = window.localStorage;//声明localStorage
/**
 * 自动登录的账户
 * 自动写入
 */
window.onload = function(){
	if (!typeof(localStorage.getItem("local-account"))=='undefined'){
		var account = storage['local-account'];
		var password = storage['local-password'];
		if(account != ""){
			$("#account").val(account) ;
			$("#password").val(password);
			checkForm();
		}
	}

	
}
/**
 * 验证表单
 * */
function checkForm(){
    var formData = $("#login-form").serializeJson();
    // console.log(formData);
    if(formData.account.trim()==""){
        alert("用户名不能为空");
    }else if(formData.password.trim() ==""){
        alert("密码不能为空");
    }else{
        Login(formData);
    }
}
/*
*登录功能实现
*/
function Login(formData){
	$.ajax({
		url:Url+"/login",
        type:"get",
        data:{
            account:formData.account,
			password:formData.password,
        },
        async:true,//true 异步请求（默认）；false 同步请求
        dataType:"json",
        // beforeSend:function (XMLHttpRequest) {
        //    XMLHttpRequest.setRequestHeader("token","token") //在请求之前的操作
        // },
        success:function (res/*,status,xhr*/) {
            //请求成功之后的操作，res是成功后的数据
			console.log(res);
			location.href = "../pages/index.html?account="+formData.account;
        },
        error:function (res) {
            //请求失败之后的操作，res是失败后的数据
            console.log(res)
        }
	}),
	autoLogin(formData.account,formData.password);
}

/*
*序列化表单，将其转化成json格式
*/
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
*检查邮箱是否合法
*/
// $("#account").blur(function(){
// 	var email = this.value;
// 	// var email = email || '';
// 	var regIntruction_email = document.getElementById('regIntruction_email');
// 	var status = (email.length > 3 && email.indexOf('@') > -1);
// 	if(status == false){
// 		// console.log(regIntruction_email.style.display);
// 		regIntruction_email.style.display = "block";
// 	}else{
// 		regIntruction_email.style.display = "none";
// 	};
// }) 
// 
/**
 * 自动登录功能实现
 */
function autoLogin(account,password){
	if($("div").is(".mui-active")){
		storage['local-account'] = account;
		storage['local-password'] = password;
		console.log('localStorage设置完毕');
	}else{
		localStorage.removeItem("local-account");
		localStorage.removeItem("local-password");
	}
}
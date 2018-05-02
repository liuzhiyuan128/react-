import axios from "axios"
import { message } from "antd"
//axios.defaults.baseURL = 'https://api.example.com';
//axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

const baseUrl = "http://118.31.7.200:8091/" //阿里云

const ajax = (option) => {
	
	//这一步是为了处理1login/111111 这样的场景
	const lastUrlStr = (option.url.indexOf("/") == -1) ? option.url : option.url.substring(0, option.url.indexOf("/"));
	//可以不传data
	option.data = option.data || {}
	
	
	let url = "";
	switch(lastUrlStr) {
		case "login":
			url = `${baseUrl}rbac/user/${option.url}`; //登陆
			break;
		case "getUserListByMonth":
			url = `${baseUrl}bettle/api/evaluation/${option.url}`;//月季年 住户排名 根据 dataType来区分
			break;
		
		default:
			break;
	}
	
	
	
	//判断token是否纯在 存在就传入请求头 不存在 就在请求头里传入空对象
	let headers = (sessionStorage.token ? {
		headers: {
			"token": sessionStorage.token
		}
	} : {})

	if(!url) option.success("路径有误")
	axios[option.type](url, option.data, headers)
		.then(function(res) {
			if(lastUrlStr == "login") {
				//储存token
				sessionStorage.token = res.headers.token
			}
			option.success(res.data)
		})
		.catch(function(err) {
			message.warning("请求数据有误")
		});

}

window.BuildFormData = function (formDate) {
	var form = new FormData()
	for(let item in formDate){
		form.append(item,formDate[item])
	}
	return form
}

export default ajax
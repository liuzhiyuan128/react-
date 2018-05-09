require('es6-promise').polyfill();
var axios = require('axios');
import { message } from "antd"
//axios.defaults.baseURL = 'https://api.example.com';
//axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

const baseUrl = "http://118.31.7.200:8091/" //阿里云
//const baseUrl = "http://192.168.10.157:8091/" //西泉

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
		
		case "selectMyUserById":
			url = `${baseUrl}rbac/user/${option.url}`;//获取个人信息需要登陆开始的id
			break;
		case "getUserRank":
			url = `${baseUrl}bettle/api/evaluation/${option.url}`;//查看住户列表
			break;
			
		case "getVillageRank":
			url = `${baseUrl}bettle/api/evaluation/${option.url}`;//村住户列表
			break;
		case "getTownRankCom":
			url = `${baseUrl}bettle/api/evaluation/${option.url}`;//镇住户列表
			break;
			
		case "getCompostingRank":
			url = `${baseUrl}bettle/api/checkComposting/${option.url}`;//堆肥房列表
			break;
		case "getUserTrendCom":
			url = `${baseUrl}bettle/api/evaluation/${option.url}`;//住户月趋势图
			break;
		case "getUserById":
			url = `${baseUrl}bettle/api/check/${option.url}`;//住户详情
			break;
		case "getVillageDetail":
			url = `${baseUrl}bettle/api/evaluation/${option.url}`;//村详情
			break;
		case "getVillageTrendCom":
			url = `${baseUrl}bettle/api/evaluation/${option.url}`;//村月趋势图
			break;
		case "getTownDetail":
			url = `${baseUrl}bettle/api/evaluation/${option.url}`;//zhen月详情
			break;
		case "getTownTrendCom":
			url = `${baseUrl}bettle/api/evaluation/${option.url}`;//住户月趋势图
			break;
		case "tree":
			url = `${baseUrl}bettle/api/village/${option.url}`;//获取tree下拉框
			break;
		
		case "areaTownTree":
			url = `${baseUrl}bettle/api/village/${option.url}`;//获取tree下拉框
			break;
			
		case "getCheckCompostingDetail":
			url = `${baseUrl}bettle/api/checkComposting/${option.url}`;//堆肥房详情
			break;
		case "getCheckCompostingTrend":
			url = `${baseUrl}bettle/api/checkComposting/${option.url}`;//堆肥房详情
			break;
			
		default:
			break;
	}
	
	
	
	//判断token是否纯在 存在就传入请求头 不存在 就在请求头里传入空对象
	let headers = null
	
	if(sessionStorage.token){
		headers = {
			headers:{
				token:sessionStorage.token
			}
		}
	}
	if(!url) option.success("路径有误")
	

	if(option.type=="get"){
		axios[option.type](url, headers, option.data)
		.then(function(res) {
			if(lastUrlStr == "login") {
								
			 	   sessionStorage.token = res.headers.token
			 	
			}
			option.success(res.data)
		})
		.catch(function(err) {
			message.warning("请求数据有误")
		});

	}else{
		axios[option.type](url,option.data, headers)
		.then(function(res) {
			
			if(lastUrlStr == "login") {
								
			 	   sessionStorage.token = res.headers.token
			 	
			}
			
			option.success(res.data)
		})
		.catch(function(err) {
			console.log(err)
			message.warning("请求数据有误")
		});
	}
}



export default ajax
import {message} from "antd"

// const baseUrl = "http://118.31.7.200:8091/" //阿里云
// const baseUrl = "http://118.31.7.200:8090/" //阿里云
// const baseUrl = "http://192.168.10.114:8091/" //西泉
// const baseUrl = "http://192.168.10.102:8091/" //西泉
// const baseUrl = "http://192.168.10.117:8888/"
//    const baseUrl = "http://192.168.10.153:8888/"
const baseUrl = "http://192.168.10.117:8091/" //楼

const ajax = (option) => {
	//这一步是为了处理1login/111111 这样的场景
	const lastUrlStr = (option.url.indexOf("/") == -1)
		? option.url
		: option
			.url
			.substring(0, option.url.indexOf("/"));
	//可以不传data
	option.data = option.data || {}

	let url = "";
	
	switch (lastUrlStr) {
		case "getSelfSorting":
			url = `${baseUrl}bettle/api/SelfSortingController/${option.url}`;
			break
		case "sortingCheck":
			url = `${baseUrl}bettle/api/SelfSortingController/${option.url}`;
			break
		case "exportSelfSortingCollectList":
			url = `${baseUrl}bettle/api/SelfSortingController/${option.url}`; 
			break
		case "getSelfSortingID":
			url = `${baseUrl}bettle/api/SelfSortingController/${option.url}`; 
			break
		case "getSelfSortingCollectList":
			url = `${baseUrl}bettle/api/SelfSortingController/${option.url}`; 
			break;
		case "batchDeleteUserRole":
			url = `${baseUrl}rbac/role/${option.url}`; 
			break3
		case "getAllUsersSelected":
			url = `${baseUrl}rbac/role/${option.url}`; 
			break
		case "batchAddUserRole":
			url = `${baseUrl}rbac/role/${option.url}`; 
			break
		case "getAllUsersUnSelected":
			url = `${baseUrl}rbac/role/${option.url}`; 
			break
		case "batchPressDo":
			url = `${baseUrl}bettle/api/check/${option.url}`; 
			break
		case "exportOutOfTimeList":
			url = `${baseUrl}bettle/api/check/${option.url}`; 
			break
		case "getAllOutOfTimeList":
			url = `${baseUrl}bettle/api/check/${option.url}`; 
			break;
		case "selectAllCheckdUserOutOfTime":
			url = `${baseUrl}bettle/api/check/${option.url}`; 
			break;
		case "exportSelfEvaluateCollectListVillage":
			url = `${baseUrl}/bettle/api/selfEvaluateController/${option.url}`; 
			break;
		case "exportSelfEvaluateCollectList":
			url = `${baseUrl}/bettle/api/selfEvaluateController/${option.url}`; 
			break;
		case "getSelfEvaluateCollectList":
			url = `${baseUrl}/bettle/api/selfEvaluateController/${option.url}`; 
			break;
		case "exportExcelTrashResult":
			url = `${baseUrl}/bettle/api/check/${option.url}`; 
			break;
		case "exportExcelCompostResult":
			url = `${baseUrl}/bettle/api/checkComposting/${option.url}`; 
			break;
		case "exportWordCompostRanking":
			url = `${baseUrl}/bettle/api/checkComposting/${option.url}`; 
			break;
		case "exportWordHousehold":
			url = `${baseUrl}/bettle/api/evaluation/${option.url}`; 
			break;
		case "exportWordTown":
			url = `${baseUrl}/bettle/api/evaluation/${option.url}`; 
			break;
		case "exportWordTown":
			url = `${baseUrl}/bettle/api/evaluation/${option.url}`; 
			break;
		case "exportWordVillage":
			url = `${baseUrl}/bettle/api/evaluation/${option.url}`; 
			break;
		case "getSelfEvaluateCollectListVillage":
			url = `${baseUrl}bettle/api/selfEvaluateController/${option.url}`; 
			break;
		case "check":
			url = `${baseUrl}bettle/api/selfEvaluateController/${option.url}`; 
			break;
		case "getSelfEvaluateAdmin":
			url = `${baseUrl}bettle/api/selfEvaluateController/${option.url}`; 
			break;
		case "getAllLog":
			url = `${baseUrl}bettle/log/${option.url}`; //获取所有信息
			break;
		case "updateIsDisableByPrimaryKey":
			url = `${baseUrl}bettle/api/composting/${option.url}`; //删除堆肥房
			break;
		case "updateByPrimaryKeySelective":
			url = `${baseUrl}bettle/api/composting/${option.url}`; //修改堆肥房
			break;
		case "addComposting":
			url = `${baseUrl}bettle/api/composting/${option.url}`; //新增堆肥房
			break;
		case "selectAll":
			url = `${baseUrl}bettle/api/composting/${option.url}`; //查询所有没有被禁用的堆肥房列表
			break;
			
		case "changeUserRoles":
			url = `${baseUrl}rbac/role/${option.url}`; //获取详情数据
			break;
		case "getUsers":
			url = `${baseUrl}rbac/role/${option.url}`; //获取详情数据
			break;
		case "changeRolePowers":
			url = `${baseUrl}rbac/role/${option.url}`; //获取详情数据
			break;
		case "getPowerByRoleId":
			url = `${baseUrl}rbac/role/${option.url}`; //获取详情数据
			break;
		case "deleteRole":
			url = `${baseUrl}rbac/role/${option.url}`; //获取详情数据
			break;
		case "updateRole":
			url = `${baseUrl}rbac/role/${option.url}`; //获取详情数据
			break;
		case "selectExistRoleName":
			url = `${baseUrl}rbac/role/${option.url}`; //获取详情数据
			break;
		case "addRole":
			url = `${baseUrl}rbac/role/${option.url}`; //获取详情数据
			break;
		case "selectAllRole":
			url = `${baseUrl}rbac/role/${option.url}`; //获取详情数据
			break;
		case "updateVillage":
			url = `${baseUrl}bettle/api/village/${option.url}`; //获取详情数据
			break;
		case "getVillageDetail":
			url = `${baseUrl}bettle/api/village/${option.url}`; //获取详情数据
			break;
		case "delete":
			url = `${baseUrl}bettle/api/village/${option.url}`; //删除部门
			break;
		case "saveVillage":
			url = `${baseUrl}bettle/api/village/${option.url}`; //保存部门
			break;
		case "getUserDetail":
			url = `${baseUrl}rbac/user/${option.url}`; //修改用户
			break;
		case "addUser":
			url = `${baseUrl}rbac/user/${option.url}`; //修改用户
			break;
		case "modify":
			url = `${baseUrl}rbac/user/${option.url}`; //修改用户
			break;
		case "deleteUser":
			url = `${baseUrl}rbac/user/${option.url}`; //删除用户
			break;
		case "deleteUser":
			url = `${baseUrl}rbac/user/${option.url}`; //删除用户
			break;
		
		case "modify":
			url = `${baseUrl}rbac/user/${option.url}`; //添加用户
			break;
		case "getUserDetail":
			url = `${baseUrl}rbac/user/${option.url}`; //添加用户
			break;
		case "getAllUserByVillageId":
			url = `${baseUrl}rbac/user/${option.url}`; //指定用户列表
			break;
		case "login":
			url = `${baseUrl}rbac/user/${option.url}`; //登陆
			break;
		case "getUserListByMonth":
			url = `${baseUrl}bettle/api/evaluation/${option.url}`; //月季年 住户排名 根据 dataType来区分
			break;

		case "selectMyUserById":
			url = `${baseUrl}rbac/user/${option.url}`; //获取个人信息需要登陆开始的id
			break;
		case "getUserRank":
			url = `${baseUrl}bettle/api/evaluation/${option.url}`; //查看住户列表
			break;
		case "getCheckList":
			url = `${baseUrl}bettle/api/check/${option.url}`; //考核督办检查合格列表 
			break;
		case "selectAllCheckdUserNot":
			url = `${baseUrl}bettle/api/check/${option.url}`; //考核督办检查村督办
			break;
		case "selectAllCheckdUserNotTown":
			url = `${baseUrl}bettle/api/check/${option.url}`; //考核督办镇督办
			break;
		case "updateCheckUserNomal":
			url = `${baseUrl}bettle/api/check/${option.url}`; //垃圾桶督办结束
			break;
			
		case "updateCheckUserPressdo":
			url = `${baseUrl}bettle/api/check/${option.url}`; //垃圾桶催办
			break;
		case "updateCheckUserRedo":
			url = `${baseUrl}bettle/api/check/${option.url}`; //垃圾桶催办
			break;
		case "selectAllCheckdUserNotArea":
			url = `${baseUrl}bettle/api/check/${option.url}`; //考核督办镇督办
			break;
		case "getVillageRank":
			url = `${baseUrl}bettle/api/evaluation/${option.url}`; //村住户列表
			break;
		case "getTownRankCom":
			url = `${baseUrl}bettle/api/evaluation/${option.url}`; //镇住户列表
			break;
		case "getDetailByCheckuserId":
			url = `${baseUrl}bettle/api/check/${option.url}`; //镇住户列表
			break;
		case "selectAllCheckedUserMangerOrVillager":
			url = `${baseUrl}bettle/api/check//${option.url}`; //镇住户列表
			break;

		case "getCompostingRank":
			url = `${baseUrl}bettle/api/checkComposting/${option.url}`; //堆肥房列表
			break;
			
		case "getUserTrendCom":
			url = `${baseUrl}bettle/api/evaluation/${option.url}`; //住户月趋势图
			break;
		case "getUserById":
			url = `${baseUrl}bettle/api/check/${option.url}`; //住户详情
			break;
		case "getVillageDetail":
			url = `${baseUrl}bettle/api/evaluation/${option.url}`; //村详情
			break;
		case "getVillageTrendCom":
			url = `${baseUrl}bettle/api/evaluation/${option.url}`; //村月趋势图
			break;
		case "checkCompostingFinish":
			url = `${baseUrl}bettle/api/checkComposting/${option.url}`;//堆肥房 督办结束
			break;
		case "checkCompostingFinish":
			url = `${baseUrl}bettle/api/checkComposting/${option.url}`;//堆肥房 督办结束
			break;
		case "townPressdo":
			url = `${baseUrl}/bettle/api/checkComposting/${option.url}`;//堆肥房 //镇催办
			break;
		case "areaPressdo":
			url = `${baseUrl}/bettle/api/checkComposting/${option.url}`;//堆肥房 //区催办
			break;
		case "getTownDetail":
			url = `${baseUrl}bettle/api/evaluation/${option.url}`; //zhen月详情
			break;
		case "getTownTrendCom":
			url = `${baseUrl}bettle/api/evaluation/${option.url}`; //住户月趋势图
			break;
		case "tree":
			url = `${baseUrl}bettle/api/village/${option.url}`; //获取tree下拉框
			break;

		case "areaTownTree":
			url = `${baseUrl}bettle/api/village/${option.url}`; //获取tree下拉框
			break;
		case "getCheckCompostingDetail":
			url = `${baseUrl}bettle/api/checkComposting/${option.url}`; //堆肥房详情
			break;
		case "getCheckCompostingTrend":
			url = `${baseUrl}bettle/api/checkComposting/${option.url}`; //堆肥房列表
			break;
		case "selectCheckComposting":
			url = `${baseUrl}bettle/api/checkComposting/${option.url}`; //堆肥房检查合格列表 
			break;
		case "selectByPrimaryKey":
			url = `${baseUrl}bettle/api/composting/${option.url}`; //堆肥房检查合格详情 get基本信息
			break;
		case "selectCompostingScore":
			url = `${baseUrl}bettle/api/checkComposting/${option.url}`; //堆肥房检查合格详情 分数
			break;
		case "selectCheckCompostingDetail":
			url = `${baseUrl}bettle/api/checkComposting/${option.url}`; //堆肥房检查合格详情 评分情况
			break;
		case "selectCheckCompostingResult":
			url = `${baseUrl}bettle/api/checkComposting/${option.url}`; //堆肥房检查合格详情 评分情况
			break;
		default:
			break;
	}

	//判断token是否纯在 存在就传入请求头 不存在 就在请求头里传入空对象
	if (!url)
		option.success("路径有误")
		console.log(url)
	axios({
		url: url, //请求地址
		type: option.type, //请求方式
		data: option.data, //请求参数
		success: function (res, xml) {

			
			option.success(res)
			// 此处放成功后执行的代码
		},
		fail: function (status) {

			message.warning("请求数据有误")
		},
		asyny: option.asyny
	})

}


function axios(options) {
	options = options || {};
	options.type = (options.type || "GET").toUpperCase();
	options.dataType = options.dataType || "json";
	options.asyny = options.asyny == false ? false : true
	var params = options.data

	//创建 - 非IE6 - 第一步
	if (window.XMLHttpRequest) {
		var xhr = new XMLHttpRequest();
	} else { //IE6及其以下版本浏览器
		var xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}
	//接收 - 第三步
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			var status = xhr.status;
			if (status >= 200 && status < 300) {
				
				var res = JSON.parse(xhr.responseText);
				if(xhr.getResponseHeader('token')){
					sessionStorage.token =  xhr.getResponseHeader('token')
				}
				options.success && options.success(res, xhr.responseXML);
			} else {
				options.fail && options.fail(status);
			}
		}
	}

	//连接 和 发送 - 第二步
	if (options.type == "GET") {
		if(JSON.stringify(params) != "{}"){
			options.url = options.url + "?" + params
		} 
		xhr.open("GET", options.url, options.asyny);
		if (sessionStorage.token) {
			xhr.setRequestHeader("token", sessionStorage.token)
		}
		xhr.send(null);
	} else if (options.type == "POST") {
		xhr.open("POST", options.url, options.asyny);
		//设置表单提交时的内容类型
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		if (sessionStorage.token) {
			xhr.setRequestHeader("token", sessionStorage.token)
		}
		xhr.send(params);
	}
}
//格式化参数

export default ajax
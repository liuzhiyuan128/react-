import ReactDOM from "react-dom"  
import React,{ Component } from "react";
import {Login} from "../page/login.js"//login页面
import {Home} from "../page/home.js"//home页面
import {root} from "../page/root.js"
import qs from "qs"

import {Avatar, List, Checkbox, Radio, Form, Tree, Rate, message, Layout, Menu, Breadcrumb, Icon, Row, Col, DatePicker, Select, Button, Table, Tabs, Modal, Pagination, Spin, Switch, TreeSelect, Input  } from 'antd';
const {TextArea} = Input 
const Option = Select.Option;
const {RangePicker} = DatePicker;
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const TabPane = Tabs.TabPane;
const TreeNode = TreeSelect.TreeNode;

//设置日期语言
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

import TrashRanking from "../page/trash/ranking.js"//垃圾桶管理 排行
import supervise from "../page/trash/supervise.js"//垃圾桶管理 督办
import trashCheckUp from "../page/trash/supervisePage/trashCheckUp" //垃圾桶管理 督办 检查合格
import trashVillageSupervise from "../page/trash/supervisePage/trashVillageSupervise" //垃圾桶管理 督办 村督办
import trashTownSupervise from "../page/trash/supervisePage/trashTownSupervise" //垃圾桶管理 督办 镇督办
import trashAreaSupervise from "../page/trash/supervisePage/trashAreaSupervise" //垃圾桶管理 督办 区督办
import overTimeSupervise from "../page/trash/supervisePage/overTimeSupervise" //垃圾桶管理 督办 超时督办
import trashResult from "../page/trash/result" //垃圾桶管理 考核结果
import selfReviewReview from "../page/trash/selfReviewReview" //自评审核

import selfEvaluateCollectListVillage from "../page/trash/selfEvaluateCollectListVillage" //村自评汇总
import selfEvaluateCollectList from "../page/trash/selfEvaluateCollectList" //村自评汇总
import overTimeSummary from "../page/trash/overTimeSummary" //超时汇总


import househlodRanking from "../page/trash/rankingPage/househlodRanking.js"//住户排行
import vliiageRanking from "../page/trash/rankingPage/villageRanking.js"//村排行
import townRanking from "../page/trash/rankingPage/townRanking.js"//镇排行


import SearchRanking from "../component/searchRanking.js" //搜索组件
import TableComponent from "../component/tableComponent.js"// table组件
import Stree from "../component/streeComponent.js";//树状图组件

import AlertDetails from "../component/alertDetails"//查看详情组件
import compostRanking from "../page/compost/ranking.js"//堆肥房 排行
import compostSupervise from "../page/compost/compostSupervise" //堆肥房 督辦
import checkUp from "../page/compost/supervisePage/checkUp" //堆肥房 督辦 检查合格
import compostVillageSupervise from "../page/compost/supervisePage/compostVillageSupervise" //堆肥房 督辦 村督办
import compostTownSupervise from "../page/compost/supervisePage/compostTownSupervise" //堆肥房 督辦 镇督办
import compostAreaSupervise from "../page/compost/supervisePage/compostAreaSupervise" //堆肥房 督辦 区督办
import comostResult from "../page/compost/result" //堆肥房 考核结果
import selfReview from "../page/compost/selfReview" //自评审核
import compostSelfEvaluateCollectList from "../page/compost/compostSelfEvaluateCollectList" //自评汇总
import selfReview1 from "../page/compost/selfReview1" //菌种自评审核
import compostSelfEvaluateCollectList1 from "../page/compost/compostSelfEvaluateCollectList1" //菌种自评汇总


import log from "../page/system/log";//日志管理
import user from '../page/system/user'//用户管理
import systemCompost from "../page/system/systemCompost"//系统管理的堆肥房管理
import role from "../page/system/role";

import { BrowserRouter as Router, Route, Link,Redirect} from "react-router-dom";//路由组件

//echarts柱状图
import echarts from 'echarts/lib/echarts' //必须
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/grid'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'

import {dataFilter, goIntoHomeRouteBefore} from "../js/common";


import ajax from "./ajax.js";//请求数据

//监听路由变换或跳转使用的方法
import createHistory from "history/createBrowserHistory"

const history = createHistory()

if(!sessionStorage.token){
	sessionStorage.token = '';
	history.replace("/login")
}
//改变url做校验
// goIntoHomeRouteBefore(history, location, sessionStorage.power && JSON.parse(sessionStorage.power))


export {
	compostSelfEvaluateCollectList1,
	selfReview1,
	compostSelfEvaluateCollectList,
	selfReview,
	goIntoHomeRouteBefore,
	overTimeSummary,
	selfEvaluateCollectList,
	overTimeSupervise,
	selfEvaluateCollectListVillage,
	List,
	Avatar,
	selfReviewReview,
	Stree,
	Checkbox,
	Radio,
	Form,
	dataFilter,
	Tree,
	role,
	systemCompost,
	user,
	log,
	comostResult,
	trashResult,
	compostAreaSupervise,
	compostTownSupervise,
	compostVillageSupervise,
	trashAreaSupervise,
	trashTownSupervise,
	trashVillageSupervise,
	trashCheckUp,
	checkUp,
	compostSupervise,
	TextArea,
	Rate,
	AlertDetails,
	TableComponent,
	message,
	Login,
	Home,
	ReactDOM,
	Component,
	React,
	Table,
	Icon,
	Divider,
	ajax,
	root,
	Route,
	Link,
	BrowserRouter,
	Router,
	Header,
	Sider,
	Content,
	Layout,
	SubMenu,
	Breadcrumb,
	Menu,
	TrashRanking,
	Redirect,
	compostRanking,
	househlodRanking,
	vliiageRanking,
	townRanking,
	SearchRanking,
	Row,
	Col,
	DatePicker,
	RangePicker,
	Select,
	Option,
	Button,
	Tabs,
	TabPane,
	Modal,
	echarts,
	qs,
	Pagination,
	createHistory,
	Spin,
	Switch,
	TreeSelect,
	TreeNode,
	Input,
	supervise
}

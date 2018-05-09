import ReactDOM from "react-dom"  
import React,{ Component } from "react";
import {Login} from "../page/login.js"//login页面
import {Home} from "../page/home.js"//home页面
import {root} from "../page/root.js"
import qs from "qs"
import { Layout, Menu, Breadcrumb, Icon, Row, Col, DatePicker, Select, Button, Table, Tabs, Modal, Pagination, Spin, Switch, TreeSelect, Input  } from 'antd';
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
import househlodRanking from "../page/trash/rankingPage/househlodRanking.js"//住户排行
import vliiageRanking from "../page/trash/rankingPage/villageRanking.js"//村排行
import townRanking from "../page/trash/rankingPage/townRanking.js"//镇排行
import SearchRanking from "../component/searchRanking.js" //搜索组件

import compostRanking from "../page/compost/ranking.js"//堆肥房 排行

import { BrowserRouter as Router, Route, Link,Redirect} from "react-router-dom";//路由组件

//echarts柱状图
import echarts from 'echarts/lib/echarts' //必须
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/grid'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'


import ajax from "./ajax.js";//请求数据

//监听路由变换或跳转使用的方法
import createHistory from "history/createBrowserHistory"

const history = createHistory()

if(!sessionStorage.token){
	sessionStorage.token = '';
	history.replace("/login")
}




export {
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

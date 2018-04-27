import ReactDOM from "react-dom"  
import React,{ Component } from "react";
import {Login} from "../page/login.js"//login页面
import {Home} from "../page/home.js"//home页面
import {root} from "../page/root.js"//最外层的路由分发

//import { Table, Icon, Divider } from 'antd'; //需要antd的组件
import Table from 'antd/lib/Table';
import Icon from 'antd/lib/Icon';
import Divider from 'antd/lib/Divider';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";//路由组件
import ajax from "./ajax.js";//请求数据

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
	Router
}

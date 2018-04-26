
import ReactDOM from "react-dom"

import React,{ Component } from "react"

import {root} from "./root.js"

import './css/antd.min.css';
import './css/index.css';


class Root extends Component{
	constructor(props) {  
	    super(props);  
	    this.state = {  
	      content:null,  
	    }  
 	 }  
	render(){
		return root()
	}
}

ReactDOM.render(<Root/>,document.querySelector("#Root"))




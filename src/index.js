
import ReactDOM from "react-dom"
import React,{ Component } from "react"
import {router} from "./config/router.js"


class Root extends Component{
	render(){
		return router()
	}
}



ReactDOM.render(<Root/>,document.querySelector("#Root"))




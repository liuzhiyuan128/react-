import {Route, Component, React, ajax}  from "../../config/router.js";
import axios from "axios"
const test = () => {
//	ajax({
//		url: 'http://127.0.0.1:9000/',
//		type: 'get',
//		success:  (res) => {
//			console.log(res)
//		}
//	})
axios.get("http://127.0.0.1:9000/").then(res=>{
	console.log(res)
})
}
 const supervise  = ({watch,history}) => {
	return (<div onClick={test}>supervisePage</div>)
}
 export default supervise

import React from "react"
import ReactDOM from "react-dom"
import img from "./img/480_762.png"
import index from "./css/index.css"
class App extends React.Component{
	state = {
		big:true,
	}
	onClick = ()=> {
		
		this.setState({
			big : !this.state.big
		})
		console.log(this.state)
	}
	render(){
		return <img src={img} />
	} 
}

ReactDOM.render(<App />,document.querySelector("#app"))



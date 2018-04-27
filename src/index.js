
import {root,Component,React,ReactDOM} from "./config/router.js"
import './css/antd.min.css';
import './css/index.less';


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




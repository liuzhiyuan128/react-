import {ajax,React, Component, Tree, dataFilter, Spin} from "../config/router";
const TreeNode = Tree.TreeNode
class Stree extends Component{
    constructor(props){
        super(props);
        this.state={
            treeData: [],
            expandedKeys: ["10"],
            show: true
        }
    }
    loop = data => data.map((item) => {
        
        if (item.children && item.children.length) {
            return <TreeNode style={{background:"pink"}} key={item.value} title={<div >{item.label}</div>}>{this.loop(item.children)}</TreeNode>;
        }
        
        return <TreeNode  key={item.value} title={item.label}/>;      
        
    });
    componentDidMount = () => {
        this.getTree()
    }
    getTree = () => {
		let url = '';
		if(this.props.onlyAreaTown){
			url = "areaTownTree"
		}else{
			url = "tree"
		}
		 ajax({
				url: url,
				type: "get",
				success: (res) => {
					var treeData = dataFilter(res.data);
					this.setState({
                        treeData,
                        show: false
					})
				}
			})
	}
    render(){
    
        return <div className="spinBox">
                 <Spin style={{display: this.state.show ? "block" : 'none'}}  size="large"/>
                 <Tree   
                    className="draggable-tree"
                    defaultExpandedKeys={this.state.expandedKeys}
                    onSelect = {this.props.treeSelect}
                    onExpand = {(expandedKeys)=>{
                    
                        this.state.expandedKeys = expandedKeys
                    }}
                    >
                    {this.loop(this.state.treeData)}
                </Tree>
        </div>
    }
} 
export default Stree
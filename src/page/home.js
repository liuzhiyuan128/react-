
import {Divider,Table,Icon,Component,React} from "../config/router.js"


class Home extends Component {
	constructor(props) {
		super(props);
		const columns = [{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			render: text => <a href="javascript:;">{text}</a>,
		}, {
			title: 'Age',
			dataIndex: 'age',
			key: 'age',
		}, {
			title: 'Address',
			dataIndex: 'address',
			key: 'address',
		}, {
			title: 'Action',
			key: 'action',
			render: (text, record) => (
				<span>
				      <a href="javascript:;">Action 一 {record.name}</a>
				    	  <Divider type="vertical" />
				      <a href="javascript:;">Delete</a>
				     	 <Divider type="vertical" />
				      <a href="javascript:;" className="ant-dropdown-link">
				        More actions <Icon type="down" />
				      </a>
   				 </span>
			),
		}];
		const data = [{
			  key: '1',
			  name: 'John Brown',
			  age: 32,
			  address: 'New York No. 1 Lake Park',
			}, {
			  key: '2',
			  name: 'Jim Green',
			  age: 42,
			  address: 'London No. 1 Lake Park',
			}, {
			  key: '3',
			  name: 'Joe Black',
			  age: 32,
			  address: 'Sidney No. 1 Lake Park',
			}];
		this.state = {
			columns,
			data
		}

	}
	render() {
		
		return(
			<div>
				<h3>home</h3>
				<Table columns={this.state.columns} dataSource={this.state.data} />
			</div>
		)
	}
}

export {
	Home
}

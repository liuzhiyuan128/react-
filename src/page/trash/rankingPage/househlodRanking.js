import { React, SearchRanking, Table, Component, Tabs, TabPane, Modal, Button, echarts } from "../../../config/router.js"
const getSearchData = (data) => {
	console.log(data)
}

function callback(key) {
	console.log(key);
}

const getALineData = (text, vm) => {
	vm.setState({
		visible: true
	});
	setTimeout(() => {
		var option = {
			color: ['#3398DB'],
			tooltip: {
				trigger: 'axis',
				axisPointer: { // 坐标轴指示器，坐标轴触发有效
					type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: [{
				type: 'category',
				data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
				axisTick: {
					alignWithLabel: true
				}
			}],
			yAxis: [{
				type: 'value'
			}],
			series: [{
					name: '直接访问',
					type: 'bar',
					barWidth: '60%',
					data: [10, 52, 200, 334, 390, 330, 220]
				},

			]
		};
		var myChart = echarts.init(document.getElementById('barDetail'));
		 myChart.setOption(option);

	}, 0)
}

class HouseHlodTable extends Component {
	componentDidMount() {

		var houseHlodTableData = [{
				key: '1',
				name: '胡彦斌',
				age: 32,
				address: '西湖区湖底公园1号',
				operation: "查看详情"
			},
			{
				key: '2',
				name: '胡彦祖',
				age: 42,
				address: '西湖区湖底公园1号',
				operation: "查看详情"
			},

		]
		var houseHlodTableColumns = [{
			title: '姓名',
			dataIndex: 'name',
			key: 'name',
		}, {
			title: '年龄',
			dataIndex: 'age',
			key: 'age',
		}, {
			title: '住址',
			dataIndex: 'address',
			key: 'address',

		}, {
			title: '操作',
			dataIndex: 'operation',
			key: 'operation',
			render: (record, text) => {

				return(
					<span style={{cursor:"pointer"}} onClick={()=>{
						
						return getALineData(text,this)
   				}}>查看详细</span>
				)
			}
		}]

		this.setState({
			houseHlodTableData,
			houseHlodTableColumns
		})
	}
	state = {
		houseHlodTableData: [],
		houseHlodTableColumns: [],
		visible: false
	}
	render() {

		return(
			<div className="tableBox">
			<Tabs defaultActiveKey="1" onChange={callback}>
			    <TabPane tab="月总分" key="1"><Table  dataSource={ this.state.houseHlodTableData} columns={this.state.houseHlodTableColumns} /></TabPane>
			    <TabPane tab="季总分" key="2"><Table  dataSource={this.state.houseHlodTableData} columns={this.state.houseHlodTableColumns} /></TabPane>
			    <TabPane tab="年总分" key="3"><Table  dataSource={this.state.houseHlodTableData} columns={this.state.houseHlodTableColumns} /></TabPane>
			</Tabs>
			 <Modal
	          title="查看详情"
	          visible={this.state.visible}
	         onCancel = {(e) => {this.setState({visible: false,});}}
	         footer={null}
	         bodyStyle={{width:"100%"}}
	        >
	        <div id="barDetail" style={{width:"100%",height:"400px"}}>

	        </div>
	        </Modal>
		</div>
		)
	}
}
const househlodRanking = () => (
	<div>
		<SearchRanking getSearchData={getSearchData}/>
		<HouseHlodTable />
	</div>
)
export default househlodRanking
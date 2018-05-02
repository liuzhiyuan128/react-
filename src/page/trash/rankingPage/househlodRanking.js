import { React, SearchRanking, Table, Component, Tabs, TabPane, Modal, Button, echarts, ajax, qs, Pagination } from "../../../config/router.js"
const getSearchData = (data) => {
	console.log(data)
}
const househlodRankingForm = {
	month: {
		condition: "",
		dateType: "",
		pageSize: 1,
		pageNum: 10
	},
	quarter: {
		condition: "",
		dateType: "",
		pageSize: 10,
		pageNum: 1
	},
	year: {
		condition: "",
		dateType: "",
		pageSize: 1,
		pageNum: 10
	}
}
let dataType = "month"

function callback(key,vm) {
	
	key = +key
	switch(key) {
		case 1:
			dataType = "month"
			
			break;
		case 2:
			dataType = "quarter"

			break;
		case 3:
			dataType = "year"
			break;
		default:
			break;
	}
	
	vm.getUserListByMonth();
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
	getUserListByMonth() {
		const data = {
			condition: "",
			dateType: dataType,
			pageSize: this.state.pageSize
		}
		if(dataType == "month") {
			data.pageNum = this.state.monthPagination.current
		} else if(dataType == "quarter") {
			data.pageNum = this.state.quarterPagination.current
		} else {
			data.pageNum = this.state.yearPagination.current
		}
		console.log(data)
		ajax({
			url: "getUserListByMonth",
			data: qs.stringify(data),
			type: "post",
			success: (res) => {
				res.list.some(function(item, index) {
					item.key = index
				})

				const houseHlodTableData = res.list
				if(dataType == "month") {
					this.setState({
	
						monthPagination: {
							houseHlodTableData,
							total: res.total,
							current: res.pageNum
						}
					})
				} else if(dataType == "quarter") {
					this.setState({
	
						quarterPagination: {
							houseHlodTableData,
							total: res.total,
							current: res.pageNum
						}
					})
				} else {
					this.setState({
	
						yearPagination: {
							houseHlodTableData,
							total: res.total,
							current: res.pageNum
						}
					})
				}
				

			}
		})
	}
	componentDidMount() {
		this.getUserListByMonth();

	}
	state = {

		houseHlodTableColumns: [{
			title: '姓名',
			dataIndex: 'realname',
			key: 'realname',
		}, {
			title: '住址',
			dataIndex: 'adress',
			key: 'adress',

		}, {
			title: "月总分",
			dataIndex: "totalMonth",
			key: "totalMonth"
		}, {
			title: "季总分",
			dataIndex: "totalQuarter",
			key: "totalQuarter"
		}, {
			title: "年总分",
			dataIndex: "totalYear",
			key: "totalYear"
		}, {
			title: "操作",
			render: (text) => {
				return(<div style={{cursor:"pointer"}} onClick={()=>getALineData(text,this)}>查看详情</div>)
			}
		}],
		visible: false,
		monthPagination: {
			total: 10,
			houseHlodTableData: [],
			current: 1
		},
		quarterPagination: {
			total: 10,
			houseHlodTableData: [],
			current: 1
		},
		yearPagination: {
			total: 10,
			houseHlodTableData: [],
			current: 1
		},
		pageSize: 10
	}

	render() {

		return(
			<div className="tableBox">
			<Tabs defaultActiveKey="1" onChange={(key)=>callback(key,this)}>
			    <TabPane tab="月总分" key="1">
	
			    	<Table pagination={{
			    		total:this.state.monthPagination.total,
			    		pageSize:this.state.pageSize,
			    		defaultCurrent:1,
			    		current:this.state.monthPagination.current,
			    		onChange:(current)=>{
			    			
			    			this.setState({
			    				monthPagination:Object.assign(this.state.monthPagination,{current:current})
			    			},()=>{
			    				this.getUserListByMonth()
			    			})
			    		}
			    	}}  dataSource={ this.state.monthPagination.houseHlodTableData} columns={this.state.houseHlodTableColumns} />

			    </TabPane>
			    <TabPane tab="季总分" key="2">
			    	<Table pagination={{
			    		total:this.state.quarterPagination.total,
			    		pageSize:this.state.pageSize,
			    		
			    		current:this.state.quarterPagination.current,
			    		onChange:(current)=>{
			    			
			    			this.setState({
			    				quarterPagination:Object.assign(this.state.quarterPagination,{current:current})
			    			},()=>{
			    				this.getUserListByMonth()
			    			})
			    		}
			    	}} dataSource={this.state.quarterPagination.houseHlodTableData} columns={this.state.houseHlodTableColumns} />
			    </TabPane>
			    <TabPane tab="年总分" key="3">
			    	<Table pagination={{
			    		total:this.state.yearPagination.total,
			    		pageSize:this.state.pageSize,
			    		
			    		current:this.state.yearPagination.current,
			    		onChange:(current)=>{
			    			
			    			this.setState({
			    				yearPagination:Object.assign(this.state.yearPagination,{current:current})
			    			},()=>{
			    				this.getUserListByMonth()
			    			})
			    		}
			    	}} dataSource={this.state.yearPagination.houseHlodTableData} columns={this.state.houseHlodTableColumns} />
			    </TabPane>
			</Tabs>
			 <Modal
	          title="查看详情"
	         visible={this.state.visible}
	         onCancel = {(e) => {this.setState({visible: false});}}
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
//			    	<Pagination onChange={this.monthOnChange} />
export default househlodRanking
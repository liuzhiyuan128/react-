import { React, SearchRanking, Table, Component, Tabs, TabPane, Modal, Button, echarts, ajax, qs, Pagination, Spin, Row, Col, Switch } from "../../../config/router.js"

let searchData = null, vm = null
const getSearchData = (data) => {
	searchData = data;
	vm.state.pagination.loading = true
	vm.state.pagination.current = 1;
	vm.setState({
	},()=>{
		vm.getUserListByMonth()

	})
	
}
//点击切换 月趋势图和天趋势图
let town = ""
//查看详趋势图情接口
let getEvaluationById = 'getEvaluationByIdMonth'


const getALineData = (text, vm) => {
	town = text.town 
	ajax({
		url: `getTownDetail`,
		type: "post",
		data: qs.stringify({
			town: text.town
		}),
		success: (res)=>{
			var data = {
					town: text.town,
					startTime: null,
					endTime: null
				}
			//设置查看详情数据
			
			if(searchData){
				if(searchData.startTime || searchData.endTime){
					data.startTime = searchData.startTime 
					data.endTime = searchData.endTime 
				}
				
			}

			
			ajax({
				url: `getTownTrendCom`,
				type: "post",
				data:qs.stringify(data),
				success: (res)=>{
			
					res = res.data
					
					//日期需要的格式
					const date = [];
					//数据需要的格式
					const data = [];
					
					//平均值折现图
					const avg = [];
					
					res.some(item=>{
						if(item.dataTime){
							date.push(item.dataTime+"月份")
						}else{
							date.push(item.createTime)
						}
						if(""+item.avg){
							avg.push(item.avg)
						}
						data.push(item.total)
					})
			
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
							data: date,
							axisTick: {
								alignWithLabel: true
							}
						}],
						yAxis: [{
							type: 'value',
							name: "总分"
						},{
							type: 'value',
							name: "平均分",
							min: 0,
        					max: 15,
						}],
						series: [{
								
								type: 'bar',
								name: "总分",
								data: data
							},{
								
								type: 'line',
								name: "平均分",
								data: avg,
								lineStyle:{
									color:"#d14a61"
								},
								 yAxisIndex: 1,
							},
			
						]
					};

					var myChart = echarts.init(document.getElementById('barDetail'));
					myChart.setOption(option);
				}
			})
			const {househlodRankingAlertData} = vm.state;
//		
			for(let item in househlodRankingAlertData){
				
				if(text[item]){
					househlodRankingAlertData[item] = text[item]
				}else{
					househlodRankingAlertData[item] = res[item]
				}

				
			}
//			
			vm.setState({
				visible: true
			});
			
		
		}
		
	})
	

}


class HouseHlodTable extends Component {
	getUserListByMonth() {
		const data = {
			condition: "",
			pageSize: this.state.pageSize,
			pageNum: this.state.pagination.current
		}
		if(searchData){
			for(var item in searchData){
				data[item] = searchData[item]
			}
		}

		
		

		ajax({
			url: "getTownRankCom",
			data: qs.stringify(data),
			type: "post",
			success: (res) => {
				let townComQueryTotalObj = res.data.townComQueryTotal
				res = res.data.pageInfo
				res.list.some(function(item, index) {
					item.key = index
				})
				
				const houseHlodTableData = res.list
				townComQueryTotalObj.key = 1
				var townComQueryTotalArr = [townComQueryTotalObj];
			
					this.setState({
						realPageSize: res.list.length,
						 pagination: {
							houseHlodTableData,
							total: res.total,
							current: res.pageNum,
							loading: false
						},
						townComQueryTotalData: townComQueryTotalArr
						
					})
					
				

			}
		})
	}
	componentDidMount() {
		this.getUserListByMonth();
		vm = this;

	}
	state = {

		houseHlodTableColumns: [{
			title:"镇名",
			dataIndex:"town",
			key:"town"
		},
		{
			title:"总户数",
			dataIndex:"houseNum",
			key:"houseNum"
		},
		{
			title: "考核户数",
			dataIndex: "houseNumberIn",
			key: "houseNumberIn"
		},
		 {
			title: "合格户数",
			dataIndex: "passNumber",
			key: "passNumber"
		}, {
			title: "检查次数",
			dataIndex: "number",
			key: "number"
		}, {
			title: "考核率",
			dataIndex: "housePercent",
			key: "housePercent"
		}, {
			title: '总分',
			dataIndex: 'total',
			key: 'total',

		}, {
			title: "平均分",
			dataIndex: "avg",
			key: "avg"
		},  
		{
			title: "源头正确率",
			dataIndex: "correctPercent",
			key: "correctPercent"
		},{
			title: "排名",
			dataIndex: "rank",
			key: "rank"
		}, {
			title: "操作",
			render: (text) => {
				return(<div style={{cursor:"pointer"}} onClick={()=>getALineData(text,this)}>查看详情</div>)
			}
		}],
		townComQueryTotal: [
			{
				title: '合计',
				dataIndex: 'none',
				key: 'none'
			}, {
				title: '总户数合计',
				dataIndex: 'houseNumTotal',
				key: 'houseNumTotal'
			}, {
				title: '考核户数合计',
				dataIndex: 'houseNumberInTotal',
				key: 'houseNumberInTotal'
			}, {
				title: '合格户数合计',
				dataIndex: 'passNumberTotal',
				key: 'passNumberTotal'
			}, {
				title: '检查次数合计',
				dataIndex: 'numberTotal',
				key: 'numberTotal'
			}, {
				title: '总考核率',
				dataIndex: 'housePercentAvg',
				key: 'housePercentAvg'
			}, {
				title: '总分数合计',
				dataIndex: 'totalTotal',
				key: 'totalTotal'
			}, {
				title: '总平均分',
				dataIndex: 'avgAvg',
				key: 'avgAvg'
			}, {
				title: '总源头分类正确率',
				dataIndex: 'correctPercentAvg',
				key: 'correctPercentAvg'
			}
			
			
		],
		townComQueryTotalData: [
],
		//弹出框
		visible: false,
		//弹出框需要数据
		househlodRankingAlertData:{
			town:"",

			rank: 0,

			houseNum: 0,
			awaysNum: 0,
			partyNum: 0,
		
			avg:0,
			number:0,
			rank:0,
			total:0,
		},
		pagination: {
			total: 10,
			houseHlodTableData: [],
			current: 1,
			loading:true
		},
		
		pageSize: 10,
		monthDay:false,
		realPageSize: 0
	}

	render() {
		const {househlodRankingAlertData} = this.state;
		return(
			<div className="tableBox">
					<Spin spinning={this.state.pagination.loading}>
						    	<Table 
						    	pagination = {false}
						    	dataSource={ this.state.pagination.houseHlodTableData} columns={this.state.houseHlodTableColumns} />
								<Table pagination={{
						    		total:this.state.pagination.total,
						    		pageSize:this.state.pageSize,
						    		defaultCurrent:1,
						    		current:this.state.pagination.current,
						    		onChange:(current)=>{
						    			
						    			this.setState({
						    				pagination:Object.assign(this.state.pagination,{current:current, loading: true})
						    			},()=>{
						    				this.getUserListByMonth()
						    			})
						    		}
						    		
						    	}}   dataSource={ this.state.townComQueryTotalData} columns={this.state.townComQueryTotal}/>
								<div>
									每页 {
										this.state.realPageSize
									}
									条共 {
										this.state.pagination.total
									}
									条
								</div>
					</Spin>
				
				 <Modal
			          title="查看详情"
			         visible={this.state.visible}
			         onCancel = {(e) => {this.setState({visible: false,monthDay:false});}}
			         footer={null}
			         bodyStyle={{width:"100%",padding:"0 12px"}}
			        >
			        	<div>
			        		<Row style={{marginTop:"15px"}}>
			        			<Col span={12}>
			        				<span style={{fontWeight:700,fontSize:"16px"}}>镇名:</span>
			        				<span style={{color:"#999",fontSize:"15px"}}>  {househlodRankingAlertData.town}</span>
			        			</Col>
			        		</Row>
			        		<Row style={{marginTop:"15px"}}>
			        			<Col span={12}>
			        				<span style={{fontWeight:700,fontSize:"16px"}}>党员数:</span>
			        				<span style={{color:"#999",fontSize:"15px"}}>  {househlodRankingAlertData.partyNum}</span>
			        			</Col>
			        			<Col span={12}>
			        				<span style={{fontWeight:700,fontSize:"16px"}}>总户数:</span>
			        				<span style={{color:"#999",fontSize:"15px"}}>  {househlodRankingAlertData.houseNum}</span>
			        			</Col>
			        		</Row>
			        		<Row style={{marginTop:"15px"}}>
			        			<Col span={12}>
			        				<span style={{fontWeight:700,fontSize:"16px"}}>常住数:</span>
			        				<span style={{color:"#999",fontSize:"15px"}}>  {househlodRankingAlertData.awaysNum}</span>
			        			</Col>
			        		</Row>
			        		<Row style={{marginTop:"15px"}}>
			        			<Col span={6}>
			        				总分<span style={{color:"red"}}>  {househlodRankingAlertData.total+"分"} </span>
			        			</Col>
			        			<Col span={6}>
			        				平均分<span style={{color:"red"}}>  {househlodRankingAlertData.avg+"分"} </span>
			        			</Col>
			        			<Col span={6}>
			        				检查次数<span style={{color:"red"}}>  {househlodRankingAlertData.number+"次"} </span>
			        			</Col>
			        			<Col span={6}>
			        				排名<span style={{color:"red"}}>  {househlodRankingAlertData.rank+"名"} </span>
			        			</Col>
			        		</Row>
			        	</div>
			        	 <Switch checked={this.state.monthDay}  style={{marginTop:10}} checkedChildren="月" onChange={(boolean)=>{
			        	 	//true月 false 天 默认展示的是天
			        	 	let data = null
			        	 	if(boolean){
			        	 		data = {
										town: town,
										startTime: searchData ? searchData.startTime : null,
										endTime: searchData ? searchData.endTime : null,
										rankType: 1,
									}
			        	 	}else{
			        	 		data = {
										town: town,
										startTime: searchData ? searchData.startTime : null,
										endTime: searchData ? searchData.endTime : null,
										rankType: 0,
									}
			        	 	}
			        	 	ajax({
									url: `getTownTrendCom`,
									type: "post",
									data:qs.stringify(data),
									success: (res)=>{
										res = res.data
										//日期需要的格式
										const date = [];
										//数据需要的格式
										const data = [];
										
										//平均值折现图
										const avg = [];
										
										res.some(item=>{
											if(item.dataTime){
												date.push(item.dataTime+"月份")
											}else{
												date.push(item.createTime)
											}
											if(""+item.avg){
												avg.push(item.avg)
											}
											data.push(item.total)
										})
								
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
												data: date,
												axisTick: {
													alignWithLabel: true
												}
											}],
											yAxis: [{
												type: 'value',
												name: "总分"
											}],
											series: [{
													
													type: 'bar',
													name: "总分",
													data: data
												},{
													
													type: 'line',
													name: "平均分",
													data: avg,
													lineStyle:{
														color:"#d14a61"
													}
												},
								
											]
										};
										
										var myChart = echarts.init(document.getElementById('barDetail'));
										myChart.setOption(option);
									}
								})
			        	 	this.setState({
			        	 		monthDay:!this.state.monthDay
			        	 	})
			        	 	

			        	 }} unCheckedChildren="天"  />
				        <div id="barDetail" style={{width:"100%",height:"400px",padding:12}}>
							
				        </div>
			        </Modal>
			</div>
		)
	}
}
const rankTypeList = [
	{
		name: '总分',
		value: 0,
		
	}, {
		name: '平均分',
		value: 1
	}, {
		name: '考核率',
		value: 2
	}, {
		name: '源头正确率',
		value: 3
	}
]

const townRanking = () => {
	searchData = {}
	return <div>
		<SearchRanking showExport="exportWordTown" showRankType rankTypeList={rankTypeList}   getSearchData={getSearchData}/>
		<HouseHlodTable />
	</div>
}

export default townRanking
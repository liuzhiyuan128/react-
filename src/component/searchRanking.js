import {qs,dataFilter, React, Component, RangePicker, DatePicker, Row, Col, Select, Option, Button, TreeNode, TreeSelect, Input, ajax, message  } from "../config/router.js";



var searchData = {
	
}
function onChange(value, dateString) {
	searchData.startTime = dateString[0]
	searchData.endTime = dateString[1]
}

//function dataChange(value) {
//	console.log(`日期 ${value}`);
//}
//
//function villageChange(value) {
//	console.log(`村 ${value}`);
//}



function treeValue(value) {
	searchData.villageId = value
}

function getInputValue (e) {
	searchData.condition = e.target.value;
	
}


class SearchRanking extends Component {
	constructor(props) {
		super(props)
		searchData = {}
	
	}
	triger() {
		this.props.getSearchData(searchData);
	}
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
		if(sessionStorage.roleId != 2){
			 ajax({
				url: url,
				type: "get",
				success: (res) => {
					var treeData = dataFilter(res.data);
					this.setState({
						treeData
					})
				}
			})
		}
		
	}
	state = {
		 treeData : []
	}
	export = () => {
	
	if(this.props.villageId) searchData.villageId = this.props.villageId;
	if(this.props.selectData){
		searchData.villageId = this.props.villageId
	}
	if(searchData.rankType){
		 
	}else{
		if( this.props.selectData){
		searchData.rankType =  this.props.selectData.defaultValue
			
		}
	}
	
		
			ajax({
				url: this.props.showExport,
				type: 'post',
				data: qs.stringify(searchData),
				success: (res) => {
					if(res.code == 200){
						const fileUrl = "http://" + res.data;
						window.location.href = fileUrl;
					}else{
						message.warning(res.msg)
					}
				}
			})
			
		
	}
	render() {
		return(
			<div id="search" style={{padding:"0 24px"}}>
		    <Row   gutter={24}>
		    	<Col span={1} style={{minWidth:"30px",height:"32px",lineHeight:"32px"}}>
		    		时间
		    	</Col>
		    	<Col span={6}>
		    		<RangePicker
				      format="YYYY-MM-DD"
				      placeholder={['开始时间', '结束时间']}
				      onChange={onChange}
				    />
		    	</Col>
				{
					//state1 审核通过  2  审核未通  3未审核
				}
				<Col style = {{display: this.props.conditionNone ? 'block' : 'none'}} span={3}>
					{
						 (()=>{
							if(this.props.selectData){
								
								return <Select defaultValue={this.props.selectData.defaultValue}  onChange={(value)=>{searchData.state = value;}} placeholder="选择状态">
									{this.props.selectData.list.map((item)=>{
										return <Option key = {item.value} value={item.value}>{item.name}</Option>	
									})}
								</Select>
							}else{
								return ""
							}
						 })()
				}
				</Col>
		    	<Col span={6} style={{display: this.props.conditionNone ? 'none' : 'block'}}>
		    		{
						(()=>{
							
							if(this.props.hideSecondInput){
								return <div></div>
							}else{
								return <Input onChange={getInputValue} placeholder="请输入查询条件" />
							}
						})()
					}
		    	</Col>
		    	<Col span={4} style={{display: !this.props.isTree ? 'none' :  (sessionStorage.roleId != 2 ? "block" : 'none')  }}>
		    					<TreeSelect
							        showSearch
							        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
							        placeholder="请选者村或镇"
							        allowClear
							        treeDefaultExpandAll={true}
							        onChange={treeValue}
							        treeData={this.state.treeData}
							      >
					     		 </TreeSelect>
		    	</Col>
				<Col style = {{display: this.props.hasOwnProperty('showRankType') ? 'block' : 'none'}} span={3}>
					{(()=>{
						if(this.props.hasOwnProperty("showRankType")){
							return<Select onChange={(value)=>{searchData.rankType = value;}} placeholder="选择排名方式">
								{
								
									this.props.rankTypeList.map((item)=>{
										return <Option key={item.value} value={item.value}>{item.name}</Option>
									})
								}
							</Select>
						}else{
							return "";
						}
					
					})()}
				</Col>
				<Col span={2} style={{display: this.props.showExport ? "block" : "none"}}>
					<Button type="primary" onClick={this.export}>导出</Button>
				</Col>
		    	<Col span={2}>
		    		<Button type="primary" onClick={()=>this.triger()}>查询</Button>
		    	</Col>
		    </Row>

			</div>
		)
	}
}
export default SearchRanking
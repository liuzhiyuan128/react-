import {React, Component, RangePicker, DatePicker, Row, Col, Select, Option, Button} from "../config/router.js";

const  searchData = {
	
}
function onChange(value, dateString) {
  console.log('Formatted Selected Time: ', dateString);
}
function dataChange(value) {
  console.log(`日期 ${value}`);
}
function villageChange(value) {
	 console.log(`村 ${value}`);
}
function rankingfn(value) {
	console.log(`排名 ${value}`);
}

class SearchRanking extends Component{
	constructor(props){
		super(props)
		
	}
	triger(){
		const data = "ok"
		this.props.getSearchData(data)
	}
	render(){
		return (
			<div id="search" style={{padding:"0 24px"}}>
		    <Row   gutter={24}>
		    	<Col span={1} style={{minWidth:"30px",height:"32px",lineHeight:"32px"}}>
		    		时间
		    	</Col>
		    	<Col span={9}>
		    		<RangePicker
				      format="YYYY-MM-DD"
				      placeholder={['开始时间', '结束时间']}
				      onChange={onChange}
				    />
		    	</Col>
		    	<Col span={8}>
		    		<Select
					    showSearch
					    style={{ minWidth: 100 }}
					    placeholder="村名"
					    optionFilterProp="children"
					    onChange={villageChange}
					    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
					  >
					    <Option value="jack">上王村</Option>
					    <Option value="lucy">江东镇</Option>
					    <Option value="tom">哈哈哈</Option>
					  </Select>
		    	</Col>
		    	<Col span={4}>
		    		<Select
					    showSearch
					   style={{ minWidth: 150 }}
					    placeholder="选择排名方式"
					    onChange={rankingfn}
					  >
					    <Option value="jack">上王村</Option>
					    <Option value="lucy">江东镇</Option>
					    <Option value="tom">哈哈哈</Option>
					  </Select>
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

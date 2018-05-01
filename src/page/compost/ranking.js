import { Menu, Content, React, Component, Tabs, TabPane, SearchRanking, Table} from "../../config/router.js"
function callback(key) {
  console.log(key);
}
function getSearchData (data) {
	console.log(data)
}
const getALineData = (text) => {
	console.log(text);
	
}
const compostData = [
{
  key: '1',
  name: '胡彦斌',
  age: 32,
  address: '西湖区湖底公园1号',
  operation:"查看详情"
},
{
  key: '2',
  name: '胡彦祖',
  age: 42,
  address: '西湖区湖底公园1号',
  operation:"查看详情"
},

]
const compostColumns = [{
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
   render:(record,text)=>{
   		
   		return (
   			<span style={{cursor:"pointer"}} onClick={()=>{return getALineData(text)}}>查看详细</span>
   		)
   }
}
]
 const compostRanking = ()=>{
	return (<div>
		<SearchRanking getSearchData={getSearchData}/>
		<Tabs defaultActiveKey="1" onChange={callback}>
		    <TabPane tab="月总分" key="1"><Table  dataSource={compostData} columns={compostColumns} /></TabPane>
		    <TabPane tab="季总分" key="2"><Table  dataSource={compostData} columns={compostColumns} /></TabPane>
		    <TabPane tab="年总分" key="3"><Table  dataSource={compostData} columns={compostColumns} /></TabPane>
		</Tabs>
	</div>)
}
export default compostRanking
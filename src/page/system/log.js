import { message, qs, RangePicker, Input, Form, TreeSelect, Modal, Button, Select, Option,Icon, Col, Row, React, Component, Table, Header, ajax} from "../../config/router";
  const FormItem = Form.Item;

const columns = [
    {
        title: '操作者',
        dataIndex: 'updatename',
        key: 'updatename'
    }, {
        title: '类型',
        dataIndex: 'type',
        key: 'type'
    }, {
        title: '内容',
        dataIndex: 'log',
        key: 'log',
        width: '60%',
        render:(text) => {
            return <div title={text} style={{width: "100%", cursor: "default",textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>{text}</div>
        }
    }, {
        title: '日期',
        dataIndex: 'date',
        key: 'date'
    },
   
   
];

class Log extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns,
            dataSource:[],
            data:{
                type: null,
                operator: null,
                startTime: null,
                endTime: null
            }
        }
    }
    onChange = (obj,toString) =>{
        this.state.data.startTime = toString[0]
        this.state.data.endTime = toString[1]

    }
//     type 操作类型 增加/删除/修改
// operator 操作者 输入文字
// startTime 开始时间
// endTime 结束时间
    getList = () => {
    
            ajax({
                url: 'getAllLog',
                type: 'post',
                data: qs.stringify(this.state.data),
                success: (res) => {
                    if(res.code == 200) {
                        res.data.some((item) => {
                            item.key = item.id
                        })
                        this.setState({
                            dataSource:res.data
                        })
                    }else{
                        message.warning(res.msg)
                    }
                }
                
            })
   
        
    }
    componentDidMount = () => {
        this.getList()
    }
    render(){
        return(
                <div id={"systemCompost"}>
                   
                    <Row style={{marginTop: 20}}>
                        <Col span={1} style={{textAlign: 'center',lineHeight: "32px"}}>
                            时间
                        </Col>
                        <Col span={6} style={{lineHeight: "32px"}}>
                            <RangePicker
                                format="YYYY-MM-DD"
                                placeholder={['开始时间', '结束时间']}
                                onChange={this.onChange}
                                />
                        </Col>
                        <Col span = {8} style={{paddingRight:100}}>
                            <Input placeholder="操作者" type='text' onBlur = {(e)=>{
                               this.state.data.operator = e._targetInst.stateNode.value
                            }}/>
                        </Col>
                        <Col span = {4}>
                            <Select onChange={(value)=>{
                                this.state.data.type = value
                            }}  placeholder="选择操类型" style={{width: "100%"}}>
                                <Option value="增加">增加</Option>
                                <Option value="删除">删除</Option>
                                <Option value="修改">修改</Option>
                            </Select>
                        </Col>
                        <Col  span={3}  style={{textAlign: 'right'}}>
                            <Button onClick = {()=>{
                                this.setState({
                                    current: 1,
                                }, () => {
                                    this.setState({},()=>{
                                        this.getList()
                                    })
                                })
                                
                            }} type='primary'>查询</Button>
                        </Col>
                    </Row>
                   <div style={{marginTop: 20}}>
                       <Table pagination={{
                           current:this.state.current,
                           onChange: (current)=>{
                            this.setState({
                                current: current
                            })
                           }
                       }} dataSource={this.state.dataSource} columns={this.state.columns}/>
                   </div>
                </div>
        )
    }
}
const log = () =>{
    return <Log/>
}
export default log
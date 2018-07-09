import {
    Checkbox,
    qs,
    Form,
    Input,
    Modal,
    Select,
    Option,
    Tabs,
    TabPane,
    Button,
    Route,
    Table,
    Row,
    Col,
    Icon,
    React,
    Component,
    ajax,
    message,
    Spin
    
} from '../../../config/router';
import vmS from "./vm"
class ReadyUser extends Component{
    constructor(props){
        super(props)
        vmS.readyUser = this;
        this.state = {
            description: "",
            pageSize: 10,
            pageNum: 1,
            total: 0,
            loading: false,
            tableData: [
              
            ],
            tableColumns: [{
                title: '账号',
                dataIndex: 'userName',
                key: "userName"
            }, {
                title: '姓名',
                dataIndex: 'realName',
                key: "realName"
            },{
                title: '添加',
                width: '10%',
                render: (row) =>{
                    return <Icon onClick={()=>{
                        this.setState({
                        selectedRowKeys: row.key
                    }, ()=>{
                        this.save()
                    })
                    }} type="plus" style={{color: '#6d9afc', cursor: 'pointer'}}/>
                }
            }],
            selectedRowKeys: []

        }
    }
    foreachList = () => {
        this.setState({
            pageNum: 1
        }, () => {
            this.getList();
        })
        
        
       
    }
    getList = () => {
        this.setState({
                loading: true
            })
            var roleId = location.href.substr(location.href.lastIndexOf("/")+1)
          
            ajax({
               url: 'getAllUsersUnSelected',
               type: 'post',
               data: qs.stringify({
                   pageNum: this.state.pageNum,
                   pageSize: this.state.pageSize,
                   description: this.state.description,
                   roleId: Number(roleId)+1
               }),
               success: (res) => {
                   if(res.code == 200){
                        res.data.list.map((item)=>{
                            item.key = item.id
                        })
                        this.setState({
                            loading: false,
                            tableData: res.data.list,
                            total: res.data.total
                        })
                   }else{
                      message.warning(res.msg)
                   }
                   
               }
           })
        
    }
    checkboxOnChange = (selectedRowKeys) => {
        this.setState({
            selectedRowKeys,
        })
    }
    save = () => {
           var roleId = location.href.substr(location.href.lastIndexOf("/")+1)
        ajax({
            url: 'batchAddUserRole',
            type: 'post',
            data: qs.stringify({
                userIds: ""+this.state.selectedRowKeys,
                roleId: Number(roleId)+1
            }),
            success: (res) => {
                if(res.code == 200){
                    message.info(res.msg)
                    this.getList()
                }else{
                    message.warning(res.msg)
                }
            }
        })
        
    }
pageOnChange = (pageNum) => {
    this.setState({
        pageNum,
    },()=>{
        this.getList()
    })
}
readyCholse = (description) => {
      this.setState({
        description,
    },()=>{
        this.getList()
    })
}
    render(){
        return <div>
                <div style={{width:200}}>
                    <Select
                            onChange = {this.readyCholse}
                            style={{
                            width: "100%",
                            background: 'rgb(241, 241, 241)'
                        }}
                            placeholder="待选用户列表">
                           {// 0最高管理员 1 区领导 2 镇管理员 3 村管理员 4 村民
                           }
                           <Option value = '0'>最高管理员</Option>
                           <Option value = '1'>区领导</Option>
                           <Option value = '2'>镇管理员</Option>
                           <Option value = '3'>村管理员</Option>
                           <Option value = '4'>村民</Option>
                     </Select>
                </div>
                <div className="spinBox">
                           <Spin spinning={this.state.loading}>
                                <Table 
                                rowSelection={{
                                    onChange: this.checkboxOnChange,
                                    // selectedRowKeys: this.props.rowSelection.selectedRowKeys
                                }}
                                pagination={{
                                    total: this.state.total,
                                    pageSize: this.state.pageSize,
                                    current: this.state.pageNum,
                                    onChange: this.pageOnChange
                                }}   dataSource={this.state.tableData} columns={this.state.tableColumns} />
                        </Spin>
                </div>       
                <Row style={{marginTop: 10}}>
                    <Col span={24} style={{textAlign: "right",paddingRight:12}}>
                            <Button type='primary' onClick={this.save}>增加</Button>
                    </Col>
                </Row>
            </div>
    }
} 

export default ReadyUser
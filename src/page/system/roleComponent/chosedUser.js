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
import vmS from "./vm";
class ChosedUser extends Component {
    constructor(props){
        super(props)
        vmS.choosedUser = this;
        this.state = {
            pageSize: 10,
            pageNum: 1,
            total: 50,
            loading: true,
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
            }, {
                title: '减少',
                width: '10%',
                render: (row) =>{
                    return <Icon onClick={()=>{
                                this.setState({
                                selectedRowKeys: row.key
                            }, ()=>{
                                this.save()
                            })
                    }} type="minus" style={{color: '#6d9afc', cursor: "pointer"}}/>
                }
            }]

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
    this.setState({loading: true})
    var roleId = location
        .href
        .substr(location.href.lastIndexOf("/") + 1)

    ajax({
        url: 'getAllUsersSelected',
        type: 'post',
        data: qs.stringify({
            pageNum: this.state.pageNum,
            pageSize: this.state.pageSize,
            roleId: Number(roleId) + 1
        }),
        success: (res) => {
            if (res.code == 200) {
                res
                    .data
                    .list
                    .map((item) => {
                        item.key = item.id
                    })
                this.setState({loading: false, tableData: res.data.list, total: res.data.total})
            } else {
                message.warning(res.msg)
            }

        }
    })

}
checkboxOnChange = (selectedRowKeys) => {
    this.setState({selectedRowKeys})
}
save = () => {
    var roleId = location
        .href
        .substr(location.href.lastIndexOf("/") + 1)
    ajax({
        url: 'batchDeleteUserRole',
        type: 'post',
        data: qs.stringify({
            userIds: "" + this.state.selectedRowKeys,
            roleId: Number(roleId) + 1
        }),
        success: (res) => {
            if (res.code == 200) {
                message.info(res.msg)
                this.getList()
            } else {
                message.warning(res.msg)
            }
        }
    })

}
pageOnChange = (pageNum) => {
    this.setState({
        pageNum
    }, () => {
        this.getList()
    })
}

    render(){
        return <div>
                <div style={{width:200}}>
                   
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
                            <Button type='primary' onClick={this.save}>减少</Button>
                    </Col>
                </Row>
            </div>
    }
} 

export default ChosedUser
import {Radio, TreeSelect, Input, Button, Select, Form, Modal, Table, ajax, dataFilter, Tree, React, Component, Row, Col, Icon   } from "../../config/router";
const TreeNode = Tree.TreeNode;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


const userStyle = {
    height: window.innerHeight - 45 - 10 - 10
}
class UserTree extends React.Component {
    constructor(props){
        super(props);
        this.state={
            treeData:[],
            expandedKeys:["10"],
            selectedKeys:[]
        }
    }
    componentDidMount(){
        this.getTreeData()
    }
    getTreeData(){
         ajax({
				url: "tree",
				type: "get",
				success: (res) => {
                   
                    var treeData = dataFilter(res.data);
                    this.props.getTreeData(treeData)
                    
					this.setState({
						treeData
					})
				}
			})
    }
   
    loop = data => data.map((item) => {
        if(item.pid == 10 || item.pid == 0){
            var style = {
                background:'#f5f5f5'
            }
        }
        if (item.children && item.children.length) {
            if(item.value == this.state.selectedKeys[0]){
               return <TreeNode   key={item.value} title={<div>{item.label}{<Icon  style={{marginLeft: "20px", color: 'rgb(87, 138, 251)'}} type="edit" />}{<Icon  style={{marginLeft: "20px",color:'rgb(87, 138, 251)'}} type="delete" />}</div>}>{this.loop(item.children)}</TreeNode>;
            }else{
                 return <TreeNode style={{background:"pink"}} key={item.value} title={<div >{item.label}</div>}>{this.loop(item.children)}</TreeNode>;
            }

        }
        if(item.value == this.state.selectedKeys[0]){
               return <TreeNode key={item.value} title={<div>{item.label}{<Icon  style={{marginLeft: "20px", color: 'rgb(87, 138, 251)'}} type="edit" />}{<Icon  style={{marginLeft: "20px", color: 'rgb(87, 138, 251)'}} type="delete" />}</div>}/>
        }else{
             return <TreeNode key={item.value} title={item.label}/>;      
        }
    });
    treeClcik = data =>{
        console.log(data)
        this.state.selectedKeys = data;
        this.setState({})
    }
    render() {
        return (
            <Tree   
                className="draggable-tree"
                defaultExpandedKeys={this.state.expandedKeys}
                onSelect={this.treeClcik}
                selectedKeys={this.state.selectedKeys}
                onExpand = {(expandedKeys)=>{
                   
                    this.state.expandedKeys = expandedKeys
                }}
                >
                {this.loop(this.state.treeData)}
            </Tree>
        );
    }
}
const dataSource = [
    {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号'
    }, {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号'
    }
];

const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name'
    }, {
        title: '年龄',
        dataIndex: 'age',
        key: 'age'
    }, {
        title: '住址',
        dataIndex: 'address',
        key: 'address'
    },
    {
        title: '操作',
        render(text){
            return <Icon type="edit" style={{color:"#888888", fontSize: '20px'}}/>
        }
    }
];
class AddDepartment extends React.Component {
    constructor(props){
        super(props)

        
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this
            .props
            .form
            .validateFields((err, values) => {
                if (!err) {
                    
                    console.log('Received values of form: ', values);
                    this.props.closeDepartment()
                }
            });
    }
   
    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                 <FormItem
                    label="上级部门"
                    labelCol={{
                    span: 5
                }}
                    wrapperCol={{
                    span: 12
                }}>
                    {getFieldDecorator('department', {
                        rules: [
                            {
                                required: true,
                                message: '请选择上级部门'
                            }
                        ]
                    })(
                        ( <TreeSelect
							        showSearch
							        dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}
							        placeholder="请选者村或镇"
							        allowClear
							        treeDefaultExpandAll={true}
							        treeData={this.props.treeData}
							      >
					     		 </TreeSelect>)
                    )}
                </FormItem>
                <FormItem
                    label="名称"
                    labelCol={{
                    span: 5
                }}
                    wrapperCol={{
                    span: 12
                }}>
                    {getFieldDecorator('name', {
                        rules: [
                            {
                                required: true,
                                message: '请输入名称'
                            }
                        ]
                    })(<Input/>)}
                </FormItem>
                <FormItem
                    label="顺序"
                    labelCol={{
                    span: 5
                }}
                    wrapperCol={{
                    span: 12
                }}>
                    {getFieldDecorator('order', {
                        rules: [
                            {
                                required: true,
                                message: '请输入顺序'
                            }
                        ]
                    })(<Input/>)}
                </FormItem>
               <FormItem
                    label="备注"
                    labelCol={{
                    span: 5
                }}
                    wrapperCol={{
                    span: 12
                }}>
                    {getFieldDecorator('remarks', {
                        rules: [
                            {
                                required: false,
                                message: '请输入名称'
                            }
                        ]
                    })(<Input/>)}
                </FormItem>
                <FormItem
                    wrapperCol={{
                    span: 12,
                    offset: 5,
                    style:{
                        textAlign:'right'
                    }
                    
                }}>
                    <Button type="primary" htmlType="submit">
                        确认
                    </Button>
                </FormItem>
            </Form>
        );
    }
}
class AddUser extends React.Component {
    constructor(props) {
        super(props)

    }
    handleSubmit = (e) => {
        e.preventDefault();
        this
            .props
            .form
            .validateFields((err, values) => {
                if (!err) {

                    console.log('Received values of form: ', values);
                    this
                        .props
                        .closeDepartment()
                }
            });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
               <Row>
                   <Col span={12}>
                        <FormItem
                            label="所在村镇"
                            labelCol={{
                            span: 6
                        }}
                            wrapperCol={{
                            span: 12
                                }}>
                                    {getFieldDecorator('department', {
                                rules: [
                                    {
                                        required: false,
                                        message: '请输入村镇'
                                    }
                                ]
                            })(
                                ( <TreeSelect
                                            showSearch
                                            dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}
                                            placeholder="请选者村或镇"
                                            allowClear
                                            treeDefaultExpandAll={true}
                                            treeData={this.props.treeData}
                                        >
                                        </TreeSelect>)
                            )}
                        </FormItem>
                   </Col>
                   <Col span={12}>
                        <FormItem
                            label="垃圾桶编号"
                            labelCol={{
                            span: 6
                        }}
                            wrapperCol={{
                            span: 12
                        }}>
                            {getFieldDecorator('trashId', {
                                rules: [
                                    {
                                        required: false,
                                        message: '请输入垃圾桶编号'
                                    }
                                ]
                            })(<Input/>)}
                        </FormItem>
                   </Col>
               </Row>
                <Row>
                   <Col span={12}>
                        <FormItem
                            label="姓名"
                            labelCol={{
                            span: 6
                        }}
                            wrapperCol={{
                            span: 12
                        }}>
                            {getFieldDecorator('name', {
                                rules: [
                                    {
                                        required: false,
                                        message: '请输入姓名'
                                    }
                                ]
                            })(<Input/>)}
                        </FormItem>
                   </Col>
                   <Col span={12}>
                        <FormItem
                            label="联系电话"
                            labelCol={{
                            span: 6
                        }}
                            wrapperCol={{
                            span: 12
                        }}>
                            {getFieldDecorator('phone', {
                                rules: [
                                    {
                                        required: false,
                                        message: '请输入电话'
                                    }
                                ]
                            })(<Input/>)}
                        </FormItem>
                   </Col>
               </Row>
               <Row>
                   <Col span={12}>
                        <FormItem
                            label="联系党员"
                            labelCol={{
                            span: 6
                        }}
                            wrapperCol={{
                            span: 12
                        }}>
                            {getFieldDecorator('party', {
                                rules: [
                                    {
                                        required: false,
                                        message: '请输入党员'
                                    }
                                ]
                            })(<Input/>)}
                        </FormItem>
                   </Col>
                   <Col span={12}>
                        <FormItem
                            label="人口数"
                            labelCol={{
                            span: 6
                        }}
                            wrapperCol={{
                            span: 12
                        }}>
                            {getFieldDecorator('name', {
                                rules: [
                                    {
                                        required: false,
                                        message: '请输入人口数'
                                    }
                                ]
                            })(<Input/>)}
                        </FormItem>
                   </Col>
               </Row>
               <Row>
                   <Col span={12}>
                        <FormItem
                            label="是否常住"
                            labelCol={{
                            span: 6
                        }}
                            wrapperCol={{
                            span: 12
                        }}>
                            {getFieldDecorator('isOnlyLive')(
                                <RadioGroup>
                                    <Radio value="是">是</Radio>
                                    <Radio value="否">否</Radio>
                                </RadioGroup>
                            )}

                        </FormItem>
                   </Col>
                   <Col span={12}>
                         <FormItem
                            label="是否党员"
                            labelCol={{
                            span: 6
                        }}
                            wrapperCol={{
                            span: 12
                        }}>
                            {getFieldDecorator('isParty')(
                                <RadioGroup>
                                    <Radio value="是">是</Radio>
                                    <Radio value="否">否</Radio>
                                </RadioGroup>
                            )}

                        </FormItem>
                   </Col>
               </Row>
               <Row>
                   <Col span={12}>
                        <FormItem
                            label="账号"
                            labelCol={{
                            span: 6
                        }}
                            wrapperCol={{
                            span: 12
                        }}>
                            {getFieldDecorator('accountNumber', {
                                rules: [
                                    {
                                        required: false,
                                        message: '请输入账号'
                                    }
                                ]
                            })(<Input/>)}
                        </FormItem>
                   </Col>
                   <Col span={12}>
                        <FormItem
                            label="用户类型"
                            labelCol={{
                            span: 6
                        }}
                            wrapperCol={{
                            span: 12
                        }}>
                            {getFieldDecorator('userType', {
                                rules: [
                                    {
                                        required: false,
                                        message: '请输入用户类型'
                                    }
                                ]
                            })(<Input/>)}
                        </FormItem>
                   </Col>
               </Row>
               <Row>
                   <Col span={12}>
                        <FormItem
                            label="备注"
                            labelCol={{
                            span: 6
                        }}
                            wrapperCol={{
                            span: 12
                        }}>
                            {getFieldDecorator('bz', {
                                rules: [
                                    {
                                        required: false,
                                        message: '请输入备注'
                                    }
                                ]
                            })(<Input/>)}
                        </FormItem>
                   </Col>
               </Row>
               

                <FormItem
                    wrapperCol={{
                    span: 14,
                    offset: 5,
                    style: {
                        textAlign: 'right'
                    }
                }}>
                    <Button type="primary" htmlType="submit">
                        确认
                    </Button>
                </FormItem>
            </Form>
        );
    }
}
const AddDepartmentConment = Form.create()(AddDepartment);
const AddUserConment = Form.create()(AddUser);

class User extends Component{
    constructor(props){
        super(props)
        this.state = {
            visible : false,
            treeData: []
        }
    }
    showAddDepartment = () =>{
        this.setState({visible: true})
    }
    addDepartmentOk = () => {
        alert("ok")
    }
    getTreeData =(data)=>{
      
        this.setState({
            treeData:data
        })

    }
    closeDepartment=()=>{
        this.setState({
            visible: false,
            addUser: false
        })
    }
    render(){
        
        return (
            <div id="user" style={userStyle}>
                <div className={"left"}>
                    <div
                        style={{
                        fontWeight: 700,
                        paddingLeft: 18,
                        cursor: "pointer"
                    }}>
                        部门列表
                        <Icon
                            style={{
                            color: '#578afb'
                        }}
                            type="plus" onClick={this.showAddDepartment}/>
                    </div>
                    <UserTree getTreeData={this.getTreeData}/>
                </div>
                <div className="right">
                    <div
                        style={{
                        fontWeight: 700,
                        paddingLeft: 18,
                        cursor: "pointer"
                    }}>
                        用户列表
                        <Icon onClick={()=>{this.setState({addUser:true})}}
                            style={{
                            color: '#578afb'
                        }}
                            type="plus"/>
                        <div style={{
                            marginTop: 20
                        }}>
                            <Table dataSource={dataSource} columns={columns}/>
                        </div>

                    </div>
                </div>
                <div className='add-department'>
                    <Modal title="新增部门"
                         visible={this.state.visible}
                         onCancel = {()=>{
                             this.setState({
                                 visible: false
                             })
                         }}
                        
                         footer={null}
                         >
                         <AddDepartmentConment closeDepartment={this.closeDepartment} treeData={this.state.treeData} />
                       
                    </Modal>
                </div>
                <div className='add-user'>
                    <Modal title="新增用户"
                         visible={this.state.addUser}
                         onCancel = {()=>{
                             this.setState({
                                 addUser: false
                             })
                         }}
                        
                         footer={null}
                         >
                         <AddUserConment closeDepartment={this.closeDepartment} treeData={this.state.treeData}/>
                    </Modal>
                </div>
            </div>
        )
    }
}

const user = () => {
    return <User/>
}
export default user
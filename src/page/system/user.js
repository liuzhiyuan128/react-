import {message,qs,Route, Radio, Spin, TreeSelect, Input, Button, Select, Form, Modal, Table, ajax, dataFilter, Tree, React, Component, Row, Col, Icon   } from "../../config/router";
// import { color } from "../../../node_modules/_echarts@4.0.4@echarts/lib/export";
// import { div } from "../../../node_modules/_zrender@4.0.3@zrender/lib/core/vector";
const TreeNode = Tree.TreeNode;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
let router = null, id = -1, userVM,userTreeVM, changeData = {}, ChangeDepartmentVM = null, ChangeUserVM = null;


const userStyle = {
    height: window.innerHeight - 45 - 10 - 10
}
class UserTree extends React.Component {
    constructor(props){
        super(props);
        this.state={
            treeData:[],
            expandedKeys:["10"],
            selectedKeys:[],
            visible: false
        }
        userTreeVM = this
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
					},()=>{
                        this.props.vm.setState({
                            spin: false
                        })
                    })
				}
			})
    }
   change  = (item) => {
    
        ajax({
            url: 'getVillageDetail/'+item.value,
            success: (res) => {
                // ChangeDepartmentConment = Form.create()(ChangeDepartment)
                
               
                if(res.code == 200) {
                    changeData = res.data;
                }
              
                this.setState({visible: true},()=>{
                   setTimeout(() => {
                      ChangeDepartmentVM.props.form.setFieldsValue({jdId:changeData.jdId+'',villageName:changeData.villageName,seq:changeData.seq,remark:changeData.remark, id: changeData.id})
                        
                   }, 10);
                })
                
                
            }
        })
        
   }
   delete = (item) => {
       
       Modal.warning({
           title: '删除',
           content: '是否删除?',
           onOkText: '确认',
           onOk: ()=>{
               console.log(item)
               ajax({
                   url:'delete/'+item.value,
                   success: (res) => {
                       
                       if(res.code == 200){
                           message.info(res.msg);
                           this.getTreeData()
                       }else{
                             message.warning(res.msg);
                       }
                   }
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
               return <TreeNode   key={item.value} title={<div>{item.label}{<Icon onClick={()=>{this.change(item)}} style={{marginLeft: "20px", color: 'rgb(87, 138, 251)'}} type="edit" />}{<Icon  style={{marginLeft: "20px",color:'rgb(87, 138, 251)'}} type="delete" onClick={()=>{this.delete(item)}} />}</div>}>{this.loop(item.children)}</TreeNode>;
            }else{
                 return <TreeNode style={{background:"pink"}} key={item.value} title={<div >{item.label}</div>}>{this.loop(item.children)}</TreeNode>;
            }

        }
        if(item.value == this.state.selectedKeys[0]){
               return <TreeNode key={item.value} title={<div>{item.label}{<Icon onClick={()=>{this.change(item)}}  style={{marginLeft: "20px", color: 'rgb(87, 138, 251)'}} type="edit" />}{<Icon onClick={()=>{this.delete(item)}}  style={{marginLeft: "20px", color: 'rgb(87, 138, 251)'}} type="delete" />}</div>}/>
        }else{
             return <TreeNode  key={item.value} title={item.label}/>;      
        }
    });
    treeClcik = (data = []) =>{
        if(data.length == 0) return false
        id = data
        userVM.getList()
        this.state.selectedKeys = data;
        this.setState({})
    }
    render() {
        return (
           <div>
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
                <Modal footer={null} visible={this.state.visible} title="修改" onCancel={()=>{this.setState({visible:false})}}>
                    <ChangeDepartmentConment treeData={this.state.treeData}/>
                </Modal>
           </div>
        );
    }
}


const columns = [
    {
        title: '姓名',
        dataIndex: 'userName',
        key: 'userName'
    }, {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
        render: (text) => {
            if(text == 0){
                text = '最高管理员'
            } else if (text == 1) {
                text = '区管理员'
            }else if(text == 2) {
                text = '镇管理员'
            }else if(text == 3){
                text = '村管理员'
            }else if(text == 4){
                text = '村民'
            }
            return text
        }
    }, {
        title: '状态',
        dataIndex: 'accountDisable',
        key: 'accountDisable',
        render(item){
            let text = '' , color ;
           
            if(item == 0){
                color = 'rgb(87, 138, 251)'
                text = '有效';
            }else{
                text = '删除'
            }
            return <span style={{color: color}}>{text}</span>

        }
    },
    {
        title: '操作',
        render(text){
       
            
            return <div><Icon onClick={()=>{
                Modal.confirm({
                    title: '删除',
                    content: '是否删除',
                    okText: '确认',
                    cancelText: '取消',
                    onOk: ()=>{
                        ajax({
                            url:"deleteUser/"+text.id,
                            success: (res)=>{
                                if(res.code == 200){
                                    message.info(res.msg)
                                    setTimeout(() => {
                                        userVM.getList()
                                    }, 0);
                                }else{
                                    message.warning('删除失败')
                                }
                            }
                        })
                    }
                });
                
            }} type="delete" style={{color:"#888888", fontSize: '20px',marginRight: 20}}/>
            <Icon type="edit" style={{color:"#888888", fontSize: '20px'}} onClick={()=>{
                userVM.changeUser(text)
            }}/>
            </div>
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
                    ajax({
                        url: 'saveVillage',
                        data: qs.stringify(values),
                        type: 'post',
                        success: (res)=>{
                            if(res.code == 200){
                                message.info(res.msg)
                                userTreeVM.getTreeData();
                                this.props.closeDepartment();
                                
                                
                            }else{
                                message.warning(res.msg)
                            }
                        }
                    })
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
                    {getFieldDecorator('jdId', {
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
                    {getFieldDecorator('villageName', {
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
                    {getFieldDecorator('seq', {
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
                    {getFieldDecorator('remark', {
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
class ChangeDepartment extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            falg:true
        }
        ChangeDepartmentVM = this
    }
    componentDidMount = () => {
        
        
    
    
    }
 
    handleSubmit = (e) => {
        e.preventDefault();
        this
            .props
            .form
            .validateFields((err, values) => {
                
                if (!err) {
                    ajax({
                        url: 'updateVillage',
                        data: qs.stringify(values),
                        type: 'post',
                        success: (res)=>{
                            if(res.code == 200){
                                message.info(res.msg)
                                userTreeVM.getTreeData();
                                userTreeVM.setState({
                                    visible: false
                                })
                            }else{
                                message.warning(res.msg)
                            }
                        }
                    })
                }
            });
    }
   
    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                {getFieldDecorator('id', {
                        rules: [
                            {
                                required: true,
                                message: '请选择上级部门'
                            }
                        ]
                    })(
                        <Input type='hidden'/>
                    )}
                 <FormItem
                    label="上级部门"
                    labelCol={{
                    span: 5
                }}
                    wrapperCol={{
                    span: 12
                }}>
                    {getFieldDecorator('jdId', {
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
                    {getFieldDecorator('villageName', {
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
                    {getFieldDecorator('seq', {
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
                    {getFieldDecorator('remark', {
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
                   
                   ajax({
                        url:"addUser",
                        type: 'post',
                        data: qs.stringify(values),
                        success: (res)=>{
                            if(res.code == 200){
                                message.info(res.msg)
                                userVM.getList()
                                setTimeout(() => {
                                         this
                                            .props
                                                .closeDepartment()
                                }, 0);
                            }else{
                                message.warning("添加用户失败")
                            }
                        }
                    })
                    
                   
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
                                    {getFieldDecorator('villageId', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择村镇'
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
                            })(<Input onBlur={(e)=>{
                                this.props.form.setFieldsValue({
                                    userName:  e. _targetInst.stateNode.value

                                })
                                // document.querySelector(".userName").value = e. _targetInst.stateNode.value

                            }}/>)}
                        </FormItem>
                   </Col>
               </Row>
                <Row>
                   <Col span={12}>
                        <FormItem
                            label="真实姓名"
                            labelCol={{
                            span: 6
                        }}
                            wrapperCol={{
                            span: 12
                        }}>
                            {getFieldDecorator('realname', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入真实姓名'
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
                            {getFieldDecorator('connect', {
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
                            {getFieldDecorator('familyNums', {
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
                            {getFieldDecorator('aways', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择是否常住'
                                    }
                                ]
                            })(
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
                            {getFieldDecorator('partyMember',{
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择是否党员'
                                    }
                                ]
                            })(
                                <Input/>
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
                            {getFieldDecorator('userName', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入账号'
                                    }
                                ]
                            })(<Input className='userName'/>)}
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
                            {getFieldDecorator('description', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入用户类型'
                                    }
                                ]
                            })(<Select>
                                <Option key='0' value='0'>
                                    最高管理员
                                </Option>
                                <Option key='1' value='1'>
                                    区领导
                                </Option>
                                <Option key='2' value='2'>
                                    镇管理员
                                </Option>
                                <Option key='3' value='3'>
                                    村管理员
                                </Option>
                                <Option key='4' value='4'>
                                    村民
                                </Option>
                            </Select>)}
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
                            {getFieldDecorator('remark', {
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
class ChangeUser extends React.Component {
    constructor(props) {
        super(props);
        ChangeUserVM = this
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this
            .props
            .form
            .validateFields((err, values) => {
                console.log(values)
              
                if (!err) {
                   
                   ajax({
                        url:"modify",
                        type: 'post',
                        data: qs.stringify(values),
                        success: (res)=>{
                            if(res.code == 200){
                                message.info(res.msg)
                                userVM.getList()
                                setTimeout(() => {
                                        userVM.setState({
                                            changeUser: false
                                        }) 
                                }, 0);
                            }else{
                                message.warning("修改用户失败")
                            }
                        }
                    })
                    
                   
                }
            });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
            {getFieldDecorator('id', {
                                rules: [
                                    {
                                        required: false,
                                        message: '请输入真实姓名'
                                    }
                                ]
                            })(<Input type='hidden'/>)}
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
                                    {getFieldDecorator('villageId', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择村镇'
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
                            })(<Input onBlur={(e)=>{
                                this.props.form.setFieldsValue({
                                    userName:  e. _targetInst.stateNode.value

                                })
                                // document.querySelector(".userName").value = e. _targetInst.stateNode.value

                            }}/>)}
                        </FormItem>
                   </Col>
               </Row>
                <Row>
                   <Col span={12}>
                        <FormItem
                            label="真实姓名"
                            labelCol={{
                            span: 6
                        }}
                            wrapperCol={{
                            span: 12
                        }}>
                            {getFieldDecorator('realname', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入真实姓名'
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
                            {getFieldDecorator('connect', {
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
                            {getFieldDecorator('familyNums', {
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
                            {getFieldDecorator('aways', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择是否常住'
                                    }
                                ]
                            })(
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
                            {getFieldDecorator('partyMember',{
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择是否党员'
                                    }
                                ]
                            })(
                                <Input/>
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
                            {getFieldDecorator('userName', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入账号'
                                    }
                                ]
                            })(<Input className='userName'/>)}
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
                            {getFieldDecorator('description', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入用户类型'
                                    }
                                ]
                            })(<Select>
                                <Option key='0' value='0'>
                                    最高管理员
                                </Option>
                                <Option key='1' value='1'>
                                    区领导
                                </Option>
                                <Option key='2' value='2'>
                                    镇管理员
                                </Option>
                                <Option key='3' value='3'>
                                    村管理员
                                </Option>
                                <Option key='4' value='4'>
                                    村民
                                </Option>
                            </Select>)}
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
                            {getFieldDecorator('remark', {
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
const ChangeUserConment = Form.create()(ChangeUser);
let ChangeDepartmentConment = Form.create()(ChangeDepartment)
class User extends Component{
    constructor(props){
        super(props)
        this.state = {
            visible : false,
            treeData: [],
            spin: true,
            changeUser: false
        }
        userVM = this
    }
    getList(){

        if(id == -1) return false;
        ajax({
            url:'getAllUserByVillageId/'+id,
            success: (res)=>{
                res.data.some((item, i)=>{
                    item.key = i
                })
                userVM.setState({
                    dataSource: res.data
                })
            }
        })
    }
    changeUser = (item) => {
        console.log(item)
        ajax({
            url: 'getUserDetail/' + item.id,
            success: (res)=>{
                console.log(res);
                setTimeout(() => {
                   
                      const valuesObj = ChangeUserVM.props.form.getFieldsValue();
                      for (const item in valuesObj) {
                          if (valuesObj.hasOwnProperty(item)) {
                              if(res.data[item] == null || res.data[item] == undefined){
                                  valuesObj[item] =  res.data[item]
                              }else{
                                 valuesObj[item] =  res.data[item] + ''
                              }
                              
                              
                          }
                      }
                      
                      
                       ChangeUserVM.props.form.setFieldsValue(valuesObj)
                      console.log(valuesObj)
                      
                }, 0);
            }
        })
       this.setState({
           changeUser: true
       })
    }
    showAddDepartment = () =>{
        this.setState({visible: true})
    }
    addDepartmentOk = () => {
        
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
                    <div style={{display: this.state.spin ?  'block' : 'none' }} className={'spinBox'}>
                        <Spin  size="large" />
                    </div>
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
                    <UserTree vm={this} getTreeData={this.getTreeData}/>
                </div>
                <div className="right" style={{overflowY: "scroll"}}>
                 
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
                                            <Table dataSource={this.state.dataSource} columns={columns}/>
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
                <Modal 
                    title = '修改用户'
                    visible = {this.state.changeUser}
                    footer = {null}
                    onCancel = {()=>{
                        this.setState({
                            changeUser: false,
                        })
                    }}
                >
                    <ChangeUserConment treeData={this.state.treeData}/>
                </Modal>
            </div>
        )
    }
}

const user = ({match, history}) => {
    router={
        match,
        history
    }
    return <User/>
}
export default user
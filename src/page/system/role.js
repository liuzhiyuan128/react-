import {Checkbox, qs, Form, Input, Modal, Select, Option, Tabs, TabPane, Button, Route, Table, Row, Col, Icon,React, Component, ajax, message} from '../../config/router';
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const roleStyle = {
    height: window.innerHeight - 45 - 10 - 10
}
import ReadyUser from "./roleComponent/readyUser"
import ChoosedUser from "./roleComponent/chosedUser"
import vmS from "./roleComponent/vm";
let userListVM = null, ChoiceUserListVM = null, RoleVM = null , updataFormVM = null

class AddForm extends React.Component {
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
                        url: 'addRole',
                        type: 'post',
                        data: qs.stringify(values),
                        success: (res)=> {
                            if(res.code == 200){
                                message.info(res.msg);
                                RoleVM.selectAllRole();
                                RoleVM.setState({
                                    visible: false
                                })
                            }else{
                                message.warning(res.message)
                            }
                        }
                    })
                    
                }
            });
    }

    render() {
        const {getFieldDecorator,formItemLayout } = this.props.form;
        
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    label="角色名称"
                    labelCol={{
                    span: 5
                }}
                    wrapperCol={{
                    span: 12
                }}>
                    {getFieldDecorator('roleName', {
                        rules: [
                            {
                                required: true,
                                message: '请输入角色名称'
                            }
                        ]
                    })(<Input onBlur = {(e)=>{
                        // return console.log(e._targetInst.stateNode.value)
                      const  value = this.props.form.getFieldValue('roleName')
                     
                      
                            ajax({
                                url:'selectExistRoleName',
                                data: qs.stringify({roleName: value}),
                                type: 'post',
                                success: (res)=>{
                                    if(res.msg){
                                        this.props.form.setFields({
                                            roleName: {
                                                value: value,
                                                errors: [new Error(res.msg)],
                                            },
                                        });
                                    }
                                }
                            })
                            
                            
                            
                    }} />)}
                </FormItem>
                <FormItem
                    label="备注"
                    labelCol={{
                    span: 5
                }}
                    wrapperCol={{
                    span: 12
                }}>
                    {getFieldDecorator('description', {
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
                    style: {
                        textAlign: 'right'
                    }
                }}>
                    <Button type="primary" htmlType="submit">
                        保存
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

class updataForm extends React.Component {
    constructor(props) {
        super(props)
        updataFormVM = this
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this
            .props
            .form
            .validateFields((err, values) => {
                if (!err) {

                    ajax({
                        url: 'updateRole',
                        type: 'post',
                        data: qs.stringify(values),
                        success: (res)=> {
                            if(res.code == 200){
                                message.info(res.msg);
                                RoleVM.selectAllRole();
                                RoleVM.setState({
                                    updateRole: false
                                })
                            }else{
                                message.warning(res.message)
                            }
                        }
                    })
                    
                }
            });
    }

    render() {
        const {getFieldDecorator,formItemLayout } = this.props.form;
        
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    label="角色名称"
                    labelCol={{
                    span: 5
                }}
                    wrapperCol={{
                    span: 12
                }}>
                    {getFieldDecorator('roleName', {
                        rules: [
                            {
                                required: true,
                                message: '请输入角色名称'
                            }
                        ]
                    })(<Input onBlur = {(e)=>{
                        // return console.log(e._targetInst.stateNode.value)
                      const  value = this.props.form.getFieldValue('roleName')
                     
                      
                            ajax({
                                url:'selectExistRoleName',
                                data: qs.stringify({roleName: value}),
                                type: 'post',
                                success: (res)=>{
                                    if(res.msg){
                                        this.props.form.setFields({
                                            roleName: {
                                                value: value,
                                                errors: [new Error(res.msg)],
                                            },
                                        });
                                    }
                                }
                            })

                            
                    }} />)}
                </FormItem>
                <FormItem
                    label="备注"
                    labelCol={{
                    span: 5
                }}
                    wrapperCol={{
                    span: 12
                }}>
                    {getFieldDecorator('description', {
                        rules: [
                            {
                                required: false,
                                message: '请输入名称'
                            }
                        ]
                    })(<Input/>)}
                </FormItem>
                {getFieldDecorator('id', {
                        rules: [
                            {
                                required: false,
                                message: '请输入名称'
                            }
                        ]
                    })(<Input type="hidden"/>)}
                <FormItem
                    wrapperCol={{
                    span: 12,
                    offset: 5,
                    style: {
                        textAlign: 'right'
                    }
                }}>
                    <Button type="primary" htmlType="submit">
                        保存
                    </Button>
                </FormItem>
            </Form>
        );
    }
}


const AddFormConment = Form.create()(AddForm);
const UpdataFormConment = Form.create()(updataForm);




var checkboxData = null
class Role extends Component {
    constructor(props){
        super(props)
        this.state = {
            rolesData: [],
        chooseActive:1,
        clickKey: -1,
        userListVm: null,
        visible: false,
        updateRole: false,
        checkboxData: [],
        tirgerReady: "asd"
        }
        RoleVM = this
          
       
    }
    
    getRolesfn = (data) => {
       
       this.setState({
           clickKey: data.key,
           id: data.id
       },()=>{
          
           ajax({
               url: 'getPowerByRoleId/' + data.id,
               success: (res) => {
                    var data = res.data
                    checkboxData = data;
                    var first = [];
                        for(var i = 0; i < data.length; i++){
                            if(data[i].pid == 0){
                                first.push(data[i])
                            }
                        }
                    
                    for(var i = 0; i < data.length; i ++){

                        for(var k = 0; k < first.length; k++){
                            if(first[k].id == data[i].pid){
                                if(!first[k].second){
                                    first[k].second = []
                                }
                                first[k].second.push(data[i]);
                                break;
                            }
                        }
                    }
                    console.log(first)
                    this.setState({
                        checkboxData:first 
                    })
               }
           })
           this.props.history.push(`${this.props.match.path}/${data.key}`)
       })
    }
    
    selectAllRole = () => {
        ajax({
            url: 'selectAllRole',
            success: (res) => {
                console.log(res)
                res.data.some((item,i)=>{
                    item.key = i
                })
                this.setState({
                    rolesData: res.data
                })
            }
        })
    }
    componentDidMount = ()=>{
       this.selectAllRole()
    }
   updateRole = (item) => {
     
        setTimeout(() => {
          const valueObj = updataFormVM.props.form.getFieldsValue();
          for (const oneitem in valueObj) {
              if (valueObj.hasOwnProperty(oneitem)) {
                  valueObj[oneitem] = item[oneitem]
                  
              }
          }
          updataFormVM.props.form.setFieldsValue(valueObj)
        }, 0);
        this.setState({
            updateRole: true
        })
   }
    deleteRole = (item) => {
        Modal.warning({
            title: '删除',
            content: '确认删除',
            onOk: ()=>{
                
                ajax({
                    url: 'deleteRole/'+ item.id,
                    success: (res) => {
                      
                        if(res.code == 200) {
                            console.log(this)
                            message.info(res.msg)
                             this.selectAllRole()
            
                        }else{
                            message.warning(res.msg)
                        }
                    }
                })
            }
        })
    }
    onChange = (e) => {
    
        checkboxData.some((item)=>{
            if(item.id == e.target.value){
                item.checked = e.target.checked
                return false;
            }
        })

    }
    changeRolePowers = () =>{
        var data = [];
        for (const item in checkboxData) {
            if (checkboxData.hasOwnProperty(item)) {
                const element = checkboxData[item];
                if(element.checked){
                    data.push(element.id);
                }
            }
        }

        var dataStr = data.join(",")
        ajax({
            url: 'changeRolePowers',
            type: 'post',
            data: qs.stringify({
                roleId: this.state.id,
                powerIds: dataStr
            }),
            success: (res) => {
                if(res.code == 200) {
                    message.info(res.msg);
                }else{
                    message.warning(res.msg)
                }
                console.log(res)
            }
        })
       
        console.log(this.state.id)
    }
    changeUserRoles = () => {
        var powerIds = new Array();
        ChoiceUserListVM.state.userList.some((item)=>{
            powerIds.push(item.id)
        })
      var powerIds=  powerIds.join(',')
        ajax({
            url: 'changeUserRoles',
            data: qs.stringify({
                userIds: powerIds,
                roleId: this.state.id
            }),
            type: 'post',
            success: (res) => {
                if(res.code == 200){
                    message.info(res.msg)
                    userListVM.getUsers()
                }else{
                    message.info(res.msg)
                }
            }
        })
    }
    tabChange = (key) => {
        
       setTimeout(() => {
           if(key == 2){
              vmS.readyUser.foreachList();
           }if(key == 3){
                
                vmS.choosedUser.foreachList()
           }
          
       }, 0);
    }
    render(){
      
      
        return (
                <div id="role" style={roleStyle}>
                        <Modal
                            visible = {this.state.updateRole}
                            title = "修改角色"
                            onCancel = {()=>{
                                this.setState({
                                    updateRole: false
                                })
                            }}
                            footer = {null} 
                        >
                        <UpdataFormConment/>
                        </Modal>
                        <Modal 
                            title = "新增角色"
                            visible={this.state.visible}
                            onCancel = {()=>{
                                this.setState({
                                    visible: false
                                })
                            }}
                            footer={false}
                            >
                            <AddFormConment/>
                        </Modal>
                        <div className={"left"} >
                            <div
                                style={{
                                fontWeight: 700,
                                paddingLeft: 18,
                                cursor: "pointer"
                            }}>
                                角色列表
                                <Icon
                                    style={{
                                    color: '#578afb'
                                }}
                                    type="plus"
                                     onClick ={()=>{
                                        this.setState({
                                            visible: true
                                        })  
                                    }}/>
                                
                            </div>
                            {
                                this.state.rolesData.map((item)=>{
                                     
                                  if(item.key == this.state.clickKey){
                                  
                                      return <div key={item.key} className={"roles active"} onClick={()=>{
                                                        this.getRolesfn(item)
                                                    }}>
                                                    <Row>
                                                        <Col span={9}>
                                                            {item.roleName}
                                                        </Col>
                                                        <Col span={15} style={{textAlign: "right"}}>
                                                             {<Icon onClick = {() => {
                                                                 this.deleteRole(item)
                                                            }} style={{marginRight: 10}} type='delete'/>}
                                                            {<Icon onClick={()=>{
                                                                this.updateRole(item)
                                                            }} style={{marginRight: 10}} type='edit'/>}
                                                        </Col>
                                                     </Row>
                                              </div>
                                  }else{
                                        return <div key={item.key} className={"roles"} onClick={()=>{
                                                    this.getRolesfn(item)
                                                    }}>{item.roleName}</div>
                                  }
                                })
                            }
                        </div>
                        <div className="right" style={{overflowY:'scroll'}}>
                            <Route exact={true}  to={`${this.props.match.path}/${this.state.clickKey}` } component = {
                                ()=>{
                                  if(this.state.clickKey === -1 ) return '' 
                                    return (
                                        <div>
                                            <Tabs onChange={this.tabChange}>
                                                <TabPane key="1" tab="角色与权限">
                                                    <div style={{padding: "0 50px"}}>
                                                        <Row style={{border:'1px solid #f1f1f1'}}>
                                                            {this.state.checkboxData.map((item) => {
                                                                return (<Col key={item.id} span={6}>
                                                                            <div style={{width: "100%", background: '#f1f1f1',height: "50px",lineHeight: "50px",textAlign: 'center'}}>{item.name}</div>
                                                                           
                                                                            {item.second.map((sitem)=>{
                                                                                return <div key = {sitem.id} style={{width: "100%", height: "50px",lineHeight: "50px",textAlign: 'center'}}>
                                                                                         <Checkbox defaultChecked={sitem.checked} value={sitem.id} onChange={this.onChange}>{sitem.name}</Checkbox> {sitem.type== 1 ?  "电脑" : "手机"}
                                                                                        </div>
                                                                            })}
                                                                        </Col>)
                                                                        })}
                                                        </Row>
                                                    </div>
                                                    <Row style={{marginTop: 10}}>
                                                        <Col span={24} style={{textAlign: "right",paddingRight:12}}>
                                                            <Button type='primary' onClick={this.changeRolePowers}>保存</Button>
                                                        </Col>
                                                    </Row>
                                                </TabPane>
                                                <TabPane key={2} tab="待选用户">
                                                    <ReadyUser />
                                                </TabPane>
                                                <TabPane key={3} tab="已选用户">
                                                    <ChoosedUser/>
                                                </TabPane>
                                            </Tabs>
                                        </div>
                                        )
                                }
                            }/>
                           
                        </div>
                        
                    </div>
            )
    }
}
const role = ({match,history})=>{

    return <Role history={history} match={match}/>
}
export default role
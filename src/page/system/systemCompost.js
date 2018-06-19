import {dataFilter, Radio, message, qs, Input, Form, TreeSelect, Modal, Button, Select, Option,Icon, Col, Row, React, Component, Table, Header, ajax} from "../../config/router";
    const RadioGroup = Radio.Group
  const FormItem = Form.Item;
  let ChangeCompostConmentVM = null, SystemCompostVM = null;



class AddCompost extends React.Component {
    constructor(props) {
        super(props)
        this.state =  {
            treeData: []
        }
    }
    componentDidMount = () => {
        this.getTree()
    }
    getTree = () => {
        ajax({
            url: 'tree',
            success: (res) => {
                var treeData = dataFilter(res.data);
                
                this.setState({
                    treeData: treeData
                })
            }
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this
            .props
            .form
            .validateFields((err, values) => {
                if (!err) {
                    ajax({
                        url: 'addComposting',
                        type: 'post',
                        data: qs.stringify(values),
                        success: (res) => {
                            if(res.code == 200){
                                message.warning(res.msg)
                                SystemCompostVM.getList()
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
                                            treeData={this.state.treeData}
                                        >
                                        </TreeSelect>)
                            )}
                        </FormItem>
                   </Col>
                   <Col span={12}>
                            
                        <FormItem
                            label="堆肥房编号"
                            labelCol={{
                            span: 6
                        }}
                            wrapperCol={{
                            span: 12
                        }}>
                            {getFieldDecorator('id', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入堆肥房编号'
                                    }
                                ]
                            })(<Input/>)}
                        </FormItem>
                   </Col>
               </Row>
                <Row>
                   <Col span={12}>
                        <FormItem
                            label="堆肥房名称"
                            labelCol={{
                            span: 6
                        }}
                            wrapperCol={{
                            span: 12
                        }}>
                            {getFieldDecorator('compostingName', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入堆肥房名称'
                                    }
                                ]
                            })(<Input/>)}
                        </FormItem>
                   </Col>
                   <Col span={12}>
                        <FormItem
                            label="服务人口"
                            labelCol={{
                            span: 6
                        }}
                            wrapperCol={{
                            span: 12
                        }}>
                            {getFieldDecorator('servicePopulation', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入服务人口'
                                    }
                                ]
                            })(<Input/>)}
                        </FormItem>
                   </Col>
               </Row>
               <Row>
                   <Col span={12}>
                        <FormItem
                            label="堆肥房模式"
                            labelCol={{
                            span: 6
                        }}
                            wrapperCol={{
                            span: 12
                        }}>
                            {getFieldDecorator('compostingModel', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入堆肥房模式'
                                    }
                                ]
                            })(<Input/>)}
                        </FormItem>
                   </Col>
                   <Col span={12}>
                        <FormItem
                            label="房长姓名"
                            labelCol={{
                            span: 6
                        }}
                            wrapperCol={{
                            span: 12
                        }}>
                            {getFieldDecorator('responsibleName', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入房长姓名'
                                    }
                                ]
                            })(<Input/>)}
                        </FormItem>
                   </Col>
               </Row>
               
               <Row>
                   <Col span={12}>
                        <FormItem
                            label="房长电话"
                            labelCol={{
                            span: 6
                        }}
                            wrapperCol={{
                            span: 12
                        }}>
                            {getFieldDecorator('responsiblePhone', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入房长电话'
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
                        提交
                    </Button>
                </FormItem>
            </Form>
        );
    }
}
class ChangeCompost extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            treeData: []
        }
        ChangeCompostConmentVM = this
    }
    componentDidMount = () => {
        this.getTree()
    }
    getTree = () => {
        ajax({
            url: 'tree',
            success: (res) => {
                var treeData = dataFilter(res.data);
                 
                this.setState({treeData: treeData})
            }
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this
            .props
            .form
            .validateFields((err, values) => {
                if (!err) {
                    ajax({
                        url: 'updateByPrimaryKeySelective',
                        type: 'post',
                        data: qs.stringify(values),
                        success: (res) => {
                            if (res.code == 200) {
                                message.warning(res.msg);
                                SystemCompostVM.setState({
                                    changeVisible: false,
                                }, ()=>{
                                    SystemCompostVM.getList()
                                })
                            } else {
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
                <Row>
                    <Col span={12}>
                    {getFieldDecorator('bh', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入堆肥房编号'
                                    }
                                ]
                            })(<Input type="hidden"/>)}
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
                                        message: '请输入村镇'
                                    }
                                ]
                            })((
                                <TreeSelect
                                    showSearch
                                    dropdownStyle={{
                                    maxHeight: 200,
                                    overflow: 'auto'
                                }}
                                    placeholder="请选者村或镇"
                                    allowClear
                                    treeDefaultExpandAll={true}
                                    treeData={this.state.treeData}></TreeSelect>
                            ))}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            label="堆肥房编号"
                            labelCol={{
                            span: 6
                        }}
                            wrapperCol={{
                            span: 12
                        }}>
                            {getFieldDecorator('id', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入堆肥房编号'
                                    }
                                ]
                            })(<Input/>)}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <FormItem
                            label="堆肥房名称"
                            labelCol={{
                            span: 6
                        }}
                            wrapperCol={{
                            span: 12
                        }}>
                            {getFieldDecorator('compostingName', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入堆肥房名称'
                                    }
                                ]
                            })(<Input/>)}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            label="服务人口"
                            labelCol={{
                            span: 6
                        }}
                            wrapperCol={{
                            span: 12
                        }}>
                            {getFieldDecorator('servicePopulation', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入服务人口'
                                    }
                                ]
                            })(<Input/>)}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <FormItem
                            label="堆肥房模式"
                            labelCol={{
                            span: 6
                        }}
                            wrapperCol={{
                            span: 12
                        }}>
                            {getFieldDecorator('compostingModel', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入堆肥房模式'
                                    }
                                ]
                            })(<Input/>)}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            label="房长姓名"
                            labelCol={{
                            span: 6
                        }}
                            wrapperCol={{
                            span: 12
                        }}>
                            {getFieldDecorator('responsibleName', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入房长姓名'
                                    }
                                ]
                            })(<Input/>)}
                        </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span={12}>
                        <FormItem
                            label="房长电话"
                            labelCol={{
                            span: 6
                        }}
                            wrapperCol={{
                            span: 12
                        }}>
                            {getFieldDecorator('responsiblePhone', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入房长电话'
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
                        提交
                    </Button>
                </FormItem>
            </Form>
        );
    }
}
const AddCompostConment = Form.create()(AddCompost);
const ChangeCompostConment = Form.create()(ChangeCompost)
class SystemCompost extends Component{
    constructor(props) {
        super(props);
        const vm = this
        SystemCompostVM = this
        this.state = {
            current: 1,
            visible: false,
            dataSource: [],
            changeVisible: false,
            columns: [
                        {
                            title: '堆肥房编号',
                            dataIndex: 'id',
                            key: 'id'
                        }, {
                            title: '堆肥房名称',
                            dataIndex: 'compostingName',
                            key: 'compostingName'
                        }, {
                            title: '房长姓名',
                            dataIndex: 'responsibleName',
                            key: 'responsibleName'
                        }, {
                            title: '模式',
                            dataIndex: 'compostingModel',
                            key: 'compostingModel'
                        }, {
                            title: '状态',
                            dataIndex: 'isDisable',
                            key: 'isDisable',
                            render: (text) => {
                            let color = '';
                                if(text == 0){
                                    text = "有效"
                                    color = '#7fa8fd'
                                }else{
                                    text = "无效"
                                }
                                return <span style={{color: color}}>{text}</span>
                            }
                        },
                        {
                            title: '操作',
                    
                            render(text){
                                return <div>
                                            <Icon onClick={()=>{
                                                vm.updateByPrimaryKeySelective(text)
                                            }} type="form" style={{color:"#888888", fontSize: '20px', marginRight: 20}} />
                                            <Icon onClick={
                                                ()=>{
                                                    Modal.confirm({
                                                        title:'删除',
                                                        content: '确认删除',
                                                        okText: '确认',
                                                        cancelText: '取消',
                                                        onOk: ()=>{
                                                            ajax({
                                                                url: 'updateIsDisableByPrimaryKey/'+ text.id,
                                                                success: (res)=>{
                                                                    if(res.code == 200) {
                                                                        message.info(res.msg)
                                                                        SystemCompostVM.getList()
                                                                    }else{
                                                                        message.info(res.msg)
                                                                    }
                                                                }
                                                            })
                                                        }
                                                    })
                                                    
                                                }
                                            }  type="delete" style={{color:"#888888", fontSize: '20px'}}/>
                                        </div>
                            }
                        }
                    ]
        }
    }
   
    componentDidMount = () => {
        this.getList()
    }
    getList = () => {
        
        ajax({
            url: 'selectAll',
            data: qs.stringify({
                condition: document.querySelector("#condition").value,
                isDisable: this.state.isDisable || null
            }),
            type: 'post',
            success: (res) => {
                if(res.code == 200) {   
                    res.data.some((item,i)=>{
                        item.key = i
                    })
                    this.setState({
                        dataSource: res.data
                    })
                }else{
                    message.warning(res.code)
                }
            }
            
        })
    }
    onChange = (e) => {
        this.setState({
           isDisable: e.target.value
        })
    }
     updateByPrimaryKeySelective = (text) => {
        this.setState({
            changeVisible: true,

        })
        setTimeout(() => {
            const values = ChangeCompostConmentVM.props.form.getFieldsValue();
            for (const item in values) {
                if (values.hasOwnProperty(item)) {
                   values[item] = text[item]
                    
                }
            }
            ChangeCompostConmentVM.props.form.setFieldsValue(values)
            
        }, 0);
        
    }
    render(){
        return(
                <div id={"systemCompost"}>
                    <Modal
                        title = "修改堆肥房信息"
                        footer = {null}
                        visible = {this.state.changeVisible}
                        onCancel = {()=>{
                            this.setState({
                            changeVisible: false
                        })
                        }}
                    >
                     <ChangeCompostConment/>
                    </Modal>
                    <Modal 
                    onCancel={()=>{this.setState({visible: false})}}
                    footer = {null}
                    title="新增堆肥房"
                    
                    visible={this.state.visible}>
                        <AddCompostConment/>
                    </Modal>
                    <Row style={{marginTop: 20}}>
                        <Col span={4} style={{textAlign: 'center',lineHeight: "32px"}}>
                            添加堆肥房 
                            <Icon onClick={()=>{this.setState({visible: true})}} type='plus' style={{color: "rgb(87, 138, 251)"}} />
                        </Col>
                        <Col span={2} style={{lineHeight: "32px"}}>
                            选择村/镇 
                        </Col>
                        <Col span = {4}>
                            <Input id='condition' style={{width: "100%"}} type="text"/>
                        </Col>
                        <Col span={4} onChange={this.onChange}  style={{lineHeight: '32px', textAlign: 'right'}}>
                            <RadioGroup>
                                <Radio value='0'>有效</Radio>
                                <Radio value='1'>无效</Radio>
                            </RadioGroup>
                        </Col>
                        <Col span={3}  style={{textAlign: 'right'}}>
                            <Button type='primary' onClick={()=>{
                                this.setState({
                                    current:1
                                },()=>{
                                 this.getList()
                                })
                            }}>查询</Button>
                        </Col>
                    </Row>
                   <div style={{marginTop: 20}}>
                       <Table pagination={{current:this.state.current,onChange:(current)=>{
                           this.setState({
                               current:current
                           })

                       }}} dataSource={this.state.dataSource} columns={this.state.columns}/>
                   </div>
                </div>
        )
    }
}
const systemCompost = ()=> {
    return <SystemCompost/>
}
export default systemCompost
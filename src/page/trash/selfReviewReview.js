import {
    Modal,
    Button,
    React,
    Component,
    Icon,
    Row,
    Col,
    ajax,
    qs,
    message,
    Pagination,
    Spin,
    SearchRanking
} from "../../config/router";

class SelfReview extends Component {
    constructor(props) {
        super(props)
        //1 审核通过  2  审核未通  3未审核
        this.state = {
            imgSrc: `http://118.31.7.200:8081/static/jdcz014055/2018-06-14/9603.jpg`,
            visible: false,
            listData: [],
            current: 1,
            spinShow: true,
            total: 0,
            pageSize: 40,
            startTime: '',
            endTime: '',
            state: 3,
            selectData: {
                defaultValue: 3,
                list: [
                    {
                        value: 1,
                        name: '审核通过'
                    }, {
                        value: 2,
                        name: '审核未通'
                    }, {
                        value: 3,
                        name: '未审核'
                    }
                ]
            }
        }
    }
    componentDidMount = () => {
        this.getList()
    }
    getSearchData = (searchData) => {
        this.setState({
            pageNum: 1,
            startTime: searchData.startTime,
            endTime: searchData.endTime,
            state: searchData.state,
            spinShow: true
        }, () => {
            this.getList()
        })
    }
    getList = () => {

        var data = qs.stringify({pageNum: this.state.current, pageSize: this.state.pageSize, startTime: this.state.startTime, endTime: this.state.endTime, state: this.state.state});
        ajax({
            url: 'getSelfEvaluateAdmin',
            data: data,
            type: 'post',
            success: (res) => {
                if (res.code == 200) {

                    this.setState({listData: res.data.list, spinShow: false, total: res.data.total})
                } else {
                    message.info(res.msg)
                }

            }
        })
    }
    check = (e) => {
        const sign = e._targetInst.pendingProps.sign;
        const id = e._targetInst.pendingProps.id;
        ajax({
            url: 'check',
            type: 'post',
            data: qs.stringify({sign: sign, id: id}),
            success: (res) => {
                if (res.code == 200) {
                    message.info(res.msg);
                    this.getList();
                } else {
                    message.warning(res.msg)
                }
            }
        })
    }
    pageChange = (current) => {
        this.setState({
            current: current,
            spinShow: true
        }, () => {
            this.getList()
        })
    }
    bigImg = (imgSrc, e) => {
        this.setState({
            imgSrc
        }, () => {
            this.openOrClose()
        })

    }
    getContent = (item) => {
        //1 审核通过  2  审核未通  3未审核
        var stateArr = ["审核通过", "审核未通", "未审核"]
        var contentTemplate = <Col
            key={item.id}
            span={3}
            style={{
            marginTop: '15px',
            cursor: 'default'
        }}>
            <div style={{
                position: 'relative'
            }}>
                <div
                    className="left"
                    style={{
                    width: "139px",
                    height: "93px"
                }}>
                    <img
                        style={{
                        width: "139px",
                        height: "93px"
                    }}
                        alt="无图"
                        onClick={(e) => {
                        this.bigImg("http://" + item.image, e)
                    }}src={"http://"+item.image}/>
                </div>
                <div className="right">
                    <div>{item.createTime}</div>
                    <div>{stateArr[item.state - 1]}</div>
                    <div
                        style={{
                        marginTop: '10px',
                        display: item.state !== 3
                            ? 'none'
                            : 'blcok'
                    }}>
                        <span
                            sign='1'
                            id={item.id}
                            style={{
                            padding: "4px 6px",
                            border: "1px solid red",
                            cursor: 'pointer',
                            color: 'red'
                        }}
                            onClick={this.check}>通过</span>
                        <span
                            sign='2'
                            id={item.id}
                            style={{
                            padding: "4px 6px",
                            border: "1px solid green",
                            marginLeft: '10px',
                            cursor: 'pointer',
                            color: 'green'
                        }}
                            onClick={this.check}>淘汰</span>
                    </div>
                </div>
            </div>
        </Col>
        return contentTemplate
    }
    openOrClose = () => {

        this.setState({
            visible: !this.state.visible
        }, () => {
            setTimeout(() => {
                if (this.state.visible) {
                    document
                        .querySelector(".ant-modal-content")
                        .className = "ant-modal-content noneBox"
                }
            }, 0);
        })
    }
    render() {
        return <div className='spinBox'>
            <SearchRanking
                conditionNone
                getSearchData={this.getSearchData}
                selectData={this.state.selectData}/>
            <Row>
                {this
                    .state
                    .listData
                    .map((item) => this.getContent(item))}
            </Row>
            <div style={{
                textAlign: 'right'
            }}>
                <Pagination
                    onChange={this.pageChange}
                    current={this.state.current}
                    style={{
                    display: 'inline-block'
                }}
                    defaultCurrent={1}
                    total={this.state.total}/>
            </div>
            <div>
                <Modal
                    afterClose={() => {
                    document
                        .querySelector(".ant-modal-content")
                        .className = "ant-modal-content"
                }}
                    closable={false}
                    footer={null}
                    visible={this.state.visible}
                    onCancel={this.openOrClose}>
                    <div
                        style={{
                        width: "100%",
                        height: '100%',
                        padding: "8px",
                        position: "relative"
                    }}>
                        <img
                            style={{
                            position: 'absolute',
                            left: "50%",
                            transform: 'translateX(-50%)'
                        }}
                            src={this.state.imgSrc}/>
                    </div>
                </Modal>
            </div>
            <Spin
                style={{
                display: this.state.spinShow
                    ? 'block'
                    : 'none'
            }}/>
        </div>
    }
}

const selfReviewReview = () => {
    return <SelfReview/>
}
export default selfReviewReview;
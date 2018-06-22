import {
    qs,
    Route,
    Component,
    React,
    ajax,
    SearchRanking,
    Tabs,
    TabPane,
    TableComponent,
    AlertDetails,
    message,
    Stree
} from "../../../config/router.js";
let vm = null,
    checkuserId = "",
    pageNum = 1,
    searchData = null,
    villageId = "";
const styleHeight = {
    height: window.innerHeight - 45 - 10 - 10 - 15 - 40 - 12 - 53
}
const dbjs = () => {
    ajax({
        url: 'updateCheckUserNomal/' + checkuserId,
        success: function (res) {
            if (res > 0) {
                vm.setState({
                    getListParameter: {
                        condition: searchData
                            ? searchData.condition
                            : null,
                        pageSize: 10,
                        pageNum: pageNum,
                        startTime: searchData
                            ? searchData.startTime
                            : null,
                        endTime: searchData
                            ? searchData.endTime
                            : null,
                        villageId: searchData
                            ? searchData.villageId
                            : null
                    }

                }, () => {
                    vm.getList()
                    vm.setState({visible: false})
                })
            } else {
                message.warning("提交失败")
            }

        }
    })
}
const hurry = () => {
    ajax({
        url: "updateCheckUserPressdo",
        type: 'post',
        data: qs.stringify({checkuserId: checkuserId}),
        success: (res) => {
            console.log(res)
            if (res > 0) {
                message.info("催办成功")
            } else {
                message.info("催办失败")
            }
        }
    })
}
const cb = (tosthring, value) => {

    if (!value) 
        return message.warning("提交失败，请填入必填项")

    ajax({
        url: 'updateCheckUserRedo',
        type: 'post',
        data: qs.stringify({zgyj: tosthring, checkuserId: checkuserId}),
        success: (data) => {
            if (data > 0) {
                message.info("提交成功")

            } else {
                message.warning("提交失败")
            }
        }
    })
}
const getSearchData = (data) => {
    searchData = data
    vm.setState({
        getListParameter: {
            condition: data.condition,
            pageSize: 10,
            pageNum: 1,
            startTime: data.startTime,
            endTime: data.endTime,
            villageId: villageId
        }
    }, () => {
        vm.getList()
    })
}

const treeSelect = (key) => {
    villageId = key[0]
}
const closeAlertDetails = () => {
    vm.setState({visible: false})
}

const rows = [
    {
        span: 12,
        cols: [
            {
                key: "垃圾桶编号："
            }
        ]
    }, {
        span: 12,
        cols: [
            {
                key: "住户姓名："
            }, {
                key: "人口数："
            }
        ]

    }, {
        span: 12,
        cols: [
            {
                key: "联系电话："
            }, {
                key: "联系党员："
            }
        ]
    }, {
        span: 12,
        cols: [
            {
                key: "是否常住："
            }, {
                key: "是否党员："
            }
        ]
    }, {
        span: 8,
        color: "red",
        cols: [
            {
                key: "月总分："
            }, {
                key: "季总分："
            }, {
                key: "年总分："
            }
        ]
    }
]
var closVal = {
    id: "",
    realname: "",
    familyNums: '',
    phone: '',
    connect: '',
    aways: '',
    partyMember: '',
    totalMonth: "",
    totalQuarter: '',
    totalYear: ''
}
// 评分
var score = {
    hlfl: {
        name: "合理分类",
        choosenum: 0
    },
    tyws: {
        name: "庭院卫生"
    },
    sfkt: {
        name: "状态",
        choosenum: 0
    }
}
//意见
const getALineData = (text, e) => {
    checkuserId = text.checkuserId;
    var i = 0;
    let closVals = JSON.parse(JSON.stringify(closVal))
    let data = {}
    let image = null
    ajax({
        url: "getDetailByCheckuserId/" + text.checkuserId,
        asyny: false,
        success: (res) => {
            console.log(res)
            image = res.image
            data = Object.assign(data, res)
        }
    })
    ajax({
        url: 'getUserById/' + text.usersId,
        success: (res) => {
            data = Object.assign(data, res)
        },
        asyny: false

    })

    for (var item in closVals) {
        closVals[i] = data[item];
        i++
    }

    if (data.hlfl == 10) {
        score.hlfl.choosenum = 0
    } else if (data.hlfl == 0) {
        score.hlfl.choosenum = 1
    } else {
        score.hlfl.choosenum = 2
    }

    if (data.sfkt == 5) {
        score.sfkt.choosenum = 0
    } else if (data.sfkt == 0) {
        score.sfkt.chooseNum = 1
    } else if (data.sfkt == -5) {
        score.sfkt.chooseNum = 2
    }
    let fkyj = data.fkyj
    let zgyj = data.zgyj

    //图片问题
    if (image) {
        image = image.split("&");
        image.pop()

    }

    vm.setState({
        alertMsg: {
            closVal: closVals,
            score,
            zgyj,
            fkyj,
            image
        }
    }, () => {

        vm.setState({
            visible: true
        }, () => {
            //icon变色
            setTimeout(() => {
                var iconDiv = document.querySelectorAll(".score");
                []
                    .some
                    .call(iconDiv, (item) => {
                        var chooseNum = item.getAttribute("choosenum")
                        console.log(chooseNum)
                        if (chooseNum == null) 
                            return false;
                        
                        var choseIocns = item.querySelectorAll('i')

                        //变色
                        choseIocns[chooseNum].style.color = "#f15f2d"
                    })
            }, 0);
        })
    })

}
const pageOnChange = (current) => {
    vm.state.getListParameter.pageNum = current

    vm.setState({}, () => {
        vm.getList()
    })
}
const tableColumns = [
    {
        title: "垃圾桶编号",
        dataIndex: "trashId",
        key: "trashId"
    }, {
        title: "姓名",
        dataIndex: "realname",
        key: "realname"
    }, {
        title: '地址',
        dataIndex: 'adress',
        key: 'adress'
    }, {
        title: "评分",
        dataIndex: 'total',
        key: "total"
    }, {
        title: "时间",
        dataIndex: "createTime",
        key: "createTime"
    }, {
        title: "重办次数",
        dataIndex: "vedo",
        key: "vedo"
    }, {
        title: '催办次数',
        dataIndex: "pressdo",
        key: "pressdo"
    }, {
        title: "操作",
        render: (text) => {
            return (
                <div
                    style={{
                    cursor: "pointer"
                }}
                    onClick={(e) => getALineData(text, e)}>查看详情</div>
            )
        }
    }
]

class TrashAreaSupervise extends Component {
    constructor(props) {
        super(props);
        vm = this
        this.state = {
            tableColumns,
            tableData: [],
            pagination: {
                total: 50,
                current: 1,
                loading: true,
                onChange: pageOnChange
            },
            visible: false, //控制是否弹出查看详情
            closVal: [],
            alertMsg: {
                closVal: [],
                score
            },
            getListParameter: {
                condition: null,
                pageSize: 10,
                pageNum: 1,
                startTime: null,
                endTime: null,
                villageId: null
            }
        }
    }
    componentWillMount() {
        this.getList();

    }
    getList() {
        ajax({
            url: 'selectAllCheckdUserNotArea',
            data: qs.stringify(this.state.getListParameter),
            type: "post",
            success: (res) => {
                // console.log(res)
                res
                    .list
                    .some((item, index, arr) => {
                        arr[index].key = index
                    })
                this.setState({
                    tableData: res.list,
                    pagination: {
                        total: res.total,
                        current: res.pageNum,
                        loading: false,
                        onChange: pageOnChange
                    }
                })
            }
        })
    }
treeShow = () => {
      
        if(sessionStorage.roleId != 2){
              return  <div className="comBox">
                        <div className="comLeft" style={styleHeight}>
                            <Stree treeSelect={treeSelect}/>
                        </div>
                        <div className="comright" style={styleHeight}>
                            <TableComponent
                            pagination={this.state.pagination}
                            tableData={this.state.tableData}
                            tableColumns={this.state.tableColumns}/>
                        </div>
                    </div>   
        }
        return <TableComponent
                        pagination={this.state.pagination}
                        tableData={this.state.tableData}
                        tableColumns={this.state.tableColumns}/>
      
    }
    render() {
        return (
            <div>
                <SearchRanking isTree={false} getSearchData={getSearchData}/>
                {this.treeShow()}

                <AlertDetails
                    dbjs={dbjs}
                    cb={cb}
                    hurry={hurry}
                    alertMsg={this.state.alertMsg}
                    rows={rows}
                    closeAlertDetails={closeAlertDetails}
                    visible={this.state.visible}/>
            </div>
        )
    }
}
const overTimeSupervise = () => {
  
    return <TrashAreaSupervise/>
}
export default overTimeSupervise;
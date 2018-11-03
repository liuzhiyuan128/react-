import { Stree, qs, Route, Component, React, ajax, SearchRanking, Tabs, TabPane, TableComponent, AlertDetails, message}  from "../../../config/router.js";
let vm = null, villageId = "";

const getSearchData = (data) => {
    vm.setState({
        getListParameter: {
            condition: data.condition,
            pageSize: 10,
            pageNum:1,
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
        choosenum: 0,
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
    var i = 0;
    let closVals = JSON.parse(JSON.stringify(closVal))
    let data = {}
    let image = null
    ajax({
        url: "getDetailByCheckuserId/" + text.checkuserId,
        asyny: false,
        success: (res) => {
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
        image = image
            .split("&");
        image.pop()

    }

    vm.setState({
        alertMsg: {
            closVal: closVals,
            score,
            zgyj,
            fkyj,
            image,
           
            
        }
    }, () => {

        vm.setState({
            visible: true
        })
    })

}
const pageOnChange = (current) => {
vm.state.getListParameter.pageNum = current;
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
    },  {
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
const styleHeight = {
    height: window.innerHeight - 45 - 10 - 10 -15 - 40 - 12 - 53
}
class TrashCheckUp extends Component {
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
                pageSize:10,
                pageNum: 1,
                startTime: null,
                endTime: null,
                villageId: null
            },
            realPageSize: 0
        }
    }
    componentWillMount() {
        this.getList();

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
                            <div>
									每页 {
										this.state.realPageSize
									}
									条共 {
										this.state.pagination.total
									}
									条
								</div>
                        </div>
                    </div>   
        }
        return  <div>
            <TableComponent
                        pagination={this.state.pagination}
                        tableData={this.state.tableData}
                        tableColumns={this.state.tableColumns}/>
            <div>
									每页 {
										this.state.realPageSize
									}
									条共 {
										this.state.pagination.total
									}
									条
								</div>
        </div> 
      
    }
    getList() {
    
        ajax({
            url: 'getCheckList',
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
                    },
                    realPageSize: res.list.length
                })
            }
        })
    }

    render() {
        return (
            <div>
                <SearchRanking isTree={false} getSearchData={getSearchData}/>
               {this.treeShow()}
                <AlertDetails
                    alertMsg={this.state.alertMsg}
                    rows={rows}
                    closeAlertDetails={closeAlertDetails}
                    visible={this.state.visible}/>
            </div>
        )
    }
}
const trashCheckUp = () => {
    return <TrashCheckUp/>
}
export default trashCheckUp;
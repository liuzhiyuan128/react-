
import {
    qs,
    Route,
    Component,
    React,
    ajax,
    SearchRanking,
    Menu,
    TableComponent,
    AlertDetails,
    Link,
    Redirect,
    message

} from "../../../config/router.js";

let vm = null

const getSearchData = (data) => {
    vm.setState({
        getListParameter: {
            condition: data.condition,
            pageSize: 10,
            pageNum: 1,
            startTime: data.startTime,
            endTime: data.endTime,
            villageId: data.villageId,
            dataType: "qualified"
        }
    }, () => {
        vm.getList()
    })
}

const callback = (key) => {}
const closeAlertDetails = () => {
    vm.setState({visible: false})
}

const rows = [
    {
        span: 24,
        cols: [
            {
                key: "堆肥房名称："
            }
        ]
    }, {
        span: 12,
        cols: [
            {
                key: "房长姓名："
            }, {
                key: "服务人口："
            }
        ]

    }, {
        span: 12,
        cols: [
            {
                key: "联系电话："
            }, {
                key: "服务模式："
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
    compostingName: "",
    responsibleName: "",
    servicePopulation: '',
    responsiblePhone: '',
    compostingModel: '',
    totalMonth: "",
    totalQuarter: '',
    totalYear: ''
}
// 评分
var score = {
    dfqk: {
        name: "堆肥情况",
        choosenum: ""
    },
    ssgl: {
        name: "设施管理"
    },
    zbws: {
        name: "周边卫生",
        choosenum: ""
    },
    tyws: {
        name: "台账管理",
        choosenum: ""
    }
}
//意见
const getALineData = (text, e) => {
    var i = 0;
    let closVals = JSON.parse(JSON.stringify(closVal))
    let data = {} 
    let image = null
    ajax({
        url: "selectByPrimaryKey/" + text.id,
        asyny: false,
        success: (res) => {
            data = Object.assign(data, res.data)
        }
    })

    ajax({
        url: 'selectCompostingScore/' + text.id + '/' + text.checkCompostingId,
        success: (res) => {
            data = Object.assign(data, res.data)
        },
        asyny: false

    })
    ajax({
        url: 'selectCheckCompostingDetail/' + text.checkCompostingId,
        success: (res) => {
            image = res.data.checkImage
            data = Object.assign(data, res.data)
           
        },
        asyny: false

    })

    for (var item in closVals) {
        closVals[i] = data[item];
        i++
    }

    if (data.dfqk == 10) {
        score.dfqk.choosenum = 0
    } else if (data.dfqk == 0) {
        score.dfqk.choosenum = 1
    } else {
        score.dfqk.choosenum = 2
    }

    if (data.ssgl == 5) {
        score.ssgl.choosenum = 0
    } else if (data.ssgl == 0) {
        score.ssgl.choosenum = 1
    } else if (data.ssgl == -5) {
        score.ssgl.choosenum = 2
    }

    if (data.zbws == 5) {
        score.zbws.choosenum = 0
    } else if (data.zbws == 0) {

        score.zbws.choosenum = 1
    } else if (data.zbws == -5) {
        score.zbws.choosenum = 2
    }
    if (data.tyws == 5) {
        score.tyws.choosenum = 0
    } else if (data.tyws == 0) {
        score.tyws.choosenum = 1
    } else if (data.tyws == -5) {
        score.tyws.choosenum = 2
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
            cfsj: data.cfsj,
            weight: data.weight,
            cfqx: data.cfqx
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
    vm.state.getListParameter.pageNum = current;
    vm.setState({
      
    }, () => {
        vm.getList()
    })
}
const tableColumns = [
    {
        title: "堆肥房名称",
        dataIndex: "compostingName",
        key: "compostingName"
    }, {
        title: "房主姓名",
        dataIndex: "responsibleName",
        key: "responsibleName"
    }, {
        title: '联系电话',
        dataIndex: 'responsiblePhone',
        key: 'responsiblePhone'
    }, {
        title: "评分",
        dataIndex: 'total',
        key: "total"
    }, {
        title: "时间",
        dataIndex: "createTime",
        key: "createTime"
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

class CheckUp extends Component {
    constructor(props) {
        super(props);
        vm = this
        this.state = {
            tableColumns,
            tableData: [],
            pagination: {
                total: 10,
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
                villageId: null,
                dataType: "qualified"
            },
            realPageSize: 0
        }
    }
    componentWillMount() {
        this.getList();

    }
    getList() {
        ajax({
            url: 'selectCheckComposting',
            data: qs.stringify(this.state.getListParameter),
            type: "post",
            success: (res) => {
                if(res.code == 200){
                    res = res.data;
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
                }else{
                    this.state.pagination.loading = false;
                    this.setState({})
                    message.warning(res.msg)
                }
                
            }
        })
    }

    render() {
        return (
            <div>

                <SearchRanking onlyAreaTown = {true} isTree={true} getSearchData={getSearchData}/>
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
                <AlertDetails
                    showDFXQ
                    alertMsg={this.state.alertMsg}
                    rows={rows}
                    closeAlertDetails={closeAlertDetails}
                    visible={this.state.visible}/>

            </div>
        )
    }
};
const checkUp = () => {
    return <CheckUp/>
}

export default checkUp
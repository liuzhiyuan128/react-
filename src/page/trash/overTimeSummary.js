import {
    React,
    Component,
    SearchRanking,
    TableComponent,
    ajax,
    qs,
    message,
    Stree
} from "../../config/router";
let villageId = "";
const styleHeight = {
    height: window.innerHeight - 45 - 10 - 10 - 15 - 40 - 12 - 53
}
const treeSelect = (key) => {
    villageId = key[0];
    vm.setState({villageId})
}

class OverTimeSummary extends Component {
    constructor(props) {
        super(props)
        // 1自评次数 2合格次数 3 合格率 4参与率
        this.state = {

            
            pagination: {
                total: 0,
                current: 1,
                loading: true,
                onChange: this.pageOnChange
            },
            tableData: [],
    //         private String villageName;//村名
    // private Integer number;//超时次数
    // private Integer villageToTownNumber;//村到镇户数
    // private Integer townToAreaNumber;//镇到区户数
    // private Integer outOfTimeNumber;//归档户数
          
            tableColumns: [
                {
                    title: "村名",
                    dataIndex: "villageName",
                    key: "villageName"
                }, {
                    title: '超时次数',
                    dataIndex: 'number',
                    key: 'number'
                },  {
                    title: "村到镇户数",
                    dataIndex: "villageToTownNumber",
                    key: "villageToTownNumber"
                }, {
                    title: "镇到区户数",
                    dataIndex: 'townToAreaNumber',
                    key: "townToAreaNumber"
                },{
                    title: "归档户数",
                    dataIndex: "outOfTimeNumber",
                    key: "outOfTimeNumber"
                }
            ],
            rankType: 1,
            pageSize: 10,
            startTime: '',
            endTime: '',
            villageId: ""

        }
    }
    componentDidMount = () => {
        this.getList()
    }
    pageOnChange = (current) => {
        this.state.pagination.current = current;

        this.setState({}, () => {
            this.getList()
        })
    }
    getSearchData = (searchData) => {
        this.state.startTime = searchData.startTime;
        this.state.endTime = searchData.endTime;
        this.state.rankType = searchData.state
        this.state.villageId = villageId
        this.state.pagination.current = 1;
        this.setState({}, () => {
            this.getList()
        })

    }
    getList = () => {
        var data = {
            startTime: this.state.startTime,
            endTime: this.state.endTime,
           
            pageNum: this.state.pagination.current,
            pageSize: this.state.pageSize,
            villageId: this.state.villageId
        }
        ajax({
            url: 'getAllOutOfTimeList',
            type: 'post',
            data: qs.stringify(data),
            success: (res) => {
                if (res.code == 200) {
                    console.log(res)
                    res = res.data;
                    res
                        .list
                        .map((item, i) => {
                            item.key = i
                        });
                    this.state.pagination.loading = false
                    this.state.pagination.total = res.total
                    this.state.tableData = res.list
                    this.setState({})
                } else {
                    message.warning(res.msg)
                }

            }
        })
    }
    treeShow = () => {

        if (sessionStorage.roleId != 2) {
            return <div className="comBox">
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
        return <div>

            <SearchRanking
                conditionNone
                villageId={this.state.villageId}
                showExport="exportOutOfTimeList"
                getSearchData={this.getSearchData}/> {this.treeShow()
}
        </div>
    }
}
const overTimeSummary = () => {
    return <OverTimeSummary/>
}
export default overTimeSummary
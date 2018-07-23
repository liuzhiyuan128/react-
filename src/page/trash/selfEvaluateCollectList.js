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
let villageId = "", vm = null
const styleHeight = {
    height: window.innerHeight - 45 - 10 - 10 - 15 - 40 - 12 - 53
}
const treeSelect = (key) => {
    villageId = key[0];
    vm.setState({villageId})
}

class GetSelfEvaluateCollectList extends Component {
    constructor(props) {
        super(props)
        villageId = ""
        vm = this
        // 1自评次数 2合格次数 3 合格率 4参与率
        this.state = {

            selectData: {
                defaultValue: 1,
                list: [
                    {
                        name: '自评次数',
                        value: 1
                    }, {
                        name: '合格次数',
                        value: 2
                    }, {
                        name: '合格率',
                        value: 3
                    }
                ]
            },
            pagination: {
                total: 0,
                current: 1,
                loading: true,
                onChange: this.pageOnChange
            },
            tableData: [],
            //             返回值：    private String realName;//住户姓名 private String
            // trashId;//垃圾桶id private Integer allNumber;//自评次数 private Integer
            // passNuber;//合格次数 private String numberPercent;//合格率 private String
            // score;//获取分数 暂定通过一张一分
            tableColumns: [
                 {
                    title: "村名",
                    dataIndex: "villageName",
                    key: "villageName"
                }, {
                    title: '自评次数',
                    dataIndex: 'allNumber',
                    key: 'allNumber'
                }, {
                    title: "合格次数",
                    dataIndex: 'passNumber',
                    key: "passNumber"
                }, {
                    title: "合格率",
                    dataIndex: "numberPercent",
                    key: "numberPercent"
                }, {
                    title: "总户数",
                    dataIndex: "houseNumber",
                    key: "houseNumber"
                }, {
                    title: "参与户数",
                    dataIndex: "houseNumberIn",
                    key: "houseNumberIn"
                }, {
                    title: "参与率",
                    dataIndex: "housePercent",
                    key: "housePercent"
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
        this.state.rankType = searchData.state || 1;
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
            rankType: this.state.rankType,
            pageNum: this.state.pagination.current,
            pageSize: this.state.pageSize,
            villageId: this.state.villageId 
        }
        ajax({
            url: 'getSelfEvaluateCollectList',
            type: 'post',
            data: qs.stringify(data),
            success: (res) => {
                if (res.code == 200) {
                    console.log(res)
                    res = res.data;
                    res
                        .list
                        .map((item,i) => {
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
        return <div>
            
            <SearchRanking
                 villageId={this.state.villageId} showExport="exportSelfEvaluateCollectList"
                conditionNone
                selectData={this.state.selectData}
                getSearchData={this.getSearchData}/>
                 {
                     this.treeShow()
                 }
            

        </div>
    }
}
const getSelfEvaluateCollectList = () => {
    return <GetSelfEvaluateCollectList/>
}
export default getSelfEvaluateCollectList
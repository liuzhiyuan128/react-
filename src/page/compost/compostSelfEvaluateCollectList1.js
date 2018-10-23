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
let villageId = "", vm = null;
const styleHeight = {
    height: window.innerHeight - 45 - 10 - 10 - 15 - 40 - 12 - 53
}
const treeSelect = (key) => {
    villageId = key[0];
    vm.setState({villageId},()=>{
        vm.getSelfSortingID(villageId)
    });

    
}

class GetSelfEvaluateCollectList extends Component {
    constructor(props) {
     
        super(props)
        // 1自评次数 2合格次数 3 合格率 4参与率
        this.state = {

            selectData: {
                defaultValue: 1,
                list: [
                    {
                        name: '检查次数',
                        value: 1
                    }, {
                        name: '合格张数',
                        value: 2
                    }, {
                        name: '合格率',
                        value: 3
                    }, {
                        name: '得分',
                        value: 4
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
                    title: "账号",
                    dataIndex: "createBy",
                    key: "createBy"
                },
                {
                    title: "村名",
                    dataIndex: "villageName",
                    key: "villageName"
                }, {
                    title: '上传张数',
                    dataIndex: 'allNumber',
                    key: 'allNumber'
                }, {
                    title: "合格张数",
                    dataIndex: 'passNumber',
                    key: "passNumber"
                }, {
                    title: "检查次数",
                    dataIndex: "checkNumber",
                    key: "checkNumber"
                }, {
                    title: "合格率",
                    dataIndex: "numberPercent",
                    key: "numberPercent"
                }, {
                    title: "得分",
                    dataIndex: "score",
                    key: "score"
                }

            ],
            rankType: 1,
            pageSize: 10,
            startTime: '',
            endTime: '',
            villageId: "",
           
            getSelfSortingIDList: [],
            getSelfSortingIDListItem: ''

        }
           villageId = ""
        vm = this
    }
    componentDidMount = () => {

        this.getList();
        this.getSelfSortingID()
    }
    pageOnChange = (current) => {
        this.state.pagination.current = current;

        this.setState({}, () => {
            this.getList()
        })
    }
    getSelfSortingID = () => {
        ajax({
           url: 'getSelfSortingID',
           type: 'post',
           data:qs.stringify({
               villageId: this.state.villageId
           }),
           success: (res) => {
               var getSelfSortingIDList = []
                res.data.map((item) => {
                   getSelfSortingIDList.push(item.sortingName)
                });
                this.setState({
                    getSelfSortingIDList
                })
           }
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
            villageId: this.state.villageId,
            createBy: this.state.getSelfSortingIDListItem
        }
        ajax({
            url: 'getSelfCultureCollectList',
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
                <div style={styleHeight} className="comLeft">
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
        var url = "exportSelfCultureCollectList";
        return <div>

            <SearchRanking
                villageId={this.state.villageId}
                showExport={url}
                conditionNone
                selectData={this.state.selectData}
                getSearchData={this.getSearchData}/> {this.treeShow()
}

        </div>
    }
}
const compostSelfEvaluateCollectList1 = () => {
    return <GetSelfEvaluateCollectList/>
}
export default compostSelfEvaluateCollectList1
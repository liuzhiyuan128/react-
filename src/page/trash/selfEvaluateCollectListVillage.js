import { React, Component, SearchRanking, TableComponent, ajax, qs, message } from "../../config/router";

class GetSelfEvaluateCollectListVillage extends Component {
    constructor (props) {
        super(props)
        // 1自评次数 2合格次数 3 合格率 4参与率
        this.state = {
            
            selectData:{
                defaultValue: 1,
                list: [
                    {
                        name: '自评次数',
                        value: 1
                    },
                    {
                        name: '合格次数',
                        value: 2
                    },
                    {
                        name: '合格率',
                        value: 3
                    }
                ]},
                pagination: {
                    total: 0,
                    current: 1,
                    loading: true,
                    onChange: this.pageOnChange
                },
                tableData: [],
    //             返回值：    private String realName;//住户姓名
    // private String trashId;//垃圾桶id
    // private Integer allNumber;//自评次数
    // private Integer passNuber;//合格次数
    // private String numberPercent;//合格率
    // private String score;//获取分数 暂定通过一张一分
                tableColumns: [
                    {
                        title: "垃圾桶id",
                        dataIndex: "trashId",
                        key: "trashId"
                    }, {
                        title: "住户姓名",
                        dataIndex: "realName",
                        key: "realName"
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
                        title: "分数",
                        dataIndex: "score",
                        key: "score"
                    }

                ],
                rankType: 1,
                pageSize: 10,
                startTime: '',
                endTime: ''
            
        }
    }
    componentDidMount = () => {
        this.getList()
    }
    pageOnChange = (current) =>{
        this.state.pagination.current = current;
        
        this.setState({

        },()=>{
            this.getList()
        })
    }
    getSearchData = (searchData) => {
        this.state.startTime = searchData.startTime;
        this.state.endTime = searchData.endTime;
        this.state.rankType = searchData.state
        this.state.pagination.current = 1;
        this.setState({},()=>{
            this.getList()
        })
        
    }
    getList = () => {
        var data = {
            startTime: this.state.startTime, 
            endTime: this.state.endTime,  
            rankType: this.state.rankType,
            pageNum: this.state.pagination.current,
            pageSize: this.state.pageSize
        }
       ajax({
           url: 'getSelfEvaluateCollectListVillage',
           type: 'post',
           data: qs.stringify(data),
           success: (res) => {
               if(res.code == 200){
                    res = res.data;
                    res.list.map((item) => {
                        item.key = item.id
                    });
                    this.state.pagination.loading = false
                    this.state.pagination.total = res.total
                    this.state.tableData = res.list
                    this.setState({

                    })
               }else{
                   message.warning(res.msg)
               }
              
           }
       })
    }
   
    render(){
        return <div>
            <SearchRanking conditionNone showExport="exportSelfEvaluateCollectListVillage" selectData={this.state.selectData} getSearchData={this.getSearchData}/>
             <TableComponent
                    pagination={this.state.pagination}
                    tableData={this.state.tableData}
                    tableColumns={this.state.tableColumns}/>
            
        </div>
    }
}
const getSelfEvaluateCollectListVillage = () => {
    return <GetSelfEvaluateCollectListVillage/>
}
export default getSelfEvaluateCollectListVillage
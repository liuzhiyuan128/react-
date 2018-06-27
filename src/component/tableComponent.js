import {Component, React, Table, Spin} from "../config/router"
/*

*/
class TableComponent extends Component{
    constructor(props){
        super(props);
        console.log(props)
    }
    
    render(){
        return (<div className="tableBox">
            <Spin spinning={this.props.pagination.loading}>
                <Table 
                rowSelection={this.props.rowSelection ? {
                    onChange: this.props.rowSelection.onChange,
                    selectedRowKeys: this.props.rowSelection.selectedRowKeys
                } : null}
                pagination={{
                    total: this.props.pagination.total,
                    pageSize: this.props.pageSize,
                    current: this.props.pagination.current,
                    onChange:this.props.pagination.onChange
                }}   dataSource={this.props.tableData} columns={this.props.tableColumns} />
            </Spin>
        </div>)
    }
}

export default TableComponent
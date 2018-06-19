import {trashAreaSupervise, trashTownSupervise, Redirect, Menu, Link, trashCheckUp, qs, Route, Component, React, ajax, SearchRanking, Tabs, TabPane, TableComponent, AlertDetails, trashVillageSupervise}  from "../../config/router.js";
let selected = sessionStorage.supervise || "trashCheckUp"
const selectFn = ({item, key, selectedKeys}) => {
    
    sessionStorage.supervise = key

}
const supervise = ({ watch, history }) => {
selected = sessionStorage.supervise || "trashCheckUp"
	return (
		<div>
        <Menu
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={[selected]}
                    style={{ height: 40,lineHeight: '40px', marginTop:15 }}
                    onSelect={selectFn}
                 >
                    <Menu.Item key="trashCheckUp"><Link to="/home/trashSupervise/trashCheckUp">检查合格</Link></Menu.Item>
                    <Menu.Item key="trashVillageSupervise"><Link to="/home/trashSupervise/trashVillageSupervise">村督办</Link></Menu.Item>
                    <Menu.Item key="trashTownSupervise"><Link to="/home/trashSupervise/trashTownSupervise">镇督办</Link></Menu.Item>
                    <Menu.Item key="trashAreaSupervise"><Link to="/home/trashSupervise/trashAreaSupervise">区督办</Link></Menu.Item>
                </Menu>
                <Route exact path="/home/trashSupervise" render={()=><Redirect to="/home/trashSupervise/trashCheckUp" />}></Route>
                <Route path="/home/trashSupervise/trashCheckUp" component={trashCheckUp} />
                <Route path="/home/trashSupervise/trashVillageSupervise" component={trashVillageSupervise} />
                <Route path="/home/trashSupervise/trashTownSupervise" component={trashTownSupervise} />
                <Route path="/home/trashSupervise/trashAreaSupervise" component={trashAreaSupervise} />
    </div>
	)
}
 export default supervise

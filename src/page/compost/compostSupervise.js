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
    checkUp,
    Redirect,
    compostVillageSupervise,
    compostTownSupervise,
    compostAreaSupervise
} from "../../config/router.js";

let selected = sessionStorage.compost || "checkUps"
const selectFn = ({item, key, selectedKeys}) => {

    sessionStorage.compost = key

}
const compostSupervise = ({watch, history}) => {
    selected = sessionStorage.compost || "checkUps"
    return (<div>
        <Menu
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={[selected]}
                    style={{ lineHeight: '40px', height: 40, marginTop:15 }}
                    onSelect = {selectFn}
                 >
                    <Menu.Item key="checkUps"><Link to="/home/compostSupervise/checkUp">检查合格</Link></Menu.Item>
                    <Menu.Item key="compostVillageSupervises"><Link to="/home/compostSupervise/compostVillageSupervise">村督办</Link></Menu.Item>
                    <Menu.Item key="compostTownSupervises"><Link to="/home/compostSupervise/compostTownSupervise">镇督办</Link></Menu.Item>
                    <Menu.Item key="compostAreaSupervises"><Link to="/home/compostSupervise/compostAreaSupervise">区督办</Link></Menu.Item>
                </Menu>
                
                <Route exact path="/home/compostSupervise" render={()=><Redirect to="/home/compostSupervise/checkUp" />}></Route>
                <Route path="/home/compostSupervise/checkUp" component={checkUp} />
                <Route path="/home/compostSupervise/compostVillageSupervise" component={compostVillageSupervise} />
                <Route path="/home/compostSupervise/compostTownSupervise" component={compostTownSupervise} />
                <Route path="/home/compostSupervise/compostAreaSupervise" component={compostAreaSupervise} />
    </div>)
}
export default compostSupervise

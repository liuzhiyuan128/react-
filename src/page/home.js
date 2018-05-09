import { Header, Layout, Content, Footer, Sider, Menu, Breadcrumb, SubMenu, Component, React, Icon, Router, Route, Link, TrashRanking, compostRanking, Redirect, BrowserRouter, createHistory } from "../config/router.js"
let defaultSub = sessionStorage.defaultSub || JSON.stringify(['sub1']);
let defaultKeys = sessionStorage.defaultKeys || '3'
const selectFn = ({key}) => {
	sessionStorage.defaultKeys = key
}
const titleClcik = (select) => {
	
	sessionStorage.defaultSub = JSON.stringify(select)
}

const Home = ({
	match
}) => {

	return(<div id="home">
				<Layout>
				    <Layout>
				       
				      <Sider width={160} style={{ background: '#fff',position:"relative" }}>
				      <div id="logo"  style={{width:"160px",position:"absolute",top:0,left:0, height:"109px"}}></div>
				        <Menu
				       	  theme="dark"
				          mode="inline"
				          defaultSelectedKeys={[defaultKeys]}
				          defaultOpenKeys={JSON.parse(defaultSub)}
				          onSelect = {selectFn}
				          style={{ height: '100%', borderRight: 0 }}
				         onOpenChange = {titleClcik}
				        >
				       
				          <SubMenu style={{marginTop:"109px"}} key="sub1" title={<span>垃圾桶管理</span>}>
				            <Menu.Item key="1">考核督办</Menu.Item>
				            <Menu.Item key="2">考核结果</Menu.Item>
				            <Menu.Item key="3"><Link to={`${match.url}/trashRanking`}>考核排行</Link></Menu.Item>
				          </SubMenu>
				          <SubMenu key="sub2" title={<span>堆肥房管理</span>}>
				            <Menu.Item key="4">考核督办</Menu.Item>
				            <Menu.Item key="5">考核结果</Menu.Item>
				            <Menu.Item key="6"><Link to={"/home/compostRanking"}>考核排行</Link></Menu.Item>				          
				          </SubMenu>
				          <SubMenu key="sub3" title={<span>其他设施管理</span>}>
				            <Menu.Item key="7">考核督办</Menu.Item>
				            <Menu.Item key="8">考核结果</Menu.Item>
				          </SubMenu>
				          <SubMenu key="sub4" title={<span>系统管理</span>}>
				            <Menu.Item key="9">用户管理</Menu.Item>
				            <Menu.Item key="10">角色管理</Menu.Item>
				            <Menu.Item key="11">权限管理</Menu.Item>
				          </SubMenu>
				        </Menu>
				      </Sider>
				      
				      <Layout>

					    <HeaderComponent />
					    <div style={{ padding: '0 24px 24px' }}>
					        <Route  exact  path={`/home`} on render={()=><Redirect to="/home/trashRanking"></Redirect>}  />
					        <Route path={`/home/trashRanking`} component={TrashRanking} />
					        <Route path={`/home/compostRanking`} component={compostRanking}/>
					    </div>
				      </Layout>
				    </Layout>
				  </Layout>
			</div>)
}
class HeaderComponent extends Component {
				componentWillMount(){
					
				}
				state = {
					realname: sessionStorage.realname 
				}
	             render() {
	             		const {realname} = this.state
						return <Header  style={{ height:"45px" }} className="header">
					
					     	<div>
					     		<Icon type="user" />
					     		<span style={{cursor:"default"}}>{realname}</span>
					     		<span style={{cursor:"pointer"}} onClick={loginOut}>
					     			<Icon type="logout" />
					     		</span>
					     	</div>	    
					    </Header>
	            }

}
const loginOut = () => {
	localStorage.token = ""
	const history = createHistory({
		forceRefresh:true
	})
	history.push("/login")

}
export {
	Home
}
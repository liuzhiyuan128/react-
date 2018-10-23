import {selfReview1,compostSelfEvaluateCollectList1,compostSelfEvaluateCollectList, selfReview, goIntoHomeRouteBefore,overTimeSummary, selfEvaluateCollectList, selfEvaluateCollectListVillage, selfReviewReview, role, systemCompost, user, log, comostResult, trashResult, compostSupervise, Header, Layout, Content, Footer, Sider, Menu, Breadcrumb, SubMenu, Component, React, Icon, Router, Route, Link, TrashRanking, compostRanking, Redirect, BrowserRouter, createHistory, supervise } from "../config/router.js"
let defaultSub = sessionStorage.defaultSub || JSON.stringify(['sub1']);
let defaultKeys = sessionStorage.defaultKeys || 'trashRanking'
const selectFn = ({key}) => {
	sessionStorage.defaultKeys = key;
	sessionStorage.selected = '';
}
const titleClcik = (select) => {
	sessionStorage.defaultSub = JSON.stringify(select)
}
const selectClcik = () => {
	sessionStorage.compost = "";
	sessionStorage.supervise = '';
	sessionStorage.selected = "";
}

const Home = ({history,location}) => {
var power = JSON.parse(sessionStorage.power);
console.log(selfReview)

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
									onClick = {
										selectClcik
									}
				         onOpenChange = {titleClcik}
				        >
				       		{
										 power.map((item, i)=>{
											 return <SubMenu  style={i == 0 ? {marginTop:"109px"} : null} key={"sub"+ (i+1)} title={<span>{item.name}</span>}>
																	{
																		item.children && item.children.map((item)=>{
																			return <Menu.Item key={item.path}><Link to={"/home/" + item.path}>{item.name}</Link></Menu.Item>
																		})
																	}
														</SubMenu>
										 })
									 }
				          {/* <SubMenu style={{marginTop:"109px"}} key="sub1" title={<span>垃圾桶管理</span>}>
				            <Menu.Item key="1"><Link to="/home/trashSupervise">考核督办</Link></Menu.Item>
				            <Menu.Item key="2"><Link to="/home/trashResult">考核结果</Link></Menu.Item>
				            <Menu.Item key="trashRanking"><Link to={`/home/trashRanking`}>考核排行</Link></Menu.Item>
				            <Menu.Item key="selfReviewReview"><Link to={`/home/selfReviewReview`}>自评审核</Link></Menu.Item>
				            <Menu.Item key="selfEvaluateCollectListVillage"><Link to={`/home/selfEvaluateCollectListVillage`}>村自评汇总</Link></Menu.Item>
				            <Menu.Item key="selfEvaluateCollectList"><Link to={`/home/selfEvaluateCollectList`}>自评汇总</Link></Menu.Item>
				            <Menu.Item key="overTimeSummary"><Link to={`/home/overTimeSummary`}>超时汇总</Link></Menu.Item>
				          </SubMenu>
				          <SubMenu key="sub2" title={<span>堆肥房管理</span>}>
				            <Menu.Item key="4"><Link to="/home/compostSupervise">考核督办</Link></Menu.Item>
				            <Menu.Item key="5"><Link to="/home/comostResult">考核结果</Link></Menu.Item>
				            <Menu.Item key="6"><Link to={"/home/compostRanking"}>考核排行</Link></Menu.Item>	
										<Menu.Item key="selfselfReview"><Link to={"/home/selfReview"}>分拣员自评审核</Link></Menu.Item>
										<Menu.Item key="compostSelfEvaluateCollectList"><Link to={"/home/compostSelfEvaluateCollectList"}>分拣员自评汇总</Link></Menu.Item>
										<Menu.Item key="selfselfReview1"><Link to={"/home/selfReview1"}>菌种员自评审核</Link></Menu.Item>
										<Menu.Item key="compostSelfEvaluateCollectList1"><Link to={"/home/compostSelfEvaluateCollectList1"}>菌种员自评汇总</Link></Menu.Item>	          
				          </SubMenu>
				          <SubMenu key="sub3" title={<span>其他设施管理</span>}>
				            <Menu.Item key="7">考核督办</Menu.Item>
				            <Menu.Item key="8">考核结果</Menu.Item>
								
				          </SubMenu>
				          <SubMenu key="sub4" title={<span>系统管理</span>}>
				            <Menu.Item key="9"><Link to="/home/user"></Link>用户管理</Menu.Item>
				            <Menu.Item key="10"><Link to="/home/role">角色管理</Link></Menu.Item>
				            <Menu.Item key="11"><Link to="/home/systemCompost">堆肥房管理</Link></Menu.Item>
										<Menu.Item key='12'><Link to="/home/log">日志管理</Link></Menu.Item>
				          </SubMenu> */}
				        </Menu>
				      </Sider>
				
				      <Layout>

					    <HeaderComponent />
					    <div style={{ padding: '0 24px 24px' }}>
					        <Route  exact  path={`/home`} on render={()=><Redirect to="/home/trashRanking"></Redirect>}  />
					        <Route path={`/home/trashRanking`} component={TrashRanking} />
					        <Route path={`/home/compostRanking`} component={compostRanking}/>
					        <Route path={`/home/trashsupervise`} component = {supervise}/>
									<Route path="/home/compostSupervise" component = {compostSupervise} />
									<Route path="/home/trashResult" component = {trashResult} />
									<Route path="/home/comostResult" component = {comostResult} />
									<Route path="/home/log" component = {log} />
									<Route path="/home/user" component = {user}/>
									<Route path="/home/systemCompost" component = {systemCompost}/>
									<Route path="/home/role" component={role}/>
									<Route path="/home/selfReviewReview" component={selfReviewReview}/> 
									<Route path="/home/selfEvaluateCollectListVillage" component={selfEvaluateCollectListVillage}/> 
									<Route path="/home/selfEvaluateCollectList" component={selfEvaluateCollectList}/>
									<Route path="/home/overTimeSummary" component={overTimeSummary}/>
									<Route path="/home/selfReview" component={selfReview}/>
									<Route path="/home/compostSelfEvaluateCollectList" component={compostSelfEvaluateCollectList}/>
									<Route path="/home/selfReview1" component={selfReview1}/>
									<Route path="/home/compostSelfEvaluateCollectList1" component={compostSelfEvaluateCollectList1}/>
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
	sessionStorage.token = "";
	for (const item in sessionStorage) {
		if (sessionStorage.hasOwnProperty(item)) {
			sessionStorage[item] = ''	
		}
	}
	const history = createHistory({
		forceRefresh:true
	})
	history.push("/login")

}
export {
	Home
}
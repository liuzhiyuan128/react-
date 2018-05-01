
import { Header,Layout, Content, Footer, Sider , Menu, Breadcrumb, SubMenu, Component,React,Icon,Router,Route,Link,TrashRanking,compostRanking, Redirect,BrowserRouter} from "../config/router.js"

const Home = ({match}) => {
	
	return (<div id="home">
				<Layout>
				    <Layout>
				       
				      <Sider width={160} style={{ background: '#fff',position:"relative" }}>
				      <div id="logo"  style={{width:"160px",position:"absolute",top:0,left:0, height:"109px"}}></div>
				        <Menu
				       	  theme="dark"
				          mode="inline"
				          defaultSelectedKeys={['3']}
				          defaultOpenKeys={['sub1']}
				          style={{ height: '100%', borderRight: 0 }}
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
				      	 <Header  style={{ height:"45px" }} className="header">
					
					     	<div>
					     		<Icon type="user" />
					     		王**
					     		<span>
					     			<Icon type="logout" />
					     		</span>
					     	</div>
					    
					    </Header>
					    
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



export {
	Home
}

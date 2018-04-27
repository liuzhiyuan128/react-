

import {Home,Login,BrowserRouter,Route,Link,React,Router } from "../config/router.js"

export const root = () =>  (
	<Router>
		<div>
			<Route exact={true} path="/" component={Home} />
			<Route path="/login" component={Login} />
		</div>
	</Router>
);


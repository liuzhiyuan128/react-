import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import React from "react"
import {Home,Login} from "./config/router.js"
export const root = () =>  (
	<Router>
		<div>
			<Route exact={true} path="/" component={Home} />
			<Route path="/login" component={Login} />
		</div>
	</Router>
);

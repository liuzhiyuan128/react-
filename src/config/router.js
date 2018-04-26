import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import React from "react"

import {Home,About,Tops} from "../page/home.js"
export const router = () =>  (
	<Router>
		<div>
			<Route exact={true} path="/" component={Home} />
		</div>
	</Router>
);

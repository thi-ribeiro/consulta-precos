import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import './css/site.css';

import Home from './Home';
import Menu from './Menu';
import ConsultaProdutos from './Consulta_produtos';
import Coleta from './Coleta';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<Menu />

			<Switch>
				<Route path='/' exact>
					<Home />
				</Route>
				<Route path='/consulta'>
					<ConsultaProdutos />
				</Route>
				<Route path='/coleta'>
					<Coleta />
				</Route>
			</Switch>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);

reportWebVitals();

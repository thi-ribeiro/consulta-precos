import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import './css/site.css';

import Home from './Home';
import Menu from './Menu';
import ConsultaProdutos from './Consulta_produtos';
import Coleta from './Coleta';

import Teste from './testes/testeFc';
import { Toast } from './Context/Toast/ToastProvider';
import { FormDadosProvider } from './Context/FormDadosContext/FormDadosProvider';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<Menu />

			<Toast>
				<Switch>
					<Route path='/' exact>
						<Home />
					</Route>

					<Route path='/consulta'>
						<FormDadosProvider>
							<ConsultaProdutos />
						</FormDadosProvider>
					</Route>

					<Route path='/coleta'>
						<Coleta />
					</Route>

					<Route path='/testes'>
						<Teste />
					</Route>
				</Switch>
			</Toast>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);

reportWebVitals();

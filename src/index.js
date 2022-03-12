import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import './css/site.css';

import Home from './Home';
import Menu from './Menu';
import ConsultaProdutos from './Consulta_produtos';
import Coleta from './Coleta';
import Login from './Login';

import Teste from './testes/testeFc';
import { Toast } from './Context/Toast/ToastProvider';
import { FormDadosProvider } from './Context/FormDadosContext/FormDadosProvider';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<Menu />

			<Toast>
				<FormDadosProvider>
					<Routes>
						<Route path='/' exact element={<Home />} />

						<Route path='/' element={<ProtectedRoute />}>
							<Route path='/consulta' element={<ConsultaProdutos />} />
							<Route path='/coleta' element={<Coleta />} />
						</Route>

						<Route path='/testes' element={<Teste />} />
						<Route path='/login' element={<Login />} />
					</Routes>
				</FormDadosProvider>
			</Toast>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);

reportWebVitals();

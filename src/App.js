import React, { useContext, useEffect } from 'react';
import Home from './Home';
import Menu from './Menu';
import ConsultaProdutos from './Consulta_produtos';
import ConsultaValidades from './consulta-validades/Validades';
import Coleta from './Coleta';
import Login from './Login';
// import Teste from './testes/testeFc';
import ToastElement from './Context/Toast/Toast';

import { FormDadosProvider } from './Context/FormDadosContext/FormDadosProvider';
import { AuthContext } from './Context/AuthContext/Auth';
import { Routes, Route } from 'react-router-dom';
import { ValidadesProvider } from './Context/ValidadesContext/ValidadesProvider';

import ProtectedRoute from './ProtectedRoute';

export default function App() {
	const { verifyAuth, statusAuth } = useContext(AuthContext);

	useEffect(() => {
		verifyAuth();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<React.Fragment>
			<FormDadosProvider>
				<ValidadesProvider>
					<Menu />
					<div className='globalFixStickMenu'>
						<Routes>
							<Route path='/' exact element={<Home />} />

							<Route path='/' element={<ProtectedRoute status={statusAuth} />}>
								<Route
									path='/consulta'
									element={<ConsultaProdutos />}
									replace
								/>
								<Route
									path='/validades'
									element={<ConsultaValidades />}
									replace
								/>
								<Route path='/coleta' element={<Coleta />} replace />
							</Route>

							<Route path='/login' element={<Login />} />
						</Routes>
						<ToastElement />
					</div>
				</ValidadesProvider>
			</FormDadosProvider>
		</React.Fragment>
	);
}

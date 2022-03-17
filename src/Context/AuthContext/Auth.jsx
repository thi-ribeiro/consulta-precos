import React, { useState, createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
//import { axios } from 'axios';
import { ToastContext } from '../Toast/ToastProvider';
import ToastElement from '../Toast/Toast';

export const AuthContext = createContext();

export const Auth = ({ children }) => {
	const [statusAuth, setstatusAuth] = useState(false);
	const [authUser, setAuthUser] = useState('');
	const [message, setmessage] = useState('');
	const [contextGlobalFetch] = useState('http://localhost:5000');
	const { chamaToast, clearToastMessages } = useContext(ToastContext);

	const navi = useNavigate();

	const verifyAuth = async () => {
		const response = await fetch(`${contextGlobalFetch}/auth`, {
			credentials: 'include', //PARTE MAIS IMPORTANTE A QUAL SE INCLUI AS CREDENCIAIS
			mode: 'cors',
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			const jsonRes = await response.json();
			//console.log(jsonRes);
			let { auth } = jsonRes;
			setstatusAuth(auth);

			if (!auth) {
				localStorage.removeItem('_user');
			}
		}
	};

	const logout = async () => {
		console.log('Cclicou logout!');
		localStorage.removeItem('_user');
		//window.location.reload();
		const response = await fetch(`${contextGlobalFetch}/logout`, {
			credentials: 'include',
			method: 'POST',
		});
		if (response.ok) {
			const jsonRes = await response.json();

			//console.log('Passou logout');
			let { auth, message } = jsonRes;
			chamaToast(message);
		}
	};

	const loginUsr = async (DataUser) => {
		localStorage.removeItem('_user');
		const response = await fetch(`${contextGlobalFetch}/login`, {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(DataUser),
		});

		if (response.ok) {
			const jsonRes = await response.json();
			let { auth, message } = jsonRes;

			if (auth) {
				localStorage.setItem('_user', 'true');
				//console.log(message);
				//setAuthUser(username);
				setstatusAuth(auth);
			}
			chamaToast(message);
			//REDIRECIONAR PARA A PAGINA ANTERIOR -- ARRUMAR ALGUMA FORMA DE FAZER ISTO!
			//window.location.reload();
		}
	};

	useEffect(() => {
		clearToastMessages();
	}, []);

	return (
		<AuthContext.Provider
			value={{ authUser, statusAuth, message, verifyAuth, loginUsr, logout }}>
			{children}

			<div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
				<ToastElement />
			</div>
		</AuthContext.Provider>
	);
};

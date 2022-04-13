import React, { useState, createContext, useContext, useEffect } from 'react';

//import { axios } from 'axios';
import { ToastContext } from '../Toast/ToastProvider';

import { useNavigate, useLocation } from 'react-router';

export const AuthContext = createContext();

export const Auth = ({ children }) => {
	const [statusAuth, setstatusAuth] = useState(false);
	const [authUser, setAuthUser] = useState('');
	const [message, setmessage] = useState('');
	const [contextGlobalFetch] = useState('http://192.168.2.12:5000');
	const { chamaToast, clearToastMessages } = useContext(ToastContext);

	const navigate = useNavigate();
	const loca = useLocation();

	// const verifyAuth = () => {
	// 	fetch(`${contextGlobalFetch}/auth`, {
	// 		credentials: 'include', //PARTE MAIS IMPORTANTE A QUAL SE INCLUI AS CREDENCIAIS
	// 		mode: 'cors',
	// 		method: 'GET',
	// 		headers: { 'Content-Type': 'application/json' },
	// 	})
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			let { auth } = data;
	// 			setstatusAuth(auth);
	// 			console.log(data);
	// 			if (!auth) {
	// 				localStorage.removeItem('_user');
	// 			}
	// 			return auth;
	// 		});
	// };

	const verifyAuth = async () => {
		const response = await fetch(`${contextGlobalFetch}/auth`, {
			credentials: 'include', //PARTE MAIS IMPORTANTE A QUAL SE INCLUI AS CREDENCIAIS
			mode: 'cors',
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			const jsonRes = await response.json();
			let { auth } = jsonRes;
			setstatusAuth(auth);

			if (!auth) {
				localStorage.removeItem('_user');
				//window.location.reload();
			}
		}
	};

	const logout = async () => {
		//console.log('Cclicou logout!');
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
			setstatusAuth(auth); //FIX
			//navigate('/login');
		}
	};

	const loginUsr = async (DataUser) => {
		localStorage.removeItem('_user');
		clearToastMessages();

		const response = await fetch(`${contextGlobalFetch}/login`, {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(DataUser),
		});

		if (response.ok) {
			const jsonRes = await response.json();
			let { auth, message, username } = jsonRes;

			if (auth) {
				let paginaAnterior = loca.state ? loca.state.from.pathname : '/';

				localStorage.setItem(
					'_user',
					JSON.stringify({ auth: auth, username: username })
				);
				setstatusAuth(auth);
				navigate(paginaAnterior, true);
			}
			chamaToast(message);
		}
	};

	useEffect(() => {
		//clearToastMessages();
	}, []);

	return (
		<AuthContext.Provider
			value={{ authUser, statusAuth, message, verifyAuth, loginUsr, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

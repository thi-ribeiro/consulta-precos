import React, { useState, createContext, useContext } from 'react';
import { ToastContext } from '../Toast/ToastProvider';
import { useNavigate, useLocation } from 'react-router';

export const AuthContext = createContext();

export const Auth = ({ children }) => {
	const [statusAuth, setstatusAuth] = useState();
	const [authUser] = useState('');
	const [message] = useState('');
	const [contextGlobalFetch] = useState('http://192.168.2.12:5000');
	const { chamaToast, clearToastMessages } = useContext(ToastContext);
	//const [loadingAuth, setloadingAuth] = useState(false);

	const navigate = useNavigate();
	const loca = useLocation();

	const verifyAuth = async () => {
		//setloadingAuth(true);
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
				setstatusAuth(false);
			}
			//setloadingAuth(false);
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
			let { auth, message, username, expiresIn } = jsonRes;

			if (auth) {
				let paginaAnterior = loca.state ? loca.state.from.pathname : '/';

				localStorage.setItem(
					'_user',
					JSON.stringify({ usuario: username, expiresIn: expiresIn })
				);
				setstatusAuth(auth);
				navigate(paginaAnterior, true);
			}
			chamaToast(message);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				authUser,
				statusAuth,
				message,
				verifyAuth,
				loginUsr,
				logout,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

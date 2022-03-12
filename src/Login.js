import React, { useState, useContext } from 'react';
import { FormDadosContext } from './Context/FormDadosContext/FormDadosProvider';
import { ToastContext } from './Context/Toast/ToastProvider';
import Toast from './Context/Toast/Toast';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function Login(props) {
	const [DataUser, setDataUser] = useState({ username: '', userpass: '' });
	const [LoginStatus, setLoginStatus] = useState({
		auth: false,
		message: '',
	});
	const { contextGlobalFetch } = useContext(FormDadosContext);
	const { chamaToast } = useContext(ToastContext);
	const location = useLocation();
	const navigate = useNavigate();

	const GetData = (e) => {
		const { name, value } = e.target;
		setDataUser({
			...DataUser,
			[name]: value,
		});

		//console.log(DataUser);
	};

	const Submit = async () => {
		setLoginStatus({ message: '' });
		let { pathname } = location || '/';

		//console.log(location);
		axios
			.post(`${contextGlobalFetch}/login`, DataUser, {
				withCredentials: true,
			})
			.then((res) => {
				//console.log(res);

				let { auth, message } = res.data;

				//console.log(auth);

				if (auth) {
					setLoginStatus({
						auth: auth,
						message: message,
					});
					navigate(pathname, { replace: true });
					//location.go(0);
					//href.replace('/');
					//window.location.reload();
				} else {
					chamaToast(message);
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className='login-page-form'>
			<div className='login-page-input-text'>
				<input
					type='text'
					name='username'
					defaultValue=''
					onChange={GetData}
					placeholder='Usuário'
				/>

				<input
					type='password'
					name='userpass'
					placeholder='Senha'
					onChange={GetData}
				/>
			</div>
			<input type='button' onClick={Submit} value='Login' />
			<Toast />
		</div>
	);
}

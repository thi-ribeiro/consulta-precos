import React, { useState, useContext } from 'react';
import { FormDadosContext } from './Context/FormDadosContext/FormDadosProvider';

export default function Login() {
	const [DataUser, setDataUser] = useState({ username: '', userpass: '' });
	const [LoginStatus, setLoginStatus] = useState(false);
	const { contextGlobalFetch } = useContext(FormDadosContext);

	const GetData = (e) => {
		const { name, value } = e.target;
		setDataUser({
			...DataUser,
			[name]: value,
		});

		console.log(DataUser);
	};

	const Submit = async () => {
		localStorage.clear();

		const response = await fetch(`${contextGlobalFetch}/login`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				withCredentials: true,
			},
			body: JSON.stringify(DataUser),
		});

		if (response.ok) {
			console.log(response);
			const jsonRes = await response.json();
			
			if (jsonRes.token) {
				setLoginStatus({ auth: jsonRes.auth, message: jsonRes.response });
				localStorage.setItem('token', jsonRes.token);
				console.log(jsonRes);
			}

			// if (jsonRes.token) {
			// 	setLoginStatus({ auth: jsonRes.auth, message: jsonRes.response });
			// 	localStorage.setItem('token', jsonRes.token);
			// }
			// setLoginStatus({
			// 	auth: jsonRes.auth,
			// 	message: jsonRes.message,
			// });
		}

		console.log('LOGIN END!');
	};

	return (
		<div>
			<div>
				<input
					type='text'
					name='username'
					defaultValue=''
					onChange={GetData}
					placeholder='User'
				/>
			</div>
			<div>
				<input type='password' name='userpass' onChange={GetData} />
			</div>
			<input type='button' onClick={Submit} value='Login' />

			<div>{DataUser.username + ' ' + DataUser.userpass}</div>
			<div style={{ color: 'red', fontWeight: 'bold' }}>
				Status:
				{LoginStatus.auth
					? 'logado!'
					: LoginStatus.message
					? LoginStatus.message
					: 'deslogado!'}
			</div>
		</div>
	);
}

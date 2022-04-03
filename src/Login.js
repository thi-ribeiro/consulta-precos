import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from './Context/AuthContext/Auth';

export default function Login() {
	const [DataUser, setDataUser] = useState({ username: '', userpass: '' });

	const { loginUsr } = useContext(AuthContext);

	const GetData = (e) => {
		const { name, value } = e.target;
		setDataUser({
			...DataUser,
			[name]: value,
		});
	};

	const Submit = () => {
		loginUsr(DataUser);
	};

	useEffect(() => {
		localStorage.clear();
	}, []);

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
		</div>
	);
}

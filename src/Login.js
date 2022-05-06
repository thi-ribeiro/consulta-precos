import React, { useState, useContext } from 'react';
import { AuthContext } from './Context/AuthContext/Auth';
//import { useNavigate, useLocation, Navigate } from 'react-router';

export default function Login() {
	const [DataUser, setDataUser] = useState({ username: '', userpass: '' });
	const { loginUsr } = useContext(AuthContext);

	// const navi = useNavigate();
	// const loca = useLocation();

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

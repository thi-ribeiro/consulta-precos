import React, { useState, useContext } from 'react';
import { FormDadosContext } from './Context/FormDadosContext/FormDadosProvider';

export default function Login() {
	const [DataUser, setDataUser] = useState({ username: '', userpass: '' });
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
		const response = await fetch(`${contextGlobalFetch}/login`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(DataUser),
		});
		if (response.ok) {
			const jsonRes = await response.json();
			console.log(jsonRes);
		}

		console.log('CARAI!');
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
		</div>
	);
}

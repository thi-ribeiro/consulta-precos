import React, { Component, useState } from 'react';

export default function Login() {
	const [DataUser, setDataUser] = useState({ user: '', pass: '' });

	const GetData = (e) => {
		const { name, value } = e.target;
		setDataUser({
			...DataUser,
			user: value,
		});

		console.log(DataUser);
	};

	return (
		<div>
			<form>
				<input type='text' name='user' defaultValue='' onChange={GetData} />
			</form>

			<div>{DataUser.name}</div>
		</div>
	);
}

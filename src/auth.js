import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { FormDadosContext } from './Context/FormDadosContext/FormDadosProvider';

export function Auth() {
	const { contextGlobalFetch } = useContext(FormDadosContext);
	const [Autenticado, setAutenticado] = useState({ auth: false });

	useEffect(() => {
		axios
			.get(`${contextGlobalFetch}/auth`, {
				withCredentials: true,
			})
			.then((res) => {
				let { auth } = res.data;
				//return asyncAxios;
				setAutenticado({ auth: auth });
			})
			.catch((err) => console.log(err));
	}, []);

	//export const Autenticado.auth;
	return true;
}

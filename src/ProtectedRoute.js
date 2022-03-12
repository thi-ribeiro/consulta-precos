import React, { useEffect, useContext, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { FormDadosContext } from './Context/FormDadosContext/FormDadosProvider';
//import Login from './Login';
import axios from 'axios';

export default function ProtectedRoute() {
	const { contextGlobalFetch } = useContext(FormDadosContext);
	const [Autenticado, setAutenticado] = useState(false);
	//const location = useLocation();

	useEffect(() => {
		const asyncAxios = async () => {
			let res = await axios.get(`${contextGlobalFetch}/auth`, {
				withCredentials: true,
			});
			if (res.status === 200) {
				let { auth } = res.data;
				setAutenticado(auth);
			}
		};

		asyncAxios();
		// let isMounted = true;
		// axios
		// 	.get(`${contextGlobalFetch}/auth`, {
		// 		withCredentials: true,
		// 	})
		// 	.then((res) => {
		// 		console.log(res);
		// 		let { auth } = res.data;
		// 		setAutenticado(true);
		// 	})
		// 	.catch((err) => console.log(err));
		// console.log(Autenticado);
		// return () => {
		// 	isMounted = false;
		// };
	}, [Autenticado, contextGlobalFetch]);

	return Autenticado ? <Outlet /> : <Navigate to='/login' />;
}

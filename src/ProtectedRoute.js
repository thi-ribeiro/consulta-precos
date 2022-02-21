import React, { useEffect, useContext, useState } from 'react';
import { Route, Navigate, useNavigate, Outlet } from 'react-router-dom';
//import { Component } from 'react/cjs/react.production.min';
import {
	FormDadosContext,
	FormDadosProvider,
} from './Context/FormDadosContext/FormDadosProvider';

export default function ProtectedRoute({
	// isAuth,
	// component: Component,
	element,
	path,
	props,
	// ...rest
}) {
	const { contextGlobalFetch } = useContext(FormDadosContext);
	const [Autenticado, setAutenticado] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		//jwt token DO LOCALSTORAGE
		let token = localStorage.getItem('token');

		if (token) {
			fetch(`${contextGlobalFetch}/auth`, {
				method: 'POST',
				headers: {
					Authorization: token,
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					let { auth } = data;

					if (!auth) {
						navigate('/login');
					}
					setAutenticado(auth);
					//navigate(props.location);
					//navigate('/consulsta');
				});
		} else {
			navigate('/login');
		}
	}, []);

	//const authed = isauth(); // isauth() returns true or false based on localStorage
	//const ele = authed === true ? element : <Navigate to='/Home' />;

	////return Autenticado ? <Outlet /> : <Navigate to='/login' />;

	return (
		<Outlet
			render={(props) => {
				if (!Autenticado)
					return (
						<Navigate to={{ path: '/', state: { from: props.location } }} />
					);
			}}
		/>
	);

	// <Route
	// 	{...rest}
	// 	render={(props) => {
	// 		if (Autenticado) return <Component {...props} />;
	// 		if (!Autenticado)
	// 			return (
	// 				<Navigate to={{ path: '/', state: { from: props.location } }} />
	// 			);
	// 	}}
	// />
}

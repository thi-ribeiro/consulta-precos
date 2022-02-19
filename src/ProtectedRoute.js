import React from 'react';
import { Route, Redirect } from 'react-router-dom';
//import { Component } from 'react/cjs/react.production.min';
import { FormDadosProvider } from './Context/FormDadosContext/FormDadosProvider';

const ProtectedRoute = ({ isAuth, component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) => {
				if (isAuth)
					return (
						<FormDadosProvider> 
							<Component {...props} />
						</FormDadosProvider>
					);
				if (!isAuth)
					return (
						<Redirect to={{ path: '/', state: { from: props.location } }} />
					);
			}}
		/>
	);
};

export default ProtectedRoute;

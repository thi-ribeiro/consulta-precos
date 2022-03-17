import React, { useEffect, useContext } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './Context/AuthContext/Auth';

export default function ProtectedRoute() {
	const { statusAuth, verifyAuth } = useContext(AuthContext);

	const location = useLocation();
	useEffect(() => {
		verifyAuth();
		//console.log(location.pathname);
	}, []);

	return statusAuth ? (
		<Outlet />
	) : (
		<Navigate to='/login' state={{ from: location }} />
	);
}

import React, { useContext, useEffect } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './Context/AuthContext/Auth';
import { ToastContext } from './Context/Toast/ToastProvider';

export default function ProtectedRoute() {
	const { statusAuth, verifyAuth } = useContext(AuthContext);
	const { clearToastMessages } = useContext(ToastContext);

	const { auth, username } = localStorage.getItem('_user')
		? JSON.parse(localStorage.getItem('_user'))
		: { auth: false, username: false };

	let location = useLocation();

	useEffect(() => {
		verifyAuth();
		clearToastMessages();
	}, []);

	return auth ? (
		<Outlet />
	) : (
		<Navigate to='/login' state={{ from: location }} />
	);
}

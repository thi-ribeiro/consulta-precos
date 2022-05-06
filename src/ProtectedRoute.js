import React, { useEffect, useContext } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
//import { AuthContext } from './Context/AuthContext/Auth';
import { ToastContext } from './Context/Toast/ToastProvider';
import ScaleLoader from 'react-spinners/ScaleLoader';

export default function ProtectedRoute({ status }) {
	const { clearToastMessages } = useContext(ToastContext);
	//const { statusAuth, verifyAuth, loadingAuth } = useContext(AuthContext);

	// const { usuario } = localStorage.getItem('_user')
	// 	? JSON.parse(localStorage.getItem('_user'))
	// 	: { usuario: false };

	let location = useLocation();

	useEffect(() => {
		clearToastMessages();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (status === undefined) {
		return (
			<div className='loading-centralizar'>
				<ScaleLoader
					color='gray'
					width='5px'
					margin='2px'
					radius='5px'
					height='20px'
				/>
			</div>
		);
	} else {
		if (!status) {
			return <Navigate to={'/login'} state={{ from: location }} replace />;
		}

		return <Outlet />;
	}
}

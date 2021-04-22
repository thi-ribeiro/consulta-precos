import React, { useContext } from 'react';
import { ToastContext } from './ToastProvider';

export default function Toast(props) {
	const { childrens } = useContext(ToastContext);

	const styleWrapper = {
		display: 'flex',
		flexDirection: 'column',
		position: 'fixed',
		bottom: '15px',
		zIndex: '9'
	};

	return <div style={styleWrapper}>{childrens.map(child => child)}</div>;
}

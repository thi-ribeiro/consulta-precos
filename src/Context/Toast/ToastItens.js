import React, { useContext, useEffect, useState } from 'react';
import { ToastContext } from './ToastProvider';

export default function ToastItens({ toastMensagem, index }) {
	const { childrens } = useContext(ToastContext);
	const [fade, setfade] = useState('0');

	const style = {
		opacity: fade
	};

	const fadeInOut = e => {
		setfade('1');

		setTimeout(() => {
			setfade('0');
		}, 2000);
	};

	useEffect(() => {
		fadeInOut();
		return () => {
			setfade();
		};
	}, []);

	return (
		<div className='itens-toast' style={style} key={index}>
			{toastMensagem}
		</div>
	);
}

import React from 'react';

export default function Alert({ status, texto }) {
	const style = {
		div: {
			transition: 'opacity 500ms ease-in-out 0s'
		},
		ativo: {
			opacity: '1'
		},
		inativo: {
			opacity: '0'
		}
	};

	const styleStatus = status => {
		let ret;
		ret = status ? style.ativo : style.inativo;
		return { ...style.div, ...ret };
	};

	return (
		<div className='alerta' style={styleStatus(status)}>
			{texto}
		</div>
	);
}

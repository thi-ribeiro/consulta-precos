import React, { useState } from 'react';

export default function TesteFc() {
	const [status, setstatus] = useState(false);
	const [fu, setfu] = useState(0);

	const change = e => {
		setstatus(!status);
		setfu(1);
	};

	const endAnimation = e => {
		setfu(0);
		setstatus(false);
	};

	return (
		<div>
			{status ? (
				<div className='alerta' onAnimationEnd={endAnimation} fu={fu}>
					MENSAGEM DE TESTE
				</div>
			) : null}
			<div style={{ position: 'absolute', bottom: '0' }}>
				<button onClick={change}>CHANGE</button>
			</div>
		</div>
	);
}

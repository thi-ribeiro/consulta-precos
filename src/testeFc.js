import React, { useState } from 'react';
import Alerta from './Alert';

export default function TesteFc() {
	const [status, setstatus] = useState(false);
	const [fu, setfu] = useState(0);

	const change = e => {
		setstatus(!status);
		setfu(1);
	};

	const endAnimation = e => {
		//setfu(0);
		//setstatus(false);
	};

	return (
		<div>
			<Alerta status={status} texto={'ALERTA TESTE !'} />
			<div style={{ position: 'absolute', bottom: '0' }}>
				<button onClick={change}>CHANGE</button>
			</div>
		</div>
	);
}

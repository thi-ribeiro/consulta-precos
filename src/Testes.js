import React, { useState } from 'react';

export default function Testes() {
	const [first, setfirst] = useState(false);

	const testeClick = () => {
		setfirst(!first);

		console.log(first);
	};

	return (
		<div>
			Testes
			<button onClick={testeClick}>CLICA MEEE</button>
			{first ? <div>OI</div> : null}
		</div>
	);
}

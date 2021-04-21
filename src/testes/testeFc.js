import React, { useState, createContext } from 'react';
import EachItem from './EachItem';
import Comp1 from './comp1';

export default function TesteFc() {
	const [status, setstatus] = useState(false);
	const [fu, setfu] = useState(0);
	const [arrayTeste, setarrayTeste] = useState([
		{
			nome: 'thiago'
		},
		{
			nome: 'gisele'
		},
		{
			nome: 'abcd'
		}
	]);

	const clickTeste = e => {
		console.log(e.target);
	};

	const change = e => {
		setstatus(!status);
		setfu(1);
	};

	const endAnimation = e => {
		//setfu(0);
		//setstatus(false);
	};

	const deteleFromArray = e => {
		let target = e.target.dataset.nome;
		//let arrayIndex = arrayTeste.findIndex(i => i.nome === target);
		let filtrado = arrayTeste.filter(i => i.nome !== target);

		setarrayTeste(filtrado);
		console.log(filtrado);
	};

	return <Comp1 />;

	// return (
	// 	<ProviderTests value='teste'>
	// 		<div>
	// 			<Alerta status={status} texto={'ALERTA TESTE !'} />
	// 			<div style={{ position: 'absolute', bottom: '0' }}>
	// 				<button onClick={change}>CHANGE</button>
	// 			</div>

	// 			{arrayTeste.map((i, ind) => (
	// 				<EachItem
	// 					key={ind}
	// 					nome={i.nome}
	// 					clickItem={clickTeste}
	// 					deteleFromArray={deteleFromArray}
	// 				/>
	// 			))}
	// 		</div>
	// 	</ProviderTests>
	// );
}

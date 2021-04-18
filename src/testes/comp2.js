import React, { useContext } from 'react';
import { ProviderTestes } from './providerTests';

export default function Comp2(props) {
	const { nome, changeOnOff, onOff } = useContext(ProviderTestes);
	console.log(nome);

	const changeonoffestado = e => {
		//console.log(e);
		changeOnOff(e.target.dataset.nome);
		//console.log(onOff);
	};

	return (
		<div>
			<div>
				A
				<button data-nome='a' onClick={changeonoffestado}>
					CLICK!
				</button>
			</div>
			<br />
			<div>
				B
				<button data-nome='b' onClick={changeonoffestado}>
					CLICK!
				</button>
			</div>
			<br />
			<div>
				C
				<button data-nome='c' onClick={changeonoffestado}>
					CLICK!
				</button>
			</div>
		</div>
	);
}

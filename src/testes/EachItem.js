import React, { useState } from 'react';
//import { createContext } from 'react';
import { ProviderTests } from './providerTests';

export default function EachItem(props) {
	const [stateStyle, setstateStyle] = useState();
	const [itemActive, setitemActive] = useState(true);

	const style = {
		selected: { color: 'red', fontWeight: 'bold' },
		unselected: { color: 'black' }
	};

	const contexto = React.useContext(ProviderTests);
	console.log(contexto);

	const clickInside = e => {
		setstateStyle(itemActive ? style.selected : style.unselected);
		setitemActive(!itemActive);

		return props.clickItem;
	};

	return (
		<div style={stateStyle} onClick={clickInside}>
			{props.nome}
			<button data-nome={props.nome} onClick={props.deteleFromArray}>
				Deletar
			</button>
		</div>
	);
}

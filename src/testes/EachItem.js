import React, { useState, useEffect } from 'react';

export default function EachItem({ nome, clickItem, deteleFromArray }) {
	const [stateStyle, setstateStyle] = useState();
	const [itemActive, setitemActive] = useState(true);

	const style = {
		selected: { color: 'red', fontWeight: 'bold' },
		unselected: { color: 'black' }
	};

	useEffect(() => {
		//console.log(clickItem);
	}, []);

	const clickInside = e => {
		setstateStyle(itemActive ? style.selected : style.unselected);
		setitemActive(!itemActive);

		return clickItem;
	};

	return (
		<div style={stateStyle} onClick={clickInside}>
			{nome}
			<button data-nome={nome} onClick={deteleFromArray}>Deletar</button>
		</div>
	);
}

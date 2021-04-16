import React, { useState, useEffect } from 'react';

export default function Produto_removido_alerta({ mensagem, ativo }) {
	const [popAtivo, setpopAtivo] = useState();
	// const [stateStyle, setstateStyle] = useState();
	// const [itemActive, setitemActive] = useState(ativo);
	const [style] = useState({
		active: { opacity: '1' },
		desactive: {
			opacity: '0'
		}
	});

	const resetPopAtivo = _ => {
		setpopAtivo(!popAtivo);
	};

	useEffect(() => {
		document.body.style.overflow = 'unset';
		//console.log(ativo);
		//setitemActive(mensagem ? true : false);

		//setstateStyle(itemActive ? style.active : style.desactive);
	}, []);

	return ativo ? (
		<div
			//style={ativo ? style.active : style.desactive}
			className='alerta alerta-anim'
			onAnimationEnd={resetPopAtivo}>
			{mensagem}
		</div>
	) : null;
}

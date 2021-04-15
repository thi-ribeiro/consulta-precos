import React, { useEffect, useRef } from 'react';
import AutoComplete from './AutoComplete';

export default function Filtro_produto({
	ativo,
	onChangetextoFiltro,
	textoFiltro
}) {
	const refe = useRef();

	useEffect(() => {
		console.log(refe.current.children.tipoProduto.value);
	}, []);

	return ativo ? (
		<div className='filtro_produtos_marca'>
			<AutoComplete
				valorEditar={textoFiltro}
				colunaBusca='tipoProduto'
				referencia={refe}
			/>
		</div>
	) : null;
}

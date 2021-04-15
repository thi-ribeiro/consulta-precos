import React from 'react';

export default function Filtro_produto({ ativo, textoFiltro }) {
	return ativo ? (
		<div className='filtro_produtos_marca'>
			<input
				type='text'
				placeholder='Filtrar por marca'
				name='filtro_marca'
				onChange={textoFiltro}
			/>
		</div>
	) : null;
}

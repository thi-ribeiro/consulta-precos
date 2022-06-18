import React, { useContext, useState, useEffect } from 'react';
import { ValidadesContext } from '../Context/ValidadesContext/ValidadesProvider';
import EditarValidade from './EditarValidade';

export default function ListaValidadesAtual() {
	const {
		fetchDataAtual,
		dataAtualFetch,
		dataBarraBr,
		MapValidades,
		loadingAtual,
	} = useContext(ValidadesContext);

	useEffect(() => {
		fetchDataAtual();
	}, []);

	return (
		<div className='coleta-validades-div-atual'>
			<div className='coleta-validades-titulo'>
				<h1>Consulta de validades</h1>
				<h5>Data de hoje {dataBarraBr}</h5>
			</div>

			<MapValidades valores={dataAtualFetch} tipoLoading={loadingAtual} />

			<EditarValidade />
		</div>
	);
}

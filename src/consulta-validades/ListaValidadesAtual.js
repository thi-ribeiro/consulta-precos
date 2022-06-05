import React, { useContext, useEffect } from 'react';
import { ValidadesContext } from '../Context/ValidadesContext/ValidadesProvider';

export default function ListaValidadesAtual() {
	const {
		fetchDataAtual,
		dataAtualFetch,
		dataBarraBr,
		mapValidades,
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
			{mapValidades(dataAtualFetch, loadingAtual)}
		</div>
	);
}

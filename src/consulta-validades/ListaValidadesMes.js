import React, { useContext } from 'react';
import { ValidadesContext } from '../Context/ValidadesContext/ValidadesProvider';
import MenuValidadesBuscaMes from './MenuValidadesBuscaMes';

export default function ListaValidades() {
	const { dataSelectedReferencia, MapValidades, loadingReferencia } =
		useContext(ValidadesContext);

	return (
		<div className='coleta-validades-div-mes'>
			<div className='coleta-validades-titulo'>
				<h1>Consulta mensal</h1>
			</div>
			<MenuValidadesBuscaMes />
			<MapValidades
				valores={dataSelectedReferencia}
				tipoLoading={loadingReferencia}
			/>
		</div>
	);
}

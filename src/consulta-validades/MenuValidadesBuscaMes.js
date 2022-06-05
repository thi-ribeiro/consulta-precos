import React, { useContext, createRef } from 'react';
import Icon from '@mdi/react';
import { mdiViewList } from '@mdi/js';

import { ValidadesContext } from '../Context/ValidadesContext/ValidadesProvider';

export default function MenuValidadesBusca() {
	const { datasSelect, dataMesAnoBarra, fetchDataReferencia } =
		useContext(ValidadesContext);

	//console.log(datasSelect);

	const referenciaSelect = createRef();

	//console.log(referenciaSelect);

	return (
		<div className='menu-validades-busca'>
			<select ref={referenciaSelect}>
				{datasSelect.map((item, index) => {
					let { validadeMesAno, validadeMesAnoBarra } = item;

					if (validadeMesAnoBarra !== dataMesAnoBarra) {
						return (
							<option key={index} value={validadeMesAno}>
								{validadeMesAnoBarra}
							</option>
						);
					}
				})}
			</select>

			<button
				onClick={() => {
					fetchDataReferencia(referenciaSelect.current.value);
				}}>
				<Icon className='iconeMod' path={mdiViewList} size={1} color='#000' />
				Listar
			</button>
		</div>
	);
}

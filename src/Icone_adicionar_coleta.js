import React from 'react';
import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';

export default function Icone_adicionar_coleta({ adicionarForm }) {
	return (
		<div className='floatButton' onClick={adicionarForm}>
			<Icon path={mdiPlus} title='Filtrar' size={1} color='rgba(0,0,0,0.3)' />
		</div>
	);
}

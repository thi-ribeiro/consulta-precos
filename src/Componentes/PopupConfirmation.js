import React from 'react';
import Icon from '@mdi/react';
import { mdiPlaylistCheck, mdiClose } from '@mdi/js';

export default function PopupConfirmation({
	visivel,
	mensagemConfirmacao,
	funcaoTexto,
	funcaoFechar,
	funcaoExecutar,
}) {
	return visivel ? (
		<div className='background-adicionar-dados'>
			<div className='popupConfirmation'>
				{mensagemConfirmacao}
				<div className='botoes-confirmacao'>
					<button onClick={funcaoExecutar}>
						<Icon className='iconeMod' path={mdiPlaylistCheck} size={1} />
						{funcaoTexto}
					</button>
					<button onClick={funcaoFechar}>
						<Icon className='iconeMod' path={mdiClose} size={1} /> Cancelar
					</button>
				</div>
			</div>
		</div>
	) : null;
}

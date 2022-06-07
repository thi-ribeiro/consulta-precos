import React, { useContext } from 'react';
import Icon from '@mdi/react';
import { mdiPlaylistCheck, mdiClose } from '@mdi/js';

import { ValidadesContext } from '../Context/ValidadesContext/ValidadesProvider';

export default function PopupConfirmation() {
	const {
		removerValidade,
		finalizarValidade,
		validadePopupState,
		setvalidadePopupState,
		stadoPopConfirma,
		setstadoPopConfirma,
		dadosConfirmacao,
	} = useContext(ValidadesContext);

	const tipoFunc = (tipo) => {
		switch (tipo) {
			case 0:
				console.log('EDITAR');
				setstadoPopConfirma(false);
				break;
			case 1:
				finalizarValidade(dadosConfirmacao.id);
				setstadoPopConfirma(false);
				break;
			case 2:
				removerValidade(dadosConfirmacao.id);
				setstadoPopConfirma(false);
				break;
			default:
		}
	};

	return stadoPopConfirma ? (
		<div className='background-adicionar-dados'>
			<div className='popupConfirmation'>
				{dadosConfirmacao.mensagemConfirmacao}
				<div className='botoes-confirmacao'>
					<button onClick={() => tipoFunc(dadosConfirmacao.funcaoExecutar)}>
						<Icon className='iconeMod' path={mdiPlaylistCheck} size={1} />
						{dadosConfirmacao.funcaoTexto}
					</button>
					<button onClick={() => setstadoPopConfirma(false)}>
						<Icon className='iconeMod' path={mdiClose} size={1} /> Cancelar
					</button>
				</div>
			</div>
		</div>
	) : null;
}

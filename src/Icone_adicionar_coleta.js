import React, { useContext } from 'react';
import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';

import { ValidadesContext } from './Context/ValidadesContext/ValidadesProvider';
import { FormDadosContext } from './Context/FormDadosContext/FormDadosProvider';

export default function Icone_adicionar_coleta({ tipoForm, visivel = true }) {
	const { validadePopupState, setvalidadePopupState } =
		useContext(ValidadesContext);

	const {
		setaStatusPopup,
		clearToastMessages,
		changelogPopupState,
		setchangelogPopupState,
	} = useContext(FormDadosContext);

	const setFuncao = () => {
		//console.log(tipoForm);
		switch (tipoForm) {
			case 'addValidade':
				//console.log('validade');
				return setvalidadePopupState(!validadePopupState);
			//break;
			case 'editColeta':
				//console.log('TESTE');
				return [setaStatusPopup(), clearToastMessages];
			//break;
			case 'changelogAdd':
				//console.log('TESTE');
				return [
					setchangelogPopupState(!changelogPopupState),
					clearToastMessages,
				];
			//break;
			default:
				break;
		}
	};

	return visivel ? (
		<div className='floatButton' onClick={setFuncao}>
			<Icon path={mdiPlus} title='Filtrar' size={1} color='rgba(0,0,0,0.3)' />
		</div>
	) : null;
}

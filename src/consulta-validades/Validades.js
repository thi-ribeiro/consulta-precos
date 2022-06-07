import React, { useContext } from 'react';
import IconeAddColeta from '../Icone_adicionar_coleta';

import ListaValidadesMes from './ListaValidadesMes';
import ListaValidadesAtual from './ListaValidadesAtual';

import AdicionarValidade from './AdicionarValidadePopUp';
import PopupConfirmation from '../Componentes/PopupConfirmation';

import { ValidadesContext } from '../Context/ValidadesContext/ValidadesProvider';

export default function Validades() {
	const { validadePopupState, setvalidadePopupState } =
		useContext(ValidadesContext);

	const changeState = () => {
		setvalidadePopupState(!validadePopupState);
		//console.log(validadePopupState);
	};

	return (
		<div className='tabelas-select validades-select'>
			<ListaValidadesAtual />
			<div className='separador'></div>
			<ListaValidadesMes />
			<IconeAddColeta adicionarForm={changeState} />

			<PopupConfirmation />
			<AdicionarValidade />
		</div>
	);
}

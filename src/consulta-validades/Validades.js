import React from 'react';
import IconeAddColeta from '../Icone_adicionar_coleta';

//import ListaValidadesMes from './ListaValidadesMes';
import ListaValidadesAtual from './ListaValidadesAtual';

import AdicionarValidade from './AdicionarValidadePopUp';
import PopupConfirmation from '../Componentes/PopupConfirmation';

export default function Validades() {
	return (
		<div className='tabelas-select validades-select'>
			<ListaValidadesAtual />
			{/*<div className='separador'></div>*/}
			<IconeAddColeta tipoForm='addValidade' />
			<PopupConfirmation />
			<AdicionarValidade />
		</div>
	);
}

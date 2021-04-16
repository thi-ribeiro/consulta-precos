import React, { useState } from 'react';
// import Icon from '@mdi/react';
// import { mdiFileDocumentEditOutline, mdiTextBoxRemoveOutline } from '@mdi/js';
import Alerta from './Produto_removido_alerta';
import FormDadosColeta from './Form_dados_coleta';
import ListaProdutosLayout from './Lista_produtos_layout';

export default function Lista_produtos_itens({
	lista,
	dataFiltrada,
	atualizarFetch
}) {
	const [statusPopup, setstatusPopup] = useState(false);
	const [editarItem, seteditarItem] = useState();
	const [listaItens, setlistaItens] = useState(lista);
	const [mensagemAlerta, setmensagemAlerta] = useState();
	const [popupAtivo, setpopupAtivo] = useState();

	const carregaDadosEditarPopup = e => {
		setstatusPopup(!statusPopup);
		//console.log(currentTarget.dataset.id);

		if (e) {
			seteditarItem(e.currentTarget.dataset.id);

			let filtro = lista.filter(
				item => item.id === parseInt(e.currentTarget.dataset.id)
			);

			seteditarItem(filtro[0]);
		}

		statusPopup
			? (document.body.style.overflow = 'unset')
			: (document.body.style.overflow = 'hidden');
	};

	const atualizaListaRemocao = item => {
		let filtrado = listaItens.filter(i => i.id !== item);
		console.log('DELETANDO: ' + item);
		setlistaItens(filtrado);
	};

	return (
		<React.Fragment>
			{listaItens
				.filter(i => i.coletaFormatada === dataFiltrada)
				.map((item, index) => (
					<ListaProdutosLayout
						key={index}
						item={item}
						indexItem={index}
						editarPopup={carregaDadosEditarPopup}
						atualizaLista={atualizaListaRemocao}
						mensagemPopup={e => setmensagemAlerta(e)}
						ativoPopup={e => setpopupAtivo(e)}
					/>
				))}

			<FormDadosColeta
				ativo={statusPopup}
				fecharForm={carregaDadosEditarPopup}
				editarItem={editarItem}
				atualizarColeta={atualizarFetch}
			/>
			<Alerta mensagem={mensagemAlerta} ativo={popupAtivo} />
		</React.Fragment>
	);
}

import React, { useState } from 'react';
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
		//console.log('DELETANDO: ' + item);
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
					/>
				))}
			<FormDadosColeta
				ativo={statusPopup}
				fecharForm={carregaDadosEditarPopup}
				editarItem={editarItem}
				atualizarColeta={atualizarFetch}
			/>
		</React.Fragment>
	);
}

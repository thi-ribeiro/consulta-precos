import React, { useState, createContext } from 'react';

export const FormDadosContext = createContext();

export const FormDadosProvider = ({ children }) => {
	const [popupStatus, setpopupStatus] = useState(false);
	const [editarChave, seteditarChave] = useState([]);
	const [listaProdutos, setlistaProdutos] = useState([]);
	const [configuracaoBusca, setconfiguracaoBusca] = useState([]);
	const [listaTipoprodutos, setlistaTipoprodutos] = useState([]);
	const [loading, setloading] = useState(false);

	const carregarTipodeProdutos = async _ => {
		setloading(true);

		const response = await fetch(
			'http://192.168.2.103:5000/lista-tipo-produto'
		);

		if (response.ok) {
			const jsonRes = await response.json();
			setloading(false);
			setlistaTipoprodutos(jsonRes);
		}
	};

	const busca = async (tipoProduto, ordem) => {
		setloading(true);

		const response = await fetch(
			`http://192.168.2.103:5000/produtos-listagem/${tipoProduto}/${ordem}`
		);
		if (response.ok) {
			const resJason = await response.json();

			definirListaProdutos(resJason);

			carregarTipodeProdutos();
			setloading(false);
		}
	};

	const buscaFiltrada = async (tipoProduto, ordem, busca) => {
		setloading(true);
		const response = await fetch(
			`http://192.168.2.103:5000/filtro-produto/${tipoProduto}/${ordem}/${busca}`
		);

		if (response.ok) {
			const jsonRes = await response.json();
			definirListaProdutos(jsonRes);

			carregarTipodeProdutos();
			setloading(false);
		}
	};

	const setaStatusPopup = e => {
		setpopupStatus(!popupStatus);

		seteditarChave([]);

		popupStatus
			? (document.body.style.overflow = 'unset')
			: (document.body.style.overflow = 'hidden');
	};

	const editarItemArray = (lista, idItem) => {
		let filtro = lista.filter(item => item.id === parseInt(idItem));
		seteditarChave(filtro[0]);
	};

	const definirListaProdutos = lista => {
		setlistaProdutos(lista);
		//seteditarChave([]);
	};

	const clearItens = () => {
		setlistaProdutos([]);
	};

	const configurarBusca = valores => {
		setconfiguracaoBusca(valores);
	};

	return (
		<FormDadosContext.Provider
			value={{
				setaStatusPopup,
				popupStatus,
				editarItemArray,
				editarChave,
				definirListaProdutos,
				listaProdutos,
				clearItens,
				configurarBusca,
				configuracaoBusca,
				buscaFiltrada,
				busca,
				carregarTipodeProdutos,
				listaTipoprodutos,
				loading
			}}>
			{children}
		</FormDadosContext.Provider>
	);
};

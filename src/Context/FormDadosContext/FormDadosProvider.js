import React, { useState, useEffect, createContext, useContext } from 'react';
import { AuthContext } from '../AuthContext/Auth';

export const FormDadosContext = createContext();

export const FormDadosProvider = ({ children }) => {
	const [popupStatus, setpopupStatus] = useState(false);
	const [editarChave, seteditarChave] = useState([]);
	const [listaProdutos, setlistaProdutos] = useState([]);
	const [configuracaoBusca, setconfiguracaoBusca] = useState([]);
	const [listaTipoprodutos, setlistaTipoprodutos] = useState([]);
	const [loading, setloading] = useState(false);
	const [qntidadeItens, setqntidadeItens] = useState(0);
	const [changelogList, setChangelogList] = useState([]);
	const [changelogPopupState, setchangelogPopupState] = useState(false);
	//const [statusAuth, setStatusAuth] = useState(false);

	const { verifyAuth, statusAuth } = useContext(AuthContext);
	//const [produtoPorData, setprodutoPorData] = useState([]);

	const [contextGlobalFetch] = useState('http://localhost:5000');

	let data = new Date();

	const formatData = (valor) => {
		let valorStr = valor.toString();
		if (valorStr.length <= 1) {
			return 0 + valorStr;
		} else {
			return valorStr;
		}
	};

	let dia = formatData(data.getDate());
	let mes = formatData(data.getMonth() + 1);
	let ano = formatData(data.getFullYear());
	let hora = formatData(data.getHours());
	let minuto = formatData(data.getMinutes());
	let sec = formatData(data.getSeconds());

	let dataCompleta = `${ano}-${mes}-${dia} ${hora}:${minuto}:${sec}`;

	let userDataLocalStorage = localStorage.getItem('_user') || false;
	let userState = userDataLocalStorage
		? JSON.parse(userDataLocalStorage).auth
		: false;
	let userStateUsername = userDataLocalStorage
		? JSON.parse(userDataLocalStorage).username
		: false;

	const carregaChangelog = async (ordem) => {
		setloading(true);

		const response = await fetch(`${contextGlobalFetch}/lista-changelog-asc`);

		if (response.ok) {
			const jsonRes = await response.json();
			setChangelogList(jsonRes);
			setloading(false);
		}
	};

	//CONSULTA PRODUTOS
	const carregarTipodeProdutos = async (_) => {
		setloading(true);

		const response = await fetch(`${contextGlobalFetch}/lista-tipo-produto`);
		//console.log(response);
		if (response.ok) {
			const jsonRes = await response.json();

			setlistaTipoprodutos(jsonRes);
			setloading(false);
		}
	};

	const busca = async (tipoProduto, ordem) => {
		setloading(true);

		const response = await fetch(
			`${contextGlobalFetch}/produtos-listagem/${tipoProduto}/${ordem}`
		);
		if (response.ok) {
			const jsonRes = await response.json();

			definirListaProdutos(jsonRes);

			carregarTipodeProdutos();
			setloading(false);
		}
	};

	const buscaFiltrada = async (tipoProduto, ordem, busca) => {
		setloading(true);
		const response = await fetch(
			`${contextGlobalFetch}/filtro-produto/${tipoProduto}/${ordem}/${busca}`
		);

		if (response.ok) {
			const jsonRes = await response.json();

			definirListaProdutos(jsonRes);

			carregarTipodeProdutos();
			setloading(false);
		}
	};

	const setaStatusPopup = (e) => {
		setpopupStatus(!popupStatus);

		seteditarChave([]);

		popupStatus
			? (document.body.style.overflow = 'unset')
			: (document.body.style.overflow = 'hidden');
	};

	const changelogPopup = () => {
		//console.log(!changelogPopupState);
		setchangelogPopupState(!changelogPopupState);
	};

	const editarItemArray = (idItem) => {
		setaStatusPopup();
		seteditarChave(idItem);
	};

	const atualizaItemArray = (idItem) => {
		let listaItens = listaProdutos;
		let target = parseInt(idItem);

		Object.keys(listaItens).map((datas) => {
			return listaItens[datas].map((item) => {
				if (item.id === target) {
					//console.log(Object.keys(listaItens[datas][0]));
					let keys = Object.keys(item);
					keys.map((i) => {
						//console.log(i);
						return (listaItens[i] = editarChave[i]);
					});
					//console.log(Object.keys(item));
					// item.marca = 'TESTE!';
				}
			});
		});
		//console.log(listaItens);
		definirListaProdutos({ listaItens });
	};

	const definirListaProdutos = (lista) => {
		setlistaProdutos(groupBy(lista));
	};

	const clearItens = () => {
		setlistaProdutos([]);
	};

	const configurarBusca = (valores) => {
		setconfiguracaoBusca(valores);
	};

	const groupBy = (array) => {
		let datas = [];
		let produtosPorData = [];
		let qnt = 0;

		if (array.length) {
			array.map((e, ind) => {
				return (datas[ind] = e.coletaFormatada);
			});
		}

		let unique = datas.filter(function (elem, index, self) {
			return index === self.indexOf(elem);
		});

		unique.filter((i1) => {
			produtosPorData[i1] = array.filter((i) => {
				if (i.coletaFormatada === i1) {
					qnt += 1;
					return i.coletaFormatada === i1;
				}
			});
		});

		setqntidadeItens(qnt);

		return produtosPorData;
	};

	useEffect(() => {
		//verifyAuth(); //DESATIVADO MUITAS REQUISICOES AO ENTRAR NAS PAGINAS
	}, [verifyAuth]);

	return (
		<FormDadosContext.Provider
			value={{
				setaStatusPopup,
				popupStatus,
				editarItemArray,
				editarChave,
				definirListaProdutos,
				setlistaProdutos,
				atualizaItemArray,
				listaProdutos,
				qntidadeItens,
				setqntidadeItens,
				clearItens,
				configurarBusca,
				configuracaoBusca,
				buscaFiltrada,
				busca,
				carregarTipodeProdutos,
				listaTipoprodutos,
				loading,
				setloading,
				carregaChangelog,
				changelogList,
				setChangelogList,
				contextGlobalFetch,
				changelogPopup,
				changelogPopupState,
				dataCompleta,
				userStateUsername,
				userState,
			}}>
			{children}
		</FormDadosContext.Provider>
	);
};

//export default FormDadosProvider;

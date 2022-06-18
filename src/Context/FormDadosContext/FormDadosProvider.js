import React, { useState, createContext, useContext } from 'react';
//import { AuthContext } from '../AuthContext/Auth';
import { ToastContext } from '../Toast/ToastProvider';
import _ from 'lodash';

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
	const [changelogEditDados, setchangelogEditDados] = useState([]);
	const [changelogPopupState, setchangelogPopupState] = useState(false);
	const [changelogEditPopupState, setchangelogEditPopupState] = useState(false);
	const [listaChangelog, setlistaChangelog] = useState('');
	const [idEditar, setidEditar] = useState();
	//const [statusAuth, setStatusAuth] = useState(false);
	//const { verifyAuth } = useContext(AuthContext);
	const { chamaToast } = useContext(ToastContext);

	const [contextGlobalFetch] = useState('http://192.168.2.12:5000');

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
	let dataCompletaEscape = `${dia}-${mes}-${ano}`;
	let dataBarra = `${ano}/${mes}/${dia}`;
	let dataBarraBr = `${dia}/${mes}/${ano}`;
	let dataMesAnoBarra = `${mes}/${ano}`;

	let userDataLocalStorage = localStorage.getItem('_user') || false;
	// let userState = userDataLocalStorage
	// 	? JSON.parse(userDataLocalStorage).auth
	// 	: false;
	let userStateUsername = userDataLocalStorage
		? JSON.parse(userDataLocalStorage).usuario
		: 'CheckAuth!';

	const formatarMoeda = (num, replace, replaceTo, trim = false) => {
		let formatter = new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL',
		});

		let result = formatter.format(num).replace(replace, replaceTo);

		return trim ? result.trim() : result;
	};

	const postChangelog = async (e) => {
		e.preventDefault();

		let tipo = e.target.tipoPostagem.value;
		let descricao = e.target.descricao.value;

		const response = await fetch(`${contextGlobalFetch}/post-changelog`, {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				user: userStateUsername,
				data: dataCompleta,
				tipo: tipo,
				descricao: descricao,
			}),
		});

		if (response.ok) {
			const jsonres = await response.json();
			const { message } = jsonres;

			chamaToast(message);
			setchangelogPopupState(false);

			carregaChangelog();
		}
	};

	const atualizaIdChangelog = async (dados) => {
		//e.preventDefault();
		//let tipo = e.target.tipoPostagem.value;
		//let descricao = e.target.descricao.value;
		//let id = e.target.id.value;

		//console.log(idEditar);
		//console.log(dados);

		const response = await fetch(`${contextGlobalFetch}/changelog-atualizar`, {
			method: 'POST',
			credentials: 'include',
			mode: 'cors',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ ...dados, id: idEditar }),
		});
		if (response.ok) {
			const data = await response.json();
			chamaToast(data.message);
			carregaChangelog();
			setchangelogEditPopupState(false);
		}
	};

	const carregarIdChangelog = async (id) => {
		const response = await fetch(
			`${contextGlobalFetch}/changelog-editar/${id}`
		);

		if (response.ok) {
			setchangelogEditDados('');
			const data = await response.json();
			setchangelogEditDados(data[0]);
		}
	};

	const deletarChangelog = async (e) => {
		const response = await fetch(`${contextGlobalFetch}/changelog-remover`, {
			method: 'POST',
			credentials: 'include',
			mode: 'cors',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				id: e.target.dataset.id,
			}),
		});

		if (response.ok) {
			const data = await response.json();
			chamaToast(data.message);
			carregaChangelog();
			setchangelogEditPopupState(false);
		}
	};

	const carregaChangelog = async (ordem) => {
		setloading(true);

		fetch(`${contextGlobalFetch}/lista-changelog-datas-asc`)
			.then((response) => {
				if (response.status === 200) {
					return response.json();
				} else {
					throw new Error('Something went wrong on api server!');
				}
			})
			.then((data) => {
				setlistaChangelog(_.groupBy(data, 'dataGroup'));
				setloading(false);
			})
			.catch((error) => {
				console.error(error);
			});
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

	const deletarColeta = async (id) => {
		const response = await fetch(`${contextGlobalFetch}/deletar-produto/${id}`);

		if (response.ok) {
			const { message } = await response.json();
			chamaToast(message);
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

	const changelogEditPopup = (e) => {
		setchangelogEditPopupState(!changelogEditPopupState);
		//carregarIdChangelog(id);
		setidEditar(e.currentTarget.dataset.edit);
		if (!changelogEditPopupState) {
			carregarIdChangelog(e.currentTarget.dataset.edit);
		}
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
		let grupoDatas = _.groupBy(lista, 'coletaFormatada');

		setlistaProdutos(grupoDatas);
		let qnt = 0;
		let countDatas = _.countBy(lista, 'coletaFormatada');
		Object.entries(countDatas).map((item) => (qnt += item[1]));

		setqntidadeItens(qnt);
	};

	const clearItens = () => {
		setlistaProdutos([]);
		setqntidadeItens(0);
	};

	// const configurarBusca = (valores) => {
	// 	setconfiguracaoBusca(valores);
	// };

	// const groupBy = (array) => {
	// 	let datas = [];
	// 	let produtosPorData = [];
	// 	let qnt = 0;

	// 	if (array.length) {
	// 		array.map((e, ind) => {
	// 			return (datas[ind] = e.coletaFormatada);
	// 		});
	// 	}

	// 	let unique = datas.filter(function (elem, index, self) {
	// 		return index === self.indexOf(elem);
	// 	});

	// 	unique.filter((i1) => {
	// 		produtosPorData[i1] = array.filter((i) => {
	// 			if (i.coletaFormatada === i1) {
	// 				qnt += 1;
	// 				return i.coletaFormatada === i1;
	// 			}
	// 		});
	// 	});

	// 	setqntidadeItens(qnt);

	// 	return produtosPorData;
	// };

	// useEffect(() => {
	// 	//verifyAuth(); //DESATIVADO MUITAS REQUISICOES AO ENTRAR NAS PAGINAS
	// }, []);

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
				deletarColeta,
				//configurarBusca,
				setconfiguracaoBusca,
				configuracaoBusca,
				buscaFiltrada,
				busca,
				carregarTipodeProdutos,
				formatarMoeda,
				listaTipoprodutos,
				loading,
				setloading,
				carregaChangelog,
				listaChangelog,
				changelogList,
				setChangelogList,
				contextGlobalFetch,
				changelogPopup,
				changelogPopupState,
				setchangelogPopupState,
				atualizaIdChangelog,
				dataCompleta,
				dataBarra,
				dataBarraBr,
				dataMesAnoBarra,
				dataCompletaEscape,
				userStateUsername,
				postChangelog,
				carregarIdChangelog,
				idEditar,
				changelogEditDados,
				changelogEditPopup,
				changelogEditPopupState,
				deletarChangelog,
			}}>
			{children}
		</FormDadosContext.Provider>
	);
};

//export default FormDadosProvider;

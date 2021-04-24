import React, { useState, useEffect, useRef, useContext } from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';
import ListaProdutos from './Lista_produtos';
import Icon from '@mdi/react';
import { mdiTextSearch } from '@mdi/js';
import Toast from './Context/Toast/Toast';

import { ToastContext } from './Context/Toast/ToastProvider';
import { FormDadosContext } from './Context/FormDadosContext/FormDadosProvider';

export default function Consulta_produtos() {
	const refOrdemList = useRef();

	const {
		definirListaProdutos,
		clearItens,
		configurarBusca,
		configuracaoBusca
	} = useContext(FormDadosContext);
	const { clearToastMessages } = useContext(ToastContext);

	const [listaTipoProduto, setlistaTipoProduto] = useState([]);

	// const [listagemAtiva, setListagemAtiva] = useState(false);
	// const [configBusca, setConfigBusca] = useState([]);
	const [Loading, setLoading] = useState(true);
	const [LoadingProds, setLoadingProds] = useState(false);
	const [tipoProdutoState, settipoProdutoState] = useState();

	const listagemTipoProduto = async _ => {
		setLoading(true);

		const response = await fetch(
			'http://192.168.2.103:5000/lista-tipo-produto'
		);

		if (response.ok) {
			const jsonRes = await response.json();
			setLoading(false);
			setlistaTipoProduto(jsonRes);
		}
	};

	const listagemProdutoOrdem = (tipoProduto, ordem) => {
		setLoadingProds(true);
		//setListagemAtiva(false);

		fetch(`http://192.168.2.103:5000/produtos-listagem/${tipoProduto}/${ordem}`)
			.then(response => response.json())
			.then(data => {
				//setListaProdutosAtual(data);
				definirListaProdutos(data);
				setLoadingProds(false);
				//setFiltro(false);
				listagemTipoProduto();

				// if (data.length) {
				// 	setListagemAtiva(true);
				// } else {
				// 	setListagemAtiva(false);
				// }
			});
	};

	const listagemBusca = async (tipoProduto, ordem, busca) => {
		setLoadingProds(true);
		//setListagemAtiva(false);
		const response = await fetch(
			`http://192.168.2.103:5000/filtro-produto/${tipoProduto}/${ordem}/${busca}`
		);

		if (response.ok) {
			const jsonRes = await response.json();
			//setListaProdutosAtual(jsonRes);
			definirListaProdutos(jsonRes);
			setLoadingProds(false);
			listagemTipoProduto();
		}
	};

	const getSelectOnChange = e => {
		e.preventDefault();

		clearToastMessages();

		let selectTipoProduto = e.target.tipoProduto.value;
		let selectOrdem = e.target.ordem_lista.value;
		let textoBusca = e.target.buscaMarca.value;

		//CONFIG NOVO
		configurarBusca({
			tipoProduto: selectTipoProduto,
			ordem: selectOrdem,
			busca: textoBusca
		});

		// setConfigBusca({
		// 	tipoProduto: selectTipoProduto,
		// 	ordem: selectOrdem
		// });

		textoBusca
			? listagemBusca(selectTipoProduto, selectOrdem, textoBusca)
			: listagemProdutoOrdem(selectTipoProduto, selectOrdem);
	};

	const handlerText = e => {
		//setConfigBusca({ ...configBusca, textinput: e.target.value });
		//NOVA VARIAVEL
		configurarBusca({ ...configuracaoBusca, busca: e.target.value });
		console.log(configuracaoBusca);
	};

	const atualizar = e => {
		console.log(configuracaoBusca);

		if (configuracaoBusca.busca) {
			listagemBusca(
				configuracaoBusca.tipoProduto,
				configuracaoBusca.ordem,
				configuracaoBusca.busca
			);
		} else {
			listagemProdutoOrdem(
				configuracaoBusca.tipoProduto,
				configuracaoBusca.ordem
			);
		}
		// if (configBusca.filtroInput) {
		// 	//console.log('FILTRO listagemBusca');
		// 	listagemBusca(
		// 		configBusca.tipoProduto,
		// 		configBusca.ordem,
		// 		configBusca.filtroInput
		// 	);
		// 	//console.log(configBusca);
		// } else {
		// 	//console.log(configBusca);
		// 	//console.log('FILTRO listagemProdutoOrdem');
		// 	listagemProdutoOrdem(configBusca.tipoProduto, configBusca.ordem);
		// }
	};

	const setTipoProduto = e => {
		settipoProdutoState(e.target.value);
		configurarBusca({ ...configuracaoBusca, tipoProduto: e.target.value });
		// setConfigBusca({
		// 	...configBusca,
		// 	tipoProduto: e.target.value
		// });
	};

	useEffect(() => {
		clearItens();
		listagemTipoProduto();
	}, []);

	return Loading ? (
		<div className='tabelas-centralizar'>
			<ScaleLoader
				color='silver'
				width='3px'
				margin='2px'
				radius='2px'
				height='20px'
			/>
		</div>
	) : (
		<div className='tabelas-select'>
			<h1>Consulta de Produto</h1>
			{listaTipoProduto.length ? (
				<form className='tabelas-select-form' onSubmit={getSelectOnChange}>
					<div className='tabelas-select-tabelas-filtro'>
						<select
							name='tipoProduto'
							className='tabela-select'
							onChange={setTipoProduto}
							defaultValue={tipoProdutoState}>
							{listaTipoProduto.map((item, index) => (
								<option key={index}>{item.tipoProduto}</option>
							))}
						</select>
						<select
							ref={refOrdemList}
							name='ordem_lista'
							className='ordem_lista'>
							<option value='preco_desc'>Preço Maior</option>
							<option value='preco_asc'>Preço Menor</option>
							<option value='coleta_desc'>Coleta Recente</option>
							<option value='coleta_asc'>Coleta Antiga</option>
						</select>
						<button>
							<Icon
								path={mdiTextSearch}
								title='Filtrar'
								size={1}
								color='gray'
							/>
						</button>
					</div>

					<div className='filtro_produtos_marca'>
						<input
							type='text'
							name='buscaMarca'
							placeholder='Buscar marca...'
							defaultValue={configuracaoBusca.busca}
							onChange={handlerText}
						/>
					</div>
				</form>
			) : null}

			<ListaProdutos loading={LoadingProds} atualizar={atualizar} />

			<Toast />
		</div>
	);
}

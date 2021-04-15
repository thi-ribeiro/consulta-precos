import React, { useState, useEffect, useRef } from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';
import ListaProdutos from './Lista_produtos';
import Icon from '@mdi/react';
import { mdiTextSearch } from '@mdi/js';

import AutoComplete from './AutoComplete';

export default function Consulta_produtos() {
	const refTipoProduto = useRef();
	const refOrdemList = useRef();
	const refAc = useRef();

	const [lista, setLista] = useState([]);
	const [filtro, setFiltro] = useState(false);
	const [listaProdutosAtual, setListaProdutosAtual] = useState([]);
	const [listagemAtiva, setListagemAtiva] = useState(false);
	const [configBusca, setConfigBusca] = useState([0]);
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
			setLista(jsonRes);
		}
	};

	const listagemProdutoOrdem = (
		tipoProduto = refTipoProduto.current.value,
		ordem = refOrdemList.current.value
	) => {
		setLoadingProds(true);
		setListagemAtiva(false);

		fetch(`http://192.168.2.103:5000/produtos-listagem/${tipoProduto}/${ordem}`)
			.then(response => response.json())
			.then(data => {
				setListaProdutosAtual(data);
				setLoadingProds(false);
				setFiltro(false);
				listagemTipoProduto();

				if (data.length) {
					setListagemAtiva(true);
				} else {
					setListagemAtiva(false);
				}
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
			setListaProdutosAtual(jsonRes);
			setLoadingProds(false);
			listagemTipoProduto();
		}
	};

	// const filtroProdutos = e => {
	// 	setFiltro(e.target.value);
	// 	console.log(e);
	// };

	const getSelectOnChange = e => {
		e.preventDefault();

		let selectTipoProduto = e.target.tipoProduto.value;
		let selectOrdem = e.target.ordem_lista.value;

		setConfigBusca({
			tipoProduto: refTipoProduto.current.value,
			ordem: selectOrdem
		});

		//console.log(e.target.ac_marca.value);

		console.log(refAc);

		if (filtro && e.target.ac_marca.value) {
			let filtroInput = e.target.ac_marca.value;
			setConfigBusca({ ...configBusca, filtroInput: e.target.ac_marca.value });
			listagemBusca(selectTipoProduto, selectOrdem, filtroInput);
		} else {
			setFiltro(true); //ATENCAO, SEMPRE AO SETAR UM STATE ANTES DO FETCH!!!!
			setConfigBusca({ ...configBusca, filtroInput: '' });
			listagemProdutoOrdem(selectTipoProduto, selectOrdem);
		}
	};

	const atualizar = e => {
		if (configBusca.filtroInput) {
			//console.log('FILTRO listagemBusca');
			listagemBusca(
				configBusca.tipoProduto,
				configBusca.ordem,
				configBusca.filtroInput
			);
			//console.log(configBusca);
		} else {
			//console.log(configBusca);
			//console.log('FILTRO listagemProdutoOrdem');
			listagemProdutoOrdem(configBusca.tipoProduto, configBusca.ordem);
		}
	};

	const setTipoProduto = e => {
		settipoProdutoState(e.target.value);
		setConfigBusca({
			...configBusca,
			tipoProduto: e.target.value
		});
	};

	useEffect(() => {
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
			{lista.length ? (
				<form className='tabelas-select-form' onSubmit={getSelectOnChange}>
					<div className='tabelas-select-tabelas-filtro'>
						<select
							name='tipoProduto'
							className='tabela-select'
							onChange={setTipoProduto}
							ref={refTipoProduto}>
							{lista.map((item, index) => (
								<option
									{...(item.tipoProduto === tipoProdutoState
										? { selected: 'selected' }
										: null)}
									key={index}>
									{item.tipoProduto}
								</option>
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

					{listagemAtiva ? (
						<div className='filtro_produtos_marca'>
							<AutoComplete
								colunaBusca='marca'
								placeholder='Buscar por marca...'
								tipoProduto={configBusca.tipoProduto}
								req={false}
								referencia={refAc}
							/>
						</div>
					) : null}
				</form>
			) : null}

			<ListaProdutos
				lista={listaProdutosAtual}
				loading={LoadingProds}
				atualizar={atualizar}
			/>
		</div>
	);
}

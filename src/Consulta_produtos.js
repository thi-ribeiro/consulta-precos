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
		configuracaoBusca,
		buscaFiltrada,
		busca,
		carregarTipodeProdutos,
		listaTipoprodutos,
		loading
	} = useContext(FormDadosContext);
	const { clearToastMessages } = useContext(ToastContext);

	//const [listaTipoProduto, setlistaTipoProduto] = useState([]);
	// const [listagemAtiva, setListagemAtiva] = useState(false);
	// const [configBusca, setConfigBusca] = useState([]);
	//const [LoadingProds, setLoadingProds] = useState(false);
	const [tipoProdutoState, settipoProdutoState] = useState();
	const [ordemState, setordemState] = useState();

	const organizacao = [
		{ ordem: 'preco_desc', desc: 'Preço Maior' },
		{ ordem: 'preco_asc', desc: 'Preço Menor' },
		{ ordem: 'coleta_desc', desc: 'Coleta Recente' },
		{ ordem: 'coleta_asc', desc: 'Coleta Antiga' }
	];

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

		textoBusca
			? buscaFiltrada(selectTipoProduto, selectOrdem, textoBusca)
			: busca(selectTipoProduto, selectOrdem);
	};

	const handlerText = e => {
		configurarBusca({ ...configuracaoBusca, busca: e.target.value });
		console.log(configuracaoBusca);
	};

	const atualizar = e => {
		//console.log(configuracaoBusca);

		if (configuracaoBusca.busca) {
			buscaFiltrada(
				configuracaoBusca.tipoProduto,
				configuracaoBusca.ordem,
				configuracaoBusca.busca
			);
		} else {
			busca(configuracaoBusca.tipoProduto, configuracaoBusca.ordem);
		}
	};

	const ordemSelecionada = e => {
		setordemState(e.target.value);
	};

	const setTipoProduto = e => {
		settipoProdutoState(e.target.value);
		configurarBusca({ ...configuracaoBusca, tipoProduto: e.target.value });
	};

	useEffect(() => {
		clearItens();
		carregarTipodeProdutos(); //FROM PROVIDER

		//console.log(listaTipoprodutos);
	}, []);

	return loading ? (
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
			{listaTipoprodutos.length ? (
				<form className='tabelas-select-form' onSubmit={getSelectOnChange}>
					<div className='tabelas-select-tabelas-filtro'>
						<select
							name='tipoProduto'
							className='tabela-select'
							onChange={setTipoProduto}
							defaultValue={tipoProdutoState}>
							{listaTipoprodutos.map((item, index) => (
								<option key={index}>{item.tipoProduto}</option>
							))}
						</select>
						<select
							ref={refOrdemList}
							name='ordem_lista'
							className='ordem_lista'
							onChange={ordemSelecionada}
							defaultValue={ordemState}>
							{organizacao.map((i, index) => {
								return (
									<option key={index} value={i.ordem}>
										{i.desc}
									</option>
								);
							})}
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
							autoComplete='off'
							onChange={handlerText}
						/>
					</div>
				</form>
			) : null}

			<ListaProdutos loading={loading} atualizar={atualizar} />

			<Toast />
		</div>
	);
}

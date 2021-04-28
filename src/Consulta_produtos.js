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
	const refTipoProd = useRef();
	const refTextoBusca = useRef();

	const {
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

	const organizacao = [
		{ ordem: 'preco_desc', desc: 'Preço Maior' },
		{ ordem: 'preco_asc', desc: 'Preço Menor' },
		{ ordem: 'coleta_desc', desc: 'Coleta Recente' },
		{ ordem: 'coleta_asc', desc: 'Coleta Antiga' }
	];

	const Busca = e => {
		e.preventDefault();

		clearToastMessages();

		let selectTipoProduto = refTipoProd.current.value;
		let selectOrdem = refOrdemList.current.value;
		let textoBusca = refTextoBusca.current.value;

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

	useEffect(() => {
		clearItens();
		clearToastMessages();
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
				<form className='tabelas-select-form' onSubmit={Busca}>
					<div className='tabelas-select-tabelas-filtro'>
						<select
							ref={refTipoProd}
							name='tipoProduto'
							className='tabela-select'
							defaultValue={configuracaoBusca.tipoProduto}>
							{listaTipoprodutos.map((item, index) => (
								<option key={index}>{item.tipoProduto}</option>
							))}
						</select>
						<select
							ref={refOrdemList}
							name='ordemLista'
							className='ordem_lista'
							defaultValue={configuracaoBusca.ordem}>
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
							ref={refTextoBusca}
							type='text'
							name='buscaMarca'
							placeholder='Buscar marca...'
							defaultValue={configuracaoBusca.busca}
							autoComplete='off'
						/>
					</div>
				</form>
			) : null}

			<ListaProdutos loading={loading} atualizar={atualizar} />

			<Toast />
		</div>
	);
}

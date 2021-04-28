import React, { useState, useContext, useEffect } from 'react';

import Icon from '@mdi/react';
import { mdiFileDocumentEditOutline, mdiTextBoxRemoveOutline } from '@mdi/js';

import { FormDadosContext } from './Context/FormDadosContext/FormDadosProvider';
import { ToastContext } from './Context/Toast/ToastProvider';

export default function Lista_produtos_itens({ dataFiltrada }) {
	const {
		editarItemArray,
		listaProdutos,
		busca,
		buscaFiltrada,
		configuracaoBusca
	} = useContext(FormDadosContext);
	const { chamaToast } = useContext(ToastContext);
	const [listaItens, setlistaItens] = useState(listaProdutos);

	const formatarMoeda = (num, replace, replaceTo, trim = false) => {
		let formatter = new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL'
		});

		let result = formatter.format(num).replace(replace, replaceTo);

		return trim ? result.trim() : result;
	};

	const deletarItemColeta = async e => {
		let id = parseInt(e.currentTarget.dataset.id);

		//chamaToast('FAZ DE CONTA Q APAGOU!');

		Object.keys(listaItens).map(datas => {
			listaItens[datas].map((itm, index) => {
				if (itm.id === id) {
					listaItens[datas].splice(index, 1);
				}
			});
		});

		Object.keys(listaItens).map(datas => {
			if (!listaItens[datas].length) {
				delete listaItens[datas];
			}
		});

		const response = await fetch(
			`http://192.168.2.103:5000/deletar-produto/${id}`
		);

		if (response.ok) {
			const resJson = await response.json();
			chamaToast(`${resJson.response}`);
		}

		//console.log(listaItens);
	};

	const editarItemColeta = e => {
		//let itens = listaItens;
		let target = parseInt(e.currentTarget.dataset.id);
		let tar = [];

		Object.keys(listaItens).map(datas => {
			listaItens[datas].map(item => {
				if (item.id === target) {
					//console.log(item);
					tar = item;
				}
			});
		});

		//console.log(tar);

		editarItemArray(tar);
	};

	const atualizaListaRemocao = item => {
		//let filtrado = listaItens.filter(i => i.id !== item);
		//console.log('DELETANDO: ' + item);
		//let arrayAtual = listaProdutos;
		//let qntInArray = 0;
		//console.log(arrayAtual);
		// Object.keys(listaItens).map(datas => {
		// 	if (!listaItens[datas].length) {
		// 		return delete listaItens[datas];
		// 	} else {
		// 		listaItens[datas].map((itm, index) => {
		// 			//qntInArray += arrayAtual[datas].length;
		// 			//console.log(arrayAtual[datas].length);
		// 			if (itm.id === item) {
		// 				listaItens[datas].splice(index, 1);
		// 			}
		// 		});
		// 	}
		// });
		// console.log(listaItens);
		//rota();
		//console.log(qntInArray);
		//console.log(arrayAtual);
	};

	const rota = e => {
		configuracaoBusca.textoBusca
			? buscaFiltrada(
					configuracaoBusca.tipoProduto,
					configuracaoBusca.ordem,
					configuracaoBusca.busca
			  )
			: busca(configuracaoBusca.tipoProduto, configuracaoBusca.ordem);
	};

	return Object.keys(listaItens).map((data, index) => (
		<div key={index}>
			<div>
				<div className='hl_data'>
					<span className='dataSpan'>Coleta {data}</span>
				</div>
			</div>
			{listaItens[data].map((item, index2) => (
				<div key={index2} className='produto-card'>
					<div className='grid-container'>
						<div className='Detalhes'>
							<div className='detalhes-marca-preco'>
								<div className='marca-item'>
									<div className='tipodeProduto'>
										<div className='marcadoresDetalhes'>Tipo de produto</div>
										{item.tipoProduto}
									</div>
									<div className='marca'>
										<div className='marcadoresDetalhes'>Marca</div>
										{item.marca}
									</div>
								</div>
								<div className='preco-item'>
									{formatarMoeda(item.preco, '.', ',')}
								</div>
							</div>
						</div>
						<div className='Data'>
							<div className='detalhes-empresa'>{item.empresa}</div>
							<div className='detalhes-data'>{item.coletaFormatada}</div>
						</div>
						<div className='Funcoes'>
							<button data-id={item.id} onClick={editarItemColeta}>
								EDT
								<Icon
									path={mdiFileDocumentEditOutline}
									title='editarItem'
									size={1}
									color='rgba(0, 0, 0, 0.5)'
								/>
							</button>
							<button data-id={item.id} onClick={deletarItemColeta}>
								DEL
								<Icon
									path={mdiTextBoxRemoveOutline}
									title='deletarItem'
									size={1}
									color='rgba(0, 0, 0, 0.5)'
								/>
							</button>
						</div>
					</div>
				</div>
			))}
		</div>
	));
}

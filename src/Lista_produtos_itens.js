import React, { useState, useContext } from 'react';

import Icon from '@mdi/react';
import { mdiFileDocumentEditOutline, mdiTextBoxRemoveOutline } from '@mdi/js';

import { FormDadosContext } from './Context/FormDadosContext/FormDadosProvider';
import { ToastContext } from './Context/Toast/ToastProvider';

export default function Lista_produtos_itens() {
	const {
		editarItemArray,
		listaProdutos,
		setqntidadeItens,
		qntidadeItens,
		formatarMoeda,
		deletarColeta,
	} = useContext(FormDadosContext);

	const [listaItens, setlistaItens] = useState(listaProdutos);

	const deletarItemColeta = async (e) => {
		let id = parseInt(e.currentTarget.dataset.id);
		let qnt = qntidadeItens;

		Object.keys(listaItens).map((datas) => {
			listaItens[datas].map((itm, index) => {
				if (itm.id === id) {
					listaItens[datas].splice(index, 1);
				}
			});
		});

		Object.keys(listaItens).map((datas) => {
			if (!listaItens[datas].length) {
				delete listaItens[datas];
			}
			//qnt = qnt >= 1 ? qnt - 1 : 0;
		});

		qnt -= 1;
		setqntidadeItens(qnt);
		deletarColeta(id);
	};

	const editarItemColeta = (e) => {
		//let itens = listaItens;
		let target = parseInt(e.currentTarget.dataset.id);
		let tar = [];

		Object.keys(listaProdutos).map((datas) => {
			listaProdutos[datas].map((item) => {
				if (item.id === target) {
					//console.log(item);
					tar = item;
				}
			});
		});

		//console.log(tar);

		editarItemArray(tar);
	};

	return Object.keys(listaProdutos).map((data, index) => (
		<div key={index}>
			<div className='hl_data'>
				<span className='dataSpan'>Coleta {data}</span>
			</div>

			{listaProdutos[data].map((item, index2) => (
				<div key={index2} className='produto-card'>
					<div
						className='imgProduto'
						style={{
							backgroundImage: `url('${process.env.PUBLIC_URL}/img/${item.imagem}')`,
							backgroundSize: 'auto',
							backgroundPosition: 'center center',
						}}></div>
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
								<Icon
									path={mdiFileDocumentEditOutline}
									title='editarItem'
									size={1}
									color='rgba(0, 0, 0, 0.5)'
								/>
								&nbsp;EDT
							</button>
							<button data-id={item.id} onClick={deletarItemColeta}>
								<Icon
									path={mdiTextBoxRemoveOutline}
									title='deletarItem'
									size={1}
									color='rgba(0, 0, 0, 0.5)'
								/>
								&nbsp;DEL
							</button>
						</div>
					</div>
				</div>
			))}
		</div>
	));
}

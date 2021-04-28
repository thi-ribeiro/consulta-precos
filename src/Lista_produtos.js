import React, { useContext, useState, useEffect } from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';
import ListaItens from './Lista_produtos_itens';
import FormDadosColeta from './Form_dados_coleta';

import { FormDadosContext } from './Context/FormDadosContext/FormDadosProvider';

export default function Lista_produtos({ loading, atualizar }) {
	const { definirListaProdutos, listaProdutos, qntidadeItens } = useContext(
		FormDadosContext
	);

	const [state, setstate] = useState(listaProdutos);

	const groupBy = _ => {
		let datas = [];
		let produtosPorData = [];

		if (listaProdutos.length) {
			listaProdutos.map(e => {
				return datas.push(e.coletaFormatada);
			});
		}

		let unique = datas.filter(function(elem, index, self) {
			return index === self.indexOf(elem);
		});

		unique.filter(i1 => {
			return (produtosPorData[i1] = listaProdutos.filter(
				i => i.coletaFormatada === i1
			));
		});

		console.log(listaProdutos);
		definirListaProdutos([produtosPorData]);
		console.log(produtosPorData);
	};

	return loading ? (
		<div className='loading-centralizar'>
			<ScaleLoader
				color='gray'
				width='5px'
				margin='2px'
				radius='5px'
				height='20px'
			/>
		</div>
	) : (
		<div className='produtos-cards'>
			<div className='counterLista'>
				{listaProdutos ? (
					qntidadeItens + ' resultado(s)'
				) : (
					<div className='coleta-vazia'>
						Nenhum item adicionado ou para listar.
					</div>
				)}
			</div>
			<ListaItens />
			<FormDadosColeta atualizar={atualizar} />
		</div>
	);
}

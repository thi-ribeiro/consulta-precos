import React, { useState, useEffect, useContext } from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';
import ListaItens from './Lista_produtos_itens';
import FormDadosColeta from './Form_dados_coleta';

import { FormDadosContext } from './Context/FormDadosContext/FormDadosProvider';

export default function Lista_produtos({ loading, atualizar }) {
	const { listaProdutos, definirListaProdutos } = useContext(FormDadosContext);
	const [listaDatasFiltrada, setlistaDatasFiltrada] = useState([]);

	const groupByDatas = array => {
		let datas = [];

		if (array.length) {
			array.map(e => {
				datas.push(e.coletaFormatada);
			});
		}
		// if (array.length) {
		// 	array.forEach(e => {
		// 		novoArrayDatas.push(e.coletaFormatada);
		// 	});
		// }

		var unique = datas.filter(function(elem, index, self) {
			return index === self.indexOf(elem);
		});

		//setlistaDatasFiltrada(unique);

		let produtosPorData = [];

		unique.filter(i1 => {
			produtosPorData[i1] = listaProdutos.filter(i => i.coletaFormatada === i1);
			//mod2['detalhes'] = listaProdutos.map(i => i.coletaFormatada === i1);
		});
		console.log(produtosPorData);
		definirListaProdutos(produtosPorData);
		//console.log(unique);
		//console.log(array);
	};

	useEffect(() => {
		//groupByDatas(listaProdutos);
		//console.log(loading);
	}, []);

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
				{listaProdutos.length ? (
					listaProdutos.length + ' resultado(s)'
				) : (
					<div className='coleta-vazia'>
						Nenhum item adicionado ou para listar.
					</div>
				)}
			</div>
			{listaDatasFiltrada.map((data, indexColeta) => (
				<div key={indexColeta}>
					<div className='hl_data'>
						<span className='dataSpan'>Coleta {data}</span>
					</div>
					<ListaItens dataFiltrada={data} />
				</div>
			))}

			<FormDadosColeta atualizar={atualizar} />
		</div>
	);
}

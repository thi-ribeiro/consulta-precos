import React, { useState, useEffect, useContext } from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';
import ListaItens from './Lista_produtos_itens';
import { FormDadosContext } from './Context/FormDadosContext/FormDadosProvider';

export default function Lista_produtos({ loading }) {
	const { listaProdutos } = useContext(FormDadosContext);
	const [listaDatasFiltrada, setlistaDatasFiltrada] = useState([]);

	const groupByDatas = array => {
		let novoArrayDatas = [];

		if (array.length) {
			array.forEach(e => {
				novoArrayDatas.push(e.coletaFormatada);
			});
		}

		var unique = novoArrayDatas.filter(function(elem, index, self) {
			return index === self.indexOf(elem);
		});

		setlistaDatasFiltrada(unique);
		//console.log(unique);
	};

	useEffect(() => {
		groupByDatas(listaProdutos);
		//console.log(loading);
	}, [listaProdutos]);

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
			<React.Fragment>
				<div className='counterLista'>
					{listaProdutos.length ? (
						listaProdutos.length + ' resultado(s)'
					) : (
						<div className='coleta-vazia'>
							Nenhum item adicionado ou para listar.
						</div>
					)}
				</div>
				{listaDatasFiltrada.map((dataFiltrada, indexColeta) => (
					<div key={indexColeta}>
						<div className='hl_data'>
							<span className='dataSpan'>Coleta {dataFiltrada}</span>
						</div>
						<ListaItens dataFiltrada={dataFiltrada} />
					</div>
				))}
			</React.Fragment>
		</div>
	);
}

import React, { useState, useEffect } from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';
import ListaItens from './Lista_produtos_itens';

export default function Lista_produtos({ lista, loading, atualizarFetch }) {
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
		groupByDatas(lista);
		//console.log(loading);
	}, [lista]);

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
					{lista.length ? (
						lista.length + ' resultado(s)'
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
						<ListaItens
							lista={lista}
							dataFiltrada={dataFiltrada}
							atualizarFetch={atualizarFetch}
						/>
					</div>
				))}
			</React.Fragment>
		</div>
	);
}

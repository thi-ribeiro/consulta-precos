import React, { useContext } from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';
import ListaItens from './Lista_produtos_itens';
import FormDadosColeta from './Form_dados_coleta';

import { FormDadosContext } from './Context/FormDadosContext/FormDadosProvider';

export default function Lista_produtos({ loading, atualizar }) {
	const { qntidadeItens } = useContext(FormDadosContext);

	//console.log(qntidadeItens);

	//useEffect(() => {}, [qntidadeItens]);

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
				{qntidadeItens ? (
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

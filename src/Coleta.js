import React, { useState, useEffect } from 'react';
import IconeAdicionarColeta from './Icone_adicionar_coleta';
import ListaProdutos from './Lista_produtos';
import Icon from '@mdi/react';
import { mdiTextSearch } from '@mdi/js';

import FormDadosColeta from './Form_dados_coleta';

export default function Coleta() {
	const [formularioAtivo, setformularioAtivo] = useState(false);
	const [coletaDadosAtual, setcoletaDadosAtual] = useState([]);
	const [loading, setLoading] = useState(false);

	let data = new Date();

	const formatData = valor => {
		let valorStr = valor.toString();
		if (valorStr.length <= 1) {
			return 0 + valorStr;
		} else {
			return valorStr;
		}
	};

	let dia = formatData(data.getDate());
	let mes = formatData(data.getMonth() + 1);
	let ano = formatData(data.getFullYear());
	// let hora = formatData(data.getHours());
	// let minuto = formatData(data.getMinutes());
	// let sec = formatData(data.getSeconds());

	//let dataCompleta = `${ano}-${mes}-${dia} ${hora}:${minuto}:${sec}`;
	let dataCompletaEscape = `${dia}-${mes}-${ano}`;

	const alternaForm = _ => {
		setformularioAtivo(!formularioAtivo);

		if (formularioAtivo) {
			document.body.style.overflow = 'unset';
		} else {
			//fetchListaEmpresas();
			document.body.style.overflow = 'hidden';
		}
	};

	const listagemColeta = async _ => {
		setLoading(true);
		const response = await fetch(
			`http://192.168.2.103:5000/consulta-coleta-atual/${dataCompletaEscape}`
		);

		if (response.ok) {
			const jsonRes = await response.json();
			setcoletaDadosAtual(jsonRes);
			setLoading(false);
		}
	};

	const filtrarResultados = async e => {
		e.preventDefault();

		setLoading(true);
		let filtroTexto = e.target.filtroBusca.value || 'all'; //TEXTO DA BUSCA
		let filtroOpcoes = e.target.filtroBuscaOpcoes.value; //BUSCAR COLUNA
		let filtroOrdem = e.target.ordem_lista.value;

		//if (filtroTexto) {
		const response = await fetch(
			`http://192.168.2.103:5000/filtro-coleta-atual/${dataCompletaEscape}/${filtroOpcoes}/${filtroTexto}/${filtroOrdem}`
		);

		if (response.ok) {
			const jsonRes = await response.json();
			setcoletaDadosAtual(jsonRes);
			setLoading(false);
		}
		//}
	};

	const filtroBuscaValor = e => {
		if (!e.target.value) {
			listagemColeta();
		}
	};

	useEffect(() => {
		const listaColeta = async _ => {
			setLoading(true);
			const response = await fetch(
				`http://192.168.2.103:5000/consulta-coleta-atual/${dataCompletaEscape}`
			);

			if (response.ok) {
				const jsonRes = await response.json();
				setcoletaDadosAtual(jsonRes);
				setLoading(false);
			}
		};
		listaColeta();
	}, [dataCompletaEscape]);

	return (
		<div className='coleta-selecao'>
			<h1>Coleta de dados</h1>
			<form className='form-coleta' onSubmit={filtrarResultados}>
				<div className='lista-busca-filtrada'>
					<div className='form-coleta-filtros'>
						<div>
							<select name='filtroBuscaOpcoes'>
								<option value='tipoProduto'>Produto</option>
								<option value='marca'>Marca</option>
								<option value='empresa'>Empresa</option>
								<option value='preco'>Preço</option>
							</select>
						</div>
						<div>
							<select name='ordem_lista' className='ordem_lista'>
								<option value='preco_desc'>Preço Maior</option>
								<option value='preco_asc'>Preço Menor</option>
								<option value='coleta_desc'>Coleta Recente</option>
								<option value='coleta_asc'>Coleta Antiga</option>
							</select>
						</div>
					</div>
					<div className='form-coleta-acao-filtrar'>
						<div className='form-acao-text'>
							<input
								autoComplete='off'
								type='text'
								name='filtroBusca'
								placeholder='Digite para filtrar...'
								onChange={filtroBuscaValor}
							/>
						</div>
						<div>
							<button>
								<Icon
									path={mdiTextSearch}
									title='Filtrar'
									size={1}
									color='gray'
								/>
							</button>
						</div>
					</div>
				</div>
			</form>

			<ListaProdutos
				lista={coletaDadosAtual}
				loading={loading}
				atualizar={listagemColeta}
			/>

			<IconeAdicionarColeta adicionarForm={alternaForm} />

			<FormDadosColeta
				ativo={formularioAtivo}
				fecharForm={alternaForm}
				atualizarColeta={listagemColeta}
			/>

			<div className='avoid-overlaping'></div>
		</div>
	);
}
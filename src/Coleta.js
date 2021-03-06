import React, { useState, useEffect, useContext } from 'react';
import IconeAdicionarColeta from './Icone_adicionar_coleta';
import ListaProdutos from './Lista_produtos';
import Icon from '@mdi/react';
import { mdiTextSearch } from '@mdi/js';

//import Toast from './Context/Toast/Toast';
import { ToastContext } from './Context/Toast/ToastProvider';
import { FormDadosContext } from './Context/FormDadosContext/FormDadosProvider';

export default function Coleta() {
	const { clearToastMessages } = useContext(ToastContext);
	const {
		definirListaProdutos,
		setaStatusPopup,
		dataCompletaEscape,
		clearItens,
	} = useContext(FormDadosContext);

	const [loading, setLoading] = useState(false);

	// let data = new Date();

	// const formatData = (valor) => {
	// 	let valorStr = valor.toString();
	// 	if (valorStr.length <= 1) {
	// 		return 0 + valorStr;
	// 	} else {
	// 		return valorStr;
	// 	}
	// };

	// let dia = formatData(data.getDate());
	// let mes = formatData(data.getMonth() + 1);
	// let ano = formatData(data.getFullYear());

	// let dataCompletaEscape = `${dia}-${mes}-${ano}`;

	// const formEditar = (_) => {
	// 	clearToastMessages();
	// 	setaStatusPopup();
	// };

	const listagemColeta = async (_) => {
		console.log('cheguei aki dentro de coleta!');
		setLoading(true);
		const response = await fetch(
			`http://localhost:5000/consulta-coleta-atual/${dataCompletaEscape}`
		);

		if (response.ok) {
			const jsonRes = await response.json();
			definirListaProdutos(jsonRes);
			setLoading(false);
		}
	};

	const filtrarResultados = async (e) => {
		e.preventDefault();

		clearToastMessages();

		setLoading(true);
		let filtroTexto = e.target.filtroBusca.value || 'all'; //TEXTO DA BUSCA
		let filtroOpcoes = e.target.filtroBuscaOpcoes.value; //BUSCAR COLUNA
		let filtroOrdem = e.target.ordem_lista.value;

		//if (filtroTexto) {
		const response = await fetch(
			`http://localhost:5000/filtro-coleta-atual/${dataCompletaEscape}/${filtroOpcoes}/${filtroTexto}/${filtroOrdem}`
		);

		if (response.ok) {
			const jsonRes = await response.json();
			definirListaProdutos(jsonRes);
			setLoading(false);
		}
		//}
	};

	const filtroBuscaValor = (e) => {
		if (!e.target.value) {
			listagemColeta();
		}
	};

	const listaColeta = async (_) => {
		setLoading(true);
		const response = await fetch(
			`http://localhost:5000/consulta-coleta-atual/${dataCompletaEscape}`
		);

		if (response.ok) {
			const jsonRes = await response.json();

			if (jsonRes.message) {
				definirListaProdutos(0);
			} else {
				definirListaProdutos(jsonRes);
			}
			setLoading(false);
		}
	};

	useEffect(() => {
		clearToastMessages();
		listaColeta();
		clearItens();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className='coleta-selecao'>
			<div className='coleta-titulo'>
				<h1>Coleta de dados</h1>
				<h5>Dados da data atual {dataCompletaEscape}</h5>
			</div>

			<form className='form-coleta' onSubmit={filtrarResultados}>
				<div className='lista-busca-filtrada'>
					<div className='form-coleta-filtros'>
						<div>
							<select name='filtroBuscaOpcoes'>
								<option value='tipoProduto'>Produto</option>
								<option value='marca'>Marca</option>
								<option value='empresa'>Empresa</option>
								<option value='preco'>Pre??o</option>
							</select>
						</div>
						<div>
							<select name='ordem_lista' className='ordem_lista'>
								<option value='preco_desc'>Pre??o Maior</option>
								<option value='preco_asc'>Pre??o Menor</option>
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

			<ListaProdutos loading={loading} atualizar={listaColeta} />
			<IconeAdicionarColeta tipoForm='editColeta' />

			<div className='avoid-overlaping'></div>
		</div>
	);
}

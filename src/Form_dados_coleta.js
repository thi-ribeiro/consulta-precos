import React, { useContext } from 'react';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import AutoComplete from './AutoComplete';

import { ToastContext } from './Context/Toast/ToastProvider';
import { FormDadosContext } from './Context/FormDadosContext/FormDadosProvider';

export default function Form_dados_coleta({ atualizar }) {
	const { setaStatusPopup, popupStatus, editarChave } = useContext(
		FormDadosContext
	);
	const { chamaToast, clearToastMessages } = useContext(ToastContext);

	let data = new Date();

	const formatData = (valor) => {
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
	let hora = formatData(data.getHours());
	let minuto = formatData(data.getMinutes());
	let sec = formatData(data.getSeconds());

	let dataCompleta = `${ano}-${mes}-${dia} ${hora}:${minuto}:${sec}`;

	const formatarMoeda = (num, replace, replaceTo, trim = false) => {
		let retorno = null;

		if (num) {
			let formatter = new Intl.NumberFormat('pt-BR', {
				style: 'currency',
				currency: 'BRL',
			});

			let result = formatter.format(num).replace(replace, replaceTo);

			retorno = trim ? result.trim() : result;
		}

		return retorno;
	};

	const postarDados = async (e) => {
		e.preventDefault();
		//clearToastMessages();
		//setpostarDadosController(true);

		let empresa = e.target.ac_empresa.value;
		let dataColeta = e.target.dataColeta.value;
		let marca = e.target.marca.value;
		let tipoProduto = e.target.ac_tipoProduto.value.toUpperCase();
		let preco = e.target.preco.value.replace(',', '.');

		//if (!postarDadosController) {
		if (editarChave.id) {
			let id = editarChave.id;

			let response = await fetch(`http://192.168.2.103:5000/atualizar-coleta`, {
				method: 'POST',
				body: JSON.stringify({
					id: id,
					empresa: empresa,
					dataColeta: dataColeta,
					marca: marca,
					tipoProduto: tipoProduto,
					preco: preco,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (response.ok) {
				let jsonRes = await response.json();
				chamaToast(jsonRes.response);
			}
		} else {
			let response = await fetch('http://192.168.2.103:5000/postar-coleta', {
				method: 'POST',
				body: JSON.stringify({
					empresa: empresa,
					dataColeta: dataColeta,
					marca: marca,
					tipoProduto: tipoProduto,
					preco: preco,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (response.ok) {
				let jsonRes = await response.json();
				chamaToast(jsonRes.response);
			}
		}

		setTimeout(() => {
			//setpostarDadosController(false);
			clearToastMessages();
			setaStatusPopup();
			atualizar();
		}, 2000);
		//}
	};

	const valorEdicao = (chave) => {
		//console.log(editarChave['id']);
		if (editarChave.id) {
			return editarChave[chave];
		}
	};

	return popupStatus ? (
		<form className='formulario-coleta-dados' onSubmit={postarDados}>
			<div className='background-adicionar-dados'>
				<div className='fechar-form-coleta' onClick={(e) => setaStatusPopup()}>
					<Icon path={mdiClose} title='Filtrar' size={1} color='#000' />
				</div>

				<div className='adicionar-dados-coleta'>
					<h1>
						{editarChave.length
							? 'Editar informações'
							: 'Adicionar informações'}
					</h1>

					<div className='coleta-empresa'>
						<span>Empresa</span>
						<AutoComplete
							valorEditar={valorEdicao('empresa')}
							colunaBusca='empresa'
						/>
						<span>Data coleta</span>
						<div className='dados-empresa-data'>
							<input
								{...(editarChave.length ? null : { disabled: 'disabled' })}
								type='text'
								name='dataColeta'
								defaultValue={dataCompleta}
							/>
						</div>
					</div>
					<div className='coleta-empresa'>
						<span>Tipo de produto</span>
						<AutoComplete
							valorEditar={valorEdicao('tipoProduto')}
							colunaBusca='tipoProduto'
						/>
						<div className='coleta-tipo-produto'></div>
						<span>Marca</span>
						<div className='produto-cadastrar'>
							<input
								required
								type='text'
								name='marca'
								defaultValue={valorEdicao('marca')}
								autoComplete='off'
							/>
						</div>
						<span>Preço</span>
						<div className='produto-cadastrar-preco'>
							<input
								required
								type='text'
								name='preco'
								defaultValue={formatarMoeda(
									valorEdicao('preco'),
									'R$',
									'',
									true
								)}
								placeholder='R$ 0,00'
								autoComplete='off'
							/>
						</div>
					</div>

					{editarChave.id ? (
						<button>Atualizar</button>
					) : (
						<button>Inserir</button>
					)}
				</div>
			</div>
		</form>
	) : null;
}

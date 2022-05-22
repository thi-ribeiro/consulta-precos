import React, { useContext, useState, useEffect } from 'react';
import Icon from '@mdi/react';
import {
	mdiClose,
	mdiFileDocumentEditOutline,
	mdiTextBoxPlusOutline,
} from '@mdi/js';
import AutoComplete from './AutoComplete';

import { ToastContext } from './Context/Toast/ToastProvider';
import { FormDadosContext } from './Context/FormDadosContext/FormDadosProvider';

export default function Form_dados_coleta({ atualizar }) {
	const {
		setaStatusPopup,
		popupStatus,
		editarChave,
		contextGlobalFetch,
		dataCompleta,
	} = useContext(FormDadosContext);
	const { chamaToast, clearToastMessages } = useContext(ToastContext);

	const [imagemUpload, setimagemUpload] = useState();

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

		console.log(e.target.imagem.files[0]);

		let dataFormx = new FormData();

		if (editarChave.id) {
			let id = editarChave.id;
			dataFormx.append('id', id);
		}

		dataFormx.append('imagem', e.target.imagem.files[0]);
		dataFormx.append('empresa', empresa);
		dataFormx.append('coleta', dataColeta);
		dataFormx.append('marca', marca);
		dataFormx.append('tipoProduto', tipoProduto);
		dataFormx.append('preco', preco);

		//if (!postarDadosController) {

		// if (editarChave.id) {
		// 	let id = editarChave.id;

		// 	dataFormx.append('id', id);

		let response = await fetch(`${contextGlobalFetch}/postar-coleta`, {
			method: 'POST',
			credentials: 'include',
			mode: 'no-cors',
			headers: { 'Content-Type': 'application/json' },
			body: dataFormx,
		});

		if (response.ok) {
			let { message } = await response.json();
			chamaToast(message);
		}
		// } else {
		// 	let response = await fetch(`${contextGlobalFetch}/postar-coleta`, {
		// 		method: 'POST',
		// 		credentials: 'include',
		// 		mode: 'no-cors',
		// 		headers: { 'Content-Type': 'application/json' },
		// 		body: dataFormx,
		// 	});

		// 	if (response.ok) {
		// 		let { message } = await response.json();
		// 		chamaToast(message);
		// 	}
		// }

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

	const setImage = (e) => {
		setimagemUpload(e.target.files[0]);
		console.log(e.target.files[0]);
	};

	useEffect(() => {
		setimagemUpload('');
	}, []);

	const clearEnd = () => {
		setimagemUpload();
		setaStatusPopup();
	};

	return popupStatus ? (
		<form
			className='formulario-coleta-dados'
			onSubmit={postarDados}
			encType='multipart/form-data'>
			<div className='background-adicionar-dados'>
				<div className='fechar-form-coleta' onClick={(e) => clearEnd(e)}>
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

						<div className='imageUpload'>
							{valorEdicao('imagem') ? (
								<div>
									<div className='tituloSubstituir'>Imagem do produto</div>
									<div className='olderImage'>
										{valorEdicao('imagem')}
										<div className='olderImageContainer'>
											<img
												src={`${process.env.PUBLIC_URL}/img/${valorEdicao(
													'imagem'
												)}`}
												alt='prodimg'
											/>
										</div>
									</div>
								</div>
							) : (
								''
							)}
							<label htmlFor='carregar_imagem'>
								{valorEdicao('imagem') ? 'Subistituir ' : 'Carregar nova '}
								Imagem
							</label>
							<input
								type='file'
								id='carregar_imagem'
								name='imagem'
								onChange={setImage}
							/>
							{imagemUpload ? (
								<div className='imagem_dados'>{imagemUpload.name}</div>
							) : (
								''
							)}
						</div>
					</div>

					{editarChave.id ? (
						<button>
							<Icon
								path={mdiFileDocumentEditOutline}
								title='Editar'
								size={1}
								color='#000'
							/>
							&nbsp; Atualizar
						</button>
					) : (
						<button>
							<Icon
								path={mdiTextBoxPlusOutline}
								title='Inserir'
								size={1}
								color='#000'
							/>
							&nbsp;Inserir
						</button>
					)}
				</div>
			</div>
		</form>
	) : null;
}

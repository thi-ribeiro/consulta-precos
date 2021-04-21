import React, { useState } from 'react';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import AutoComplete from './AutoComplete';
import Alert from './Context/Toast/Toast';

export default function Form_dados_coleta({
	ativo,
	fecharForm,
	editarItem,
	atualizarColeta
	//desativaEdicao
}) {
	const [resposta, setresposta] = useState();
	const [postarDadosController, setpostarDadosController] = useState(false);
	//const [anim, setanim] = useState(0);

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
	let hora = formatData(data.getHours());
	let minuto = formatData(data.getMinutes());
	let sec = formatData(data.getSeconds());

	let dataCompleta = `${ano}-${mes}-${dia} ${hora}:${minuto}:${sec}`;

	const formatarMoeda = (num, replace, replaceTo, trim = false) => {
		let formatter = new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL'
		});

		let result = formatter.format(num).replace(replace, replaceTo);

		return trim ? result.trim() : result;
	};

	const postarDados = async e => {
		e.preventDefault();

		setpostarDadosController(true);

		let empresa = e.target.ac_empresa.value;
		let dataColeta = e.target.dataColeta.value;
		let marca = e.target.marca.value;
		let tipoProduto = e.target.ac_tipoProduto.value.toUpperCase();
		let preco = e.target.preco.value.replace(',', '.');

		if (!postarDadosController) {
			if (editarItem) {
				let id = editarItem.id;

				let response = await fetch(
					`http://192.168.2.103:5000/atualizar-coleta`,
					{
						method: 'POST',
						body: JSON.stringify({
							id: id,
							empresa: empresa,
							dataColeta: dataColeta,
							marca: marca,
							tipoProduto: tipoProduto,
							preco: preco
						}),
						headers: {
							'Content-Type': 'application/json'
						}
					}
				);

				if (response.ok) {
					let jsonRes = await response.json();
					setresposta(jsonRes.response);
					//desativaEdicao();
				}
			} else {
				let response = await fetch('http://192.168.2.103:5000/postar-coleta', {
					method: 'POST',
					body: JSON.stringify({
						empresa: empresa,
						dataColeta: dataColeta,
						marca: marca,
						tipoProduto: tipoProduto,
						preco: preco
					}),
					headers: {
						'Content-Type': 'application/json'
					}
				});

				if (response.ok) {
					let jsonRes = await response.json();
					setresposta(jsonRes.response);
				}
			}

			setTimeout(() => {
				setpostarDadosController(false);
				setresposta();
				fecharForm();
				atualizarColeta();
			}, 2000);
		}
	};

	const valorEdicao = chave => {
		if (editarItem) {
			//console.log(props.editarItem);
			return editarItem[chave];
			//return null;
		} else {
			return null;
		}
	};

	return ativo ? (
		<form className='formulario-coleta-dados' onSubmit={postarDados}>
			<div className='background-adicionar-dados'>
				<div className='fechar-form-coleta' onClick={fecharForm}>
					<Icon path={mdiClose} title='Filtrar' size={1} color='#000' />
				</div>

				<div className='adicionar-dados-coleta'>
					<h1>{editarItem ? 'Editar informações' : 'Adicionar informações'}</h1>

					<div className='coleta-empresa'>
						<span>Empresa</span>
						<AutoComplete
							valorEditar={valorEdicao('empresa')}
							colunaBusca='empresa'
						/>
						<span>Data coleta</span>
						<div className='dados-empresa-data'>
							<input
								{...(editarItem ? null : { disabled: 'disabled' })}
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
								autoComplete='off'
							/>
						</div>
					</div>
					<Alert status={postarDadosController} texto={resposta} />
					{editarItem ? <button>Atualizar</button> : <button>Inserir</button>}
				</div>
			</div>
		</form>
	) : null;
}

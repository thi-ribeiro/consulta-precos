import React, { useContext, useState } from 'react';
import Icon from '@mdi/react';
import { mdiClose, mdiPlaylistEdit } from '@mdi/js';

import { ValidadesContext } from '../Context/ValidadesContext/ValidadesProvider';

export default function EditarValidade() {
	const {
		estadoPop,
		setestadoPop,
		dataBarraBr,
		editarDadosValidade,
		atualizarDadosEdit,
		//carregaDadosEditar,
	} = useContext(ValidadesContext);

	const [inputs, setinputs] = useState([]);

	const onChangeHandler = (e) => {
		setinputs({ ...inputs, [e.target.name]: e.target.value });
		console.log(inputs);
	};

	// useEffect(() => {
	// 	carregaDadosEditar(id);
	// }, []);

	let {
		codigoBarra,
		dataColetaValidade,
		finalizadoData,
		finalizadoPor,
		id,
		idProduto,
		lancadoSistema,
		lote,
		nomeProduto,
		quantidadeProdutos,
		validadeFinal,
	} = editarDadosValidade;

	return estadoPop ? (
		<div className='background-adicionar-dados'>
			<div className='fechar-form-coleta' onClick={() => setestadoPop(false)}>
				<Icon path={mdiClose} title='Filtrar' size={1} color='#000' />
			</div>

			<div className='formulario-validades'>
				<div className='formulario-header'>
					<h1>Editar validade</h1>
				</div>
				<form
					method='POST'
					onSubmit={atualizarDadosEdit}
					autoComplete='off'
					key={id}>
					<div className='formulario-validade-header'>
						<div className='formulario-validade-dados-texto'>
							<input
								type='text'
								placeholder='Produto'
								name='nomeProduto'
								//value={nomeProduto}
								defaultValue={nomeProduto}
								onChange={onChangeHandler}
								// ref={produtoNome}
							/>
							<input
								type='hidden'
								name='dataColetaValidade'
								defaultValue={dataBarraBr}
							/>

							<input type='hidden' name='id' defaultValue={id} />
						</div>
						<div className='formulario-validade-dados-numericos'>
							<input
								type='date'
								placeholder='Validade do produto'
								name='validadeFinal'
								//value={inputs.validadeFinal}
								defaultValue={validadeFinal}
								onChange={onChangeHandler}
								required
							/>
							<input
								type='number'
								placeholder='Código de barras'
								name='codigoBarra'
								//value={inputs.codigoBarra}
								defaultValue={codigoBarra}
								onChange={onChangeHandler}
							/>
							<input
								type='number'
								placeholder='Lote'
								name='lote'
								value={inputs.lote}
								defaultValue={lote}
							/>
							<input
								type='number'
								placeholder='Quantidade'
								name='quantidadeProdutos'
								//value={inputs.quantidadeProdutos}
								defaultValue={quantidadeProdutos}
							/>
						</div>
					</div>

					<button>
						<Icon
							path={mdiPlaylistEdit}
							title='Filtrar'
							size={1}
							color='#000'
						/>
						&nbsp; Atualizar
					</button>
				</form>
			</div>
		</div>
	) : null;
}

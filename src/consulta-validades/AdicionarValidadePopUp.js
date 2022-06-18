import React, { useContext, createRef } from 'react';
import { ValidadesContext } from '../Context/ValidadesContext/ValidadesProvider';
import Icon from '@mdi/react';
import { mdiClose, mdiTextBoxCheckOutline } from '@mdi/js';

export default function AdicionarValidade() {
	const {
		validadePopupState,
		setvalidadePopupState,
		dataBarraBr,
		dadosPostValidade,
	} = useContext(ValidadesContext);

	const {
		produtoNome,
		validadeFinal,
		codigoBarra,
		quantidadeProdutos,
		lote,
		dataColetaValidade,
	} = createRef();

	return validadePopupState ? (
		<div className='background-adicionar-dados'>
			<div
				className='fechar-form-coleta'
				onClick={() => {
					setvalidadePopupState(false);
				}}>
				<Icon path={mdiClose} title='Filtrar' size={1} color='#000' />
			</div>
			<div className='formulario-validades'>
				<div className='coleta-validades-titulo'>
					<h1>Adicionar validade</h1>
					<h5>Data de referência {dataBarraBr}</h5>
				</div>

				<form method='POST' onSubmit={dadosPostValidade} autoComplete='off'>
					<div className='formulario-validade-header'>
						<div className='formulario-validade-dados-texto'>
							<input
								type='text'
								placeholder='Produto'
								name='nomeProduto'
								ref={produtoNome}
							/>
							<input
								type='hidden'
								name='dataColetaValidade'
								value={dataBarraBr}
							/>
						</div>
						<div className='formulario-validade-dados-numericos'>
							<input
								type='date'
								placeholder='Validade do produto'
								name='validadeFinal'
								required
							/>
							<input
								type='number'
								placeholder='Código de barras'
								name='codigoBarra'
							/>
							<input type='number' placeholder='Lote' name='lote' />
							<input
								type='number'
								placeholder='Quantidade'
								name='quantidadeProdutos'
							/>
						</div>
					</div>

					<button>
						<Icon
							path={mdiTextBoxCheckOutline}
							title='Filtrar'
							size={1}
							color='#000'
						/>
						&nbsp; Enviar
					</button>
				</form>
			</div>
		</div>
	) : null;
}

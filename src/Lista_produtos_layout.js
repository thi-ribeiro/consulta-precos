import React, { useContext } from 'react';
import Icon from '@mdi/react';
import { mdiFileDocumentEditOutline, mdiTextBoxRemoveOutline } from '@mdi/js';

import { ToastContext } from './Context/Toast/ToastProvider';
import { FormDadosContext } from './Context/FormDadosContext/FormDadosProvider';

export default function Lista_produtos_layout({
	item,
	//editarPopup,
	atualizaLista
}) {
	const { setaStatusPopup, editarItemArray, listaProdutos } = useContext(
		FormDadosContext
	);
	const { chamaToast } = useContext(ToastContext);

	const formatarMoeda = (num, replace, replaceTo, trim = false) => {
		let formatter = new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL'
		});

		let result = formatter.format(num).replace(replace, replaceTo);

		return trim ? result.trim() : result;
	};

	const deletarItemColeta = async e => {
		let id = parseInt(e.currentTarget.dataset.id);

		const response = await fetch(
			`http://192.168.2.103:5000/deletar-produto/${id}`
		);

		if (response.ok) {
			const resJson = await response.json();
			chamaToast(`${resJson.response}`);
		}

		atualizaLista(id);
	};

	const editarItemColeta = e => {
		setaStatusPopup();

		editarItemArray(listaProdutos, e.currentTarget.dataset.id);
	};

	return (
		<React.Fragment>
			<div className='produto-card'>
				<div className='grid-container'>
					<div className='Detalhes'>
						<div className='detalhes-marca-preco'>
							<div className='marca-item'>
								<div className='tipodeProduto'>
									<div className='marcadoresDetalhes'>Tipo de produto</div>
									{item.tipoProduto}
								</div>
								<div className='marca'>
									<div className='marcadoresDetalhes'>Marca</div>
									{item.marca}
								</div>
							</div>
							<div className='preco-item'>
								{formatarMoeda(item.preco, '.', ',')}
							</div>
						</div>
					</div>
					<div className='Data'>
						<div className='detalhes-empresa'>{item.empresa}</div>
						<div className='detalhes-data'>{item.coletaFormatada}</div>
					</div>
					<div className='Funcoes'>
						<button data-id={item.id} onClick={editarItemColeta}>
							EDT
							<Icon
								path={mdiFileDocumentEditOutline}
								title='editarItem'
								size={1}
								color='rgba(0, 0, 0, 0.5)'
							/>
						</button>
						<button data-id={item.id} onClick={deletarItemColeta}>
							DEL
							<Icon
								path={mdiTextBoxRemoveOutline}
								title='deletarItem'
								size={1}
								color='rgba(0, 0, 0, 0.5)'
							/>
						</button>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

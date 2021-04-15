import React, { useState } from 'react';
import Icon from '@mdi/react';
import { mdiFileDocumentEditOutline, mdiTextBoxRemoveOutline } from '@mdi/js';
import Alerta from './Produto_removido_alerta';
import FormDadosColeta from './Form_dados_coleta';

export default function Lista_produtos_itens({
	lista,
	dataFiltrada,
	atualizar
}) {
	const [desativaEdicao, setdesativaEdicao] = useState(true);
	const [statusPopup, setstatusPopup] = useState(false);
	const [editarItem, seteditarItem] = useState();
	const [mensagemAlerta, setmensagemAlerta] = useState();

	const formatarMoeda = (num, replace, replaceTo, trim = false) => {
		let formatter = new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL'
		});

		let result = formatter.format(num).replace(replace, replaceTo);

		return trim ? result.trim() : result;
	};

	const carregaDadosEditarPopup = e => {
		setstatusPopup(!statusPopup);
		//console.log(currentTarget.dataset.id);

		if (e) {
			seteditarItem(e.currentTarget.dataset.id);

			let filtro = lista.filter(
				item => item.id === parseInt(e.currentTarget.dataset.id)
			);

			seteditarItem(filtro[0]);
		}

		statusPopup
			? (document.body.style.overflow = 'unset')
			: (document.body.style.overflow = 'hidden');
	};

	const deletarItemColeta = async e => {
		let id = e.currentTarget.dataset.id;

		seteditarItem(id);
		setdesativaEdicao(false);

		const response = await fetch(
			`http://192.168.2.103:5000/deletar-produto/${id}`
		);

		if (response.ok) {
			const resJson = await response.json();
			setmensagemAlerta(resJson.response);
		}

		//setmensagemAlerta("TESTE DELETE");

		setTimeout(() => {
			document.body.style.overflow = 'unset';
			setmensagemAlerta();
			setdesativaEdicao(true);
			atualizar(); //SEMPRE POR ULTIMO ATUALIZACAO PRA EVITAR ERRO DE ATUALIZACAO DE STATE!!!!!!!!
		}, 3000);
	};

	return (
		<React.Fragment>
			{lista.map((item, indexLista) =>
				item.coletaFormatada === dataFiltrada ? (
					<div key={indexLista} className='produto-card'>
						<React.Fragment>
							<div className='grid-container'>
								<div className='Detalhes'>
									<div className='detalhes-marca-preco'>
										<div className='marca-item'>
											<h3>{item.tipoProduto}</h3>
											<div className='marca'>{item.marca}</div>
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
									<button
										data-id={item.id}
										{...(desativaEdicao ? null : { disabled: 'disabled' })}
										onClick={carregaDadosEditarPopup}>
										<Icon
											path={mdiFileDocumentEditOutline}
											title='editarItem'
											size={1}
											color='rgba(0, 0, 0, 0.5)'
										/>
									</button>
									<button
										data-id={item.id}
										{...(desativaEdicao ? null : { disabled: 'disabled' })}
										onClick={deletarItemColeta}>
										<Icon
											path={mdiTextBoxRemoveOutline}
											title='deletarItem'
											size={1}
											color='rgba(0, 0, 0, 0.5)'
										/>
									</button>
								</div>
							</div>
							{parseInt(item.id) === parseInt(editarItem) ? (
								<Alerta mensagem={mensagemAlerta} />
							) : null}
						</React.Fragment>
					</div>
				) : null
			)}

			<FormDadosColeta
				ativo={statusPopup}
				fecharForm={carregaDadosEditarPopup}
				editarItem={editarItem}
				atualizarColeta={atualizar}
			/>
		</React.Fragment>
	);
}

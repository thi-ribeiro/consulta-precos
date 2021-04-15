import React from 'react';
import Icon from '@mdi/react';
import {
	mdiClose,
	mdiFileDocumentEditOutline,
	mdiTextBoxRemoveOutline
} from '@mdi/js';

export default function Sobreposicao_lista_pro({
	fecharSobreposicao,
	carregarDadosEditar,
	deletar, //DELETARCOLETA
	idItem
}) {
	return (
		<div className='options-produto'>
			<div className='options-produto-fechar' onClick={fecharSobreposicao}>
				<Icon path={mdiClose} title='fechar' size={1} color='#000' />
			</div>
			<div className='menu-editar-produto'>
				<div data-id={idItem} onClick={carregarDadosEditar}>
					<Icon
						path={mdiFileDocumentEditOutline}
						title='editarItem'
						size={2}
						color='rgba(0, 0, 0, 0.5)'
					/>
				</div>
				<div data-id={idItem} onClick={deletar}>
					<Icon
						path={mdiTextBoxRemoveOutline}
						title='deletarItem'
						size={2}
						color='rgba(0, 0, 0, 0.5)'
					/>
				</div>
			</div>
		</div>
	);
}

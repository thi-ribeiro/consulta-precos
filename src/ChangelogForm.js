import React, { useContext, useState } from 'react';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import { FormDadosContext } from './Context/FormDadosContext/FormDadosProvider';

export default function ChangelogForm({ visivel }) {
	const {
		changelogPopup,
		changelogPopupState,
		dataCompleta,
		userStateUsername,
	} = useContext(FormDadosContext);

	return changelogPopupState ? (
		<div className='background-adicionar-dados'>
			<div className='fechar-form-coleta' onClick={changelogPopup}>
				<Icon path={mdiClose} title='Filtrar' size={1} color='#000' />
			</div>
			<div className='formulario-changelog'>
				<h1>Adicionar Changelog</h1>
				<div>
					<input
						type='text'
						name='data'
						placeholder='Data'
						defaultValue={dataCompleta}
						disabled
					/>
				</div>
				<div>
					<input
						type='text'
						name='usuario'
						placeholder='Usuário'
						defaultValue={userStateUsername}
						disabled
					/>
				</div>
				<div>
					<select name='tipoPostagem'>
						<option>Inclusão</option>
						<option>Alteração</option>
						<option>Remoção</option>
					</select>
				</div>
				<div>
					<textarea
						name='descricao'
						placeholder='Descrição das alterações...'></textarea>
				</div>
			</div>
		</div>
	) : null;
}

import React, { useContext } from 'react';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import { FormDadosContext } from './Context/FormDadosContext/FormDadosProvider';

export default function ChangelogEdit() {
	const {
		changelogEditPopupState,

		dataCompleta,
		userStateUsername,
		idEditarChangelog,
		changelogEditDados,
		changelogEditPopup,
		carregaIdChangelog,
		carregarIdChangelog,
	} = useContext(FormDadosContext);

	let { comentario, tipo, data } = changelogEditDados;

	console.log(comentario);

	return changelogEditPopupState ? (
		<div className='background-adicionar-dados'>
			<div className='fechar-form-coleta' onClick={changelogEditPopup}>
				<Icon path={mdiClose} title='Filtrar' size={1} color='#000' />
			</div>
			<div className='formulario-changelog'>
				<h1>Editar Changelog</h1>
				<form method='POST' onSubmit={(e) => e.preventDefault()}>
					<div>
						<input
							type='hidden'
							name='data'
							placeholder='Data'
							defaultValue={data}
							disabled
						/>
					</div>
					<div>
						<input
							type='hidden'
							name='usuario'
							placeholder='Usuário'
							defaultValue={userStateUsername}
							disabled
						/>
					</div>
					<div className='formulario-header'>
						<div>{userStateUsername + ' - ' + data}</div>
						<div>
							<select name='tipoPostagem' value={tipo}>
								<option value='I'>Inclusão</option>
								<option value='A'>Alteração</option>
								<option value='R'>Remoção</option>
							</select>
						</div>
					</div>
					<div>
						<textarea
							name='descricao'
							placeholder='Descrição das alterações...'
							value={comentario}></textarea>
					</div>
					<input type='submit' value='Enviar' />
				</form>
			</div>
		</div>
	) : null;
}

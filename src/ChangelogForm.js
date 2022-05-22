import React, { useContext } from 'react';
import Icon from '@mdi/react';
import { mdiClose, mdiTextBoxCheckOutline } from '@mdi/js';
import { FormDadosContext } from './Context/FormDadosContext/FormDadosProvider';

export default function ChangelogForm() {
	const {
		changelogPopup,
		changelogPopupState,
		dataCompleta,
		userStateUsername,
		postChangelog,
	} = useContext(FormDadosContext);

	return changelogPopupState ? (
		<div className='background-adicionar-dados'>
			<div className='fechar-form-coleta' onClick={changelogPopup}>
				<Icon path={mdiClose} title='Filtrar' size={1} color='#000' />
			</div>
			<div className='formulario-changelog'>
				<h1>Adicionar Changelog</h1>
				<form method='POST' onSubmit={postChangelog}>
					<div>
						<input
							type='hidden'
							name='data'
							placeholder='Data'
							defaultValue={dataCompleta}
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
						<div>{`${userStateUsername} - ${dataCompleta}`}</div>
						<div>
							<select name='tipoPostagem'>
								<option value='I'>Inclusão</option>
								<option value='A'>Alteração</option>
								<option value='R'>Remoção</option>
							</select>
						</div>
					</div>
					<div>
						<textarea
							name='descricao'
							placeholder='Descrição das alterações...'></textarea>
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

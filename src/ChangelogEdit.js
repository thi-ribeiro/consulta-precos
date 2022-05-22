import React, { useContext, useState } from 'react';
import Icon from '@mdi/react';
import {
	mdiClose,
	mdiTextBoxRemoveOutline,
	mdiTextBoxCheckOutline,
} from '@mdi/js';
import { FormDadosContext } from './Context/FormDadosContext/FormDadosProvider';

export default function ChangelogEdit() {
	const {
		changelogEditPopupState,
		userStateUsername,
		changelogEditDados,
		changelogEditPopup,
		atualizaIdChangelog,
		deletarChangelog,
	} = useContext(FormDadosContext);

	let { comentario, tipo, data, id } = changelogEditDados;

	const [dadosForm, setdadosForm] = useState();

	const handlerOnChange = (e) => {
		setdadosForm({ ...dadosForm, [e.target.name]: e.target.value });
		//console.log(dadosForm);
	};

	return changelogEditPopupState ? (
		<div className='background-adicionar-dados'>
			<div className='fechar-form-coleta' onClick={changelogEditPopup}>
				<Icon path={mdiClose} title='Filtrar' size={1} color='#000' />
			</div>
			<div className='formulario-changelog'>
				<h1>{`Editar Changelog`}</h1>

				<input type='hidden' name='id' defaultValue={id} />
				<input type='hidden' name='data' defaultValue={data} />
				<input type='hidden' name='usuario' defaultValue={userStateUsername} />

				<div className='formulario-header'>
					<div className='formulario-header-dados-usuario'>
						<h4>{`Usuário ${userStateUsername}`}</h4>
						<h5>{`${data}`}</h5>
					</div>

					<div>
						<select
							key={id}
							name='tipo'
							onChange={handlerOnChange}
							defaultValue={tipo}>
							<option value='I'>Inclusão</option>
							<option value='A'>Alteração</option>
							<option value='R'>Remoção</option>
						</select>
					</div>
				</div>
				<div>
					<textarea
						name='comentario'
						placeholder='Descrição das alterações...'
						onChange={handlerOnChange}
						key={id}
						defaultValue={comentario}></textarea>
				</div>
				<div className='formulario-editar-buttons'>
					<button
						data-id={id}
						onClick={() => {
							atualizaIdChangelog(dadosForm);
						}}>
						<Icon
							path={mdiTextBoxCheckOutline}
							title='Filtrar'
							size={1}
							color='#000'
						/>
						&nbsp; Editar
					</button>
					<button data-id={id} onClick={deletarChangelog}>
						<Icon
							path={mdiTextBoxRemoveOutline}
							title='Filtrar'
							size={1}
							color='#000'
						/>
						&nbsp; Remover
					</button>
				</div>
			</div>
		</div>
	) : null;
}

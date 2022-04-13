import React, { useEffect, useContext, useState } from 'react';
import { FormDadosContext } from './Context/FormDadosContext/FormDadosProvider';
import Icon from '@mdi/react';
import {
	mdiLoading,
	mdiClipboardRemoveOutline,
	mdiClipboardEditOutline,
	mdiBookEditOutline,
} from '@mdi/js';
import ChangelogEdit from './ChangelogEdit';
import AddChanges from './Icone_adicionar_coleta';

import ChangelogForm from './ChangelogForm';

export default function Home() {
	const {
		loading,
		carregaChangelog,
		listaChangelog,
		changelogPopup,
		userState,
		changelogEditPopup,
		carregarIdChangelog,
	} = useContext(FormDadosContext);

	useEffect(() => {
		carregaChangelog();
	}, []);

	const changeColor = (tipo) => {
		switch (true) {
			case tipo === 'I':
				return 'list-green';

			case tipo === 'A':
				return 'list-yellow';

			case tipo === 'R':
				return 'list-red';

			default:
				break;
		}
	};

	return (
		<div className='container-changelog'>
			<h1>Changelog</h1>

			{Object.keys(listaChangelog).map((dataPostagem, index) => (
				<div className='container-changelog-item' key={index}>
					{loading ? (
						<Icon
							path={mdiLoading}
							spin={1}
							size={1}
							style={{ textAlign: 'center' }}
						/>
					) : (
						<div>
							<div className='container-changelog-item-header'>
								{dataPostagem}
							</div>
							<div className='container-changelog-item-conteudo'>
								<ul className='item-postagem' key={index}>
									{Object.keys(listaChangelog[dataPostagem]).map(
										(comment, ind) => (
											<li>
												<div
													className={changeColor(
														listaChangelog[dataPostagem][comment].tipo
													)}></div>
												<div className='item-changelog-comentario'>
													{listaChangelog[dataPostagem][comment].comentario}

													{userState ? (
														<div className='item-edit'>
															<button
																data-edit={
																	listaChangelog[dataPostagem][comment].id
																}
																onClick={changelogEditPopup}>
																<Icon path={mdiClipboardEditOutline} size={1} />
															</button>
															<Icon path={mdiClipboardRemoveOutline} size={1} />
														</div>
													) : null}
												</div>
											</li>
										)
									)}
								</ul>
							</div>
						</div>
					)}
				</div>
			))}
			<AddChanges adicionarForm={changelogPopup} visivel={userState} />
			<ChangelogForm />
			<ChangelogEdit />
		</div>
	);
}

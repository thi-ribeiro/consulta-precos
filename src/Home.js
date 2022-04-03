import React, { useEffect, useContext, useState } from 'react';
import { FormDadosContext } from './Context/FormDadosContext/FormDadosProvider';
import Icon from '@mdi/react';
import { mdiLoading, mdiAlphaRBox, mdiAlphaMBox } from '@mdi/js';
import AddChanges from './Icone_adicionar_coleta';

import _ from 'lodash';

import ChangelogForm from './ChangelogForm';

export default function Home(props) {
	const [listaChangelog, setlistaChangelog] = useState('');
	//const [loggedIn, setloggeIn] = useState(false);

	const {
		contextGlobalFetch,
		loading,
		setloading,
		changelogPopup,
		//changelogPopupState,
		userState
	} = useContext(FormDadosContext);

	useEffect(() => {
		setloading(true);

		//let userState = localStorage.getItem('_user')
		//	? JSON.parse(localStorage.getItem('_user')).auth
		//	: false;

		//setloggeIn(userState);

		fetch(`${contextGlobalFetch}/lista-changelog-datas-asc`)
			.then((response) => {
				if (response.status === 200) {
					return response.json();
				} else {
					throw new Error('Something went wrong on api server!');
				}
			})
			.then((data) => {
				setlistaChangelog(_.groupBy(data, 'dataGroup'));
				setloading(false);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [setloading]);

	const changeIcon = (tipo) => {
		switch (true) {
			case tipo === 'R':
				return mdiAlphaRBox;

			case tipo === 'M':
				return mdiAlphaMBox;

			default:
				break;
		}
	};

	const changeColor = (tipo) => {
		switch (true) {
			case tipo === 'P':
				return 'list-green';

			case tipo === 'M':
				return 'list-yellow';

			case tipo === 'R':
				return 'list-red';

			default:
				break;
		}
	};

	return (
		<div className='container-changelog'>
			Changelog <br />
			{'auth: ' + userState}
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
								{Object.keys(listaChangelog[dataPostagem]).map(
									(comment, ind) => (
										<ul className='item-postagem' key={ind}>
											<li
												className={changeColor(
													listaChangelog[dataPostagem][comment].tipo
												)}>
												{listaChangelog[dataPostagem][comment].comentario}
											</li>
										</ul>
									)
								)}
							</div>
						</div>
					)}
				</div>
			))}
			<AddChanges adicionarForm={changelogPopup} visivel={userState} />
			<ChangelogForm />
		</div>
	);
}

import React, { useEffect, useContext, useState } from 'react';
import { FormDadosContext } from './Context/FormDadosContext/FormDadosProvider';
import Icon from '@mdi/react';
import { mdiLoading, mdiAlphaRBox, mdiAlphaMBox } from '@mdi/js';
import AddChanges from './Icone_adicionar_coleta';

export default function Home(props) {
	const [listaChangelog, setlistaChangelog] = useState({});
	const { contextGlobalFetch, loading, setloading } =
		useContext(FormDadosContext);

	useEffect(() => {
		const carregaChangelog = async (ordem) => {
			setloading(true);
			const response = await fetch(`${contextGlobalFetch}/lista-changelog-asc`);
			if (response.ok) {
				const jsonRes = await response.json();
				setlistaChangelog(jsonRes);
				setloading(false);
			}
		};
		carregaChangelog();
	}, []);

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
			{Object.keys(listaChangelog).map((dataPostagem, index) => (
				<div className='container-changelog-item'>
					{loading ? (
						<Icon
							path={mdiLoading}
							spin={1}
							size={1}
							style={{ textAlign: 'center' }}
						/>
					) : (
						<>
							<div className='container-changelog-item-header'>
								{dataPostagem}
							</div>
							<div className='container-changelog-item-conteudo'>
								{Object.keys(listaChangelog[dataPostagem]).map(
									(comment, ind) => (
										<ul className='item-postagem'>
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
							<AddChanges />
						</>
					)}
				</div>
			))}
		</div>
	);
}

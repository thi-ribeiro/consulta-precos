import React, { useEffect, useContext, useState } from 'react';
import { FormDadosContext } from './Context/FormDadosContext/FormDadosProvider';

export default function Home(props) {
	const { carregaChangelog, changelogList } = useContext(FormDadosContext);
	useEffect(() => {
		carregaChangelog();
		//setchangelog(changelogList);
		//console.log(changelog);
	}, []);

	return (
		<div className='container-changelog'>
			Changelog
			{Object.keys(changelogList).map((dataPostagem, index) => (
				<div className='container-changelog-item'>
					<div className='container-changelog-item-header'>
						ICONE POSTAGEM {dataPostagem}
					</div>
					<div className='container-changelog-item-conteudo'>
						{Object.keys(changelogList[dataPostagem]).map((comment, ind) => (
							<div className='item-postagem'>
								{changelogList[dataPostagem][comment].comentario}
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
}

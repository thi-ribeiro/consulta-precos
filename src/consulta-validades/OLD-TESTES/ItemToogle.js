import React, { memo } from 'react';

import Icon from '@mdi/react';
import { mdiPlaylistEdit, mdiPlaylistCheck, mdiPlaylistMinus } from '@mdi/js';

function ItemToogle({
	id,
	nomeProduto,
	finalizadoData,
	finalizadoPor,
	dadosOnClick,
	estadoEdit,
	PopUpConfirma,
}) {
	return (
		<div
			className={
				parseInt(dadosOnClick) === parseInt(id)
					? `consulta-validades-produto-div-show animateShow`
					: `consulta-validades-produto-div-hidden`
			}>
			<div className='edicoes-show'>
				<div className='nome-edicao-produto'>{nomeProduto}</div>
				<div className='edicao-produto'>
					<button data-id={id} name='editar' onClick={() => estadoEdit(id)}>
						<Icon className='iconeMod' path={mdiPlaylistEdit} size={1} />
					</button>

					{!finalizadoData && (
						<button
							name='finalizar'
							onClick={() => PopUpConfirma(id, nomeProduto, 1)}
							data-id={id}>
							<Icon className='iconeMod' path={mdiPlaylistCheck} size={1} />
						</button>
					)}

					<button
						name='deletar'
						onClick={() => PopUpConfirma(id, nomeProduto, 2)}>
						<Icon className='iconeMod' path={mdiPlaylistMinus} size={1} />
					</button>
				</div>
			</div>

			{finalizadoData && (
				<div className='finalizado-por'>
					O produto foi finalizado dia {finalizadoData} por&nbsp;
					{finalizadoPor}.
				</div>
			)}
		</div>
	);
}

export default memo(ItemToogle);

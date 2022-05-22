import React from 'react';
import Icon from '@mdi/react';
import { mdiClipboardEditOutline } from '@mdi/js';

export default function EditChangelogPopup({ statusAuth, id, editClick }) {
	return statusAuth ? (
		<div key={id} className={`item-edit`}>
			<button data-edit={id} onClick={editClick}>
				<Icon path={mdiClipboardEditOutline} size={0.7} /> &nbsp; Editar
			</button>
		</div>
	) : null;
}

import React from 'react';

export default function Produto_removido_alerta({ mensagem }) {
	return mensagem ? <div className='alerta'>{mensagem}</div> : null;
}

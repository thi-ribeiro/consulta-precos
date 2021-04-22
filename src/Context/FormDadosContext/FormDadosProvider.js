import React, { useState, createContext } from 'react';

export const FormDadosContext = createContext();

export const FormDadosProvider = ({ children }) => {
	const [popupStatus, setpopupStatus] = useState(false);
	const [editarChave, seteditarChave] = useState([]);
	const [listaProdutos, setlistaProdutos] = useState([]);

	const setaStatusPopup = e => {
		setpopupStatus(!popupStatus);

		popupStatus
			? (document.body.style.overflow = 'unset')
			: (document.body.style.overflow = 'hidden');
	};

	const editarItemArray = (lista, idItem) => {
		let filtro = lista.filter(item => item.id === parseInt(idItem));
		seteditarChave(filtro[0]);
	};

	const definirListaProdutos = lista => {
		setlistaProdutos(lista);
	};

	return (
		<FormDadosContext.Provider
			value={{
				setaStatusPopup,
				popupStatus,
				editarItemArray,
				editarChave,
				definirListaProdutos,
				listaProdutos
			}}>
			{children}
		</FormDadosContext.Provider>
	);
};

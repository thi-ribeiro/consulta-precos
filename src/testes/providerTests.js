import React, { useState, createContext } from 'react';

export const ProviderTestes = createContext();

//const nomes = { nome: 'thiago' };

export const ProviderTests = ({ children }) => {
	const [onOff, setOnOff] = useState(false);
	const [nome, setnome] = useState({ nome: 'thiago' });

	const changeOnOff = e => {
		setOnOff(!onOff);
		setnome(e);
	};

	return (
		<ProviderTestes.Provider value={{ nome, changeOnOff, onOff }}>
			{children}
		</ProviderTestes.Provider>
	);
};

export default ProviderTests;

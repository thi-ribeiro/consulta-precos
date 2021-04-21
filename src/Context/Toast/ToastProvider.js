import React, { useState, createContext } from 'react';
import ToastItens from './ToastItens';

export const ToastContext = createContext();

export const Toast = ({ children }) => {
	const [retornoIndex, setretornoIndex] = useState(0);
	const [childrens, setchildrens] = useState([]);

	const chamaToast = msg => {
		setretornoIndex(retornoIndex + 1);

		if (retornoIndex >= 3) {
			let removerUltimo = childrens.slice();
			removerUltimo.shift();
			setchildrens([
				...removerUltimo,
				<ToastItens
					key={retornoIndex}
					toastMensagem={msg}
					index={retornoIndex}
				/>
			]);
		} else {
			setchildrens([
				...childrens,
				<ToastItens
					key={retornoIndex}
					toastMensagem={msg}
					index={retornoIndex}
				/>
			]);
		}
	};

	const clearToastMessages = _ => {
		setchildrens([]);
		setretornoIndex(0);
	};

	return (
		<ToastContext.Provider
			value={{ chamaToast, clearToastMessages, childrens }}>
			{children}
		</ToastContext.Provider>
	);
};

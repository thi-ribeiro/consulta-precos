import React, { useContext, useState } from 'react';
import Componente2 from './comp2';
import { ProviderTests } from './providerTests';
import { ToastContext } from '../Context/Toast/ToastProvider';
import Alerta from '../Context/Toast/Toast';

export default function Comp1() {
	const { chamaToast } = useContext(ToastContext);
	const [children, setchildren] = useState([]);

	const toastOpen = e => {
		let testeDelete = Math.floor(Math.random() * 100 + 1);
		chamaToast(`Foi gerado: ${testeDelete}!`);
	};

	const appendChild = (ind, item) => {
		setchildren([...children, <div>TESTE!</div>]);
	};

	return (
		<ProviderTests>
			<button onClick={appendChild}>APPEND CHILDREN</button>

			{children.map(child => child)}

			<button onClick={toastOpen}>TOAST TESTE!</button>
			<Componente2 />
			<Alerta />
		</ProviderTests>
	);
}

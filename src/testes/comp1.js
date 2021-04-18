import React from 'react';
import Componente2 from './comp2';
import { ProviderTests } from './providerTests';

export default function Comp1() {
	return (
		<ProviderTests>
			<Componente2 />
		</ProviderTests>
	);
}

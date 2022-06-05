import React, { useContext } from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';

import { ValidadesContext } from '../Context/ValidadesContext/ValidadesProvider';

export default function Loading() {
	const { loading } = useContext(ValidadesContext);

	return loading ? (
		<div className='loading-centralizar'>
			<ScaleLoader
				color='gray'
				width='5px'
				margin='2px'
				radius='5px'
				height='20px'
			/>
		</div>
	) : (
		''
	);
}

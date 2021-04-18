import React from 'react';

export const Contexto = React.createContext();

const ContextoProvider = props => {
	return <Contexto.Provider value={'OE'}>{props}</Contexto.Provider>;
};

export default ContextoProvider;

// export default Contexto;

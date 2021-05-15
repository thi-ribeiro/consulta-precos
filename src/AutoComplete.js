import React, { useState, useEffect, useRef } from 'react';
import Icon from '@mdi/react';
import { mdiMenuRight } from '@mdi/js';

export default function AutoComplete({
	valorEditar,
	colunaBusca,
	tipoProduto = 'all',
	limit = 5,
	referencia = null,
	placeholder = null,
	req = true
}) {
	const [autoCompleteArray, setautoCompleteArray] = useState([]);
	const [filtro, setfiltro] = useState();
	const [autoCompleteStatus, setautoCompleteStatus] = useState(false);
	const [valorSelecionado, setvalorSelecionado] = useState('');

	const valorInicial = useRef(null);
	// const handleClick = div => {
	// 	if (!autoCompleteStatus) {
	// 		//SE O POPUP DE AUTO COMPLETAR ESTIVER DESATIVADO
	// 		div.addEventListener('click', handleOutsideClick, false);
	// 		//TODA VEZ QUE O POPUP AO DIGITAR DE ACORDO COM A FUNCAO DELE APARECER ELE ADICIONAR, UM LISTENER QUE VAI ESPERAR QUANDO CLICAR NA "DIV" Q EH O BACKGROUND ENTAO ELE VAI DE ACORDO COM O STATUS DO POPUP REMOVER OU ADICIONAR O LISTENER.
	// 	} else {
	// 		div.removeEventListener('click', handleOutsideClick, false);
	// 	}

	// 	setautoCompleteStatus(false);
	// };

	// const handleOutsideClick = e => {
	// 	//handleClick(clickOut.current.closest('form > div'));
	// 	//PEGO A DIV EXTERNA AO TARGET PRINCIPAL Q EH O INPUT
	// 	//NO CASO A DIV DO BACKGROUND E CHAMO A FUNCAO HANDLERCLICK
	// 	console.log(e);
	// };

	const autoComplete = ({ target }) => {
		let arrayAutoComplete = [];

		const busca = autoCompleteArray
			.filter(e => {
				return e[colunaBusca]
					.toLowerCase()
					.includes(target.value.toLowerCase());
			})
			.map((i, ind) => {
				if (ind <= limit) {
					let keyColuna = `ac_${colunaBusca}`;
					let colunas = {};
					colunas[keyColuna] = i[colunaBusca];

					arrayAutoComplete.push(colunas);
					//console.log({ ac_empresa: i.empresa });
				}
				return arrayAutoComplete;
			});

		setfiltro(arrayAutoComplete);
		setvalorSelecionado(target.value);

		if (busca.length && target.value) {
			setautoCompleteStatus(true);
		} else {
			setautoCompleteStatus(false);
		}
		//console.log(busca);
	};

	const inserirValorTextbox = ({ currentTarget }) => {
		setvalorSelecionado(currentTarget.dataset.completar);
		changeStatusAutoComplete();
	};

	const changeStatusAutoComplete = e => {
		setautoCompleteStatus(false);
		//console.log(e);
		//console.log(valorInicial.current.value);
	};

	const keyPressSearch = e => {
		if (e.key === 'Enter' || e.key === 'Escape') {
			setautoCompleteStatus(false);
		}
	};

	const retornoAutoComplete = async () => {
		let response = await fetch(
			`http://192.168.2.103:5000/lista-auto-complete/${colunaBusca}/${tipoProduto}`
		);

		if (response.ok) {
			let resJson = await response.json();
			//console.log('RETORNO AUTO COMPLETE');
			setautoCompleteArray(resJson);
		}
	};

	const editarTextbox = _ => {
		if (valorEditar) {
			setvalorSelecionado(valorEditar);
			return valorEditar;
		} else {
			return valorSelecionado;
		}
	};

	useEffect(() => {
		editarTextbox();
		retornoAutoComplete();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const style = {
		dadosBusca: { position: 'relative', width: '100%' },
		autoCompletar: {
			position: 'absolute',
			backgroundColor: 'rgba(255, 255, 255, 1)',
			color: 'rgba(0, 0, 0, 0.5)',
			fontWeight: 'bold',
			width: '100%',
			padding: '5px',
			border: '1px solid rgba(0, 0, 0, 0.3)',
			borderTop: 'none',
			top: '33px',
			zIndex: '8'
		},
		divsAutoCompletar: {
			display: 'flex',
			alignItens: 'center'
			//textTransform: 'uppercase'
		}
	};

	return (
		<div style={style.dadosBusca} ref={referencia}>
			<input
				ref={valorInicial}
				onChange={autoComplete}
				{...(req ? { required: 'required' } : null)}
				type='text'
				name={'ac_' + colunaBusca}
				placeholder={placeholder ? placeholder : valorEditar}
				value={valorSelecionado}
				autoComplete='off'
				onClick={changeStatusAutoComplete}
				onKeyDown={keyPressSearch}
			/>
			{autoCompleteStatus ? (
				<div style={style.autoCompletar}>
					{filtro.map((item, index) => (
						<div
							style={style.divsAutoCompletar}
							key={index}
							onClick={inserirValorTextbox}
							data-completar={item[`ac_${colunaBusca}`]}>
							<div>
								<Icon
									path={mdiMenuRight}
									title='Filtrar'
									size={1}
									color='#000'
								/>
							</div>
							<div>{item[`ac_${colunaBusca}`]}</div>
						</div>
					))}
				</div>
			) : null}
		</div>
	);
}

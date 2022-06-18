import React, { useState, createContext, useContext, useEffect } from 'react';
import { FormDadosContext } from '../FormDadosContext/FormDadosProvider';
import { ToastContext } from '../Toast/ToastProvider';
import ScaleLoader from 'react-spinners/ScaleLoader';
//import EditarValidade from '../../consulta-validades/EditarValidade';

import Icon from '@mdi/react';
import {
	mdiBarcode,
	mdiCalendarRange,
	mdiCalendarClock,
	mdiCalendarAlert,
	mdiCalendarRemove,
	mdiPlaylistEdit,
	mdiPlaylistCheck,
	mdiPlaylistMinus,
	mdiCheckCircleOutline,
	mdiTextToSpeechOff,
} from '@mdi/js';

export const ValidadesContext = createContext();

export const ValidadesProvider = ({ children }) => {
	const [datasSelect, setdatasSelect] = useState([]);
	const [dataSelectedReferencia, setdataSelectedReferencia] = useState([]);
	const [dataAtualFetch, setdataAtualFetch] = useState([]);
	const [loadingAtual, setloadingAtual] = useState(false);
	const [loadingReferencia, setloadingReferencia] = useState(false);
	const [validadePopupState, setvalidadePopupState] = useState(false);
	const [stadoPopConfirma, setstadoPopConfirma] = useState(false);
	const [dadosOnClick, setdadosOnClick] = useState();
	const [validadesAlert, setvalidadesAlert] = useState([]);
	const [dadosConfirmacao, setdadosConfirmacao] = useState([]);
	const [estadoPop, setestadoPop] = useState(false);
	const [idEditarValidade, setidEditarValidade] = useState();
	const [editarDadosValidade, seteditarDadosValidade] = useState(0);

	const [contextGlobalFetch] = useState('http://192.168.2.12:5000');

	//const Hello = 'Hi!';
	const { dataBarra, dataMesAnoBarra, dataBarraBr } =
		useContext(FormDadosContext);

	const { chamaToast } = useContext(ToastContext);

	const diasVence = (data) => {
		let dataAtualBarra = new Date(dataBarra);
		let dataProdutoVence = new Date(data);

		let diasAteVencimento =
			dataProdutoVence.getTime() - dataAtualBarra.getTime();

		if (Math.sign(diasAteVencimento) >= 1) {
			return Math.ceil(diasAteVencimento / (1000 * 3600 * 24));
		} else if (Math.sign(diasAteVencimento) === 0) {
			return 0;
		} else {
			return -1;
		}
	};

	const fetchValidadesAlert = () => {
		fetch(`${contextGlobalFetch}/validadesLimite`)
			.then((response) => {
				if (response.status === 200) {
					return response.json();
				} else {
					throw new Error('Something went wrong on api server!');
				}
			})
			.then((data) => {
				//console.log(data);
				let datas = [];
				data.forEach(({ validadeFinal }) => {
					if (diasVence(validadeFinal) >= -1 && diasVence(validadeFinal) <= 3) {
						//console.log(validadeFinal, diasVence(validadeFinal));
						datas.push(validadeFinal);
					}
				});
				setvalidadesAlert(datas);
				//console.log(datas);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const fetchDatasSelect = () => {
		setloadingReferencia(true);
		fetch(`${contextGlobalFetch}/datasSelectValidades`)
			.then((response) => {
				if (response.status === 200) {
					return response.json();
				} else {
					throw new Error('Something went wrong on api server!');
				}
			})
			.then((data) => {
				setdatasSelect(data);
				setloadingReferencia(false);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const fetchDataReferencia = (dataConsulta) => {
		setloadingReferencia(true);
		fetch(`${contextGlobalFetch}/consultaDatasValidade`, {
			method: 'POST',
			credentials: 'include',
			mode: 'cors',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ mesAno: dataConsulta }),
		})
			.then((response) => {
				if (response.status === 200) {
					return response.json();
				} else {
					throw new Error('Something went wrong on api server!');
				}
			})
			.then((data) => {
				setdataSelectedReferencia(data);
				setloadingReferencia(false);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const fetchDataAtual = () => {
		setloadingAtual(true);
		fetch(`${contextGlobalFetch}/consultaDatasValidade`, {
			method: 'POST',
			credentials: 'include',
			mode: 'cors',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ mesAno: dataMesAnoBarra }),
		})
			.then((response) => {
				if (response.status === 200) {
					return response.json();
				} else {
					throw new Error('Something went wrong on api server!');
				}
			})
			.then((data) => {
				setdataAtualFetch(data);
				setloadingAtual(false);
				console.log(data);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const montaArrayForm = (e) => {
		let dados = {};

		[...e.target].forEach((target) => {
			//console.log(target.type);
			if (target.type !== 'submit' && target.id !== 'checkLanca') {
				Object.assign(dados, { [target.name]: target.value });
			}

			if (target.id === 'checkLanca') {
				//console.log(target.checked);
				Object.assign(dados, { [target.name]: target.checked });
			}
		});

		return dados;
	};

	const dadosPostValidade = (e) => {
		e.preventDefault();
		fetch(`${contextGlobalFetch}/adicionarValidade`, {
			method: 'POST',
			credentials: 'include',
			mode: 'cors',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(montaArrayForm(e)),
		})
			.then((response) => {
				if (response.status === 200) {
					return response.json();
				} else {
					throw new Error('Something went wrong on api server!');
				}
			})
			.then((data) => {
				chamaToast(data.message);
				fetchDataAtual();
				fetchValidadesAlert();
			})
			.catch((error) => {
				console.error(error);
			});
		setvalidadePopupState(false);
	};

	const removerValidade = (id) => {
		//e.preventDefault();

		//console.log(id);

		fetch(`${contextGlobalFetch}/deleteValidade`, {
			method: 'POST',
			credentials: 'include',
			mode: 'cors',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id: id }),
		})
			.then((response) => {
				if (response.status === 200) {
					return response.json();
				} else {
					throw new Error('Something went wrong on api server!');
				}
			})
			.then((data) => {
				chamaToast(data.message);
				fetchDataAtual();
				fetchValidadesAlert();
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const finalizarValidade = (id) => {
		//e.preventDefault();

		//id, usuario, dataFinalizacao
		let finalizacaoData = {
			id: id,
			usuario: JSON.parse(localStorage.getItem('_user')).usuario,
			dataFinalizacao: dataBarraBr,
		};

		//console.log(finalizacaoData);

		fetch(`${contextGlobalFetch}/finalizarValidade`, {
			method: 'POST',
			credentials: 'include',
			mode: 'cors',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(finalizacaoData),
		})
			.then((response) => {
				if (response.status === 200) {
					return response.json();
				} else {
					throw new Error('Something went wrong on api server!');
				}
			})
			.then((data) => {
				chamaToast(data.message);
				fetchDataAtual();
				fetchValidadesAlert();
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const SetIcon = ({ dataProduto, finalizadoData }) => {
		let pathMod;
		let colorMod;
		let dataProdutoVence = new Date(dataProduto);

		if (finalizadoData) {
			pathMod = mdiCalendarRange;
			colorMod = 'rgba(13, 114, 6, 0.7)';
		} else {
			if (diasVence(dataProdutoVence) > 6) {
				pathMod = mdiCalendarClock;
				colorMod = 'rgba(50, 50, 255, 0.7)';
			} else if (diasVence(dataProdutoVence) <= 0) {
				pathMod = mdiCalendarRemove;
				colorMod = 'rgba(168, 0, 0, 0.7)';
			} else if (
				diasVence(dataProdutoVence) > 0 &&
				diasVence(dataProdutoVence) <= 6
			) {
				pathMod = mdiCalendarAlert;
				colorMod = 'rgba(150, 150, 0, 0.7)';
			}
		}

		let iconeMod = (
			<Icon className='iconeMod' path={pathMod} size={1} color={colorMod} />
		);

		return iconeMod;
	};

	const LimitaNomeProduto = (nomeProduto) => {
		if (nomeProduto.length > 5) {
			return nomeProduto.substring(0, 5) + '...';
		}

		return nomeProduto;
	};

	const StatusDivColor = (vencimento, finalizadoPor) => {
		let classFinal = `consulta-validades-produto-div-visivel`;

		if (finalizadoPor !== '0') {
			return `${classFinal} finalizado-por-background`;
		}

		if (vencimento > 6) {
			return `${classFinal} produto-na-data`;
		} else if (vencimento <= 0) {
			return `${classFinal} produto-vencido`;
		} else if (vencimento > 0 && vencimento <= 6) {
			return `${classFinal} produto-proximo-vencimento`;
		}
	};

	const mensagemVencimento = (vencimento, diasVencimento, finalizado) => {
		if (finalizado) {
			return `OK - ${finalizado}.`;
		}

		if (diasVencimento > 6) {
			return `${vencimento} - ${diasVencimento} dia(s).`;
		} else if (diasVencimento <= 0) {
			return `Vencido ${vencimento}.`;
		} else if (diasVencimento > 0 && diasVencimento <= 6) {
			return `Venc. ${diasVencimento} dias(s).`;
		}
	};

	// const ValidadeVisivel = ({
	// 	finalizadoPor,
	// 	nomeProduto,
	// 	validadeFinal,
	// 	finalizadoData,
	// 	validadeFinalBr,
	// 	quantidadeProdutos,
	// }) => {
	// 	return (
	// 		<div className={StatusDivColor(diasVence(validadeFinal), finalizadoPor)}>
	// 			<div className='validade-nome' data-produto={nomeProduto}>
	// 				<SetIcon
	// 					dataProduto={validadeFinal}
	// 					finalizadoData={finalizadoData}
	// 				/>
	// 				{LimitaNomeProduto(nomeProduto)}
	// 			</div>

	// 			<div className='validade-final'>
	// 				<div className='validade-dias-vencer'>
	// 					{mensagemVencimento(
	// 						validadeFinalBr,
	// 						diasVence(validadeFinal),
	// 						finalizadoData
	// 					)}
	// 				</div>
	// 			</div>

	// 			<div className='validade-quantidade-produtos'>{quantidadeProdutos}</div>
	// 		</div>
	// 	);
	// };

	const PopUpConfirma = (id, nomeProduto, tipo) => {
		switch (tipo) {
			case 1:
				setdadosConfirmacao({
					mensagemConfirmacao: `Deseja finalizar a validade do produto [ ${nomeProduto} ] ?`,
					funcaoTexto: 'Finalizar',
					funcaoExecutar: tipo,
					id: id,
				});

				break;
			case 2:
				setdadosConfirmacao({
					mensagemConfirmacao: `Deseja deletar a validade do produto [ ${nomeProduto} ] ?`,
					funcaoTexto: 'Deletar',
					funcaoExecutar: tipo,
					id: id,
				});
				break;

			default:
		}

		return setstadoPopConfirma(!stadoPopConfirma);

		//console.log(dadosConfirmacao);
	};

	const lancadoSis = (lancado) => {
		let corLancado = {
			lancado: 'rgba(0, 100, 0, 0.9)',
			nlancado: 'darkgrey',
		};

		let cor = lancado === 'true' ? corLancado.lancado : corLancado.nlancado;

		return (
			<Icon
				className='iconeMod'
				path={mdiCheckCircleOutline}
				size={0.7}
				color={cor}
			/>
		);
	};

	const lancaSistemaButton = (id, statusSistema) => {
		statusSistema = statusSistema === 'true' ? 'false' : 'true';

		fetch(`${contextGlobalFetch}/lancarSistema`, {
			method: 'POST',
			credentials: 'include',
			mode: 'cors',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				id: id,
				statusSistema: statusSistema,
			}),
		})
			.then((response) => {
				if (response.status === 200) {
					return response.json();
				} else {
					throw new Error('Something went wrong on api server!');
				}
			})
			.then((data) => {
				chamaToast(data.message);
				const newState = dataAtualFetch.map((obj, index) => {
					if (obj.id === id) {
						return { ...dataAtualFetch[index], lancadoSistema: statusSistema };
					}
					return obj;
				});

				setdataAtualFetch(newState);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const carregaDadosEditar = (id) => {
		fetch(`${contextGlobalFetch}/carregarDataEditar/${id}`)
			.then((response) => {
				if (response.status === 200) {
					return response.json();
				} else {
					throw new Error('Something went wrong on api server!');
				}
			})
			.then((data) => {
				seteditarDadosValidade(data);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const atualizarDadosEdit = (e) => {
		e.preventDefault();
		console.log(e);
		console.log(montaArrayForm(e));

		fetch(`${contextGlobalFetch}/atualizarValidade/`, {
			method: 'POST',
			credentials: 'include',
			mode: 'cors',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(montaArrayForm(e)),
		})
			.then((response) => {
				if (response.status === 200) {
					return response.json();
				} else {
					throw new Error('Something went wrong on api server!');
				}
			})
			.then((data) => {
				chamaToast(data.message);

				setestadoPop(false);
				fetchDataAtual();
				fetchValidadesAlert();

				seteditarDadosValidade([]);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const estadoEdit = (id) => {
		setestadoPop(!estadoPop);
		carregaDadosEditar(id);
	};

	const SlideDownDados = (e) => {
		// let idScrollto = document.getElementById(
		// 	`div-${e.currentTarget.dataset.id}`
		// );

		// idScrollto.scrollIntoView({
		// 	behavior: 'smooth',
		// });

		setdadosOnClick(e.currentTarget.dataset.id);
	};

	// const openDiv = (id) => {
	// 	if (parseInt(dadosOnClick) === parseInt(id)) {
	// 		return `consulta-validades-produto-div-show animateShow`;
	// 	} else {
	// 		return `consulta-validades-produto-div-hidden`;
	// 	}
	// };

	const MapValidades = ({ valores, tipoLoading }) => {
		//const [toogle, settoogle] = useState(false);
		const [idToogle, setidToogle] = useState(0);

		const funcToogle = (id) => {
			//settoogle(true);
			setidToogle(id);
		};

		return tipoLoading ? (
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
			<div className='consulta-validades-produtos-listados atualmente'>
				{!valores.length && (
					<div>Nenhum vencimento cadastrado ou para listar.</div>
				)}

				{valores.map((item, index) => {
					let {
						id,
						dataColetaValidade,
						validadeFinalBr,
						validadeFinalBrSemAno,
						nomeProduto,
						codigoBarra,
						lote,
						validadeFinal,
						finalizadoData,
						finalizadoDataSemAno,
						finalizadoPor,
						quantidadeProdutos,
						lancadoSistema,
					} = item;

					return (
						<div
							key={index}
							className={`consulta-validades-produto-div`}
							id={`div-${id}`}
							data-id={id}
							onClick={() => funcToogle(id)}>
							<div
								className={StatusDivColor(
									diasVence(validadeFinal),
									finalizadoPor
								)}>
								<div className='validade-nome' data-produto={nomeProduto}>
									<SetIcon
										dataProduto={validadeFinal}
										finalizadoData={finalizadoData}
									/>
									{LimitaNomeProduto(nomeProduto)}
								</div>

								<div className='validade-final'>
									<div className='validade-dias-vencer'>
										{mensagemVencimento(
											validadeFinalBrSemAno,
											diasVence(validadeFinal),
											finalizadoData
										)}
									</div>
								</div>

								<div
									className='validade-quantidade-produtos'
									onClick={() => lancaSistemaButton(id, lancadoSistema)}>
									{lancadoSis(lancadoSistema)}
									{quantidadeProdutos}
								</div>
							</div>
							<div
								className={`consulta-validades-produto-div-show`}
								style={{
									maxHeight: idToogle === id ? '300px' : '0px',
								}}>
								<div className='edicoes-show'>
									<div className='nome-edicao-produto'>{nomeProduto}</div>
									<div className='edicao-produto'>
										<button
											data-id={id}
											name='editar'
											onClick={() => estadoEdit(id)}>
											<Icon
												className='iconeMod'
												path={mdiPlaylistEdit}
												size={1}
											/>
										</button>

										{!finalizadoData && (
											<button
												name='finalizar'
												onClick={() => PopUpConfirma(id, nomeProduto, 1)}
												data-id={id}>
												<Icon
													className='iconeMod'
													path={mdiPlaylistCheck}
													size={1}
												/>
											</button>
										)}

										<button
											name='deletar'
											onClick={() => PopUpConfirma(id, nomeProduto, 2)}>
											<Icon
												className='iconeMod'
												path={mdiPlaylistMinus}
												size={1}
											/>
										</button>
									</div>
								</div>
								{finalizadoData && (
									<div className='finalizado-por'>
										O produto foi finalizado dia {finalizadoData} por&nbsp;
										{finalizadoPor}.
									</div>
								)}
							</div>
						</div>
					);
				})}
			</div>
		);
	};

	useEffect(() => {
		fetchDatasSelect();
	}, []);

	return (
		<ValidadesContext.Provider
			value={{
				diasVence,
				dataBarra,
				dataBarraBr,
				dataMesAnoBarra,
				datasSelect,
				loadingReferencia,
				loadingAtual,
				fetchDataReferencia,
				fetchDataAtual,
				dataAtualFetch,
				dataSelectedReferencia,
				SetIcon,
				LimitaNomeProduto,
				MapValidades,
				validadePopupState,
				setvalidadePopupState,
				dadosPostValidade,
				stadoPopConfirma,
				setstadoPopConfirma,
				dadosConfirmacao,
				removerValidade,
				finalizarValidade,
				fetchValidadesAlert,
				validadesAlert,
				atualizarDadosEdit,
				setestadoPop,
				estadoPop,
				SlideDownDados,
				dadosOnClick,
				lancadoSis,
				StatusDivColor,
				mensagemVencimento,
				estadoEdit,
				PopUpConfirma,
				editarDadosValidade,
				contextGlobalFetch,
			}}>
			{children}
		</ValidadesContext.Provider>
	);
};

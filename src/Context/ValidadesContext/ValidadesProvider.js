import React, { useState, createContext, useContext, useEffect } from 'react';
import { FormDadosContext } from '../FormDadosContext/FormDadosProvider';
import { ToastContext } from '../Toast/ToastProvider';
import ScaleLoader from 'react-spinners/ScaleLoader';

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
	const [dadosConfirmacao, setdadosConfirmacao] = useState([]);

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

				data.forEach(({ validadeFinal, finalizadoPor }) => {
					if (diasVence(validadeFinal) <= 0) {
						if (finalizadoPor) {
							console.log(validadeFinal);
						}
					}
				});
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const dadosPostValidade = (e) => {
		e.preventDefault();

		console.log(e);
		let dados = {};

		[...e.target].forEach((target) => {
			//console.log(target.type);
			if (target.type !== 'submit') {
				Object.assign(dados, { [target.name]: target.value });
			}
		});

		console.log(dados);

		fetch(`${contextGlobalFetch}/adicionarValidade`, {
			method: 'POST',
			credentials: 'include',
			mode: 'cors',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(dados),
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
			})
			.catch((error) => {
				console.error(error);
			});
		setvalidadePopupState(false);
	};

	const removerValidade = (id) => {
		//e.preventDefault();

		console.log(id);

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
			return nomeProduto.substring(0, 6) + '...';
		}

		return nomeProduto;
	};

	const StatusDivColor = (vencimento, finalizado) => {
		let classFinal = `consulta-validades-produto-div-visivel`;

		if (finalizado) {
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
			return `Fin. ${finalizado}.`;
		}

		if (diasVencimento > 6) {
			return `${vencimento} ${diasVencimento} dia(s).`;
		} else if (diasVencimento <= 0) {
			return `Vencido ${vencimento}.`;
		} else if (diasVencimento > 0 && diasVencimento <= 6) {
			return `Venc. ${diasVencimento} dias(s).`;
		}
	};

	const ValidadeVisivel = ({
		finalizadoPor,
		nomeProduto,
		validadeFinal,
		finalizadoData,
		validadeFinalBr,
		quantidadeProdutos,
	}) => {
		return (
			<div className={StatusDivColor(diasVence(validadeFinal), finalizadoPor)}>
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
							validadeFinalBr,
							diasVence(validadeFinal),
							finalizadoData
						)}
					</div>
				</div>

				<div className='validade-quantidade-produtos'>{quantidadeProdutos}</div>
			</div>
		);
	};

	const PopUpConfirma = (id, nomeProduto, tipo) => {
		switch (tipo) {
			case 0:
				setdadosConfirmacao({
					mensagemConfirmacao: `Deseja editar a validade do produto [ ${nomeProduto} ] ?`,
					funcaoTexto: 'Editar',
					funcaoExecutar: tipo,
					id: id,
				});
				break;
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

	const SlideDownDados = (e) => {
		let idScrollto = document.getElementById(
			`div-${e.currentTarget.dataset.id}`
		);

		console.log(idScrollto);

		idScrollto.scrollIntoView({
			behavior: 'smooth',
			//block: 'nearest',
			//inline: 'nearest',
		});
		setdadosOnClick(e.currentTarget.dataset.id);
	};

	const lancadoSis = (lancado) => {
		let corLancado = {
			lancado: 'rgba(0, 100, 0, 0.9)',
			nlancado: 'darkgrey',
		};

		let cor = lancado ? corLancado.lancado : corLancado.nlancado;

		return (
			<Icon
				className='iconeMod'
				path={mdiCheckCircleOutline}
				size={0.7}
				color={cor}
			/>
		);
	};

	const mapValidades = (valores, tipoLoading) => {
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
				{!valores.length ? (
					<div>Nenhum vencimento cadastrado ou para listar.</div>
				) : null}
				{valores.map((item, index) => {
					let {
						id,
						dataColetaValidade,
						validadeFinalBr,
						nomeProduto,
						codigoBarra,
						lote,
						validadeFinal,
						finalizadoData,
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
							onClick={SlideDownDados}>
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
											validadeFinalBr,
											diasVence(validadeFinal),
											finalizadoData
										)}
									</div>
								</div>


								<div className='validade-quantidade-produtos'>
								{lancadoSis(lancadoSistema)}
									{quantidadeProdutos}
								</div>
							</div>
							<div
								className={`consulta-validades-produto-div-hidden${
									parseInt(id) === parseInt(dadosOnClick) ? '-show' : ''
								}`}>
								<div className='nome-edicao-produto'>{nomeProduto}</div>

								<div className='edicao-produto'>
									<button
										onClick={() => PopUpConfirma(id, nomeProduto, 0)}
										data-id={id}>
										<Icon
											className='iconeMod'
											path={mdiPlaylistEdit}
											size={1}
										/>
										&nbsp; Editar
									</button>

									{!finalizadoData ? (
										<button
											onClick={() => PopUpConfirma(id, nomeProduto, 1)}
											data-id={id}>
											<Icon
												className='iconeMod'
												path={mdiPlaylistCheck}
												size={1}
											/>
											&nbsp; Finalizar
										</button>
									) : null}

									<button onClick={() => PopUpConfirma(id, nomeProduto, 2)}>
										<Icon
											className='iconeMod'
											path={mdiPlaylistMinus}
											size={1}
										/>
										&nbsp; Remover
									</button>
								</div>

								{finalizadoData ? (
									<div className='finalizado-por'>
										O produto foi finalizado dia {finalizadoData} por&nbsp;
										{finalizadoPor}.
									</div>
								) : null}
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
				mapValidades,
				validadePopupState,
				setvalidadePopupState,
				dadosPostValidade,
				stadoPopConfirma,
				setstadoPopConfirma,
				dadosConfirmacao,
				removerValidade,
				finalizarValidade,
			}}>
			{children}
		</ValidadesContext.Provider>
	);
};

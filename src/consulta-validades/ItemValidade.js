import React, { useState } from 'react';
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
} from '@mdi/js';

export default function ItemValidade(
	index,
	nomeProduto,
	finalizadoPor,
	finalizadoData,
	validadeFinal,
	validadeFinalBr,
	quantidadeProdutos,
	dadosOnClick,
	id,
	finalizarValidade,
	PopUpConfirma,
	dataBarra
) {
	//const [stadoPopup, setstadoPopup] = useState(false);

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
				diasVence(dataProdutoVence) < 6
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
		} else if (vencimento > 0 && vencimento < 6) {
			return `${classFinal} produto-proximo-vencimento`;
		}
	};

	const mensagemVencimento = (vencimento, diasVencimento, finalizado) => {
		if (finalizado) {
			return `Finalizado ${finalizado}.`;
		}

		if (diasVencimento > 6) {
			return `${vencimento} ${diasVencimento} dia(s).`;
		} else if (diasVencimento <= 0) {
			return `Vencido ${vencimento}.`;
		} else if (diasVencimento > 0 && diasVencimento < 6) {
			return `Venc. ${diasVencimento} dias(s).`;
		}
	};

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

	return (
		<div key={index} className={`consulta-validades-produto-div`}>
			<ValidadeVisivel
				nomeProduto={nomeProduto}
				finalizadoPor={finalizadoPor}
				validadeFinal={validadeFinal}
				validadeFinalBr={validadeFinalBr}
				finalizadoData={finalizadoData}
				quantidadeProdutos={quantidadeProdutos}
			/>
			<div
				className={`consulta-validades-produto-div-hidden${
					dadosOnClick ? 'show' : ''
				}`}>
				<div className='nome-edicao-produto'>{nomeProduto}</div>

				<div className='edicao-produto'>
					<button>
						<Icon className='iconeMod' path={mdiPlaylistEdit} size={1} />
						&nbsp; Editar
					</button>

					{!finalizadoData ? (
						<button onClick={finalizarValidade} data-id={id}>
							<Icon className='iconeMod' path={mdiPlaylistCheck} size={1} />
							&nbsp; Finalizar
						</button>
					) : null}

					<button onClick={PopUpConfirma} data-id={id}>
						<Icon className='iconeMod' path={mdiPlaylistMinus} size={1} />
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
}

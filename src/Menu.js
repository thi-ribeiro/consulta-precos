import React, { useContext, useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from './Context/AuthContext/Auth';
import { ValidadesContext } from './Context/ValidadesContext/ValidadesProvider';

import Icon from '@mdi/react';
import { mdiAlertDecagram } from '@mdi/js';

export default function Menu() {
	const { logout, statusAuth } = useContext(AuthContext);
	const { fetchValidadesAlert, validadesAlert } = useContext(ValidadesContext);

	const [statusPop, setstatusPop] = useState(false);
	//const [stickyNav, setstickyNav] = useState(false);

	useEffect(() => {
		const verifica = (e) => {
			if (e) {
				let wrapped = wrapperRef.current.className;
				//console.log(wrapperRef.current.className);
				//console.log(e.target.href);
				if (wrapped && !wrapperRef.current.contains(e.target)) {
					//console.log('CLICOU FORA!');
					setstatusPop(false);
				} else if (e.target.href) {
					setstatusPop(false);
					//console.log('CLICOU DENTRO!');
				}
				//
			}
		};
		fetchValidadesAlert();
		// window.addEventListener('scroll', () => {
		// 	let { pageYOffset } = window;
		// 	//console.log(pageYOffset);
		// 	if (pageYOffset >= 120) {
		// 		setstickyNav(true);
		// 		//console.log('SETTRUE');
		// 	} else {
		// 		setstickyNav(false);
		// 	}
		// });

		window.addEventListener('click', verifica);

		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener('click', verifica);
		};
	}, []);

	const LoggedInAlertDates = ({ statusAuth }) => {
		//fetchValidadesAlert();

		if (statusAuth && validadesAlert.length > 0) {
			return (
				<span className='alert-validades'>
					<Icon
						className='iconeMod'
						path={mdiAlertDecagram}
						size={0.8}
						color='rgba(150, 0, 0, 0.8)'
					/>
				</span>
			);
		}

		return null;
	};

	const wrapperRef = useRef();

	return (
		<div className={`menu sticky`} ref={wrapperRef}>
			<ul>
				<li>
					<NavLink
						to='/'
						className={({ isActive }) => (isActive ? 'selected' : undefined)}>
						Index
					</NavLink>
				</li>
				<li className='menu-consulta'>
					<span onClick={() => setstatusPop(!statusPop)}>
						Consultas
						<LoggedInAlertDates statusAuth={statusAuth} />
					</span>
					<ul
						className={`consulta-tipo-popup ${
							statusPop ? 'fadeIn' : 'fadeOut'
						}`}>
						<li>
							<NavLink
								to='/consulta'
								className={({ isActive }) =>
									isActive ? 'selected' : undefined
								}>
								Produtos
							</NavLink>
						</li>
						<li>
							<NavLink
								to='/validades'
								className={({ isActive }) =>
									isActive ? 'selected' : undefined
								}>
								Validades
							</NavLink>
						</li>
					</ul>
				</li>
				<li>
					<NavLink
						to='/coleta'
						className={({ isActive }) => (isActive ? 'selected' : undefined)}>
						Coleta
					</NavLink>
				</li>

				<li className='login-menu'>
					{statusAuth ? (
						<NavLink to='/login' className='login-selected' onClick={logout}>
							LOGOUT
						</NavLink>
					) : (
						<NavLink
							to='/login'
							className={({ isActive }) => (isActive ? 'selected' : undefined)}>
							Login
						</NavLink>
					)}
				</li>
			</ul>
		</div>
	);
}

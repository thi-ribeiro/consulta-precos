import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from './Context/AuthContext/Auth';

export default function Menu() {
	const { logout, statusAuth } = useContext(AuthContext);

	return (
		<div className='menu'>
			<ul>
				<li>
					<NavLink
						to='/'
						className={({ isActive }) => (isActive ? 'selected' : undefined)}>
						Index
					</NavLink>
				</li>
				<li>
					<NavLink
						to='/consulta'
						className={({ isActive }) => (isActive ? 'selected' : undefined)}>
						Consulta
					</NavLink>
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

import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	NavLink,
} from 'react-router-dom';

export default function Menu() {
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
				<li>
					<NavLink
						to='/login'
						className={({ isActive }) => (isActive ? 'selected' : undefined)}>
						Login
					</NavLink>
				</li>
			</ul>
		</div>
	);
}

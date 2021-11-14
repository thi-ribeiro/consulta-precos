import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	NavLink,
} from 'react-router-dom';

export default function Menu() {
	return (
		<div className='menu'>
			<ul>
				<li>
					<NavLink exact to='/' activeClassName='selected'>
						Index
					</NavLink>
				</li>
				<li>
					<NavLink exact to='/consulta' activeClassName='selected'>
						Consulta Produtos
					</NavLink>
				</li>
				<li>
					<NavLink exact to='/coleta' activeClassName='selected'>
						Coleta
					</NavLink>
				</li>
			</ul>
		</div>
	);
}

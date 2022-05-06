import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import './css/site.css';

import App from './App';
import { Auth } from './Context/AuthContext/Auth';
import { Toast } from './Context/Toast/ToastProvider';

import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
	<React.StrictMode>
		<Toast>
			<Router>
				<Auth>
					<App />
				</Auth>
			</Router>
		</Toast>
	</React.StrictMode>,
	document.getElementById('root')
);

reportWebVitals();

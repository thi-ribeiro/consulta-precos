import React, { Component } from 'react';

export default class Teste extends Component {
	constructor(props) {
		super(props);

		this.state = { filtroEmpresas: '' };
	}

	retornoEmpresas = async () => {
		let response = await fetch(`http://192.168.2.103:5000/lista-empresas`);

		if (response.ok) {
			let resJson = await response.json();
			console.log(resJson);

			this.setState({
				filtroEmpresas: resJson
			});
		}
	};

	componentWillMount() {
		this.retornoEmpresas();
	}

	render() {
		return <div>OI</div>;
	}
}

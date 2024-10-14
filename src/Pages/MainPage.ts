import { Component } from '../Abstract/Component';

export class Mainpage extends Component {
	constructor(parent: HTMLElement) {
		super(parent, 'div', ['main-page']);

		new Component(this.node, 'h1', ['main-title'], 'Welcome to our store!');

		new Component(this.node, 'button', ['main-button'], 'Вход');
	}
}

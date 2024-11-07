import { Component } from '../Abstract/Component';
import { LogicService } from '../Services/LogicService';

export class Mainpage extends Component {
	stateUpdate: boolean = false;
	constructor(parent: HTMLElement, private service: LogicService) {
		super(parent, 'div', ['main-page']);

		new Component(this.root, 'h1', ['main-title'], 'Welcome to our store!');

		new Component(this.root, 'button', ['main-button'], 'Вход');
	}
	renderWithUpdate(): void {
		if (!this.stateUpdate) {
			this.update();
			this.stateUpdate = true;
		}
		this.render();
	}

	update(): void {}
}

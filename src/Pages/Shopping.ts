import { Component } from '../Abstract/Component';

export class Shopping extends Component {
	stateUpdate: boolean = false;
	constructor(parent: HTMLElement) {
		super(parent, 'div', ['main-page']);

		new Component(
			this.root,
			'h1',
			['main-title'],
			'Эта страница для отображения корзины'
		);
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

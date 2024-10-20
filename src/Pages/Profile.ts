import { Component } from '../Abstract/Component';

export class Profile extends Component {
	stateUpdate: boolean = false;
	constructor(parent: HTMLElement) {
		super(parent, 'div', ['main-page']);

		new Component(
			this.root,
			'h1',
			['main-title'],
			'Эта страница для отображения профиля'
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

import { Component } from '../Abstract/Component';
import { TGood } from '../Abstract/Types';
import { LogicService } from '../Services/LogicService';

export class DetailsPage extends Component {
	stateUpdate: boolean = false;
	private good: TGood | null = null;

	imgItem: Component;
	h2Name: Component;
	divProp: Component;
	constructor(parent: HTMLElement, private service: LogicService) {
		super(parent, 'div', ['details__pages', 'abel']);
		new Component(
			this.root,
			'h1',
			['details__title', 'imperial'],
			'Дополнительная информация'
		);

		const btnBack = new Component(
			this.root,
			'button',
			['details__button__back'],
			'< - Back'
		);
		this.imgItem = new Component(this.root, 'img');
		this.h2Name = new Component(this.root, 'h2');
		this.divProp = new Component(this.root, 'div', ['details__prop']);

		service.addListener('updatePageDetails', (good) => {
			this.good = good as TGood;
			this.update();
		});

		btnBack.root.onclick = () => this.service.openPageCatalog();
	}

	renderWithUpdate(): void {
		if (!this.stateUpdate) {
			this.update();
			this.stateUpdate = true;
		}
		this.render();
	}

	update(): void {
		if (!this.good) return;
		this.imgItem.root.setAttribute('src', this.good.photoLink);
		this.h2Name.root.textContent = this.good.title;
		this.divProp.root.innerHTML = '';
		this.good.typeFields.forEach((type, num) => {
			const divElem = new Component(this.divProp.root, 'div');
			new Component(divElem.root, 'p', ['details__prop__title'], type[1]);
			new Component(
				divElem.root,
				'span',
				null,
				'' + this.good?.valueFields[num][1]
			);
		});
	}

	isGoodInDetailsPage(): boolean {
		return this.good ? true : false;
	}
}

import { Component } from '../Abstract/Component';
import { LogicService } from '../Services/LogicService';

export class Profile extends Component {
	stateUpdate: boolean = false;

	private spanName: Component;
	private spanEmail: Component;
	private spanPhone: Component;
	private spanMobileOperator: Component;
	private spanAdress: Component;

	constructor(parent: HTMLElement, private service: LogicService) {
		super(parent, 'div', ['person-page']);

		new Component(
			this.root,
			'h1',
			['person-page__title', 'imperial'],
			'Личный кабинет'
		);

		const divPersonal = new Component(this.root, 'div', [
			'person-page__personal',
		]);

		new Component(
			this.root,
			'img',
			['person-page__img'],
			null,
			['src'],
			['./assets/svg/glace.svg']
		);

		this.spanName = new Component(
			divPersonal.root,
			'span',
			['spanName', 'roboto'],
			''
		);
		this.spanEmail = new Component(divPersonal.root, 'span', ['roboto'], '');
		const divRightNumber = new Component(divPersonal.root, 'div', [
			'number',
			'roboto',
		]);
		this.spanPhone = new Component(divRightNumber.root, 'span', ['roboto'], '');
		this.spanMobileOperator = new Component(
			divRightNumber.root,
			'span',
			['roboto'],
			''
		);
		this.spanAdress = new Component(divPersonal.root, 'span', ['roboto'], '');

		const divCenter = new Component(this.root, 'div', ['person-page__center']);

		new Component(
			divCenter.root,
			'h2',
			['person-page__center-title', 'roboto'],
			'У вас нет заказов'
		);

		new Component(
			divCenter.root,
			'span',
			['person-page__center-podspan', 'roboto'],
			'Сделайте хотя бы один заказ'
		);

		const btnReturn = new Component(
			this.root,
			'button',
			['person-page__center-button'],
			'Выход'
		);

		btnReturn.root.onclick = () => {
			window.location.hash = '#';
		};
	}

	renderWithUpdate(): void {
		if (!this.stateUpdate) {
			this.update();
			this.stateUpdate = true;
		}
		this.render();
	}

	update(): void {
		const userCustomer = this.service.getUserCustomer();
		if (userCustomer) {
			this.spanName.root.innerHTML = userCustomer.name;
			this.spanEmail.root.innerHTML = userCustomer.email;
			this.spanPhone.root.innerHTML = userCustomer.mobile;
			this.spanMobileOperator.root.innerHTML = `(${userCustomer.operatorType})`;
			this.spanAdress.root.innerHTML = userCustomer.adress;
		}
	}
}

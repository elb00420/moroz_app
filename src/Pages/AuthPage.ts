import { Component } from '../Abstract/Component';
import {
	TIdentificationResponse,
	TRegistrationResponse,
} from '../Abstract/Types';
import { LogicService } from '../Services/LogicService';

export class AuthPage extends Component {
	stateUpdate: boolean = false;

	private divForMobile: Component;
	private divFormCode: Component;
	private divFormExit: Component;
	constructor(parent: HTMLElement, private service: LogicService) {
		super(parent, 'div', ['auth-page']);

		const ContHead = new Component(this.root, 'div', ['auth-page__head']);
		new Component(ContHead.root, 'h1', ['auth-page__title'], 'Вход');

		new Component(
			ContHead.root,
			'p',
			['auth-page__text'],
			'Пожалуйста введите номер телефона'
		);

		const divAuth = new Component(this.root, 'div');

		this.divForMobile = new Component(divAuth.root, 'div');
		this.divForMobile.remove();

		const divMobile = new Component(this.divForMobile.root, 'div');

		const inputMobile = new Component(
			divMobile.root,
			'input',
			['abel'],
			null,
			['type', 'id', 'placeholder'],
			['text', 'inputAuthMobile', 'Телефон']
		);

		const divButtonMobile = new Component(this.divForMobile.root, 'div');
		const inputButtonMobile = new Component(
			divButtonMobile.root,
			'input',
			['button__auth', 'abel'],
			null,
			['type', 'id', 'value'],
			['button', 'buttonAuthMobile', 'Вход']
		);

		const divReg = new Component(this.root, 'div', ['auth-page__reg']);
		new Component(
			divReg.root,
			'p',
			['auth-page__text', 'abel'],
			'Или регистрация'
		);

		const btnReg = new Component(
			divReg.root,
			'input',
			['button__auth', 'abel'],
			null,
			['type', 'id', 'value'],
			['button', 'buttonRegRouter', 'Регистрация']
		);

		btnReg.root.onclick = () => (window.location.hash = '#reg');

		inputButtonMobile.root.onclick = () => {
			(inputButtonMobile.root as HTMLInputElement).disabled = true;
			const mobile = (inputMobile.root as HTMLInputElement).value.trim();
			service.identificationCustomer(mobile);
		};

		this.divFormCode = new Component(divAuth.root, 'div');
		this.divFormCode.remove();

		const pMessage = new Component(this.divFormCode.root, 'p', null, '');

		const divCode = new Component(this.divFormCode.root, 'div', ['div-code']);

		const labelCode = new Component(
			divCode.root,
			'label',
			['abel'],
			'Code',
			['for'],
			['inputAuthCode']
		);

		const inputCode = new Component(
			divCode.root,
			'input',
			null,
			null,
			['type', 'id', 'placeholder'],
			['text', 'inputAuthCode', 'Enter code']
		);

		const divButtonCode = new Component(this.divFormCode.root, 'div');
		const inputButtonCode = new Component(
			divButtonCode.root,
			'input',
			null,
			null,
			['type', 'id', 'value'],
			['button', 'buttonAuthCode', 'Confirm']
		);

		this.divFormExit = new Component(divAuth.root, 'div');
		this.divFormExit.remove();

		const pResultMessage = new Component(this.divFormExit.root, 'p', null, '');

		const divButtonExit = new Component(this.divFormExit.root, 'div');
		const inputButtonExit = new Component(
			divButtonExit.root,
			'input',
			null,
			null,
			['type', 'id', 'value'],
			['button', 'buttonAuthExit', 'Выйти']
		);

		service.addListener('confirm_identification', (response) => {
			this.divForMobile.remove();
			const data = response as TRegistrationResponse;
			if (Number(data.error.code) == 0) {
				labelCode.render();
				inputCode.render();
				pMessage.root.innerHTML = data.message;
				(inputButtonCode.root as HTMLInputElement).value = 'Confirm';
				(inputButtonCode.root as HTMLInputElement).onclick = () => {
					const code = (inputCode.root as HTMLInputElement).value;
					service.confirmIdentificationCustomer(data.customerId, code);
				};
			} else {
				labelCode.remove();
				inputCode.remove();
				pMessage.root.innerHTML = data.error.message;
				(inputButtonCode.root as HTMLInputElement).value = 'Repeat';
				(inputButtonCode.root as HTMLInputElement).onclick = () => {
					this.divForMobile.render();
					this.divFormCode.remove();
					(inputButtonCode.root as HTMLInputElement).disabled = false;
				};
			}
			this.divFormCode.render();
			(inputButtonMobile.root as HTMLInputElement).disabled = false;
		});

		service.addListener('end_identification', (response) => {
			this.divFormCode.remove();
			const data = response as TIdentificationResponse;
			if (Number(data.error.code) == 0) {
				pResultMessage.root.innerHTML = data.message;
				(inputButtonExit.root as HTMLInputElement).value = 'Profile';
				(inputButtonExit.root as HTMLInputElement).onclick = () => {
					window.location.hash = '#profile';
				};
			} else {
				pResultMessage.root.innerHTML = data.error.message;
				(inputButtonExit.root as HTMLInputElement).value = 'Repeat';
				(inputButtonExit.root as HTMLInputElement).onclick = () => {
					this.divFormCode.render();
					this.divFormExit.remove();
					(inputButtonExit.root as HTMLInputElement).disabled = false;
				};
			}
			this.divFormExit.render();
			(inputButtonExit.root as HTMLInputElement).disabled = false;
		});
	}

	renderWithUpdate(): void {
		if (!this.stateUpdate) {
			this.update();
			this.stateUpdate = false;
		}
		this.render();
	}

	update(): void {
		const userCustomer = this.service.getUserCustomer();
		if (!userCustomer) {
			this.divForMobile.render();
			this.divFormCode.remove();
			this.divFormExit.remove();
		}
	}
}

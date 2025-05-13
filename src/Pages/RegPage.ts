import { Compilation } from 'webpack';
import { Component } from '../Abstract/Component';
import { LogicService } from '../Services/LogicService';
import { TRegistrationResponse } from '../Abstract/Types';

export class RegPage extends Component {
	stateUpdate: boolean = false;
	spanDate: null | Component = null;

	constructor(parent: HTMLElement, private service: LogicService) {
		super(parent, 'div', ['reg-page']);
		new Component(
			this.root,
			'h1',
			['reg-page__title', 'imperial'],
			'Регистрация'
		);

		const divFormReg = new Component(this.root, 'div', ['abel']);

		const divName = new Component(divFormReg.root, 'div');
		new Component(divName.root, 'label', null, 'ФИО:', ['for'], ['inputName']);
		const inputName = new Component(
			divName.root,
			'input',
			null,
			null,
			['type', 'id', 'placeholder'],
			['text', 'inputName', 'Введите свое имя']
		);

		const divEmail = new Component(divFormReg.root, 'div');
		new Component(
			divEmail.root,
			'label',
			null,
			'Почта:',
			['for'],
			['inputEmail']
		);
		const inputEmail = new Component(
			divEmail.root,
			'input',
			null,
			null,
			['type', 'id', 'placeholder'],
			['text', 'inputEmail', 'Введите свою почту']
		);

		const divType = new Component(divFormReg.root, 'div');
		new Component(divType.root, 'span', null, 'Тип номера');
		const selectType = new Component(divType.root, 'select');
		new Component(selectType.root, 'option', null, 'МТС', ['value'], ['1']);
		new Component(selectType.root, 'option', null, 'А1', ['value'], ['2']);
		new Component(selectType.root, 'option', null, 'Life', ['value'], ['3']);

		const divMobile = new Component(divFormReg.root, 'div');
		new Component(
			divMobile.root,
			'label',
			null,
			'Телефон:',
			['for'],
			['inputMobile']
		);
		const inputMobile = new Component(
			divMobile.root,
			'input',
			null,
			null,
			['type', 'id', 'placeholder'],
			['text', 'inputMobile', 'Введите номер']
		);

		const divAdress = new Component(divFormReg.root, 'div');
		new Component(
			divAdress.root,
			'label',
			null,
			'Адрес доставки:',
			['for'],
			['inputAdress']
		);
		const inputAdress = new Component(
			divAdress.root,
			'input',
			null,
			null,
			['type', 'id', 'placeholder'],
			['text', 'inputAdress', 'Введите адрес']
		);

		const divButton = new Component(divFormReg.root, 'div', ['reg-button']);
		const inputButton = new Component(
			divButton.root,
			'input',
			null,
			null,
			['type', 'id', 'value'],
			['button', 'buttonAddCustomer', 'Отправить']
		);

		inputButton.root.onclick = () => {
			(inputButton.root as HTMLInputElement).disabled = true;
			const name = (inputName.root as HTMLInputElement).value;
			const email = (inputEmail.root as HTMLInputElement).value;
			const mobile = (inputMobile.root as HTMLInputElement).value;
			const adress = (inputAdress.root as HTMLInputElement).value;
			const type = (selectType.root as HTMLInputElement).value;

			service.registationCustomer(name, email, mobile, type, adress);
		};

		const divFormConfirmReg = new Component(this.root, 'div', ['confirm-reg']);

		divFormConfirmReg.remove();

		const pMessage = new Component(divFormConfirmReg.root, 'p', null, '');

		const divCodeReg = new Component(divFormConfirmReg.root, 'div');
		const labelCodeReg = new Component(
			divCodeReg.root,
			'label',
			null,
			'Код:',
			['for'],
			['inputCodeReg']
		);
		const inputCodeReg = new Component(
			divCodeReg.root,
			'input',
			null,
			null,
			['type', 'id', 'placeholder'],
			['text', 'inputCodeReg', 'Введите код']
		);

		const divButtonConfirmReg = new Component(divFormConfirmReg.root, 'div');
		const inputButtonConfirm = new Component(
			divButtonConfirmReg.root,
			'input',
			null,
			null,
			['type', 'id', 'value'],
			['button', 'buttonConfirmReg', 'Подтвердить']
		);

		const divFormResultReg = new Component(this.root, 'div');
		divFormResultReg.remove();

		const pResultMessage = new Component(
			divFormResultReg.root,
			'p',
			['result-message'],
			''
		);

		const divButtonResultReg = new Component(divFormResultReg.root, 'div');
		const inputButtonResultReg = new Component(
			divButtonResultReg.root,
			'input',
			null,
			null,
			['type', 'id', 'value'],
			['button', 'buttonResultReg', 'Вход']
		);

		service.addListener('confirm_registration', (response) => {
			divFormReg.remove();
			const data = response as TRegistrationResponse;
			if (Number(data.error.code) == 0) {
				labelCodeReg.render;
				inputCodeReg.render;
				pMessage.root.innerHTML = data.message;
				(inputButtonConfirm.root as HTMLInputElement).value = 'Подтвердить';
				(inputButtonConfirm.root as HTMLInputElement).onclick = () => {
					const code = (inputCodeReg.root as HTMLInputElement).value;
					service.confirmRegistrationCustomer(data.customerId, code);
				};
			} else {
				labelCodeReg.remove();
				inputCodeReg.remove();
				pMessage.root.innerHTML = data.error.message;
				(inputButtonConfirm.root as HTMLInputElement).value = 'Повторить';
				(inputButtonConfirm.root as HTMLInputElement).onclick = () => {
					divFormReg.render();
					divFormConfirmReg.remove();
					(inputButtonConfirm.root as HTMLInputElement).disabled = false;
				};
			}
			divFormConfirmReg.render();
			(inputButtonConfirm.root as HTMLInputElement).disabled = false;
		});

		service.addListener('end_registration', (response) => {
			divFormConfirmReg.remove();
			const data = response as TRegistrationResponse;
			if (Number(data.error.code) == 0) {
				pResultMessage.root.innerHTML = data.message;
				(inputButtonResultReg.root as HTMLInputElement).value = 'Обновить';
				(inputButtonResultReg.root as HTMLInputElement).onclick = () => {
					window.location.hash = '#auth';
					window.location.reload();
				};
			} else {
				pResultMessage.root.innerHTML = data.error.message;
				(inputButtonResultReg.root as HTMLInputElement).value = 'Повторить';
				(inputButtonResultReg.root as HTMLInputElement).onclick = () => {
					divFormReg.render();
					divFormResultReg.remove();
					(inputButtonConfirm.root as HTMLInputElement).disabled = false;
				};
			}
			divFormResultReg.render();
			(inputButtonConfirm.root as HTMLInputElement).disabled = false;
		});
	}

	renderWithUpdate(): void {
		if (!this.stateUpdate) {
			this.update();
			this.stateUpdate = false;
		}
		this.render();
	}

	update(): void {}
}

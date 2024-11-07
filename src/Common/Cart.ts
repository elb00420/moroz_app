import { Component } from '../Abstract/Component';
import { LogicService } from '../Services/LogicService';
import { TGood } from '../Abstract/Types';
export class Cart extends Component {
	constructor(
		parent: HTMLElement,
		private service: LogicService,
		private good: TGood
	) {
		super(parent, 'div', ['cart']);
		new Component(
			this.root,
			'img',
			['image__cart'],
			null,
			['src', 'alt'],
			['../assets/images.png', 'image']
		);
		new Component(this.root, 'h3', ['cart__title'], this.good.title);
		const wrapperPrice = new Component(this.root, 'div', [
			'cart__wrapperPrice',
		]);
		new Component(wrapperPrice.root, 'p', ['cart__text'], 'Цена');
		new Component(
			wrapperPrice.root,
			'p',
			['cart__price'],
			this.good.price.toString() + ' byn'
		);
		new Component(this.root, 'button', ['cart__button'], 'В корзину');
	}
}

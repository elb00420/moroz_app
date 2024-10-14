import { Component } from '../Abstract/Component';

export class Header extends Component {
	constructor(parent: HTMLElement) {
		super(parent, 'header', ['header']);

		const linkLogo = new Component(
			this.node,
			'a',
			['link-logo'],
			null,
			['href', 'target'],
			['#', '_blank']
		);
		new Component(
			linkLogo.node,
			'img',
			['logo'],
			null,
			['src', 'alt'],
			['./assets/svg/logo.svg', 'Кобриское мороженное']
		);

		const nav = new Component(this.node, 'nav', ['nav']);
		const list = new Component(nav.node, 'ul', ['nav-list']);

		const shoppingItem = new Component(list.node, 'li', ['nav-item']);

		const linkShopping = new Component(
			shoppingItem.node,
			'a',
			['person-link', 'link'],
			null,
			['href'],
			['#']
		);

		new Component(
			linkShopping.node,
			'img',
			['cart-image'],
			null,
			['src', 'alt'],
			['./assets/svg/shopping.svg', 'Shopping']
		);

		const personItem = new Component(list.node, 'li', ['nav-item']);

		const linkPerson = new Component(
			personItem.node,
			'a',
			['person-link', 'link'],
			null,
			['href'],
			['#']
		);

		new Component(
			linkPerson.node,
			'img',
			['cart-image'],
			null,
			['src', 'alt'],
			['./assets/svg/person.svg', 'Person']
		);

		const heartItem = new Component(list.node, 'li', ['nav-item']);

		const linkHeart = new Component(
			heartItem.node,
			'a',
			['person-link', 'link'],
			null,
			['href'],
			['#']
		);

		new Component(
			linkHeart.node,
			'img',
			['cart-image'],
			null,
			['src', 'alt'],
			['./assets/svg/favorite.svg', 'Heart']
		);

		const burgerButton = new Component(
			this.node,
			'button',
			['burger-button'],
			null,
			['type'],
			['button']
		);
		const burgerMenu = new Component(
			burgerButton.node,
			'img',
			['burger-menu'],
			null,
			['src', 'alt'],
			['./assets/svg/burger.svg', 'Burger menu']
		);
	}
}

import { Component } from '../Abstract/Component';

export class Header extends Component {
	constructor(parent: HTMLElement) {
		super(parent, 'header', ['header']);

		const linkLogo = new Component(
			this.root,
			'a',
			['link-logo'],
			null,
			['href', 'target'],
			['#', '_blank']
		);
		new Component(
			linkLogo.root,
			'img',
			['logo'],
			null,
			['src', 'alt'],
			['./assets/svg/logo.svg', 'Кобриское мороженное']
		);

		const nav = new Component(this.root, 'nav', ['nav']);
		const list = new Component(nav.root, 'ul', ['nav-list']);

		const shoppingItem = new Component(list.root, 'li', ['nav-item']);

		const linkShopping = new Component(
			shoppingItem.root,
			'a',
			['person-link', 'link'],
			null,
			['href'],
			['#']
		);

		new Component(
			linkShopping.root,
			'img',
			['cart-image'],
			null,
			['src', 'alt'],
			['./assets/svg/shopping.svg', 'Shopping']
		);

		const personItem = new Component(list.root, 'li', ['nav-item']);

		const linkPerson = new Component(
			personItem.root,
			'a',
			['person-link', 'link'],
			null,
			['href'],
			['#']
		);

		new Component(
			linkPerson.root,
			'img',
			['cart-image'],
			null,
			['src', 'alt'],
			['./assets/svg/person.svg', 'Person']
		);

		const heartItem = new Component(list.root, 'li', ['nav-item']);

		const linkHeart = new Component(
			heartItem.root,
			'a',
			['person-link', 'link'],
			null,
			['href'],
			['#']
		);

		new Component(
			linkHeart.root,
			'img',
			['cart-image'],
			null,
			['src', 'alt'],
			['./assets/svg/favorite.svg', 'Heart']
		);

		const burgerButton = new Component(
			this.root,
			'button',
			['burger-button'],
			null,
			['type'],
			['button']
		);
		const burgerMenu = new Component(
			burgerButton.root,
			'img',
			['burger-menu'],
			null,
			['src', 'alt'],
			['./assets/svg/burger.svg', 'Burger menu']
		);
	}
}

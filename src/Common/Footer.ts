import { Component } from '../Abstract/Component';

export class Footer extends Component {
	constructor(parent: HTMLElement) {
		super(parent, 'footer', ['footer']);

		new Component(this.node, 'h2', ['footer-title'], 'Наши контакты');

		const blockInf = new Component(this.node, 'div', ['footer__info']);

		const ulBlock = new Component(blockInf.node, 'ul', ['footer__list']);

		const liBlockTwo = new Component(ulBlock.node, 'li', ['footer__item']);
		new Component(
			liBlockTwo.node,
			'img',
			['footer__img'],
			null,
			['src', 'alt'],
			['./assets/svg/tel.svg', 'tel']
		);
		new Component(liBlockTwo.node, 'p', ['footer__text'], '+375298943081');

		const liBlockOne = new Component(ulBlock.node, 'li', ['footer__item']);
		new Component(
			liBlockOne.node,
			'img',
			['footer__img'],
			null,
			['src', 'alt'],
			['./assets/svg/email.svg', 'email']
		);
		new Component(liBlockOne.node, 'p', ['footer__text'], 'kbrmsz@brest.by');

		const liBlockThree = new Component(ulBlock.node, 'li', ['footer__item']);
		new Component(
			liBlockThree.node,
			'img',
			['footer__img'],
			null,
			['src', 'alt'],
			['./assets/svg/maps.svg', 'maps']
		);
		new Component(
			liBlockThree.node,
			'p',
			['footer__text'],
			'г.Кобрин ул.Советская 138'
		);

		const blockSocial = new Component(this.node, 'div', ['footer__social']);

		new Component(
			blockSocial.node,
			'h2',
			['footer__desc'],
			'Мы в социальных сетях'
		);

		const socialLinks = new Component(blockSocial.node, 'div', [
			'footer__links',
		]);

		const socialLinkTg = new Component(
			socialLinks.node,
			'a',
			['footer__link'],
			null,
			['href', 'target'],
			['https://www.instagram.com/', '_blank']
		);

		new Component(
			socialLinkTg.node,
			'img',
			['footer__imgTwo'],
			null,
			['src', 'alt'],
			['./assets/svg/tg.svg', 'inst']
		);

		const socialLinkInst = new Component(
			socialLinks.node,
			'a',
			['footer__link'],
			null,
			['href', 'target'],
			['https://www.instagram.com/', '_blank']
		);

		new Component(
			socialLinkInst.node,
			'img',
			['footer__imgTwo'],
			null,
			['src', 'alt'],
			['./assets/svg/inst.svg', 'inst']
		);

		const socialLinkVk = new Component(
			socialLinks.node,
			'a',
			['footer__link'],
			null,
			['href', 'target'],
			['https://www.instagram.com/', '_blank']
		);

		new Component(
			socialLinkVk.node,
			'img',
			['footer__imgTwo'],
			null,
			['src', 'alt'],
			['./assets/svg/vk.svg', 'inst']
		);

		const socialLinkTt = new Component(
			socialLinks.node,
			'a',
			['footer__link'],
			null,
			['href', 'target'],
			['https://www.instagram.com/', '_blank']
		);

		new Component(
			socialLinkTt.node,
			'img',
			['footer__imgTwo'],
			null,
			['src', 'alt'],
			['./assets/svg/tt.svg', 'inst']
		);

		const blockInfUser = new Component(this.node, 'div', ['footer__user']);

		const blockInfUserLink = new Component(blockInfUser.node, 'div', [
			'footer__users',
		]);
		new Component(
			blockInfUserLink.node,
			'a',
			['footer__link', 'abel'],
			'GitHub',
			['href', 'target'],
			['https://github.com/elb00420', '_blank']
		);
		new Component(
			blockInfUserLink.node,
			'a',
			['footer__link', 'abel'],
			'Figma',
			['href', 'target'],
			[
				'https://www.figma.com/design/C4mcZSTORyFwbqSYAtvzFS/Untitled?node-id=2-2&node-type=frame&t=7UdNCYYU4BKkyYtn-0',
				'_blank',
			]
		);
		new Component(
			blockInfUser.node,
			'p',
			['footer__text', 'abel'],
			'Tserashchuk A.S, Elb-4'
		);
	}
}

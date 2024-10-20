import { Component } from '../Abstract/Component';

export class Footer extends Component {
	constructor(parent: HTMLElement) {
		super(parent, 'footer', ['footer']);

		new Component(this.root, 'h2', ['footer-title'], 'Наши контакты');

		const blockInf = new Component(this.root, 'div', ['footer__info']);

		const ulBlock = new Component(blockInf.root, 'ul', ['footer__list']);

		const liBlockTwo = new Component(ulBlock.root, 'li', ['footer__item']);
		new Component(
			liBlockTwo.root,
			'img',
			['footer__img'],
			null,
			['src', 'alt'],
			['./assets/svg/tel.svg', 'tel']
		);
		new Component(liBlockTwo.root, 'p', ['footer__text'], '+375298943081');

		const liBlockOne = new Component(ulBlock.root, 'li', ['footer__item']);
		new Component(
			liBlockOne.root,
			'img',
			['footer__img'],
			null,
			['src', 'alt'],
			['./assets/svg/email.svg', 'email']
		);
		new Component(liBlockOne.root, 'p', ['footer__text'], 'kbrmsz@brest.by');

		const liBlockThree = new Component(ulBlock.root, 'li', ['footer__item']);
		new Component(
			liBlockThree.root,
			'img',
			['footer__img'],
			null,
			['src', 'alt'],
			['./assets/svg/maps.svg', 'maps']
		);
		new Component(
			liBlockThree.root,
			'p',
			['footer__text'],
			'г.Кобрин ул.Советская 138'
		);

		const blockSocial = new Component(this.root, 'div', ['footer__social']);

		new Component(
			blockSocial.root,
			'h2',
			['footer__desc'],
			'Мы в социальных сетях'
		);

		const socialLinks = new Component(blockSocial.root, 'div', [
			'footer__links',
		]);

		const socialLinkTg = new Component(
			socialLinks.root,
			'a',
			['footer__link'],
			null,
			['href', 'target'],
			['https://www.instagram.com/', '_blank']
		);

		new Component(
			socialLinkTg.root,
			'img',
			['footer__imgTwo'],
			null,
			['src', 'alt'],
			['./assets/svg/tg.svg', 'inst']
		);

		const socialLinkInst = new Component(
			socialLinks.root,
			'a',
			['footer__link'],
			null,
			['href', 'target'],
			['https://www.instagram.com/', '_blank']
		);

		new Component(
			socialLinkInst.root,
			'img',
			['footer__imgTwo'],
			null,
			['src', 'alt'],
			['./assets/svg/inst.svg', 'inst']
		);

		const socialLinkVk = new Component(
			socialLinks.root,
			'a',
			['footer__link'],
			null,
			['href', 'target'],
			['https://www.instagram.com/', '_blank']
		);

		new Component(
			socialLinkVk.root,
			'img',
			['footer__imgTwo'],
			null,
			['src', 'alt'],
			['./assets/svg/vk.svg', 'inst']
		);

		const socialLinkTt = new Component(
			socialLinks.root,
			'a',
			['footer__link'],
			null,
			['href', 'target'],
			['https://www.instagram.com/', '_blank']
		);

		new Component(
			socialLinkTt.root,
			'img',
			['footer__imgTwo'],
			null,
			['src', 'alt'],
			['./assets/svg/tt.svg', 'inst']
		);

		const blockInfUser = new Component(this.root, 'div', ['footer__user']);

		const blockInfUserLink = new Component(blockInfUser.root, 'div', [
			'footer__users',
		]);
		new Component(
			blockInfUserLink.root,
			'a',
			['footer__link', 'abel'],
			'GitHub',
			['href', 'target'],
			['https://github.com/elb00420', '_blank']
		);
		new Component(
			blockInfUserLink.root,
			'a',
			['footer__link', 'abel'],
			'Figma',
			['href', 'target'],
			[
				'https://www.figma.com/design/C4mcZSTORyFwbqSYAtvzFS/Untitled?root-id=2-2&root-type=frame&t=7UdNCYYU4BKkyYtn-0',
				'_blank',
			]
		);
		new Component(
			blockInfUser.root,
			'p',
			['footer__text', 'abel'],
			'Tserashchuk A.S, Elb-4'
		);
	}
}

import { Page } from '../Abstract/Interfaces';
import { LogicService } from '../Services/LogicService';
import { DetailsPage } from './DetailsPage';

export class Router {
	constructor(
		public links: Record<string, Page>,
		private service: LogicService
	) {
		window.onhashchange = () => {
			this.openPage();
		};
		this.openPage();
	}

	openPage(): void {
		Object.values(this.links).forEach((page) => {
			page.remove();
		});

		const url = window.location.hash.slice(1);

		const isUserCustomer = this.service.getUserCustomer();

		switch (url) {
			case 'favorite':
				this.links['#favorite'].renderWithUpdate();
				break;

			case 'auth':
				if (!isUserCustomer) {
					this.links['#auth'].renderWithUpdate();
				} else {
					window.location.hash = '#profile';
				}
				break;

			case 'profile':
				if (isUserCustomer) {
					this.links['#profile'].renderWithUpdate();
				} else {
					window.location.hash = '#auth';
				}
				break;
			case 'reg':
				if (!isUserCustomer) {
					this.links['#reg'].renderWithUpdate();
				} else {
					window.location.hash = '#profile';
				}
				break;

			case 'details':
				if ((this.links['#details'] as DetailsPage).isGoodInDetailsPage()) {
					this.links['#details'].renderWithUpdate();
				} else {
					window.location.hash = '#favorite';
				}
				break;
			case 'shopping':
				this.links['#shopping'].renderWithUpdate();
				break;
			default:
				this.links['#'].renderWithUpdate();
				break;
		}

		// if (url === 'favorite') {
		// 	this.links['#favorite'].renderWithUpdate();
		// } else if (url === 'profile') {
		// 	this.links['#profile'].renderWithUpdate();
		// } else if (url === 'shopping') {
		// 	this.links['#shopping'].renderWithUpdate();
		// } else if (url === 'details') {
		// 	if ((this.links['#details'] as DetailsPage).isGoodInDetailsPage()) {
		// 		this.links['#details'].renderWithUpdate();
		// 	} else {
		// 		window.location.hash = '#favorite';
		// 	}
		// } else {
		// 	this.links['#'].renderWithUpdate();
		// }
	}
}

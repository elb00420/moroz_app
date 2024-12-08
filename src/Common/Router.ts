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

		if (url === 'favorite') {
			this.links['#favorite'].renderWithUpdate();
		} else if (url === 'profile') {
			this.links['#profile'].renderWithUpdate();
		} else if (url === 'shopping') {
			this.links['#shopping'].renderWithUpdate();
		} else if (url === 'details') {
			if ((this.links['#details'] as DetailsPage).isGoodInDetailsPage()) {
				this.links['#details'].renderWithUpdate();
			} else {
				window.location.hash = '#favorite';
			}
		} else {
			this.links['#'].renderWithUpdate();
		}
	}
}

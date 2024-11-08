import { Component } from './Abstract/Component';
import { Footer } from './Common/Footer';
import { Header } from './Common/Header';
import { Router } from './Common/Router';
import { Favorite } from './Pages/Favorite';
import { Mainpage } from './Pages/MainPage';
import { Profile } from './Pages/Profile';
import { Shopping } from './Pages/Shopping';
import { DBService } from './Services/DBService';
import { LogicService } from './Services/LogicService';
import './style.scss';

declare global {
	interface Window {
		app: App;
	}
}

const dbService = new DBService();

const logicService = new LogicService(dbService);

class App {
	constructor(parent: HTMLElement) {
		const wrapper = new Component(parent, 'div', ['wrapper']);
		new Header(wrapper.root, logicService);
		const main = new Component(wrapper.root, 'main', ['main']);
		const links = {
			'': new Mainpage(main.root, logicService),
			'#profile': new Profile(main.root, logicService),
			'#shopping': new Shopping(main.root, logicService),
			'#favorite': new Favorite(main.root, logicService),
		};

		new Router(links, logicService);

		new Footer(wrapper.root);
	}
}

window.app = new App(document.body);

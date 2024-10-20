import { Component } from './Abstract/Component';
import { Footer } from './Common/Footer';
import { Header } from './Common/Header';
import { Router } from './Common/Router';
import { Favorite } from './Pages/Favorite';
import { Mainpage } from './Pages/MainPage';
import { Profile } from './Pages/Profile';
import { Shopping } from './Pages/Shopping';
import './style.scss';

declare global {
	interface Window {
		app: App;
	}
}
class App {
	constructor(parent: HTMLElement) {
		const wrapper = new Component(parent, 'div', ['wrapper']);
		new Header(wrapper.root);
		const main = new Component(wrapper.root, 'main', ['main']);
		const links = {
			'': new Mainpage(main.root),
			'#profile': new Profile(main.root),
			'#shopping': new Shopping(main.root),
			'#favorite': new Favorite(main.root),
		};

		new Router(links);

		new Footer(wrapper.root);
	}
}

window.app = new App(document.body);

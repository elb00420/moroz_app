import { Component } from './Abstract/Component';
import { Footer } from './Common/Footer';
import { Header } from './Common/Header';
import { Mainpage } from './Pages/MainPage';
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
		new Mainpage(wrapper.root);
		new Footer(wrapper.root);
	}
}

window.app = new App(document.body);

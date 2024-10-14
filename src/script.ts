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
		new Header(wrapper.node);
		new Mainpage(wrapper.node);
		new Footer(wrapper.node);
	}
}

window.app = new App(document.body);

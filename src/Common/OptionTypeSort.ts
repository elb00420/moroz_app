import { Component } from '../Abstract/Component';

export class OptionTypeSort extends Component {
	constructor(parent: HTMLElement, title: string, value: string) {
		super(parent, 'option', [], title);

		this.root.setAttribute('value', value);
	}
}

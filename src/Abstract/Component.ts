export class Component {
	node: HTMLElement;

	constructor(
		public parent: HTMLElement,
		tagName: keyof HTMLElementTagNameMap,
		arrStyles?: string[] | null,
		content?: string | null,
		attrProp?: string[] | null,
		attrValue?: string[] | null
	) {
		this.node = document.createElement(tagName);

		if (arrStyles) {
			arrStyles.forEach((style) => {
				this.node.classList.add(style);
			});
		}

		if (content) {
			this.node.textContent = content;
		}

		if (attrProp && attrValue && attrProp.length === attrValue.length) {
			attrProp.forEach((prop, index) => {
				this.node.setAttribute(prop, attrValue[index]);
			});
		}

		this.myRender();
	}

	myRender() {
		this.parent.append(this.node);
	}

	myRemove() {
		this.node.remove();
	}

	addClass(className: string) {
		this.node.classList.add(className);
	}

	removeClass(className: string) {
		this.node.classList.remove(className);
	}

	setContent(content: string) {
		this.node.textContent = content;
	}

	setAttribute(name: string, value: string) {
		this.node.setAttribute(name, value);
	}

	removeAttribute(name: string) {
		this.node.removeAttribute(name);
	}
}

import { LogicService } from '../Services/LogicService';
import { Component } from '../Abstract/Component';
import { TTypeGood } from '../Abstract/Types';
import { OptionTypeSort } from './OptionTypeSort';

export class SelectTypeSort extends Component {
	constructor(
		parent: HTMLElement,
		service: LogicService,
		private typeGoods: TTypeGood[]
	) {
		super(parent, 'select', ['select__type']);

		new OptionTypeSort(this.root, '--Выберите сортировку', ' ');
		new OptionTypeSort(this.root, 'По возрастанию цены', 'vl1');
		new OptionTypeSort(this.root, 'По убыванию цены', 'vl2');

		if (this.root) {
			this.root.onchange = (e) => {
				const select = e.target as HTMLSelectElement;
				const value = select.value;

				if (value === 'vl1') {
					service.sortGoodsByPrice(true);
					console.log('asd');
				} else if (value === 'vl2') {
					service.sortGoodsByPrice(false);
				}
			};
		}
	}
}

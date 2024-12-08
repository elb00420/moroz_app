import { Observer } from '../Abstract/Observer';
import { DBService } from './DBService';
import {
	TGood,
	TTypeField,
	TTypeGood,
	TValueField,
	TGoodResponse,
} from '../Abstract/Types';

export class LogicService extends Observer {
	goodsDb: TGoodResponse[] | null = null;
	private currentSortAscending: boolean | null = null;

	constructor(private dbService: DBService) {
		super();
	}

	async getTypesGoods(): Promise<TTypeGood[]> {
		const data = await this.dbService.getTypesGoods();
		return data.types;
	}

	async updateGoodsByType(idGood: number): Promise<void> {
		const data = await this.dbService.getGoodsByType(idGood);
		const goods = data.goods;
		goods.forEach((good) => {
			(good as TGood)['fields'] = this.joinTypesWithValues(
				good.typeFields,
				good.valueFields
			);
		});
		this.goodsDb = goods;

		if (this.currentSortAscending !== null) {
			this.sortGoodsByPrice(this.currentSortAscending, false);
		} else {
			this.disptach('updateGoodseOnPage', goods);
		}
	}

	async updateAllGoods(): Promise<void> {
		const data = await this.dbService.getAllGoods();
		const goods = data.goods;
		goods.forEach((good) => {
			(good as TGood)['fields'] = this.joinTypesWithValues(
				good.typeFields,
				good.valueFields
			);
		});
		this.goodsDb = goods;
		this.disptach('updateGoodseOnPage', goods);
	}

	private joinTypesWithValues(
		arrTypes: TTypeField[],
		arrValues: TValueField[]
	): Record<string, string | number | Date> {
		const lenArr = arrTypes.length;
		const goodJson = {} as Record<string, string | number | Date>;
		for (let i = 0; i < lenArr; i++) {
			goodJson[arrTypes[i][1]] = arrValues[i][1];
		}
		return goodJson;
	}

	sortGoodsByPrice(bool: boolean, updateState: boolean = true): void {
		if (!this.goodsDb) return;

		if (updateState) {
			this.currentSortAscending = bool;
		}

		if (bool) {
			this.goodsDb.sort((a, b) => a.price - b.price);
		} else {
			this.goodsDb.sort((a, b) => b.price - a.price);
		}
		this.disptach('updateGoodseOnPage', this.goodsDb);
	}

	openPageDetails(good: TGood): void {
		this.disptach('updatePageDetails', good);
		window.location.hash = '#details';
	}

	openPageCatalog(): void {
		this.disptach('updateGoodseOnPage');
		window.location.hash = '#favorite';
	}
}

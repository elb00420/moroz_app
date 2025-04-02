import { Component } from "../Abstract/Component";
import { LogicService } from "../Services/LogicService";
import { TGood, TTypeGood } from "../Abstract/Types";
import { ButtonTypeGood } from "../Common/ButtonTypeGood";
import { Cart } from "../Common/Cart";
import { SelectTypeSort } from "../Common/SelectTypeSort";

export class Favorite extends Component {
  stateUpdate: boolean = false;
  divButtons: null | Component = null;
  divGoods: null | Component = null;
  divSort: null | Component = null;
  currentIndex: number = 0;
  goods: TGood[] = [];

  constructor(parent: HTMLElement, private service: LogicService) {
    super(parent, "div", ["catalog"]);
    new Component(this.root, "h1", ["catalog-title"], "Каталог");

    const divData = new Component(this.root, "div", ["catalog__wrapperDesc"]);
    this.divButtons = new Component(divData.root, "div", ["catalog__buttons"]);
    const divLine = new Component(divData.root, "div", ["catalog__line"]);
    this.divSort = new Component(divLine.root, "div", ["catalog__sort"]);
    this.divGoods = new Component(divData.root, "div", ["catalog__goods"]);

    const prevButton = new Component(
      this.root,
      "button",
      ["slider__button", "slider__button--left"],
      "❮"
    );
    prevButton.root.onclick = () => this.showPreviousGood();

    const nextButton = new Component(
      this.root,
      "button",
      ["slider__button", "slider__button--right"],
      "❯"
    );
    nextButton.root.onclick = () => this.showNextGood();

    service.addListener("updateGoodseOnPage", (goods) => {
      if (goods) this.updateGoodsOnPage(goods as TGood[]);
    });
  }

  renderWithUpdate(): void {
    if (!this.stateUpdate) {
      this.update();
      this.stateUpdate = true;
    }
    this.render();
  }

  update(): void {
    this.service.getTypesGoods().then((typesGoods) => {
      if (this.divButtons && this.divSort) {
        const allGoodsButton: TTypeGood = {
          id: 0,
          title: "Все товары",
          typeFields: [],
        };
        new ButtonTypeGood(this.divButtons.root, this.service, allGoodsButton);
        typesGoods.forEach((typeGood) => {
          if (this.divButtons)
            new ButtonTypeGood(this.divButtons.root, this.service, typeGood);
        });
        new SelectTypeSort(this.divSort.root, this.service, typesGoods);
      }
      this.service.updateAllGoods();
    });
  }

  updateGoodsOnPage(goods: TGood[]): void {
    this.goods = goods.map((good) => ({
      ...good,
      count: good.count ?? 1,
    }));
    this.currentIndex = 0;
    this.renderCurrentGood();
  }

  renderCurrentGood(): void {
    const divGoods = this.divGoods;
    if (divGoods) {
      divGoods.root.innerHTML = "";
      const good = this.goods[this.currentIndex];
      if (good) {
        const cartItem = new Cart(divGoods.root, this.service, good);

        const addToCartButton = new Component(
          cartItem.root,
          "button",
          ["cart__button"],
          "Добавить в корзину"
        );

        addToCartButton.root.onclick = () => {
          this.service.addToCart(good);
        };
      }
    }
  }

  showPreviousGood(): void {
    if (this.goods.length > 0) {
      this.currentIndex =
        (this.currentIndex - 1 + this.goods.length) % this.goods.length;
      this.renderCurrentGood();
    }
  }

  showNextGood(): void {
    if (this.goods.length > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.goods.length;
      this.renderCurrentGood();
    }
  }
}

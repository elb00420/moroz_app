import { Component } from "../Abstract/Component";
import { LogicService } from "../Services/LogicService";
import { TGood } from "../Abstract/Types";

export class Shopping extends Component {
  stateUpdate: boolean = false;
  goodsInCart: TGood[] = [];

  constructor(parent: HTMLElement, private service: LogicService) {
    super(parent, "div", ["shopping-page"]);

    new Component(this.root, "h1", ["shopping-title"], "Корзина");

    this.updateCart();

    service.addListener("updateCart", () => {
      this.updateCart();
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
    this.updateCart();
  }

  updateCart(): void {
    this.root.innerHTML = "";

    new Component(this.root, "h1", ["shopping-title"], "Корзина");

    this.goodsInCart = this.service.getCart();

    if (this.goodsInCart.length === 0) {
      const cartImage = new Component(this.root, "img", ["shopping-image"]);
      (cartImage.root as HTMLImageElement).src =
        "../../assets/png/shopping.png";
      (cartImage.root as HTMLImageElement).alt = "Корзина";

      new Component(this.root, "p", ["cart-empty"], "Корзина пуста");
    } else {
      const cartContainer = new Component(this.root, "div", ["cart-items"]);

      this.goodsInCart.forEach((good) => {
        const cartItem = new Component(cartContainer.root, "div", [
          "cart-item",
        ]);

        const productImage = new Component(cartItem.root, "img", [
          "cart-item-image",
        ]);
        (productImage.root as HTMLImageElement).src = good.photoLink;
        (productImage.root as HTMLImageElement).alt = good.title;

        new Component(cartItem.root, "p", ["cart-item-name"], good.title);
        new Component(
          cartItem.root,
          "p",
          ["cart-item-price"],
          `Цена: ${this.formatPrice(good.price)} byn.`
        );

        const quantityWrapper = new Component(cartItem.root, "div", [
          "cart-item-quantity-wrapper",
        ]);
        const decreaseButton = new Component(
          quantityWrapper.root,
          "button",
          ["cart-item-quantity-button"],
          "-"
        );
        decreaseButton.root.onclick = () => {
          this.decreaseQuantity(good.id);
        };

        const quantityText = new Component(
          quantityWrapper.root,
          "span",
          ["cart-item-quantity"],
          `${good.count}`
        );

        const increaseButton = new Component(
          quantityWrapper.root,
          "button",
          ["cart-item-quantity-button"],
          "+"
        );
        increaseButton.root.onclick = () => {
          this.increaseQuantity(good.id);
        };

        const removeButton = new Component(
          cartItem.root,
          "button",
          ["remove-button"],
          "Удалить"
        );
        removeButton.root.onclick = () => {
          this.removeItemFromCart(good.id);
        };
      });

      // Кнопка "Оформить заказ"
      const orderButton = new Component(
        this.root,
        "button",
        ["order-button"],
        "Оформить заказ"
      );
      orderButton.root.onclick = () => {
        // Заглушка для оформления заказа
        alert("Заказ оформлен");
      };
    }
  }

  removeItemFromCart(goodId: number): void {
    this.service.removeFromCart(goodId);
    this.updateCart();
  }

  increaseQuantity(goodId: number): void {
    this.service.increaseQuantity(goodId);
    this.updateCart();
  }

  decreaseQuantity(goodId: number): void {
    this.service.decreaseQuantity(goodId);
    this.updateCart();
  }

  private formatPrice(price: number): string {
    return (price / 100).toFixed(1).replace(/\.0$/, "");
  }
}

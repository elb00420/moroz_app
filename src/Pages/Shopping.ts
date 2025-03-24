import { Component } from "../Abstract/Component";
import { LogicService } from "../Services/LogicService";
import { TGood } from "../Abstract/Types";

export class Shopping extends Component {
  stateUpdate: boolean = false;
  goodsInCart: TGood[] = [];

  constructor(parent: HTMLElement, private service: LogicService) {
    super(parent, "div", ["shopping-page"]);

    new Component(this.root, "h1", ["shopping-title"], "Корзина");

    const cartImage = new Component(this.root, "img", ["shopping-image"]);
    (cartImage.root as HTMLImageElement).src = "../../assets/png/shopping.png";
    (cartImage.root as HTMLImageElement).alt = "Корзина";

    // Отображаем товары в корзине
    this.updateCart();

    // Слушаем обновление корзины
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
    // Очищаем содержимое корзины перед обновлением
    this.root.innerHTML = ""; // Стираем все содержимое страницы корзины

    // Восстанавливаем структуру корзины
    new Component(this.root, "h1", ["shopping-title"], "Корзина");

    const cartImage = new Component(this.root, "img", ["shopping-image"]);
    (cartImage.root as HTMLImageElement).src = "../../assets/png/shopping.png";
    (cartImage.root as HTMLImageElement).alt = "Корзина";

    // Получаем товары из корзины
    this.goodsInCart = this.service.getCart();

    // Если корзина пуста, отображаем сообщение
    if (this.goodsInCart.length === 0) {
      new Component(this.root, "p", ["cart-empty"], "Корзина пуста");
    } else {
      // Если товары есть в корзине, отображаем их
      const cartContainer = new Component(this.root, "div", ["cart-items"]);
      this.goodsInCart.forEach((good) => {
        const cartItem = new Component(cartContainer.root, "div", [
          "cart-item",
        ]);
        new Component(cartItem.root, "p", ["cart-item-name"], good.title);
        new Component(
          cartItem.root,
          "p",
          ["cart-item-price"],
          `Цена: ${good.price} руб.`
        );

        const removeButton = new Component(
          cartItem.root,
          "button",
          ["remove-button"],
          "Удалить"
        );
        removeButton.root.onclick = () => {
          this.removeItemFromCart(good.id); // Удаляем товар из корзины
        };
      });
    }
  }

  removeItemFromCart(goodId: number): void {
    // Удаляем товар из корзины через сервис
    this.service.removeFromCart(goodId);

    // Перерисовываем корзину, очищая старый контент
    this.updateCart();
  }
}

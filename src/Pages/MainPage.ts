import { Component } from "../Abstract/Component";
import { LogicService } from "../Services/LogicService";

export class Mainpage extends Component {
  stateUpdate: boolean = false;
  constructor(parent: HTMLElement, private service: LogicService) {
    super(parent, "div", ["main-page"]);

    new Component(
      this.root,
      "h1",
      ["main-title"],
      "Добро пожаловать в наш магазин!"
    );

    const btnAuth = new Component(this.root, "button", ["main-button"], "Вход");

    btnAuth.root.onclick = () => {
      window.location.hash = "#auth";
    };
  }
  renderWithUpdate(): void {
    if (!this.stateUpdate) {
      this.update();
      this.stateUpdate = true;
    }
    this.render();
  }

  update(): void {}
}

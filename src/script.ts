import { Component } from "./Abstract/Component";
import { Page } from "./Abstract/Interfaces";
import { DetailsPage } from "./Common/DetailsPage";
import { Footer } from "./Common/Footer";
import { Header } from "./Common/Header";
import { Router } from "./Common/Router";
import { AuthPage } from "./Pages/AuthPage";
import { Favorite } from "./Pages/Favorite";
import { Mainpage } from "./Pages/MainPage";
import { Profile } from "./Pages/Profile";
import { RegPage } from "./Pages/RegPage";
import { Shopping } from "./Pages/Shopping";
import { DBService } from "./Services/DBService";
import { LogicService } from "./Services/LogicService";
import "./style.scss";

declare global {
  interface Window {
    app: App;
  }
}

const dbService = new DBService();

const logicService = new LogicService(dbService);

class App {
  constructor(parent: HTMLElement) {
    const wrapper = new Component(parent, "div", ["wrapper"]);
    new Header(wrapper.root, logicService);
    const main = new Component(wrapper.root, "main", ["main"]);
    const links: Record<string, Page> = {
      "#": new Mainpage(main.root, logicService),
      "#profile": new Profile(main.root, logicService),
      "#shopping": new Shopping(main.root, logicService),
      "#favorite": new Favorite(main.root, logicService),
      "#details": new DetailsPage(main.root, logicService),
      "#auth": new AuthPage(main.root, logicService),
      "#reg": new RegPage(main.root, logicService),
    };

    new Router(links, logicService);

    new Footer(wrapper.root);
  }
}

window.app = new App(document.body);

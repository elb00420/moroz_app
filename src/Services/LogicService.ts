import { Observer } from "../Abstract/Observer";
import { DBService } from "./DBService";
import {
  TGood,
  TTypeField,
  TTypeGood,
  TValueField,
  TGoodResponse,
  TCustomer,
} from "../Abstract/Types";

export class LogicService extends Observer {
  goodsDb: TGoodResponse[] | null = null;
  private currentSortAscending: boolean | null = null;
  userCustomer: TCustomer | null = null;
  private cart: TGood[] = [];

  constructor(private dbService: DBService) {
    super();
    this.loadCart();
  }

  loadCart(): void {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      this.cart = JSON.parse(cartData);
    }
  }

  saveCart(): void {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  async getTypesGoods(): Promise<TTypeGood[]> {
    const data = await this.dbService.getTypesGoods();
    const additionalGoods: TTypeGood[] = [
      {
        id: 1,
        title: "Сыры",
        typeFields: [],
      },
      {
        id: 2,
        title: "Сметана",
        typeFields: [],
      },
    ];
    return [...data.types, ...additionalGoods];
  }

  async updateGoodsByType(idGood: number): Promise<void> {
    if (idGood === 1) {
      const goods = [
        {
          id: 101,
          title: "Сыр Голландский",
          price: 420,
          photoLink: "../../assets/png/golland.png",
          slider: [],
          valueFields: [],
          typeFields: [],
          fields: {},
          count: 10,
          codeCDB: 123,
          orderDB: 1,
        },
        {
          id: 102,
          title: "Сыр Чеддер",
          price: 580,
          photoLink: "../../assets/png/chedder.png",
          slider: [],
          valueFields: [],
          typeFields: [],
          fields: {},
          count: 15,
          codeCDB: 124,
          orderDB: 2,
        },
      ];
      this.goodsDb = goods;
      this.disptach("updateGoodseOnPage", goods);
    } else if (idGood === 2) {
      const goods = [
        {
          id: 201,
          title: "Сметана 20%",
          price: 210,
          photoLink: "../../assets/png/20proc.png",
          slider: [],
          valueFields: [],
          typeFields: [],
          fields: {},
          count: 30,
          codeCDB: 125,
          orderDB: 3,
        },
        {
          id: 202,
          title: "Сметана 15%",
          price: 240,
          photoLink: "../../assets/png/15proc.png",
          slider: [],
          valueFields: [],
          typeFields: [],
          fields: {},
          count: 25,
          codeCDB: 126,
          orderDB: 4,
        },
      ];
      this.goodsDb = goods;
      this.disptach("updateGoodseOnPage", goods);
    } else {
      const data = await this.dbService.getGoodsByType(idGood);
      const goods = data.goods;
      goods.forEach((good) => {
        (good as TGood)["fields"] = this.joinTypesWithValues(
          good.typeFields,
          good.valueFields
        );
      });
      this.goodsDb = goods;

      if (this.currentSortAscending !== null) {
        this.sortGoodsByPrice(this.currentSortAscending, false);
      } else {
        this.disptach("updateGoodseOnPage", goods);
      }
    }
  }

  async updateAllGoods(): Promise<void> {
    const data = await this.dbService.getAllGoods();
    const goods = data.goods;
    goods.forEach((good) => {
      (good as TGood)["fields"] = this.joinTypesWithValues(
        good.typeFields,
        good.valueFields
      );
    });
    this.goodsDb = goods;
    this.disptach("updateGoodseOnPage", goods);
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
    this.disptach("updateGoodseOnPage", this.goodsDb);
  }

  openPageDetails(good: TGood): void {
    this.disptach("updatePageDetails", good);
    window.location.hash = "#details";
  }

  openPageCatalog(): void {
    this.disptach("updateGoodseOnPage");
    window.location.hash = "#favorite";
  }

  addToCart(good: TGood): void {
    const existingGood = this.cart.find((item) => item.id === good.id);

    if (existingGood) {
      existingGood.count += 1;
    } else {
      this.cart.push({ ...good, count: 1 });
    }

    this.saveCart();
    this.updateCart();
  }

  removeFromCart(goodId: number): void {
    this.cart = this.cart.filter((good) => good.id !== goodId);
    this.saveCart();
    this.updateCart();
  }

  increaseQuantity(goodId: number): void {
    const good = this.cart.find((item) => item.id === goodId);
    if (good) {
      good.count += 1;
      this.saveCart();
      this.updateCart();
    }
  }

  decreaseQuantity(goodId: number): void {
    const good = this.cart.find((item) => item.id === goodId);
    if (good && good.count > 1) {
      good.count -= 1;
      this.saveCart();
      this.updateCart();
    }
  }

  getCart(): TGood[] {
    return this.cart;
  }

  updateCart(): void {
    this.disptach("updateCart", this.cart);
  }

  registationCustomer(
    name: string,
    email: string,
    mobile: string,
    operatorType: string,
    adress: string
  ): void {
    this.dbService
      .registationCustomer(name, email, mobile, operatorType, adress)
      .then((response) => {
        if (response) {
          this.disptach("confirm_registration", response);
        } else {
          alert("Сбой регистрации");
        }
      });
  }

  confirmRegistrationCustomer(customerId: string, code: string): void {
    this.dbService
      .confirmRegistrationCustomer(customerId, code)
      .then((response) => {
        if (response) {
          this.disptach("end_registration", response);
        } else {
          alert("Сбой регистрации");
        }
      });
  }

  identificationCustomer(customerId: string): void {
    this.dbService.identificationCustomer(customerId).then((response) => {
      if (response) {
        this.disptach("confirm_identification", response);
      } else {
        alert("Сбой авторизации");
      }
    });
  }

  confirmIdentificationCustomer(customerId: string, code: string): void {
    this.dbService
      .confirmIdentificationCustomer(customerId, code)
      .then((response) => {
        if (response) {
          if (response.error.code == 0) this.userCustomer = response.customer;
          this.disptach("end_identification", response);
        } else {
          alert("Сбой авторизации");
        }
      });
  }

  getUserCustomer(): TCustomer | null {
    return this.userCustomer;
  }
}

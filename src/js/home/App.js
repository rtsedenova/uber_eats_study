const cardsContainer = document.querySelector("#cards-container");
const spinner = document.querySelector("#loader-container");

import { Restaurant, CardInfo } from "./Restaurant";

export default class App {
  #restaurants;
  #currentPage;
  #CardType;

  constructor() {
    this.#currentPage = window.location.pathname;
    this.#restaurants = [];
    this.#CardType = {
      meals: 1,
      restaurants: 2,
    };
  }

  async #showRestaurantPage() {
    await this.initRestaurantsData();
    this.#restaurants.forEach((rest) => {
      const card = this.#createCard(rest.cardInfo, this.#CardType.restaurants);
      cardsContainer.appendChild(card);
    });
  }

  #createCard(cardInfo, cardType) {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = cardInfo.img;
    card.appendChild(img);

    const info = document.createElement("div");
    info.classList.add("info");

    const name = document.createElement("div");
    name.classList.add("name");
    name.textContent = cardInfo.name;

    const desc1 = document.createElement("div");
    desc1.classList.add("desc1");
    desc1.textContent = cardInfo.desc1;

    info.appendChild(name);
    info.appendChild(desc1);

    card.appendChild(info);

    if (cardType == this.#CardType.restaraunts) {
      const desc2 = document.createElement("div");
      desc2.classList.add("desc2");
      desc2.textContent = cardInfo.desc2;

      info.appendChild(desc2);
    }

    return card;
  }

  async initRestaurantsData() {
    const data = await this.fetchData("/src/json/data.json");
    console.log(data);
    data.forEach((rest) => {
      const cardInfo = new CardInfo(
        rest.img,
        rest.name,
        rest.desc1,
        rest.desc2
      );
      const restaraunt = new Restaurant(cardInfo);
      this.#restaurants.push(restaraunt);
    });
  }

  async fetchData(jsonFile) {
    try {
      const response = await fetch(jsonFile);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();

      return jsonData;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  async init() {
    this.initRestaurantsData();
    document.addEventListener("DOMContentLoaded", async () => {
      switch (this.#currentPage) {
        case "/":
          try {
            showSpinner();
            this.#showRestaurantPage();
          } catch (error) {
            console.error("Error initializing app:", error);
          } finally {
            hideSpinner();
          }
          break;
        case "/pages/restDetails.html":
          break;
      }
    });
  }
}

function showSpinner() {
  spinner.classList.remove("hidden");
  cardsContainer.classList.add("hidden");
}

function hideSpinner() {
  spinner.classList.add("hidden");
  cardsContainer.classList.remove("hidden");
}

import { Restaurant, CardInfo, Meal, MealCardInfo } from "./home/Restaurant";

const cardsContainer = document.querySelector("#cards-container");
const spinner = document.querySelector("#loader-container");

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

    if (cardType == this.#CardType.restaurants) {
      const desc2 = document.createElement("div");
      desc2.classList.add("desc2");
      desc2.textContent = cardInfo.desc2;

      info.appendChild(desc2);
    }

    return card;
  }

  transition() {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.addEventListener("click", (e) => {
        const selectedCard = e.currentTarget;
        const selectedCardInfo = {
          img: selectedCard.querySelector("img").getAttribute("src"),
          name: selectedCard.querySelector(".name").textContent,
          desc1: selectedCard.querySelector(".desc1").textContent,
          desc2: selectedCard.querySelector(".desc2").textContent,
        };
        sessionStorage.setItem(
          "selectedCardInfo",
          JSON.stringify(selectedCardInfo)
        );
        window.location.href = "pages/restDetails.html";
      });
    });
  }

  async #fetchData(jsonFile) {
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

  async #initRestaurantsData() {
    try {
      const data = await this.#fetchData("/src/json/data.json");
      const menuData = await this.#fetchData("/src/json/menu.json");

      menuData.forEach((menu) => {
        const restaurantId = menu.id;
        console.log(menu.id);
        for (const blockName of Object.keys(menu.blocks)) {
          const block = menu.blocks[blockName];
          block.forEach(({ b_name, items_list }) => {
            items_list.forEach(({ id, item_name, price, item_img }) => {
              const cardInfo = new MealCardInfo(
                restaurantId,
                item_name,
                price,
                item_img
              );
              const meal = new Meal(cardInfo);
              console.log(meal);
            });
          });
        }
      });

      data.forEach((rest) => {
        const cardInfo = new CardInfo(
          rest.id,
          rest.img,
          rest.name,
          rest.desc1,
          rest.desc2
        );
        const restaurant = new Restaurant(cardInfo);

        this.#restaurants.push(restaurant);
      });
    } catch (error) {
      console.error("Error initializing restaurants:", error);
      throw error;
    }
  }

  async #showHomePage() {
    await this.#initRestaurantsData();
    this.#restaurants.forEach((rest) => {
      const card = this.#createCard(rest.cardInfo, this.#CardType.restaurants);
      this.transition();
      cardsContainer.appendChild(card);
    });
  }

  #showRestaurantPage() {
    this.#showRestaurantInfo();
  }

  #showRestaurantInfo() {
    const restInfoContainer = document.querySelector(".restaurant-info");

    const selectedCardInfo = JSON.parse(
      sessionStorage.getItem("selectedCardInfo")
    );
    const url = selectedCardInfo.img;

    const nameText = selectedCardInfo.name;
    const desc1Text = selectedCardInfo.desc1;
    const desc2Text = selectedCardInfo.desc2;

    const img = document.createElement("img");
    img.classList.add("bg-image");
    img.src = url;

    const info = document.createElement("div");
    info.classList.add("info_2");

    const name = document.createElement("div");
    name.classList.add("name_2");
    name.textContent = nameText;

    const rowInfo = document.createElement("div");
    rowInfo.classList.add("row-info");

    const desc1 = document.createElement("div");
    desc1.classList.add("desc1_2");
    desc1.textContent = desc1Text;

    const desc2 = document.createElement("div");
    desc2.classList.add("desc2_2");
    desc2.textContent = desc2Text;

    rowInfo.appendChild(desc1);
    rowInfo.appendChild(desc2);

    info.appendChild(name);
    info.appendChild(rowInfo);

    restInfoContainer.appendChild(img);
    restInfoContainer.appendChild(info);
  }

  #showSpinner() {
    spinner.classList.remove("hidden");
    cardsContainer.classList.add("hidden");
  }

  #hideSpinner() {
    spinner.classList.add("hidden");
    cardsContainer.classList.remove("hidden");
  }

  async init() {
    // this.initRestaurantsData();
    document.addEventListener("DOMContentLoaded", async () => {
      switch (this.#currentPage) {
        case "/":
          try {
            this.#showSpinner();
            this.#showHomePage();
          } catch (error) {
            console.error("Error initializing app:", error);
          } finally {
            this.#hideSpinner();
          }
          break;

        case "/pages/restDetails.html":
          try {
            document.addEventListener("DOMContentLoaded", () => {
              this.#showSpinner();
            });
            this.#showRestaurantPage();
          } catch (error) {
            console.error("Error initializing app:", error);
          } finally {
            document.addEventListener("DOMContentLoaded", () => {
              this.#hideSpinner();
            });
          }
          break;
      }
    });
  }
}

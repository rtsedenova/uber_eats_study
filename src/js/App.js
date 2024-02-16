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

    card.setAttribute("data-id", cardInfo.id);

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
        const selectedRestaurant = this.#restaurants.find(
          (rest) => rest.cardInfo.id === parseInt(selectedCard.dataset.id)
        );
        sessionStorage.setItem(
          "selectedRestaurant",
          JSON.stringify(selectedRestaurant)
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

      data.forEach((rest) => {
        const cardInfo = new CardInfo(
          rest.id,
          rest.img,
          rest.name,
          rest.desc1,
          rest.desc2
        );
        const restaurant = new Restaurant(cardInfo);

        const menuForRestaurant = menuData.find((menu) => menu.id === rest.id);

        if (menuForRestaurant) {
          const meals = [];

          for (const blockName of Object.keys(menuForRestaurant.blocks)) {
            const block = menuForRestaurant.blocks[blockName];
            block.forEach(({ b_name, items_list }) => {
              items_list.forEach(({ item_name, price, item_img }) => {
                const mealCardInfo = new MealCardInfo(
                  rest.id,
                  b_name,
                  item_name,
                  price,
                  item_img
                );

                meals.push(mealCardInfo);
              });
            });
          }

          restaurant.meals = meals;
        }

        this.#restaurants.push(restaurant);
      });

      sessionStorage.setItem("restaurants", JSON.stringify(this.#restaurants));
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
    this.#showRestaurantMenu();
  }

  #showRestaurantInfo() {
    const restInfoContainer = document.querySelector(".restaurant-info");

    const selectedRestaurant = JSON.parse(
      sessionStorage.getItem("selectedRestaurant")
    );
    const url = selectedRestaurant.cardInfo.img;

    const nameText = selectedRestaurant.cardInfo.name;
    const desc1Text = selectedRestaurant.cardInfo.desc1;
    const desc2Text = selectedRestaurant.cardInfo.desc2;

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

  #showRestaurantMenu() {
    const menuNav = document.getElementById("menuNav");
    const selectedRestaurant = JSON.parse(
      sessionStorage.getItem("selectedRestaurant")
    );

    const addedBNames = new Set();

    selectedRestaurant.meals.forEach((el) => {
      if (!addedBNames.has(el.b_name)) {
        const menuSectionName = document.createElement("a");
        menuSectionName.setAttribute("href", "");
        menuSectionName.textContent = el.b_name;

        menuNav.appendChild(menuSectionName);

        addedBNames.add(el.b_name);
      }
    });
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

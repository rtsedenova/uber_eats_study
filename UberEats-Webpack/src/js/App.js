import { Restaurants } from "./Cards";

const cardsContainer = document.querySelector("#cards-container");
const spinner = document.querySelector("#loader-container");

export default class App {
  constructor(jsonData) {
    this.currentPage = window.location.pathname;
    this.restaurantsData = jsonData;
    this.restaurants = new Restaurants();
  }

  async init() {
    document.addEventListener("DOMContentLoaded", async () => {
      switch (this.currentPage) {
        case "/":
          try {
            showSpinner();
            await this.restaurants.initialize();
          } catch (error) {
            console.error("Error initializing app:", error);
          } finally {
            hideSpinner();
          }
          break;
        case "/pages/restaurantDetailsPage.html":
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

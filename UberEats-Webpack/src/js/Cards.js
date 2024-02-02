class FetchData {
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
}

class Restaurants {
  constructor() {
    this.restaurantsData = [];
    this.fetchDataRest = new FetchData();
  }

  async initialize() {
    try {
      this.restaurantsData = await this.fetchDataRest.fetchData(
        "./json/data.json"
      );

      this.createRestaurantCards();
    } catch (error) {
      console.error("Error initializing data:", error);
    }
  }

  createRestaurantCards() {
    const cardsContainer = document.querySelector("#cards-container");

    function createRestaurantCard(restaurant) {
      const card = document.createElement("div");
      card.classList.add("card");

      const img = document.createElement("img");
      img.src = restaurant.img;
      card.appendChild(img);

      const info = document.createElement("div");
      info.classList.add("info");

      const name = document.createElement("div");
      name.classList.add("name");
      name.textContent = restaurant.name;

      const desc1 = document.createElement("div");
      desc1.classList.add("desc1");
      desc1.textContent = restaurant.desc1;

      const desc2 = document.createElement("div");
      desc2.classList.add("desc2");
      desc2.textContent = restaurant.desc2;

      info.appendChild(name);
      info.appendChild(desc1);
      info.appendChild(desc2);

      card.appendChild(info);

      return card;
    }

    this.restaurantsData.forEach((restaurant) => {
      const card = createRestaurantCard(restaurant);
      cardsContainer.appendChild(card);
    });
  }
}

export { Restaurants, FetchData };

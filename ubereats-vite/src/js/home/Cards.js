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

class Cards {
  constructor() {
    this.restaurantsData = [];
    this.fetchDataRest = new FetchData();
  }

  async initialize() {
    try {
      this.restaurantsData = await this.fetchDataRest.fetchData(
        "/src/json/data.json"
      );
      console.log("../../json/data.json");
      console.log(this.restaurantsData);

      this.createRestaurantCards();
      this.transition();
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

  giveCardIndex() {
    const cards = document.querySelectorAll(".card");

    cards.forEach((card, index) => {
      card.addEventListener("click", () => {
        this.transition(index);
      });
    });
  }

  transition(index) {
    const selectedRestaurant = this.restaurantsData[index];
    localStorage.setItem(
      "selectedRestaurant",
      JSON.stringify(selectedRestaurant)
    );
    window.location.href = "./pages/restDetails.html";
  }

  displayRestaurantDetails() {
    const selectedRestaurant = JSON.parse(
      localStorage.getItem("selectedRestaurant")
    );
    const restInfo = document.querySelector(".restaurant-info");

    const bgImage = document.createElement("img");
    bgImage.classList.add("bg-image");
    bgImage.src = selectedRestaurant.img;

    const infoContainer = document.createElement("div");
    infoContainer.classList.add("info_2");

    const nameDiv = document.createElement("div");
    nameDiv.classList.add("name_2");
    nameDiv.textContent = selectedRestaurant.name;

    const rowInfo = document.createElement("div");
    rowInfo.classList.add("row-info");

    const desc1Div = document.createElement("div");
    desc1Div.classList.add("desc1_2");
    desc1Div.textContent = selectedRestaurant.desc1;

    const desc2Div = document.createElement("div");
    desc2Div.classList.add("desc2_2");
    desc2Div.textContent = selectedRestaurant.desc2;

    rowInfo.appendChild(desc1Div);
    rowInfo.appendChild(desc2Div);

    infoContainer.appendChild(nameDiv);
    infoContainer.appendChild(rowInfo);

    restInfo.appendChild(bgImage);
    restInfo.appendChild(infoContainer);
  }
}

export { Cards, FetchData };

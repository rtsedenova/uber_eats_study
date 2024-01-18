const global = {
  currentPage: window.location.pathname,
};

const cardsContainer = document.querySelector("#cards-container");
const spinner = document.querySelector("#loader-container");

// Display Cards (Home Page)
function showCards() {
  showSpinner();

  fetchData().then((results) => {
    results.forEach((item) => {
      const card = createCard(item);
      cardsContainer.appendChild(card);
    });

    hideSpinner();
  });
}

// Spinner
function showSpinner() {
  spinner.classList.remove("hidden");
  cardsContainer.classList.add("hidden");
}

function hideSpinner() {
  spinner.classList.add("hidden");
  cardsContainer.classList.remove("hidden");
}

// Create Card
function createCard(item) {
  const card = document.createElement("div");
  card.classList.add("card");

  const img = document.createElement("img");
  img.src = item.img;
  card.appendChild(img);

  const info = document.createElement("div");
  info.classList.add("info");

  const name = document.createElement("div");
  name.classList.add("name");
  name.textContent = item.name;

  const desc1 = document.createElement("div");
  desc1.classList.add("desc1");
  desc1.textContent = item.desc1;

  const desc2 = document.createElement("div");
  desc2.classList.add("desc2");
  desc2.textContent = item.desc2;

  info.appendChild(name);
  info.appendChild(desc1);
  info.appendChild(desc2);

  card.appendChild(info);

  card.addEventListener("click", () => {
    transition({
      img: item.img,
      name: item.name,
      desc1: item.desc1,
      desc2: item.desc2,
    });
  });

  return card;
}

function transition(cardInfo) {
  const queryString = new URLSearchParams(cardInfo).toString();
  window.location.href = `page.html?${queryString}`;
}

// Restaurant Details
function displayRestaurantDetails() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const restInfo = document.querySelector(".restaurant-info");

  restInfo.innerHTML = `
      <img class="bg-image" src="${urlParams.get("img")}"/>
        
      <div class="info_2">
          <div class="name_2">${urlParams.get("name")}</div>
          <div class="row-info">
              <div class="desc1_2">${urlParams.get("desc1")}</div>
              <div class="desc2_2">${urlParams.get("desc2")}</div>
          </div>
      </div>
    `;
}

// Fetch Data
async function fetchData() {
  try {
    const response = await fetch("json/data.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function init() {
  switch (global.currentPage) {
    case "/":
      showHomePage();
      console.log("Home");
      break;
    case "/page.html":
      showRestaurantPage();
      console.log("Page");
      break;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  init();
});

function showHomePage() {
  showCards();
}

function showRestaurantPage() {
  pageData();
}

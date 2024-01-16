const global = {
  currentPage: window.location.pathname,
};

const cardsContainer = document.querySelector(".cards-container");

async function showCards() {
  const results = await fetchData();
  results.forEach((item) => {
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

    cardsContainer.appendChild(card);
  });
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
      showCards();
      console.log("Home");
      break;
    case "/page.html":
      console.log("Page");
      break;
  }
}

document.addEventListener("DOMContentLoaded", init);

const cardsContainer = document.querySelector(".cards-container");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const cardsPerPage = 8;
let currentPage = 1;
let data;

// Fetch Data
async function fetchData() {
  try {
    const response = await fetch("json/data.json");
    data = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Create Cards
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

  return card;
}

// Display Cards
function displayCards() {
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const visibleData = data.slice(startIndex, endIndex);

  cardsContainer.innerHTML = "";

  visibleData.forEach((item) => {
    const card = createCard(item);
    cardsContainer.appendChild(card);
  });
}

// Update Pagination Button Status
function updatePaginationBtns() {
  const totalPages = Math.ceil(data.length / cardsPerPage);

  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;
}

// Pagination
function displayPagination(event) {
  if (event.target.id === "prev" && currentPage > 1) {
    currentPage--;
  } else if (
    event.target.id === "next" &&
    currentPage < Math.ceil(data.length / cardsPerPage)
  ) {
    currentPage++;
  }

  displayCards();
  updatePaginationBtns();
}

function resize() {
  displayCards();
}

prevButton.addEventListener("click", displayPagination);
nextButton.addEventListener("click", displayPagination);
window.addEventListener("resize", resize);

// Init
fetchData().then(() => {
  displayCards();
  updatePaginationBtns();
});

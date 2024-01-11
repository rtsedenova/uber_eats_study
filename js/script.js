document.addEventListener("DOMContentLoaded", function () {
  //Fetch Data
  fetch("json/data.json")
    .then((response) => response.json())
    .then((data) => {
      const cardsContainer = document.querySelector(".cards-container");

      // Create Cards
      data.forEach((item) => {
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
    })
    .catch((error) => console.error("Error fetching data:", error));
});

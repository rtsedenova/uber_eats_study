import "../css/restDetails.css";

import menuJson from "../json/menu.json";
console.log(menuJson);

// Импорт изображений ресторанов
const restaurantImages = import.meta.glob(
  "../images/restImages/*.{jpg,jpeg,png,svg}"
);
Object.values(restaurantImages).forEach((image) => image());

// Импорт изображений меню
const menuImages = import.meta.glob(
  "../images/menuImages/*.{jpg,jpeg,png,svg}"
);
Object.values(menuImages).forEach((image) => image());

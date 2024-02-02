// Импортируем все файлы из папки restaurantsImages
const requireRestaurantImages = require.context(
  "./restaurantsImages",
  true,
  /\.(jpg|jpeg|png|svg)$/
);
requireRestaurantImages.keys().forEach(requireRestaurantImages);

// Импортируем все файлы из папки menuImages
const requireMenuImages = require.context(
  "./menuImages",
  true,
  /\.(jpg|jpeg|png|svg)$/
);
requireMenuImages.keys().forEach(requireMenuImages);

import "./css/style.css";
import json from "./json/data.json";
console.log(json);
import Cards from "./js/Cards.js";
import App from "./js/App.js";

const app = new App(json);
app.init();

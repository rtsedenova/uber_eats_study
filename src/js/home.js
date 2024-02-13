import "../css/style.css";
import json from "../json/data.json";
console.log(json);

const restaurantImages = import.meta.glob(
  "../images/restaurantsImages/*.{jpg,jpeg,png,svg}"
);
Object.values(restaurantImages).forEach((image) => image());

const menuImages = import.meta.glob(
  "../images/menuImages/*.{jpg,jpeg,png,svg}"
);
Object.values(menuImages).forEach((image) => image());

import App from "./home/App.js";
import { Cards } from "./home/Cards.js";

const app = new App(json);
app.init();

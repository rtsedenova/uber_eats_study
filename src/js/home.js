import "../css/style.css";

import json from "../json/data.json";
console.log(json);

const restaurantImages = import.meta.glob(
  "../images/restImages/*.{jpg,jpeg,png,svg}"
);
Object.values(restaurantImages).forEach((image) => image());

import App from "./App.js";

const app = new App(json);
app.init();

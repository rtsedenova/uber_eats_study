import { resolve } from "path";

const pages = [
  { name: "home", path: resolve(__dirname, "../index.html") },
  {
    name: "restDetails",
    path: resolve(__dirname, "../pages/restDetails.html"),
  },
];

export default pages;

class Restaurant {
  constructor(cardInfo) {
    this.cardInfo = cardInfo;
    this.meals = [];
  }

  addMeal(meal) {
    this.meals.push(meal);
  }
}

class CardInfo {
  constructor(id, img, name, desc1, desc2, item_name, price, item_img) {
    this.id = id;
    this.img = img;
    this.name = name;
    this.desc1 = desc1;
    this.desc2 = desc2;
    this.item_name = item_name;
    this.item_img = item_img;
    this.price = price;
  }
}

class Meal {
  constructor(cardInfo) {
    this.cardInfo = cardInfo;
  }
}

class MealCardInfo {
  constructor(restaurantId, b_name, item_name, price, item_img) {
    this.restaurantId = restaurantId;
    this.b_name = b_name;
    this.item_name = item_name;
    this.price = price;
    this.item_img = item_img;
  }
}

export { Restaurant, CardInfo, Meal, MealCardInfo };

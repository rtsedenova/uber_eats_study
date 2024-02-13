class Restaurant {
  constructor(cardInfo) {
    this.cardInfo = cardInfo;
    let meals = [];
  }
}

class CardInfo {
  constructor(img, name, desc1, desc2) {
    this.img = img;
    this.name = name;
    this.desc1 = desc1;
    this.desc2 = desc2;
  }
}

export { Restaurant, CardInfo };

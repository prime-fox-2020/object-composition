class Cookie {
  constructor(name, ingredients) {
    this.name = name;
    this.status = 'mentah';
    this.ingredients = ingredients;
    this.has_sugar = this.sugarCheck();
  }

  bake() {
    this.status = 'selesai dimasak';
  }

  sugarCheck() {
    for (let i = 0; i < this.ingredients.length; i++) {
      if (this.ingredients[i].name === 'sugar') return true;
    }
    return false;
  }
}

class PeanutButter extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients);
    this.peanut_count = 100;
  }
}

class ChocolateChip extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients);
    this.choc_chip_count = 200;
  }
}

class OtherCookie extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients);
    this.other_count = 150;
  }
}

class ChocolateChipCrumbled extends ChocolateChip {
  constructor(name, ingredients) {
    super(name, ingredients);
    this.choc_chip_count = 100;
  }
}

class PeanutButterCrumbled extends PeanutButter {
  constructor(name, ingredients) {
    super(name, ingredients);
    this.peanut_count = 100;
  }
}

class CookieFactory {
  static create(cookies, ing) {
    let array = [];
    for (let i = 0; i < cookies.length; i++) {
      let ingredient = this.ingredient(ing[i]);
      switch (cookies[i]) {
        case 'peanut butter': array.push(new PeanutButter(cookies[i], ingredient)); break;
        case 'chocolate chip': array.push(new ChocolateChip(cookies[i], ingredient)); break;
        case 'chocolate chip crumbled': array.push(new ChocolateChipCrumbled(cookies[i], ingredient)); break;
        case 'peanut butter crumbled': array.push(new PeanutButterCrumbled(cookies[i], ingredient)); break;
        default: array.push(new OtherCookie(cookies[i], ingredient)); break;
      }
    }
    return array;
  }

  static ingredient(ing) {
    let ingredients = ing.split(' = ')[1];
    let main = ingredients.split(', ');
    let arrayIngredients = [];
    for (let i = 0; i < main.length; i++) {
      let temp = main[i].split(' : ');
      let obj = {name: temp[1], amount: temp[0]};
      arrayIngredients.push(new Ingredient(obj));
    }
    return arrayIngredients;
  }

  static cookieRecomendation(day, listCookies) {
    let arrayCookies = [];
    if (day === 'tuesday') {
      for (let i = 0; i < listCookies.length; i++) {
        if (!listCookies[i].has_sugar) {
          arrayCookies.push(listCookies[i]);
        }
      }
    }
    
    return arrayCookies;
  }
}

class Ingredient {
  constructor(options) {
    this.name = options['name'];
    this.amount = options['amount'];
  }
}

const fs = require('fs');
let options = fs.readFileSync('./cookies.txt', 'utf8').split('\n');
let ingredients = fs.readFileSync('./ingredients.txt', 'utf8').split('\n');
let batch_of_cookies = CookieFactory.create(options, ingredients);
console.log(batch_of_cookies);

let sugarFreeFoods = CookieFactory.cookieRecomendation('tuesday', batch_of_cookies);
console.log('sugar free cakes are:');
for (let i = 0; i < sugarFreeFoods.length; i++) {
  console.log(sugarFreeFoods[i].name);
}

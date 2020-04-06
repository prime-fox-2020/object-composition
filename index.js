const fs = require('fs');
const cakes = fs.readFileSync('./cookies.txt', 'utf8').split('\n');

class Ingredients {
  constructor(options) {
    this.name = options [1].trim();
    this.amount = options [0].trim();
  }
}


class Cookie {
  constructor(name, ingredients) {
    this.name = name;
    this.status = "mentah";
    this.ingredients = this.ingredientList(ingredients);
  }

  bake() {
    this.status = "selesai dimasak";
  }

  ingredientList(ingredients){
    const arr = [];
    for(let ingredient of ingredients){
      arr.push(new Ingredients(ingredient.split(':')));
    }
    return arr;
  }
}

class PeanutButter extends Cookie {
  constructor(name, ingredient) {
    super(name, ingredient);
    this.peanut_count = 100;
  }
}

class ChocolateChip extends Cookie {
  constructor(name, ingredient){
    super(name, ingredient);
    this.choc_chip_count = 200;
  }
}

class OtherCookie extends Cookie{
  constructor(name, ingredient) {
    super(name, ingredient);
    this.other_cookie_count = 150;
  }
}

class CookieFactory {
  //define other methods as method
  static create(cookies) {
    const cookiesGroup = [];
    for(let cookie of cookies){
      const kue = cookie.slice(0, cookie.indexOf(' = ')),
            ingredient = cookie.slice(cookie.indexOf(' = ') + 2).split(',');
      switch(kue) {
        case 'peanut butter' : cookiesGroup.push(new PeanutButter(kue, ingredient)); break;
        case 'chocolate chip' : cookiesGroup.push(new ChocolateChip(kue, ingredient)); break;
        default : cookiesGroup.push(new OtherCookie(kue, ingredient)); break;
      }
    }
    return cookiesGroup;
  }

  static cookieRecomendation(day, cookies){
    const arr = [];
    for(let cookie of cookies){
      let check = true;
      for(let ingredient of cookie.ingredients){
        const amountOf = parseInt(ingredient.amount);
        switch(day){
          case 'sunday' : 
            if(ingredient.name === 'chips') check = false;
            break;
          case 'tuesday' : 
            if(ingredient.name === 'sugar') check = false;
            break;
          case 'wednesday' : 
            if(ingredient.name === 'sugar' && amountOf > 1) check = false;
            break;
          case 'friday' : 
            if(ingredient.name === 'peanut butter') check = false;
            break;
        }
      }
      if(check) arr.push(cookie);
    }
    return arr;
  }
}

const batch_of_cookies = CookieFactory.create(cakes);
console.log(batch_of_cookies);

let sugarFreeFoods = CookieFactory.cookieRecomendation('tuesday', batch_of_cookies);
console.log('sugar free cakes are : ');
for(let food of sugarFreeFoods) console.log(food.name);
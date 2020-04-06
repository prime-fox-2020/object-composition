"use strict";

let fs = require('fs');
let options = { makeFile: './cookies.txt', ingredientsFile: './ingredients.txt' };

class Cookie {
  constructor(name = '') {
    this.name = name;
    this.status = 'mentah';
    this.has_sugar = false;
    this.ingredients = [];
  }

  parseIngredients(str) {
    let ingredientStrArray = str.split(',');
    for (let i = 0; i < ingredientStrArray.length; i++) {
      let ingredientSplittedArray = ingredientStrArray[i].split(':');
      let ingredientAmount = ingredientSplittedArray[0].trim();
      let ingredientName = ingredientSplittedArray[1].trim();
      this.ingredients.push(new Ingredient({ name: ingredientName, amount: ingredientAmount }));
      if (ingredientName.toLowerCase() === 'sugar') this.has_sugar = true;
    }
  }

  bake() {
    this.status = 'selesai dimasak';
  }
}

class PeanutButter extends Cookie {
  constructor(name = '') {
    super(name);
    this.countPeanut = 100;
  }
}

class ChocolateChip extends Cookie {
  constructor(name = '') {
    super(name);
    this.countChocoChips = 100;
  }
}

class OtherCookie extends Cookie {
  constructor(name = '') {
    super(name);
    this.other_count = 150;
  }
}

class CookieFactory {
  static create(cookies) {
    let makeCookieList = fs.readFileSync(cookies.makeFile, 'utf-8').split('\r\n');
    let ingredientsList = fs.readFileSync(cookies.ingredientsFile, 'utf-8').split('\r\n');
    let result = [];
    for (let i = 0; i < makeCookieList.length; i++) {
      let matchedCookies;
      if (makeCookieList[i] === 'peanut butter') {
        matchedCookies = new PeanutButter(makeCookieList[i]);
      } else if (makeCookieList[i] === 'chocolate chip') {
        matchedCookies = new ChocolateChip(makeCookieList[i]);
      }
      else {
        matchedCookies = new OtherCookie(makeCookieList[i]);
      }
      for (let j = 0; j < ingredientsList.length; j++) {
        let cookieStrBuffer = ingredientsList[j].split('=');
        let cookieName = cookieStrBuffer[0].trim();
        let ingredientsStr = cookieStrBuffer[1].trim();
        if (cookieName == makeCookieList[i]) {
          matchedCookies.parseIngredients(ingredientsStr);
        }
      }
      result.push(matchedCookies);
    }
    return result;
  }

  static cookieRecomendation(day, cookieList) {
    if (day === 'tuesday') {
      let result = [];
      for (let i = 0; i < cookieList.length; i++) {
        if (!cookieList[i].has_sugar) {
          result.push(cookieList[i]);
        }
      }
      return result;
    } else {
      return cookieList;
    }
  }
}

let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies);


let sugarFreeData = CookieFactory.cookieRecomendation('tuesday', batch_of_cookies);
let sugarFreeFoods = sugarFreeData[0].name.split('\n');
// for (let i = 0; i < sugarFreeFoods.length; i++) {
//   sugarFreeArr.push(sugarFreeFoods[i].name);
// }
console.log('\n\n\nsugar free cakes are: ', sugarFreeFoods);
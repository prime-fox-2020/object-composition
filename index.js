// globale variable
const fs = require("fs");
let resCookieList = [];
//[peanut butter, [[flour, 1],[sugar, 2], [peanut butter, 2], [cinammon, 1], [butter, 2]]]
let option = fs.readFileSync("cookies.txt", "utf8").split("\n");
// let batch_of_cookies = CookieFactory.create(option);
// console.log(option);

class Ingredients{
 constructor(option) {
   this.name = option[1];
   this.amount = option[0];
 }

}

//===============================================================================
class Cookie {
  constructor(ingredients) {
    this.ingredients = ingredients;
    this.status = "mentah";
  }

  bake() {
    this.status = "selesai dimasak"
  }

  static cekSugar() {

    for (var i = 0; i < this.ingredients.length; i++) {
      for(let j = 0; j< this.ingredients[i]; j++) {
        if (this.ingredients[i].name === " sugar") {
          return true;
        }
      }
    }
    return false;
  }

}

//================================================================================
//type of cookies
class PeanutButter extends Cookie {
  constructor(ingredients) {
    super(ingredients);
    this.name = "Peanut Butter";
    this.peanut_count = 100;
  }
}

class ChocolateChip extends Cookie {
  constructor(ingredients) {
    super(ingredients);
    this.name = "Chocolate chip";
      this.choc_chip_count = 200;
  }
}

class OtherCookie extends Cookie {
  constructor(name, ingredients) {
    super(ingredients);
    this.name = name;
    this.other_cookie_count = 150;
  }
}

//================================================================================
//class to save cookies list and read cookies list
class CookieFactory {

  static create(option) {
    let ingredientsList = [];
      for(let a = 0; a < option.length-1; a++){
        let temp1 = option[a].split(' = ');
        let temp2 = [temp1[0], temp1[1].split(', ')]
        let temp3 = [temp2[0], []];
          for(let b = 0; b < temp2[1].length; b++){
            temp3[1].push(temp2[1][b].split(' : '));
          }
        ingredientsList.push(temp3);
      }

      for(let i= 0; i < ingredientsList.length; i++ ) {
      switch (ingredientsList[i][0]) {
          case "peanut butter":
          let bahan1= [];
          for (let j = 0; j < ingredientsList[i][1].length; j++) {
            bahan1.push(new Ingredients(ingredientsList[i][1][j]));
          }
          resCookieList.push(new PeanutButter(bahan1)); break;

          case "chocolate chip":
          let bahan2= [];
          for (let j = 0; j < ingredientsList[i][1].length; j++) {
            bahan2.push(new Ingredients(ingredientsList[i][1][j]));
          }
          resCookieList.push(new ChocolateChip(bahan2)); break;

          default:
          let bahan3= [];
          for (let j = 0; j < ingredientsList[i][1].length; j++) {
            bahan3.push(new Ingredients(ingredientsList[i][1][j]));
          }
          resCookieList.push(new OtherCookie(ingredientsList[i][0],bahan3)); break;
        }
      }
      // return resCookieLis;
    }

//==== END ======================================================================
}
CookieFactory.create(option);
console.log(resCookieList);

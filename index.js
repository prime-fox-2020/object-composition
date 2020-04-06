class Cookie {
    constructor(name, ingredients) {
        this.name = name;
        this.status = 'mentah';
        this.ingredients = ingredients;
    }

    bake() {
        this.status = 'selesai dimasak';
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

class Ingredient {
    constructor(option) {
        this.name = option['name'];
        this.amount = option['amount'];
    }
}

class CookieFactory {
    static create(option) {
        let cookieList = [];
        for (let a = 0; a < option.length; a++) {
            let cookieName = option[a].split(' = ')[0];
            let ingredientName = option[a].split(' = ')[1].split(', ');
            let getIngredients = [];

            for (let b = 0; b < ingredientName.length; b++) {
                let name = ingredientName[b].split(': ')[1];
                let amount = ingredientName[b].split(' :')[0];
                let object = { name: name, amount: amount };
                let ingredients = new Ingredient(object);
                getIngredients.push(ingredients);
            }

            if (cookieName == 'peanut butter') {
                cookieList.push(new PeanutButter(cookieName, getIngredients));
            } else if (cookieName == 'chocolate chip') {
                cookieList.push(new ChocolateChip(cookieName, getIngredients));
            } else {
                cookieList.push(new OtherCookie(cookieName, getIngredients));
            }
        }
        return cookieList;
    }

    static recommend(day, option) {
        for (let a = 0; a < option.length; a++) {
            let check = true;
            let ingredient = option[a].ingredients;
            for (let b = 0; b < ingredient.length; b++) {
                if (day = 'tuesday') {
                    if (ingredient[b].name == 'sugar') {
                        check = false;
                    }
                }
            }
            if (check) {
                return `${option[a].name}`;
            }
        }
    }
}

const fs = require('fs');
let options = fs.readFileSync('cookies.txt', 'utf8').split('\n');

let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies);

let cookieRec = CookieFactory.recommend('tuesday', batch_of_cookies);
console.log('Cookies recommendations are :');
console.log(cookieRec);

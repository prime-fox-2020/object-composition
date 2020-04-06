'use strict'

class Cookie {
    constructor(name, ingredients) {
        this.name = name;
        this.status = 'mentah';
        this.ingredients = ingredients;
        this.amount = 0;
    }

    bake(qty) {
        this.status = 'selesai dimasak';
        this.amount = qty;
        return this;
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
        this.choc_chip_count = 150;
    }
}

class Ingredients {
    constructor(name, amount) {
        this.name = name;
        this.amount = amount;
    }

    extractIngredients() {
        let fs = require('fs');
        let ingredients = fs.readFileSync('./ingredients.txt', 'utf8').split('\n');
        let IngrdObj = {};
        for (let i in ingredients) {
            let atributs = ingredients[i].split('=');
            if (atributs[0] == this.name) {
                let temp = atributs[1].split(',');
                for (let j in temp) {
                    let temp2 = temp[j].split(':');
                    let temp3 = temp2[1].split(' ');
                    let qty = Number(temp3[0]) * this.amount;
                    if (temp3[1] !== 'tsp') qty > 1 ? temp3[1] += 's' : temp3[1];
                    IngrdObj[temp2[0]] = `${qty} ${temp3[1]}`;
                }
                break;
            }
        }
        return IngrdObj;
    }
}

class CookieFactory {
    static create(cookies) {
        let allCookies = [];
        for (let i in cookies) {
            if (cookies[i] == 'peanut butter') allCookies.push(new PeanutButter(cookies[i], new Ingredients(cookies[i], 1).extractIngredients()));
            else if (cookies[i] == 'chocolate chip') allCookies.push(new ChocolateChip(cookies[i], new Ingredients(cookies[i], 1).extractIngredients()));
            else allCookies.push(new OtherCookie(cookies[i], new Ingredients(cookies[i], 1).extractIngredients()));
        }
        return allCookies;
    }

    static baked(cookies){
        let allCookies = [];
        for (let i in cookies){
            let cook = cookies[i].split('=');
            if (cook[1] !== '0'){
                if (cook[0] == 'peanut butter') allCookies.push(new PeanutButter(cook[0], new Ingredients(cook[0], +cook[1]).extractIngredients()).bake(+cook[1]));
                else if (cook[0] == 'chocolate chip') allCookies.push(new ChocolateChip(cook[0], new Ingredients(cook[0], +cook[1]).extractIngredients()).bake(+cook[1]));
                else allCookies.push(new OtherCookie(cookies[i], new Ingredients(cook[0], +cook[1]).extractIngredients()).bake(+cook[1]));
            }
        }
        for (let i in cookies) {
        }
        return allCookies;
    }

    static cookieRecommendation(day, cookies) {
        let show = [];
        if (day == 'tuesday'){
            for (let i in cookies){
                if (!cookies[i].ingredients['sugar']) show.push(cookies[i]);
            }
        }
        return show;
    }

}

let fs = require('fs');
let options = fs.readFileSync('./cookies.txt', 'utf8').split('\n');

let batch_of_cookies = CookieFactory.create(options);
console.log(`=====================================================`);
console.log(`                   COOKIES LIST`);
console.log(`=====================================================`);
console.log(batch_of_cookies);
console.log();

let sugarFreeFoods = CookieFactory.cookieRecommendation('tuesday', batch_of_cookies);
console.log(`=====================================================`);
console.log(`                 FREE SUGAR CAKE`);
console.log(`=====================================================`);
if (sugarFreeFoods.length > 1) console.log('sugar free cakes today are : ');
else console.log('sugar free cake today : ');
for (let i in sugarFreeFoods) {
    console.log(`${+i + 1}. ${sugarFreeFoods[i].name}`);
}
console.log();

let ready = fs.readFileSync('./baked_cookies.txt', 'utf8').split('\n');
let baked_cookies = CookieFactory.baked(ready);
console.log(`=====================================================`);
console.log(`                   BAKED COOKIES`);
console.log(`=====================================================`);
console.log(baked_cookies);
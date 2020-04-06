// Making Cookies
class Cookie {
    constructor (name, ingredients) {
        this.name = name
        this.status = 'mentah'
        this.ingredients = this.objIngredients(ingredients);
    }

    objIngredients (ingredients) {
        let newArrIngredients = [];
        for (let i = 0; i < ingredients.length; i++) {
            let splitIngredients = ingredients[i].split(' : ');
            let callIngredients = new Ingredients(splitIngredients)
            // console.log(callIngredients)
            newArrIngredients.push(callIngredients);
        }
        return newArrIngredients;
    }

    bake () {
        this.status = 'Selesai dimasak'
    }
}

class PeanutButter extends Cookie {
    constructor (ingredients) {
        super('peanut butter', ingredients)
        this.peanut_count = 100
    }

    
}

class ChocolateChip extends Cookie {
    constructor(ingredients) {
        super('chocolate chip', ingredients)
        this.chocoChip_count = 200
    }
    
}

class OtherCookie extends Cookie {
    constructor(name, ingredients) {
        super(name, ingredients)
        this.other_count = 150
    }
    
}

class Ingredients {
    constructor (options) { // contoh [1 cup, gluten free flour]
        this.name = options[1]; // contoh isinya gluten free flour
        this.amout = options[0]; // contoh 1 cup
    }
}

class CookieFactory {
    static create (cookies) {
        let arrOfCookies = [];
        for (let i = 0; i < cookies.length; i++) {
            let cookieWithIngredients = cookies[i].slice(0, cookies[i].indexOf(' ='));
            let onlyIngredients = cookies[i].slice(cookies[i].indexOf('= ') + 2);
            if (cookieWithIngredients === 'peanut butter') {
                let peanutButter = new PeanutButter(onlyIngredients.split(', '));
                arrOfCookies.push(peanutButter);
            }
            else if (cookieWithIngredients === 'chocolate chip') {
                let chocolateChip = new ChocolateChip(onlyIngredients.split(', '));
                arrOfCookies.push(chocolateChip);
            }
            else {
                let otherCookie = new OtherCookie(cookieWithIngredients, onlyIngredients.split(', '));
                arrOfCookies.push(otherCookie);
            }
        }
        return arrOfCookies;
    }

    static cookieReccomendation (day, cookiesArrOfObj) {
        let displayCookies = []
        for (let i = 0; i < cookiesArrOfObj.length; i++) {
            let check = true;
            for (let j = 0; j < cookiesArrOfObj[i].ingredients.length; j++) {
                // console.log(cookiesArrOfObj[i].ingredients[j])
                if (day === 'tuesday' && cookiesArrOfObj[i].ingredients[j].name === 'sugar') {
                    check = false;
                }
            }
            if (check) {
                displayCookies.push(cookiesArrOfObj[i])
            }
        }
        return displayCookies;
    }

}

const fs = require('fs');
let cookiesList = fs.readFileSync('./cookies.txt', 'utf8');
let options = cookiesList.split('\r\n')

let batch_of_cookies = CookieFactory.create(options)
console.log(batch_of_cookies);

let sugarFreeFood = CookieFactory.cookieReccomendation('tuesday', batch_of_cookies)
console.log('sugar free cakes are :')
for (let i = 0; i < sugarFreeFood.length; i++) {
    console.log(sugarFreeFood[i].name);
}
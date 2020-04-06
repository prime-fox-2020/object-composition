const fs = require("fs")

class Ingredient {
    constructor(options) {
        this.name = options['name'],
            this.amount = options['amount']
    }

}

class Cookie {
    constructor(name, ingredients) {
        this.name = name
        this.status = "mentah",
            this.has_sugar = null,
            this.ingredients = ingredients
    }

    bake() {
        this.status = "selesai dimasak"
    }
}

class PeanutButter extends Cookie {
    constructor(name, ingredients) {
        super(name, ingredients)
        this.peanut_count = 100
    }
}

class ChocolateChip extends Cookie {
    constructor(name, ingredients) {
        super(name, ingredients)
        this.choc_chip_count = 200
    }
}

class OtherCookie extends Cookie {
    constructor(name, ingredients) {
        super(name, ingredients)
        this.choc_chip_count = 150
    }
}
console.clear();
const options = fs.readFileSync("./cookies.txt", "utf-8").split('\r\n')

class CookieFactory {

    static amounts() {
        const ingredients = fs.readFileSync("./ingradients.txt", "utf-8").split('\r\n')
        let amounts = {}
        for (let i = 0; i < ingredients.length; i++) {
            ingredients[i] = ingredients[i].split(' = ');
            ingredients[i][1] = ingredients[i][1].split(", ")
            amounts[ingredients[i][0]] = []
            for (let j = 0; j < ingredients[i][1].length; j++) {
                let bahan = ingredients[i][1][j].split(" : ")
                let amount = {
                    name: bahan[1],
                    amount: bahan[0]
                }
                amounts[ingredients[i][0]].push(amount)
            }
        }
        return amounts
    }

    static create(cookies) {
        let createCookies = []
        let amounts = this.amounts()
        for (let i = 0; i < cookies.length; i++) {
            let ingredients = []
            switch (cookies[i]) {
                case "peanut butter":
                    for (let j = 0; j < amounts['peanut butter'].length; j++) {
                        ingredients.push(new Ingredient(amounts['peanut butter'][j]))
                    }
                    createCookies.push(new PeanutButter(cookies[i], ingredients))
                    break;
                case "chocolate chip":
                    for (let j = 0; j < amounts['chocolate chip'].length; j++) {
                        ingredients.push(new Ingredient(amounts['chocolate chip'][j]))
                    }
                    createCookies.push(new ChocolateChip(cookies[i], ingredients))
                    break;
                default:
                    for (let j = 0; j < amounts[cookies[i]].length; j++) {
                        ingredients.push(new Ingredient(amounts[cookies[i]][j]))
                    }
                    createCookies.push(new OtherCookie(cookies[i], ingredients))
                    break;
            }
        }
        return createCookies
    }

    static cookieRecomendation(day, cookies) {
        if (day == "tuesday") {
            let result = []
            for (let i = 0; i < cookies.length; i++) {
                let check = false
                // console.log(cookies.ingredients);
                for (let j = 0; j < cookies[i].ingredients.length; j++) {
                    if (cookies[i].ingredients[j].name == "sugar") {
                        check = true
                    }
                }

                if (!check) {
                    cookies[i].has_sugar = 'No'
                    result.push(cookies[i])
                } else {
                    cookies[i].has_sugar = 'Yes'
                }
            }
            console.log(cookies);
            console.log("This day is : ", day, " we recomendation cookie with no sugar");
            return result
        }
    }
}


const batch_of_cookies = CookieFactory.create(options)
// console.log(batch_of_cookies)

let sugarFreeFoods = CookieFactory.cookieRecomendation('tuesday', batch_of_cookies)
console.log("sugar free cakes are :");
for (let i = 0; i < sugarFreeFoods.length; i++) {
    console.log(sugarFreeFoods[i].name);
}

const fs = require("fs")

class Cookie {
    constructor(name, ingredients) {
        this.name = name
        this.status = "mentah"
        this.has_sugar = null
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

class CookieFactory {
    static create(cookies, ingreds) {
        let ingredArray = this.createIngredients(ingreds)        
        let allCookies = []
        for (let i = 0; i < cookies.length; i++) {
            let ingredients = []
            if (cookies[i] == "peanut butter") {
                for (let i = 0; i < ingredArray['peanut butter '].length; i++) {
                    ingredients.push(new Ingredient(ingredArray['peanut butter '][i]))
                }
                let peanutButter = new PeanutButter(cookies[i], ingredients)
                peanutButter.bake() 
                allCookies.push(peanutButter)
            } else if (cookies[i] == "chocolate chip") {
                for (let i = 0; i < ingredArray['chocolate chip '].length; i++) {
                    ingredients.push(new Ingredient(ingredArray['chocolate chip '][i]))
                }
                let chocolateChip = new ChocolateChip(cookies[i], ingredients)
                chocolateChip.bake() 
                allCookies.push(chocolateChip)
            } else if (cookies[i] == "chocolate cheese") {
                for (let i = 0; i < ingredArray['chocolate cheese '].length; i++) {
                    ingredients.push(new Ingredient(ingredArray['chocolate cheese '][i]))
                }
                let chocolateCheese = new OtherCookie(cookies[i], ingredients)
                chocolateCheese.bake()
                allCookies.push(chocolateCheese)
            } else {
                for (let i = 0; i < ingredArray['chocolate butter '].length; i++) {
                    ingredients.push(new Ingredient(ingredArray['chocolate butter '][i]))
                }
                let chocolateButter = new OtherCookie(cookies[i], ingredients) 
                chocolateButter.bake()
                allCookies.push(chocolateButter)
            }
        }
        return allCookies
    }

    static createIngredients(ingredients) {
        let arrayIng = {}
        for (let i = 0; i < ingredients.length; i++) {
            ingredients[i] = ingredients[i].split('=')
            ingredients[i][1] = ingredients[i][1].split(',')
            arrayIng[ingredients[i][0]] = []
            for (let j = 0; j < ingredients[i][1].length; j++) {
                let bahan = ingredients[i][1][j].split(" : ")
                let objIng = {
                    name: bahan[1],
                    amount: bahan[0]
                }
                arrayIng[ingredients[i][0]].push(objIng)
            }
        }
        return arrayIng
    }

    static cookieRecommendation(day, allCookies) {
        let noSugarCookie = []
        if (day == "tuesday") {
            for (let i = 0; i < allCookies.length; i++) {
                let sugar = false        
                for (let j = 0; j < allCookies[i].ingredients.length; j++) {
                    if (allCookies[i].ingredients[j].name == 'sugar') {

                        sugar = true 
                    }
                }
                
                if (sugar == true) {
                    allCookies[i].has_sugar = 'Yes'
                } else {
                    noSugarCookie.push(allCookies[i])
                    allCookies[i].has_sugar = 'No'
                }
            }
        }
        console.log(allCookies);
        return noSugarCookie
    } 
}

class Ingredient {
    constructor(options) {
        this.name = options['name']
        this.amount = options['amount']
    }

    // your method here if needed
    
}




let options = fs.readFileSync("./cookies.txt", "utf8").split("\r\n")
let options_1 = fs.readFileSync("./ingredients.txt", "utf8").split("\r\n")

let batch_of_cookies = CookieFactory.create(options, options_1)
// console.log(batch_of_cookies);



let sugarFreeFoods = CookieFactory.cookieRecommendation("tuesday", batch_of_cookies)

console.log("sugar free cakes are : ");
for (let i = 0; i < sugarFreeFoods.length; i++) {
    console.log(sugarFreeFoods[i].name);    
}

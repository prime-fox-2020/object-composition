"use strict"

class Ingredient {
    constructor(options) {
        this.name = options['name']
        this.amount = options['amount']
    }
}

class Cookie {
    constructor(name, ingredients = []) {
        this.name = name
        this.status = "mentah"
        this.ingredients = this.getRecipe(ingredients)
        this.has_sugar = this.checkSugar()
    }
    getRecipe(ingredients) {
        let arr = []
        for (let i = 0; i < ingredients.length; i++) {
            arr.push(new Ingredient(ingredients[i]))
        }
        return arr
    }
    checkSugar(){
        for(let i=0;i<this.ingredients.length;i++){
            if(this.ingredients[i].name=="sugar") return true
        }
        return !true
    }
    bake() {
        this.status = "selesai dimasak"
    }
}

class PeanutButter extends Cookie {
    constructor(name, ingredients = []) {
        super(name, ingredients)
        this.peanut_count = 100
    }

}

class ChocolateChip extends Cookie {
    constructor(name, ingredients = []) {
        super(name, ingredients)
        this.choc_chip_count = 200
    }
}

class ChocolateCheese extends Cookie {
    constructor(name, ingredients = []) {
        super(name, ingredients)
        this.choc_chip_count = 150
    }
}

class ChocolateButter extends Cookie {
    constructor(name, ingredients = []) {
        super(name, ingredients)
        this.peanut_count = 100
    }
}
class OtherCookie extends Cookie {
    constructor(name, ingredients = []) {
        super(name, ingredients)
        this.peanut_count = 100
    }
}

// Read File Sync
let fs = require('fs')
let options = fs.readFileSync('cookies.txt', 'utf8').split('\r\n')
let options_ingredients = fs.readFileSync('cookies_ingredients.txt', 'utf8').split('\r\n')


class CookieFactory {
    static create(cookies) {
        // accepts a list of cookie types and returns those cookies.txt
        // Tambahin othercookie
        let cookiesType = []
        let cookieResep = this.getIngredients()
        for (let i = 0; i < cookies.length; i++) {
            switch (cookies[i]) {
                case 'peanut butter':
                    cookiesType.push(new PeanutButter(cookies[i], cookieResep[i]))

                    break
                case 'chocolate chip':
                    cookiesType.push(new ChocolateChip(cookies[i], cookieResep[i]))

                    break
                case 'chocolate cheese':
                    cookiesType.push(new ChocolateCheese(cookies[i], cookieResep[i]))

                    break
                case 'chocolate butter':
                    cookiesType.push(new ChocolateButter(cookies[i], cookieResep[i]))

                    break
                default:
                    cookiesType.push(new OtherCookie(cookies[i], cookieResep[i]))
                    break

            }
        }

        return cookiesType;
    }

    static getIngredients() {
        //Pecah per type
        let ingredients_amount = []
        let x = []
        for (let i = 0; i < options_ingredients.length; i++) {
            x = []
            x = options_ingredients[i].split(' = ')
            ingredients_amount.push(x[1].split(', '))
        }
        //Pecah per amount
        let ingredients_amount_details = [], temp = [], temp1 = [], obj = {}
        for (let i = 0; i < ingredients_amount.length; i++) {
            temp1 = []
            for (let j = 0; j < ingredients_amount[i].length; j++) {
                temp = []
                temp = ingredients_amount[i][j].split(' : ')
                temp1.push(temp)
            }
            ingredients_amount_details.push(temp1)
        }
        //Jadiin Objek
        let ingredients_array = [], ingredients_array_1 = []
        for (let i = 0; i < ingredients_amount_details.length; i++) {
            ingredients_array = []

            for (let j = 0; j < ingredients_amount_details[i].length; j++) {
                obj = {}
                obj["name"] = ingredients_amount_details[i][j][1]
                obj["amount"] = ingredients_amount_details[i][j][0]
                ingredients_array.push(obj)
            }
            ingredients_array_1.push(ingredients_array)
        }
        return ingredients_array_1
    }
    static cookieRecommendations(days,batch_of_cookies){
        let lessSugar=[]
        let sugary = []
        for(let i=0;i<batch_of_cookies.length;i++){
            if(batch_of_cookies[i].has_sugar==false){
                lessSugar.push(batch_of_cookies[i]['name'])
            }
            else{
                sugary.push(batch_of_cookies[i]["name"])
            }
        }

        return lessSugar
    }
}

let batch_of_cookies = CookieFactory.create(options)
console.table(batch_of_cookies)
let sugarFreeFoods = CookieFactory.cookieRecommendations("Tuesdays", batch_of_cookies)

console.log("Sugar free cakes are : ", sugarFreeFoods)
// const pb = CookieFactory.create('peanut_butter') // PeanutButter
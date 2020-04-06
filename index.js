"use strict"

let fs = require('fs')
/* 
*
*   @core class
*
*/
class Cookie {
    constructor(productsName, ingredients) {
        this.product_name = productsName
        this.status = 'raw'
        this.Ingredients = this.populateIngredients(ingredients)
    }

    populateIngredients (ingredients) {
        let result = [];
        for (let p = 0; p < ingredients.length; p++) {
            let cache = ingredients[p].split(' : ')
            let obj = {};
            obj.name = cache[1]
            obj.amount = cache[0]
            result.push(obj)
        }
        return result;
        // return JSON.stringify(result)
    }

    get name () {
        return this.productsName
    }
}

class Ingredients {
    constructor(options) {
        this.name = options['name']
        this.amount = options['amount']
    }
}

class CookieFactory {
    // constructor() {}

    static startBaking(material) {
        let batch = []
        for (let p = 0; p < material.length; p++) {
            let name = material[p].split(' = ')[0]
            let cacheIngredients = material[p].split(' = ')[1].split(', ')
            
            switch (name) {

                case 'peanut butter': batch.push(new PeanutButter(name, cacheIngredients))
                case 'chocolate chip': batch.push(new ChocolateChips(name, cacheIngredients))
                default : batch.push(new OtherCookies(name, cacheIngredients))
            }
        }
        return batch
    }

    static cookiesRecommendation(day, cookie) {
        // working progress
        if (day == 'tuesday') {
            let obj = Object.values(cookie);
            for (let key of obj) {
                if (key.Ingredients.filter(el => el.name.indexOf('gluten free') !== -1).length > 0) {
                    return key.product_name
                }
            }

            return 'Nothing to recommend'
        }
    }
}
/* 
*
*   @products : class
*
*/

class PeanutButter extends Cookie {
    constructor(name, ingredients) {
        super(name, ingredients);
        this.peanut_count = 100;
    }
}

class ChocolateChips extends Cookie {
    constructor(name, ingredients) {
        super(name, ingredients);
        this.choc_chip_count = 150

    }
}

class OtherCookies extends Cookie {
    constructor(name, ingredients) {
        super(name, ingredients);
        this.other_count = 150
    }
}
/* 
*
* @main : function/task
*
*/

let todo = fs.readFileSync('./cookies.txt','utf8').toString().split('\n')
// console.log(todo)
let cookies_batch = CookieFactory.startBaking(todo);
console.log(cookies_batch)
// console.log(cookies_batch.name, cookies_batch.ingredients, cookies_batch.baking)
let todaySpecial = CookieFactory.cookiesRecommendation('tuesday', cookies_batch)
console.log(`Sugar Free Cakes Are : ${todaySpecial}`)
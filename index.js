let fs = require('fs')
let options = fs.readFileSync('cookies.txt','utf-8').split('\n')


class Cookie {
    constructor(ingredients) {
        this.ingredient = ingredients
        this.status = 'mentah'
    }

    bake() {
        this.status = 'selesai dimasak'
    }
}

class PeanutButter extends Cookie {
    constructor(ingredient) {
        super(ingredient)
        this.name = 'peanut butter'
        this.peanut_count = 100
    }
}

class ChocolateChip extends Cookie {
    constructor(ingredient) {
        super(ingredient)
        this.name = 'chocolate chip'
        this.choc_chip_count = 200
    }
}

class ChocolateCheese extends Cookie {
    constructor(ingredient) {
        super(ingredient)
        this.name = 'chocolate cheese'
        this.choc_chip_count = 200
    }
}

class ChocolateButter extends Cookie {
    constructor(ingredient) {
        super(ingredient)
        this.name = 'chocolate butter'
        this.choc_chip_count = 200
    }
}

class CookieFactory {
    static create(options) {
        let cookiesList = []
        for(let i = 0; i < options.length;i++) {
            options[i] = options[i].split('=')
            options[i][1] = options[i][1].split(',')
            for(let a = 0; a < options[i][1].length; a++) {
                options[i][1][a] = options[i][1][a].split(':')
                options[i][1][a] = new ingredient(options[i][1][a][1], options[i][1][a][0])
            }

            let cookie;
            let name = options[i][0]
            let ingredients = options[i][1]
            if(name == 'peanut butter') {
                cookie = new PeanutButter(ingredients)
                // console.log(cookie)                     /*  <<<< aktifkan console.log untuk melihat isi ingredient */
                cookiesList.push(cookie)
            } else if(name == 'chocolate chip') {
                cookie = new ChocolateChip(ingredients)
                // console.log(cookie)                     /*  <<<< aktifkan console.log untuk melihat isi ingredient */
                cookiesList.push(cookie)
            } else if(name == 'chocolate cheese') {
                cookie = new ChocolateCheese(ingredients)
                // console.log(cookie)                     /*  <<<< aktifkan console.log untuk melihat isi ingredient */
                cookiesList.push(cookie)
            } else if(name === 'chocolate butter') {
                cookie = new ChocolateButter(ingredients)
                // console.log(cookie)                     /*  <<<< aktifkan console.log untuk melihat isi ingredient */
                cookiesList.push(cookie)
            }
        }
        return cookiesList
    }

    static cookieRecomendation(day, cookies) {
        let tuesdayFood = []
        if(day == 'tuesday') {
            for (let i = 0; i < cookies.length; i++) {
                let check = false
                let ingredient = cookies[i].ingredient
                for(let j = 0; j < ingredient.length; j++) {
                    if(ingredient[j].name == 'sugar') {
                        check = true
                        break
                    }
                }
                if(!check) {
                    tuesdayFood.push(cookies[i].name)
                }
            }
        }
        return tuesdayFood
    }
}

class ingredient {
    constructor(name, amount) {
        this.name = name
        this.amount = amount
    }
}

let batch_of_cookies = CookieFactory.create(options)
let sugarFreeFoods = CookieFactory.cookieRecomendation('tuesday', batch_of_cookies)
// console.log(batch_of_cookies)
console.log('Sugar free cakes are : ')
for(let i = 0; i < sugarFreeFoods.length;i++) {
    console.log(`${i+1}. ${sugarFreeFoods[i]}`)
}


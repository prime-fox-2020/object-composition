let fs = require('fs')
let options = fs.readFileSync('ingredient.txt', 'utf8')
// console.log(options)

// console.log(options)

class Cookie {
    constructor(name, ingredients) {
        this.name = name
        this.ingredients = ingredients
        this.hasSugar = this.sugarFinder()
        this.status = 'mentah'
    }

    bake() {
        this.status = 'selesai dimasak'
    }

    sugarFinder() {
        for (var i = 0; i < this.ingredients.length; i++) {
            for (var key in this.ingredients[i]) {
                if (this.ingredients[i].name == ' sugar') {
                    return true
                }
            }
        }
        return false;
    }
}


class PeanutButter extends Cookie {
    constructor(name, ingredients) {
        super(name, ingredients)
        this.peanutCount = 100
    }
}

class ChocolateChip extends Cookie {
    constructor(name, ingredients) {
        super(name, ingredients)
        this.ChocChipCount = 200
    }
}

class OtherCookies extends Cookie {
    constructor(name, ingredients) {
        super(name, ingredients)
        this.OtherCookiesCount = 150
    }
}

class CookieFactory {
    static create(cookies) {
        const cookieArr = []
        const arrEach = cookies.split('\n')
        for (var j = 0; j < arrEach.length; j++) {
            let cookieName = arrEach[j].split('=')[0]
            let temp = arrEach[j].split('=')[1].split(', ')
            const ingredient = []
            for (var k = 0; k < temp.length; k++) {
                let temp2 = temp[k].split(':')
                // console.log(temp2)
                let object = {
                    name: temp2[1],
                    amounts: temp2[0]
                }
                // console.log(object)
                let cookieIngredients = new Ingredients(object)
                ingredient.push(cookieIngredients)
                // console.log(ingredient)
            }
            switch (cookieName) {
                case 'Peanut Butter ':
                    cookieArr.push(new PeanutButter(cookieName, ingredient))
                    break;
                case 'Chocolate Chip ':
                    cookieArr.push(new ChocolateChip(cookieName, ingredient))
                    break;
                default:
                    cookieArr.push(new OtherCookies(cookieName, ingredient))
                    break;
            }

        }
        return cookieArr

    }
    static cookieRec(day, arr, nonIngr) {
        let rec = []

        for (var j = 0; j < arr.length; j++) {
            let cek = true
            for (var k = 0; k < arr[j].ingredients.length; k++) {
                if (arr[j].ingredients[k].name.includes(nonIngr)) {
                    cek = false
                    break
                }
            }
            if (cek) {
                rec.push(arr[j])
            }
        }

        console.log(`--------------${day}'s Recommendation! ---------------`)
        console.log(`-----------Get your ${nonIngr} free Cookies!----------`)
        for(var h = 0; h <rec.length;h++){
            console.log(`----------------${rec[h].name}---------------------`)
        }
    }
}

class Ingredients {
    constructor(options) {
        this.name = options['name']
        this.amounts = options['amounts']
    }
}
let batchOfCookie = CookieFactory.create(options)
// console.log(batchOfCookie)
let sugarFreeFoods = CookieFactory.cookieRec("Tuesday", batchOfCookie,'sugar')
// console.log('Sugar free cookies are : ')
// for (let i = 0; i < sugarFreeFoods.length; i++) {
//     console.log(sugarFreeFoods[i].name)
// }

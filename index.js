const fs = require('fs')
const options = fs.readFileSync('./cookies.txt', 'utf8').split('\n')

function deepSplit (arr){
    let result = []
    for (i = 0; i < arr.length; i++){
        result.push(arr[i].split(' = '))
    }
    return result
}

const options2 = deepSplit(options)
// console.log(options2)

class Cookie {
    constructor(name, ingredients = []){
        this.name = name
        this.status = 'mentah'
        this.ingredients = ingredients
        this.has_sugar = null
    }

    bake(){
        this.status = 'selesai dimasak'
    }
}

class PeanutBUtter extends Cookie {
    constructor(name, ingredients){
        super(name, ingredients)
        this.peanut_count = 100
    }
}

class ChocolateChip extends Cookie {
    constructor(name, ingredients){
        super(name, ingredients)
        this.choc_chip_count = 200
    }
}

class OtherCookie extends Cookie {
    constructor(name, ingredients){
        super(name, ingredients)
        this.other_count = 150
    }
}

class CookieFactory {
    static create (cookies){
        let result = []
        for (let i = 0; i < cookies.length; i++){
            if (cookies[i][0] == 'peanut butter'){result.push(new PeanutBUtter(cookies[i][0], cookies[i][1]))}
            else if (cookies[i][0] == 'chocolate chip'){result.push(new ChocolateChip(cookies[i][0], cookies[i][1]))}
            else {result.push(new OtherCookie(cookies[i][0], cookies[i][1]))}
        }
        return result
    }

    static cookieReccomendation(day, arr){
        let result = []
        for (let i = 0; i < arr.length; i++){
            let check = true
            let ingredients = arr[i].ingredients.split(' ')
            if (ingredients[8] != 'sugar'){check = false}
            if (day == 'tuesday' && check == false){result.push(arr[i])}
            else if (day != 'tuesday'){result.push(arr[i])}
        }
        return result
    }
}

let batch_of_cookies = CookieFactory.create(options2)
console.log(batch_of_cookies)
console.log(`--------------------------------------------------`)

let sugarFreeFoods = CookieFactory.cookieReccomendation('tuesday', batch_of_cookies)
console.log(`sugar free cake(s) are:`)
for (let i = 0; i < sugarFreeFoods.length; i++){
    console.log(sugarFreeFoods[i].name)
}
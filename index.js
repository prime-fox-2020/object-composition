const fs = require('fs')
const options = fs.readFileSync('./cookies.txt', 'utf8').split('\n')

// console.log(options)

class Cookie {
    constructor(name, ingredients = []){
        this.name = name
        this.status = 'mentah'
        this.ingredients = ingredients
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
            if (cookies[i] == 'peanut butter'){result.push(new PeanutBUtter(cookies[i]))}
            else if (cookies[i] == 'chocolate chip'){result.push(new ChocolateChip(cookies[i]))}
            else {result.push(new OtherCookie(cookies[i]))}
        }
        return result
    }
}

let batch_of_cookies = CookieFactory.create(options)
console.log(batch_of_cookies)
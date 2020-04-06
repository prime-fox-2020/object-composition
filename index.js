'use strict'

class Cookie {
    constructor() {
        this.status = 'mentah'
        this.ingredients = []
    }

    bake() {
        this.status = 'Selesai dimasak'
    }
}

class PeanutButter extends Cookie {
    constructor() {
        super()
        this.peanut_count = 100
    }
}

class ChocholateChip extends Cookie {
    constructor() {
        super()
        this.choc_chip_count = 200
    }
}

class OtherCookie extends Cookie {
    constructor() {
        super()
        this.other_count = 150
    }
}


class CookieFactory {
    static create(cookies) {
        let resultCookies = []
        for (let kue of cookies) {
            resultCookies.push(CookieFactory.searchClass(kue))
        }
        return resultCookies

    }
    static searchClass(string) {
        if (string === 'peanut butter') return new PeanutButter()
        if (string === 'chocolate chip') return new ChocholateChip()
        return new OtherCookie()
    }
}

let fs = require('fs')
let options = fs.readFileSync('cookies.txt').toString().split('\n')

let batch_of_cookies = CookieFactory.create(options)
console.log(batch_of_cookies);
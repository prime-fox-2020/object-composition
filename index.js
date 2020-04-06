'use strict'

class Cookie {
    constructor() {
        this.status = 'mentah'
    }

    bake() {
        this.status = 'Selesai dimasak'
    }
}

class PeanutButter extends Cookie {
    constructor() {
        this.peanut_count = 100
    }
}

class ChocholateChip extends Cookie {
    constructor() {
        this.choc_chip_count = 200
    }
}

let fs = require('fs')
let options = fs.readFileSync('cookies.txt').toString()

class CookieFactory {
    static create(cookies) {

    }
}

let batch_of_cookies = CookieFactory.create(options)
console.log(batch_of_cookies);
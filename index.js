const fs = require("fs")

class Cookie {
    constructor(name) {
        this.name = name,
            this.status = "mentah",
            this.ingredients = []
    }

    bake() {
        this.status = "selesai dimasak"
    }
}

class PeanutButter extends Cookie {
    constructor(name) {
        super(name)
        this.peanut_count = 100
    }
}

class ChocolateChip extends Cookie {
    constructor(name) {
        super(name)
        this.choc_chip_count = 200
    }
}

class OtherCookie extends Cookie {
    constructor(name) {
        super(name)
        this.choc_chip_count = 150
    }
}

const options = fs.readFileSync("./cookies.txt", "utf-8").split('\r\n')
console.clear();
console.log(options);

class CookieFactory {
    static create(cookies) {
        let createCookies = []
        for (let i = 0; i < cookies.length; i++) {
            switch (cookies[i]) {
                case "peanut butter":
                    createCookies.push(new PeanutButter(cookies[i]))
                    break;
                case "chocolate chip":
                    createCookies.push(new ChocolateChip(cookies[i]))
                    break;
                case "chocolate cheese":
                    createCookies.push(new OtherCookie(cookies[i]))
                    break;
                case "chocolate butter":
                    createCookies.push(new OtherCookie(cookies[i]))
                    break;
                default:
                    break;
            }
        }
        return createCookies
    }
}

console.log(CookieFactory.create(options))
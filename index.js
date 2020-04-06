class Cookie {
    constructor(name) {
        this.name = name;
        this.status = "mentah";
        this.ingredient = [];
    }

    bake() {
        this.status = "selesai dimasak";
    }
}

class PeanutButter extends Cookie {
    constructor(name) {
        super(name);
        this.count = 100; 
    }
}

class ChocolateChip extends Cookie {
    constructor(name) {
        super(name);
        this.count = 200;
    }
}

class OtherCookie extends Cookie {
    constructor(name) {
        super(name);
        this.count = 150;
    }
}

class CookieFactory {
    static create(cookCookies) {
        let cookies = []
        for (let cookie of cookCookies) {
            switch(cookie) {
                case 'peanut butter': cookies.push(new PeanutButter(cookie)); break;
                case 'chocolate chip': cookies.push(new ChocolateChip(cookie)); break;
                default: cookies.push(new OtherCookie(cookie)); break;
            }
        }
        return cookies;
    }
}

const fs = require('fs');
let option = fs.readFileSync('./cookies.txt', 'utf8').split('\n');
batchOfCookies = CookieFactory.create(option);
console.log(batchOfCookies);
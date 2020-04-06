"use strict"
let fs = require('fs')
let options = fs.readFileSync('./cookies.txt', 'utf8').split('\n')

class Cookie {
    constructor(name, ingredients = []) {
        this.name = name
        this.status = "mentah"
        this.ingredients = ingredients
    }
    bake() {
        this.status = "selesai dimasak"
    }
}
class PeanutButter extends Cookie {
    constructor(cookies) {
        super(cookies)
        this.peanut_count = 100
    }
}
class ChocholateChip extends Cookie {
    constructor(cookies) {
        super(cookies)
        this.choc_chip_count = 200
    }
}

class OtherCookie extends Cookie {
    constructor(cookies) {
        super(cookies)
        this.other_count = 150
    }
}

class CookieFactory {
    static create(cookies){
      // accepts a list of cookie types and returns those cookies
        let listCookies = []
        for (let i = 0; i < cookies.length; i++) {
            switch (cookies[i]) {
                case 'peanut butter':
                    listCookies.push(new PeanutButter(cookies[i]))
                    break;
                case 'chocolate chip':
                    listCookies.push(new ChocholateChip(cookies[i]))
                    break;
                default:
                    listCookies.push(new OtherCookie(cookies[i]))
                    break;
            }
        }
        return listCookies
    }
    // define other methods as needed
  }
  // contoh driver code
  // sesuaikan dengan model inheritance
  // baca daftar kue dari file dan kirim ke cookie Factory
  // di mana lokasi file yang kamu tulis supaya code bisa berjalan?
  let batch_of_cookies = CookieFactory.create(options);
  console.log(batch_of_cookies);
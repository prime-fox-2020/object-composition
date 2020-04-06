"use strict"
let fs = require('fs')
let options = fs.readFileSync('./cookies.txt', 'utf8').split('\n')
let ingredientsFile = fs.readFileSync('./ingredients.txt', 'utf8').split('\n')

class Ingredient {
    constructor(options) {
        this.name = options['name'];
        this.amount = options['amount'];
    }
}
class Cookie {
    constructor(ingredients) {
        this.name = ingredients
        this.status = "mentah"
        this.ingredients = []
        this.has_sugar = null
        this.createIng()
        this.checkSugar()
    }

    bake() {
        this.status = "selesai dimasak"
    }

    createIng() {
        for (let i = 0; i < ingredientsFile.length; i++) {
            if (ingredientsFile[i].includes(this.name)) {
                let list
                list = ingredientsFile[i].split('=')[1].split(',')
                for (let j = 0; j < list.length; j++) {
                    let end = list[j].split(':')
                    this.ingredients.push(new Ingredient({
                        name: end[1],
                        amount: end[0]
                    }))
                }
            }            
        }
    }
    
    checkSugar() {
        for (let key in this.ingredients) {
            if (this.ingredients[key].name.includes('sugar')){
                this.has_sugar = true
                break
            } else {
                this.has_sugar = false
            }
        }
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
    static cookieRecommendation(day, cookies){
        let noSugar = []
        if (day == 'tuesday') {
            for (let i = 0; i < cookies.length; i++) {
                if (cookies[i].has_sugar == false) {
                    noSugar.push(cookies[i])
                }
            }
        }
        return noSugar
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

// contoh driver code
// sesuaikan dengan model inheritance
// baca daftar kue dari file dan kirim ke cookie Factory
// di mana lokasi file yang kamu tulis supaya code bisa berjalan?
let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies);

let sugarFreeFoods = CookieFactory.cookieRecommendation("tuesday", batch_of_cookies);
console.log("sugar free cakes are :");
for(let i = 0; i < sugarFreeFoods.length; i++){
  console.log(sugarFreeFoods[i].name);
}
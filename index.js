"use strict"

const fs = require('fs')
class Ingredient {
    constructor(options) {
        this.name = options['name']
        this.amount = options['amount']
    }
}
class Cookie {
    constructor(name, ingredients = []) {
        this.name = name
        this.status = 'Mentah'
        this.ingredients = ingredients
        this.has_sugar = false
    }

    bake() {
        this.status = 'Selesai dimasak'
    }
}

class PeanutButter extends Cookie {
    constructor(name, ingredients) {
        super(name, ingredients)
        this.peanut_count = 100
    }
}

class ChocolateChip extends Cookie {
    constructor(name, ingredients) {
        super(name, ingredients)
        this.choc_chip_count = 200
    }
}

class OtherCookie extends Cookie {
    constructor(name, ingredients) {
        super(name, ingredients)
            this.other_count = 150
    }
}
class CookieFactory {
    static create(cookies) {
        let cookieList = []
        cookieList.push(new PeanutButter(cookies[0]))
        cookieList.push(new ChocolateChip(cookies[1]))
        cookieList.push(new OtherCookie(cookies[2]))
        cookieList.push(new OtherCookie(cookies[3]))

        return cookieList
    }

    static cookieRecomendation(dat, batch_of_cookies){
        let hasNoSugar = []
        for(let i=0; i<batch_of_cookies.length; i++){
            if(batch_of_cookies[i].has_sugar === false){
                hasNoSugar.push(batch_of_cookies[i])
            }
        }

        return hasNoSugar
    }
}

let cookiesData = fs.readFileSync('./cookies.txt', 'utf8').split('\n')
//console.log(cookiesData)
let ingredientsData = fs.readFileSync('./ingredients.txt', 'utf8').split('\n')
//console.table(ingredientsData)
let splitEqual = []
for(let i=0; i<ingredientsData.length; i++) {
    splitEqual[i] = ingredientsData[i].split('=')
}
//console.table(splitEqual)
let splitCommaName = []
for(let i=0; i<splitEqual.length; i++) {
    splitCommaName[i] = splitEqual[i][0].split(',')
}
//console.table(splitCommaName)
let splitCommaIngre = []
for(let i=0; i<splitEqual.length; i++){
    splitCommaIngre[i] = splitEqual[i][1].split(',')
}
//console.table(splitCommaIngre)
let splitIngre = []
for(let i=0; i < splitCommaIngre.length; i++){
    splitIngre = []
    for(let j=0; j<splitCommaIngre[i].length; j++){
        let obj = {
            name : splitCommaIngre[i][j].split(':')[1].trim(),
            amount : splitCommaIngre[i][j].split(':')[0].trim()
        }
        //console.log(obj)
        if(splitCommaIngre[i][j].split(':')[1].trim() === 'sugar'){
            batch_of_cookies[i].has_sugar = false
        }
    }
}

var batch_of_cookies = CookieFactory.create(cookiesData)
console.log(batch_of_cookies)

let sugarFreeFoods = CookieFactory.cookieRecomendation("tuesday", batch_of_cookies)
console.log("sugar free cakes are : ")
for(let i = 0; i <sugarFreeFoods.length; i++) {
    console.log(sugarFreeFoods[i].name)
}
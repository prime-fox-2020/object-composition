"use strict"
const fs = require('fs')
const options = fs.readFileSync('cookies.txt').toString()

class Ingredients{
    constructor(options){
        this.name = options['name']
        this.amount = options['amount']
    }
}

class Cookie{
    constructor(name,bahan){
        this.status = "mentah"
        this.ingredients = this.getIngredients(bahan)
        this.name = name
        this.has_sugar = false
        this.generateSugar()

    }
    getIngredients(bahan){
        let ingredients = []
        for(let i = 0; i < bahan.length; i++){
            let bahan_dasar = bahan[i].split(':')
            let objek = {'name': bahan_dasar[1] , "amount": bahan_dasar[0]}
            let nilai = new Ingredients(objek)
            ingredients.push(nilai)
        }
        return ingredients
    }
    bake(){
        this.status = "selesai dimasak"
    }
    generateSugar(){
        for(let ingredient of this.ingredients) {
            if(ingredient.name === ' sugar'){
                this.has_sugar = true
            }
        }
    }
}

class PeanutButter extends Cookie{
    constructor(name,bahan){
        super(name,bahan)
        this.peanut_count = 100
    }
}

class ChocolateChip extends Cookie{
    constructor(name,bahan){
        super(name,bahan)
        this.choc_chip_count = 200
    }
}

class OtherCookie extends Cookie{
    constructor(name,bahan){
        super(name,bahan)
        this.other_count = 150
    }
}

class CookieFactory{
    static create(cookies){
        let array = []
        let data = cookies.split('\n')
        for(let i = 0; i < data.length; i++){
            let divided = data[i].split('=')
            let nama = divided[0].trim()
            let bahan = divided[1].split(',')
            if(nama === 'peanut butter'){
                array.push(new PeanutButter('peanut butter',bahan))
            }
            else if(nama === 'chocolate chip'){
                array.push(new ChocolateChip('chocolate chip',bahan))
            }
            else{
                array.push(new OtherCookie(nama,bahan))
            }
        }
        return array
    }
    static cookieRecommendation(day,batch_of_cookies){
        if(day === "tuesday"){
            let cookies = []
            for(let cookie of batch_of_cookies){
                if(cookie.has_sugar === false){
                    cookies.push(cookie)
                }
            }
            return cookies
        }
        else{
            return batch_of_cookies
        }
    }
}

let batch_of_cookies = CookieFactory.create(options)
console.log(batch_of_cookies)
let sugarFreeFoods = CookieFactory.cookieRecommendation("tuesday",batch_of_cookies)
console.log("sugar free cakes are :")
for(let i = 0; i < sugarFreeFoods.length; i++) {
    console.log(sugarFreeFoods[i].name)   
}
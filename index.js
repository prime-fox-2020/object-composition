class Cookie{
    constructor(name, ingredients){
        this.name = name
        this.status = 'mentah'
        this.ingredients = ingredients
        this.form = 'cake'
    }
    
    bake(){
        this.status = 'selesai dimasak'
    }
}

class PeanutButter extends Cookie{
    constructor(ingredients){
        super('peanut butter', ingredients)
        this.peanut_count = 100
    }
}

class ChocolateChip extends Cookie{
    constructor(ingredients){
        super('chocolate chip', ingredients)
        this.choc_chip_count = 200
    }
}

class ChocolateChipCrumbled extends ChocolateChip{
    constructor(ingredients){
        super(ingredients)
        this.form = 'crumbled'
    }
}

class PeanutButterCrumbled extends PeanutButter{
    constructor(ingredients){
        super(ingredients)
        this.form = 'crumbled'
    }
}

class RedVelvet extends Cookie{
    constructor(ingredients){
        super('red velvet', ingredients)
        this.choc_chip_count = 75
    }
}

class Ingredient{
    constructor(options){
        this.name = options['name']
        this.amount = options['amounts']
    }
}

class CookieFactory{
    static create(cookies){
        const arrayOfCookies = []
        const arr = cookies.split('\n')
        for(let i = 0; i < arr.length; i++){
            let getCookieName = arr[i].split(' = ')[0]
            let temp = arr[i].split(' = ')[1].split(', ')
            const getIngredients = []
            for(let i = 0; i < temp.length; i++){
                let temporary = temp[i].split(' : ')
                let obj = {name : temporary[1], amounts: temporary[0]}
                let ingredients = new Ingredient(obj)
                // let ingredients = JSON.stringify(new Ingredient(obj)) 
                getIngredients.push(ingredients)
            }
            switch(getCookieName){
                case 'peanut butter' : arrayOfCookies.push(new PeanutButter(getIngredients)); break
                case 'chocolate chip' : arrayOfCookies.push(new ChocolateChip(getIngredients)); break
                case 'chocolate chip crumbled' : arrayOfCookies.push(new ChocolateChipCrumbled(getIngredients)); break
                case 'peanut butter crumbled' : arrayOfCookies.push(new PeanutButterCrumbled(getIngredients)); break
                case 'red velvet' : arrayOfCookies.push(new RedVelvet(getIngredients)); break
                default : 
                    class OtherCookie extends Cookie{
                        constructor(){
                            super(getCookieName, getIngredients)
                            this.other_count = 150
                        }
                    }
                    arrayOfCookies.push(new OtherCookie()); break
            }
        }
        return arrayOfCookies
    }

    static cookieRecommendation(day, cookies, freeIngredient){
        let cookiesList = []

        console.log(`\n------${day} recommendation : free ${freeIngredient}------\n`)
        for(let i = 0; i < cookies.length; i++){
            let flag = true
            for(let j = 0; j < cookies[i].ingredients.length; j++){
                if(cookies[i].ingredients[j].name.includes(freeIngredient) && !(cookies[i].ingredients[j].name.includes('free'))){
                    flag = false
                    break
                }
            }
            if(flag){
                cookiesList.push(cookies[i])
            }
        }
        for(let i = 0; i < cookiesList.length; i++){
            // console.log(cookiesList[i])
            console.log({name : cookiesList[i].name, ingredients : cookiesList[i].ingredients, form : cookiesList[i].form})
        }
    }

}


const fs = require('fs')
const options = fs.readFileSync('./cookies.txt','utf8')
let batch_of_cookies = CookieFactory.create(options)
// console.log(batch_of_cookies)

// let sugarFreeCookies = CookieFactory.cookieRecommendation('Tuesday', batch_of_cookies, 'cinnamon')
let sugarFreeCookies2 = CookieFactory.cookieRecommendation('Sunday', batch_of_cookies, 'sugar')
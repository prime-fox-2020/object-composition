const fs = require('fs');


class Cookie{
    constructor(name, ingredients){
        this._name = name
        this._ingredients = this.breakdownIngredients(ingredients)
        this._status = 'mentah'
    }

    //setter&getter
    get name(){return this._name}
    set name(p){this._name=p}
    get ingredients(){return this._ingredients}
    set ingredients(p){this._ingredients=p}
    get status(){return this._status}
    set status(p){this._status=p}

    bake(){
        this.status = 'selesai dimasak'
    }

    breakdownIngredients(ingredients){
        let arrOfIngredients = []
        for(let i = 0; i < ingredients.length; i++){
            let anIngredient = ingredients[i].split(' : ')
            arrOfIngredients.push(anIngredient[0] + ' ' + anIngredient[1])
        }
        return arrOfIngredients
    }
}


class PeanutButter extends Cookie{
    constructor(ingredients){
        super('peanut butter', ingredients)
        this.peanutCount = 100
    }
}


class ChocolateChip extends Cookie{
    constructor(ingredients) {
        super('chocolate chip', ingredients)
        this.chocChipCount = 200
    }
}


class OtherCookie extends Cookie {
    constructor(name, ingredients) {
        super(name, ingredients)
        this.other_count = 150
    }
    
}


class CookieFactory{
    constructor(day){
        this.day = day
    }

    static create(cookies){
        let arrOfCookies = []
        for(let i = 0; i < cookies.length; i++){
            let nameOfCookie = cookies[i].slice(0, cookies[i].indexOf(' ='))
            let ingredients = cookies[i].slice(cookies[i].indexOf('= ') + 2)
            if(nameOfCookie === 'peanut butter'){
                let peanutButter = new PeanutButter(ingredients.split(', '))
                arrOfCookies.push(peanutButter)
            }
            else if(nameOfCookie === 'chocolate chip'){
                let chocolateChip = new ChocolateChip(ingredients.split(', '))
                arrOfCookies.push(chocolateChip)
            }
            else{
                let otherCookie = new OtherCookie(nameOfCookie, ingredients.split(', '))
                arrOfCookies.push(otherCookie)
            }
        }
        return arrOfCookies
    }

    lessSugarCampaign(arrOfCookies){
        if(this.day === 'tuesday'){
            let lessSugarCookies = []
            for(let i = 0; i < arrOfCookies.length; i++){
                let isLessSugar = true
                for(let j = 0; j < arrOfCookies[i].ingredients.length; j++){
                    let checkIngredient = ''
                    for(let k = arrOfCookies[i].ingredients[j].length - 1; k >= 0; k--){
                        if(arrOfCookies[i].ingredients[j][k] === ' '){
                            break
                        }
                        checkIngredient += arrOfCookies[i].ingredients[j][k]
                    }
                    // console.log(checkIngredient)
                    if(checkIngredient === 'ragus'){
                        isLessSugar = false
                        break
                    }
                }
                if(isLessSugar){
                    lessSugarCookies.push(arrOfCookies[i])
                }
            }
            console.log("Note: Today is No-Sugar day. So we've filter the less sugar cookies for you.")
            console.log('This is the menu:')
            // console.log(lessSugarCookies)
            if(lessSugarCookies.length === 0){
                // return 'Sorry, no cookie for today'
                console.log('Sorry, no cookie for today')
            }else{
                console.log(lessSugarCookies)
                // return lessSugarCookies
            }
        }else{
            console.log("Note: Today is free. You can eat any kind of cookies.")
            console.log("This is the menu:")
            console.log(arrOfCookies)
            // return arrOfCookies
        }
    }
}

let menu = fs.readFileSync('cookies.txt', 'utf8')
let options = menu.split('\r\n')
let batch_of_cookies = CookieFactory.create(options)
// console.log(batch_of_cookies)

console.log('=========== LESS SUGAR DAY ===========')
let lessSugarCookieFactory = new CookieFactory('tuesday')
lessSugarCookieFactory.lessSugarCampaign(batch_of_cookies)

console.log('============== SUGAR DAY ==============')
let commonCookieFactory = new CookieFactory('sunday')
commonCookieFactory.lessSugarCampaign(batch_of_cookies)
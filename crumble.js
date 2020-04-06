const fs = require ('fs')
const options = fs.readFileSync('cookies.txt','utf8').split('\n')
const ingredientsData = fs.readFileSync('ingredients.txt','utf8').split('\n')
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
    constructor(name, ingredients = []) {
        super(name, ingredients)
        this.peanut_count = 100
}
}
class ChocholateChip extends Cookie {
    constructor(name, ingredients = []) {
        super(name, ingredients)
        this.choc_chip_count = 200
    }
}

// class OtherCookie extends Cookie {
//     constructor(name, ingredients = []) {
//         super(name, ingredients)
//         this.other_count = 150
//     }
// }
class ChocholateCheese extends Cookie {
    constructor(name, ingredients = []) {
        super(name, ingredients)
        this.choc_chs_count = 300
    }
}
class ChocholateButter extends Cookie {
    constructor(name, ingredients = []) {
        super(name, ingredients)
        this.choc_but_count = 400
    }
}

class ChocolateChipCrumbled extends ChocholateChip{
    constructor(name, ingredients) {
        super(name, ingredients)
        //this.form = 'crumbled'
    }
}

class PeanutButterCrumbled extends PeanutButter{
    constructor(name, ingredients){
        super(name, ingredients)
        this.form = 'crumbled'
    }
}
class CookieFactory{
    static create(cookies) {
        let myCookiesList = []
            myCookiesList.push(new PeanutButter (cookies[0]))
            myCookiesList.push(new ChocholateChip (cookies[1]))
            myCookiesList.push(new ChocholateCheese (cookies[2]))
            myCookiesList.push(new ChocholateButter (cookies[3]))
            myCookiesList.push(new ChocolateChipCrumbled(cookies[4]))
            myCookiesList.push(new PeanutButterCrumbled (cookies[5]))

        return myCookiesList
    }
    
    static cookieRecommendation(day,batch_of_cookies ){
    let hasNoSugar = []

        if (day == 'tuesday') {
            for(let i = 0; i < batch_of_cookies.length; i++) {
                if(batch_of_cookies[i].has_sugar == false) {
                    hasNoSugar.push(batch_of_cookies[i])
                }
            }
        } else {
            return batch_of_cookies
        }
        return hasNoSugar
    }
}

let batch_of_cookies = CookieFactory.create(options)
console.log(batch_of_cookies)

let splitEqual = []
for(let i = 0; i < ingredientsData.length; i++){
    splitEqual[i] = ingredientsData[i].split('=')
}
//console.table(splitEqual)
let splitCommaName = []
for(let i = 0; i < splitEqual.length; i++){
    splitCommaName[i] = splitEqual[i][0].split(',')
}
//console.table(splitCommaName)
let splitCommaIngre = []
for(let i = 0; i < splitEqual.length; i++){
    splitCommaIngre[i] = splitEqual[i][1].split(',')
}
//console.table(splitCommaIngre)
let splitIngre = []
for(let i = 0; i < splitCommaIngre.length; i++){
    splitIngre = [];
    for(let j = 0; j < splitCommaIngre[i].length; j++){
        let obj = {
            name : splitCommaIngre[i][j].split(':')[1].trim(),
            amount : splitCommaIngre[i][j].split(':')[0].trim()
        }
        //console.log(obj)
        if(splitCommaIngre[i][j].split(':')[1].trim() == 'sugar'){
            batch_of_cookies[i].has_sugar = true
        }

        let ingredients = new Ingredient(obj)
        batch_of_cookies[i].ingredients.push(ingredients)
        splitIngre.push(splitCommaIngre[i][j].split(':'))
    }
}

let chocorumbled = CookieFactory.create('chocolate chip crumbled', 500);
let peanutCrumbled = CookieFactory.create('peanut butter crumbled', 600);
console.log(chocorumbled);
console.log(peanutCrumbled);

let sugarFreeFoods = CookieFactory.cookieRecommendation('tuesday',batch_of_cookies)
console.log("sugar free cakes are :")
for(let i = 0; i < sugarFreeFoods.length; i++){
    console.log(sugarFreeFoods[i].name)
}
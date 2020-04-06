let fs = require('fs')

class Cookie {
    constructor() {
        this.name = ''
        this.status = 'mentah'
        this.ingredients = []
    }

    bake (){
        this.status = 'selesai dimasak' //further exploration
    }

}

class PeanutButter extends Cookie {
    constructor(obj){
        super(obj)
        this.peanut_count = 100
    }
}

class ChocolateChip extends Cookie {
    constructor(obj){
        super(obj)
        this.choc_chip_count = 200
    }
}

class OtherCookie extends Cookie {
    constructor(obj){
        super(obj)
        this.other_count = 150
    }
}

var options = fs.readFileSync('cookies.txt', 'utf8').split('\n')
// console.log(options) // jadi annesessarri
var ingredientsRaw = fs.readFileSync('resep.txt', 'utf8').split('\n')
// would be alot easier to have on the same txt file. no need to mkdir new .txt
// console.log(ingredientsRaw, '=====RAW')

class Ingredients{
    constructor(options){
        this.name = options['name']
        this.amount = options['amount']
    }
}

class CookieFactory {
    static create (ingredientsRaw) {
        let listCookies = []
        /**
         * 
         name: 'chocolate chip',
         status: 'mentah',
         ingredients: ['masukin resep dri txt'], --> theIngredients
         ..._count: from class Cookie
         * 
         */
    
        for (let i = 0; i < ingredientsRaw.length; i++) {
            let cookie_name = ingredientsRaw[i].split(' = ')[0]
            let listIngredients = ingredientsRaw[i].split(' = ')[1].split(', ')
            // console.log(cookie_name, 'CAKE NAMME')
            // console.log(listIngredients, 'LISTT')
            
            var theIngredients = [];
            for (let x = 0; x < listIngredients.length; x++) {
                let ingName  = listIngredients[x].split(': ')[1]
                let ingAmount  = listIngredients[x].split(':')[0]
                // console.log(ingName, 'NAMA RESEP')
                // console.log(ingAmount, 'TAKARAN')
                
                let newIngredients = new Ingredients({ // masukkan options
                    name: ingName,
                    amount : ingAmount
                })
               
                theIngredients.push(newIngredients) // dapatlah ingredients utk listCookies
            }

            if (cookie_name === 'peanut butter'){
                var peanutButter = new PeanutButter()
                peanutButter.name = cookie_name
                peanutButter.ingredients = theIngredients
                listCookies.push(peanutButter)
            }
            else if (cookie_name === 'chocolate chip'){
                var chocolateChip = new ChocolateChip()
                chocolateChip.name = cookie_name
                chocolateChip.ingredients = theIngredients
                listCookies.push(chocolateChip)
            }
            else {
                var otherCookie = new OtherCookie() //for other_count
                otherCookie.name = cookie_name
                otherCookie.ingredients = theIngredients
                listCookies.push(otherCookie)
            }
            
        }
        // console.log(listCookies, '========== CURRENT ANSWER')
        return listCookies
    }

    static cookieRecommendation (antiSugarDay, arrOfObj) {
        let bolehRekomen = []
        for (let i = 0; i < arrOfObj.length; i++) {
            let bolehkah = true
            for (let j = 0; j < arrOfObj[i].ingredients.length; j++) {
                if (arrOfObj[i].ingredients[j].name == 'sugar') {
                    bolehkah = false
                }
            }
            if (bolehkah) {
                bolehRekomen.push(arrOfObj[i])
            }
        }
        return bolehRekomen
    }
}

var batch_of_cookies = CookieFactory.create(ingredientsRaw)
console.log(batch_of_cookies)

let sugarFreeFoods = CookieFactory.cookieRecommendation('Tuesday', batch_of_cookies)
console.log('sugar free cakes are:')
for (let i = 0; i < sugarFreeFoods.length; i++) {
    console.log(sugarFreeFoods[i].name)
}


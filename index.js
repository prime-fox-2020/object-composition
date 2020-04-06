const fs = require('fs')
let option = fs.readFileSync('./cookies.txt', 'utf8').split('\r\n')
const namesCookie = []
const recipe = []


for (let i = 0; i < option.length; i++) {
    let temp = option[i].split('=')
    namesCookie.push(temp[0])
    recipe.push(temp[1])

}

// console.log(tes)

class Cookie {
    constructor(inputName) {
        this.name = inputName
        this.status = 'mentah'
    }
}

class PeanutButter extends Cookie {
    constructor(abc, recipeCookie) {
        super(abc)
        this.ingredient = [recipeCookie]
        this.time = 100
    }
}
class ChocolateChips extends Cookie {
    constructor(abc, recipeCookie) {
        super(abc)
        this.ingredient = [recipeCookie]
        this.time = 200
    }
}
class OtherCookie extends Cookie {
    constructor(abc, recipeCookie) {
        super(abc)
        this.ingredient = [recipeCookie]
        this.time = 150
    }
}

class CookieFactory {
    static create(input) {
        const batchCake = []
        let recipeOfArray = []
        
        //recipe
        for (let j = 0; j < recipe.length; j++) {
            let temp = recipe[j].split(',')
            // console.log(temp)
            recipeOfArray.push(temp)
        }

        //cookie
        for (let i = 0; i < input.length; i++) {
            let temp = ''
            let counter = 0
            // console.log(this.ingredient)
            // console.log(input[i])
            if (input[i] === 'peanut butter') {
                temp = new PeanutButter(input[i], recipeOfArray[i])
                // this.ingredient = recipe[counter]
            } else if (input[i] === 'chocolate chip') {
                temp = new ChocolateChips(input[i], recipeOfArray[i])
            } else {
                temp = new OtherCookie(input[i], recipeOfArray[i])
            }
            batchCake.push(temp)
        }

        // console.log(batchCake[0].ingredient)
        return batchCake
    }

    static sugarFreeFood(input){
        let recipeOfArray = []
        //recipe
        const sugarFree = []
        for (let j = 0; j < recipe.length; j++) {
            let temp = recipe[j].split(',')
            // console.log(temp)
            recipeOfArray.push(temp)
        } 
        // console.log(recipeOfArray)

        //detect free sugar
        for(let i=0; i<recipeOfArray.length; i++){
            let sugarStatus = false
            for(let j=0; j<recipeOfArray[i].length; j++){
                if(`${recipeOfArray[i][j][0]}${recipeOfArray[i][j][1]}${recipeOfArray[i][j][2]}${recipeOfArray[i][j][3]}${recipeOfArray[i][j][4]}` === 'sugar'){
                    sugarStatus = true
                    break
                }
            }
            if(!sugarStatus){
                sugarFree.push(namesCookie[i])
            } 
        }
        return `Makanan yang bebas gula adalah ` + sugarFree
    }
}

console.log(CookieFactory.create(namesCookie))
console.log(CookieFactory.sugarFreeFood())

// tes = recipe[0].split(',')
// let recipeOfArray = []
// for (let i = 0; i < recipe.length; i++) {
//     let temp = recipe[i].split(',')
//     // console.log(temp)
//     recipeOfArray.push(temp)
// }

// console.log(`${recipeOfArray[0][1][0]}${recipeOfArray[0][1][1]}${recipeOfArray[0][1][2]}${recipeOfArray[0][1][3]}${recipeOfArray[0][1][4]}` === 'sugar')



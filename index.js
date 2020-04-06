let fs = require('fs')
let list = fs.readFileSync('cookies.txt', 'utf8').split('\r\n')
let parsedList = []
let cookieList = []

class Ingredient {
    constructor(options){
        this.name = options[0]
        this.amount = options[1]
    }

    static parseIngredient(list){ //['peanut butter', [[flour, 1],[sugar, 1],[peanut, 1],[cinnamon, 1],[butter, 1]]]
        for(let a = 0; a < list.length; a++){
            let temp1 = list[a].split('=')
            let temp2 = [temp1[0], temp1[1].split(',')]
            let temp3 = [temp2[0], []]
            for(let b = 0; b < temp2[1].length; b++){
                temp3[1].push(temp2[1][b].split(':'))
            }
            parsedList.push(temp3)
        }
    }
}

class Cookie{
    constructor(ingredient){
        this.status = 'mentah'
        this.ingredients = ingredient
    }

    bake (){
        this.status = 'selesai dimasak'
    }
}

class PeanutButter extends Cookie {
    constructor(name,ingredient){
        super(ingredient);
        this.name = name
        this.peanut_count = 100
    }
}

class ChocolateChip extends Cookie {
    constructor(name,ingredient){
        super(ingredient);
        this.name = name
        this.choc_chip_count = 200
    }
}

class OtherCookie extends Cookie {
    constructor(name,ingredient){
        super(ingredient);
        this.name = name
        this.other_count = 150
    }
}

class CookieFactory {
    static create(cookies){
        for(let a = 0; a < cookies.length; a++){
            switch(cookies[a][0]){
                case 'peanut butter' :
                    let temp1 = [] 
                    for(let b = 0; b < cookies[a][1].length; b++){
                        temp1.push(new Ingredient(cookies[a][1][b]))
                    }
                    cookieList.push(new PeanutButter(cookies[a][0], temp1))
                break;
                case 'chocolate chip' :
                    let temp2 = [] 
                    for(let b = 0; b < cookies[a][1].length; b++){
                        temp2.push(new Ingredient(cookies[a][1][b]))
                    }
                    cookieList.push(new ChocolateChip(cookies[a][0], temp2))
                break;
                default : 
                    let temp3 = [] 
                    for(let b = 0; b < cookies[a][1].length; b++){
                        temp3.push(new Ingredient(cookies[a][1][b]))
                    }
                    cookieList.push(new OtherCookie(cookies[a][0], temp3))
            }
        }
    }

    static withNoSugar(){
        for(let a = 0; a < cookieList.length; a++){
            let flag = false
            for(let b = 0; b < cookieList[a].ingredients.length; b++){
                if(cookieList[a].ingredients[b].name === 'sugar'){
                    flag = true
                    break
                }
            }
            if(flag === true){
                continue;
            } else {
                console.log(cookieList[a])
            }
        }
    }
}

Ingredient.parseIngredient(list);
CookieFactory.create(parsedList)
console.log(cookieList);
CookieFactory.withNoSugar();
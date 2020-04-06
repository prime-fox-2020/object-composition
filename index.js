
class Ingredient{
    constructor(data){
        this.name = data['name']
        this.amount = data['amount']
    }
}

class Cookie {
    constructor(name,ingredient){
        this.name = name
        this.status = 'mentah'
        this.ingredient = ingredient
    }

    bake(){
        this.status = 'selesai dimasak'
    }
}

class PeanutButter extends Cookie{
    constructor(name,ingredient){
        super(name,ingredient)
        this.peanut_count = 100
    }
}

class ChocolateChip extends Cookie{
    constructor(name,ingredient){
        super(name,ingredient)
        this.choc_chip_count = 200
    }
}

class OtherCookie extends Cookie{
    constructor(name,ingredient){
        super(name,ingredient)
        this.other_count = 150
    }
}

class CookieFactory{

    static create(data){
        
        let cookieList = []
        for (let i = 0; i<data.length; i++){
            
            let cookieName = data[i].split(' = ')[0]
            let bahan = data[i].split(' = ')[1].split(', ')
            let getBahan = []
            for (let a=0;a<bahan.length; a++){
                let nama = bahan[a].split(': ')[1]
                let jumlah = bahan[a].split(' :')[0]
                let obj = {name:nama, amount:jumlah}
                let ingredient = new Ingredient(obj)
                getBahan.push(ingredient)
            }
            
            if(cookieName == 'peanut butter' ){
                cookieList.push(new PeanutButter(cookieName,getBahan))
            } else if (cookieName == 'chocolate chip'){
                cookieList.push(new ChocolateChip(cookieName,getBahan))
            } else {
                cookieList.push(new OtherCookie(cookieName,getBahan))
            }
            
        }
        return cookieList
    }

    static cookieRecommend(day, data){
        let recCookies = []

        for (let i = 0; i<data.length; i++){
            let flag = true
            let ingredient = data[i].ingredient
            for (let j = 0; j<ingredient.length; j++){
                switch(day){
                    case 'monday' : if (ingredient[j].name == 'flour'){
                        flag = false
                        break
                    }
                    case 'tuesday' : if (ingredient[j].name == 'sugar'){
                        flag = false
                        break
                    }
                    case 'wednesday' : if (ingredient[j].name == 'cinnamon'){
                        flag = false
                        break
                    }
                    case 'thursday' : if (ingredient[j].name == 'chips'){
                        flag = false
                        break
                    }
                    case 'friday' : if (ingredient[j].name == 'peanut butter'){
                        flag = false
                        break
                    }
                    default : break
                }
            }
            if (flag){
                recCookies.push(data[i])
            }
        }
        return recCookies
    }
}

const fs = require('fs')
const data = fs.readFileSync('cookies.txt','utf8')
const options = data.split('\n')

let batch_of_cookies = CookieFactory.create(options)
console.log(batch_of_cookies)
console.log('\n')

let cookieRecs = CookieFactory.cookieRecommend('tuesday',batch_of_cookies);
console.log('Our cookies of recommendation today are :')
for (let i = 0; i<cookieRecs.length; i++){
    console.log(cookieRecs[i].name)
}

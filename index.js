const fs = require('fs')
const option = fs.readFileSync('./cookies.txt', 'utf8').split('\r\n')
// console.log(option)

class Cookie{
    constructor(name){
        this.name = name
        this.status = 'mentah'
        this.ingredient = []
    }
}

class PeanutButter extends Cookie {
    constructor(name){
        super(name)
        this.time = 100        
    }
}
class ChocolateChips extends Cookie {
    constructor(name){
        super(name)
        this.time = 200        
    }
}
class OtherCookie extends Cookie {
    constructor(name){
        super(name)
        this.time = 150        
    }
}

class CookieFactory{
    static  create(option){
        const batchCake = []
        for(let i=0; i<option.length; i++){
            let temp = []
            if(option[i] === 'peanut‌ ‌butter‌'){
                temp = new PeanutButter(option[i])
            } else if(option[i] === 'chocolate‌ ‌chip‌'){
                temp = new ChocolateChips(option[i])
            }else{
                temp = new OtherCookie(option[i])
            }
            batchCake.push(temp)
        }
        return batchCake
    }
}

// console.log(CookieFactory.create(option))



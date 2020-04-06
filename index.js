const fs = require('fs');

class Cookie {
    constructor(name){
        this.name = name
        this.status = 'mentah'
        this.ingredients = []
    }

    bake(){

    }
}

class PeanutButter extends Cookie{
    constructor(name, count){
        super(name)
        this.peanut_count = count
    }
}

class ChocolateChip extends Cookie{
    constructor(name, count){
        super(name)
        this.choc_chip_count = count
    }
}
class ChocolateCheese extends Cookie{
    constructor(name, count){
        super(name)
        this.choc_cheese_count = count
    }
}
class ChocolateButter extends Cookie{
    constructor(name, count){
        super(name)
        this.choc_butter_count = count
    }
}

class CookieFactory{
    static create(cookies){

    }
}

const options = fs.readFileSync('./cookies.txt', 'utf-8').split('\n');

options.forEach(data => {
    switch(data){
        case 'peanut butter':
        console.log(new PeanutButter(data, 20));
        break;

        case 'chocolate chip':
        console.log(new ChocolateChip(data, 100));
        break;

        case 'chocolate cheese':
        console.log(new ChocolateCheese(data, 120));
        break;

        case 'chocolate butter':
        console.log(new ChocolateButter(data, 110));
        break;

        default:
        break;
    }
});

const fs = require('fs');

class Cookie {
    constructor(name){
        this.name = name
        this.form = 'ordinary'
        this.status = 'mentah'
        this.ingredients = []
        this.isSugar = this.sugarChecker(name)
    }

    addIngredient(cookieName){ //adding ingredients to property
        const ingredient = fs.readFileSync('./ingredients.txt', 'utf-8').split('\n');

        ingredient.forEach(el => {
            const data = el.split('=');
            const res = Ingredients.spliter(data[1]);

            if(cookieName === data[0]){
                for (let i = 0; i < res.length; i++) {
                    this.ingredients.push(new Ingredients(res[i][1], res[i][0]));
                }
            }
        });
    }

    bake(){ // changing status
        if(this.status === 'mentah'){ // if bake 2x it'ill turn overbake
            this.status = 'selesai'
        } else {
            this.status = 'hangus'
        }
    }

    sugarChecker(cookieName){
        const ingredient = fs.readFileSync('./ingredients.txt', 'utf-8').split('\n');
        let flag = false

        ingredient.forEach(el => {
            const data = el.split('=');
            const res = Ingredients.spliter(data[1]);

            if(cookieName === data[0]){
                for (let i = 0; i < res.length; i++) {
                    if(res[i][1] === 'sugar' && Number(res[i][0][0]) > 0){
                        flag = true
                    }
                }
            }
        });
        return flag
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
class ChocolateChipCrumbled extends ChocolateChip{
    constructor(name, count){
        super(name, count)
        this.form = 'crumbled'
    }
}
class PeanutButterCrumbled extends PeanutButter{
    constructor(name, count){
        super(name, count)
        this.form = 'crumbled'
    }
}

class Ingredients{
    constructor(name, amount){
        this.name = name
        this.amount = amount
    }

    static spliter(data){ // edit data ingredients from txt
        const ingredient = data.split(', ');
        let amount = [];

        for (let i = 0; i < ingredient.length; i++) {
            const ingredients = ingredient[i].split(' : ');
            amount.push([ingredients[0], ingredients[1]]);
        }

        return amount;
    }
}

class CookieFactory{
    static create(cookies, count){
        switch(cookies){
            case 'peanut butter':
            return new PeanutButter(cookies, count);

            case 'chocolate chip':
            return new ChocolateChip(cookies, count);

            case 'chocolate cheese':
            return new ChocolateCheese(cookies, count);

            case 'chocolate butter':
            return new ChocolateButter(cookies, count);

            case 'chocolate chip crumbled':
            return new ChocolateChipCrumbled(cookies, count);

            case 'peanut butter crumbled':
            return new PeanutButterCrumbled(cookies, count);

            default:
            return 'Wrong cookie name';
        }
    }

    static cookieRecommendation(day, instance){
        switch(day){
            case 'tuesday':
            let result = [];
            instance.forEach(el => {
                if(!el.isSugar){
                    result.push(el)
                }
            });
            return result;

            default:
            break;
        }
    }
}

let display = () => {
    const options = fs.readFileSync('./cookies.txt', 'utf-8').split('\n');
    const ingredient = fs.readFileSync('./ingredients.txt', 'utf-8').split('\n');

    let obj = {};
    let result = [];

    ingredient.forEach(el => {
        let data = el.split('=');
        obj[data[0]] = data[1];
    });

    options.forEach(cookieName => {
        let cookie = CookieFactory.create(cookieName, 200);
        cookie.addIngredient(cookieName);
        cookie.bake();
        result.push(cookie)
        console.log(cookie)
    });

    let cookie1 = CookieFactory.create('chocolate chip crumbled', 100);
    let cookie2 = CookieFactory.create('peanut butter crumbled', 100);
    console.log(cookie1);
    console.log(cookie2);

    let sugarFreeFoods = CookieFactory.cookieRecommendation('tuesday', result);
    console.log('sugar free foods are :');

    sugarFreeFoods.forEach(el => {
        console.log(el.name);
    });
}

display();
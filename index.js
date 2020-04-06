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
    constructor(name, count, ingredient){
        super(name)
        this.ingredients = ingredient
        this.peanut_count = count
    }
}

class ChocolateChip extends Cookie{
    constructor(name, count, ingredient){
        super(name)
        this.ingredients = ingredient
        this.choc_chip_count = count
    }
}
class ChocolateCheese extends Cookie{
    constructor(name, count, ingredient){
        super(name)
        this.ingredients = ingredient
        this.choc_cheese_count = count
    }
}
class ChocolateButter extends Cookie{
    constructor(name, count, ingredient){
        super(name)
        this.ingredients = ingredient
        this.choc_butter_count = count
    }
}

class Ingredients{
    constructor(name, amount){
        this.name = name
        this.amount = amount
    }

    static spliter(data){
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
    static create(cookies, count, ingredient){
        switch(cookies){
            case 'peanut butter':
            return new PeanutButter(cookies, count, ingredient);

            case 'chocolate chip':
            return new ChocolateChip(cookies, count, ingredient);

            case 'chocolate cheese':
            return new PeanutButter(cookies, count, ingredient);

            case 'chocolate butter':
            return new ChocolateButter(cookies, count, ingredient);
        }
    }
}

const display = () => {
    const options = fs.readFileSync('./cookies.txt', 'utf-8').split('\n');
    const ingredient = fs.readFileSync('./ingredients.txt', 'utf-8').split('\n');

    let obj = {};

    ingredient.forEach(el => {
        const data = el.split('=');
        obj[data[0]] = data[1];
    });

    
    options.forEach(data => {
        const dataRes = Ingredients.spliter(obj[data]);
        switch(data){
            case 'peanut butter':
            const peanut_butter_ing = [];
            dataRes.forEach(el => {
                peanut_butter_ing.push(new Ingredients(el[1], el[0]));
            });

            const peanutButter = CookieFactory.create(data, 100, peanut_butter_ing);
            console.log(peanutButter);
            break;
    
            case 'chocolate chip':
            const choc_chip_ing = [];
            dataRes.forEach(el => {
                choc_chip_ing.push(new Ingredients(el[1], el[0]));
            });

            const chocolateChip = CookieFactory.create(data, 200, choc_chip_ing);
            console.log(chocolateChip);
            break;
    
            case 'chocolate cheese':
            const choc_cheese_ing = [];
            dataRes.forEach(el => {
                choc_cheese_ing.push(new Ingredients(el[1], el[0]));
            });

            const chocolateCheese = CookieFactory.create(data, 100, choc_cheese_ing);
            console.log(chocolateCheese);
            break;
    
            case 'chocolate butter':
            const choc_butter_ing = [];
            dataRes.forEach(el => {
                choc_butter_ing.push(new Ingredients(el[1], el[0]));
            });

            const chocolateButter = new ChocolateButter(data, 150, choc_butter_ing);
            console.log(chocolateButter)
            break;
    
            default:
            break;
        }
    });
}

display();
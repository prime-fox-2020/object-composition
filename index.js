const fs = require('fs');

class Cookie {
    constructor(name){
        this.name = name
        this.status = 'mentah'
        this.ingredients = []
        // this.ingredients = this.addIngredient()
    }

    addIngredient(cookieName){
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

    bake(){
        this.status = 'selesai'
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

}
class PeanutButterCrumbled extends PeanutButter{

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
            return new ChocolateCheese(cookies, count, ingredient);

            case 'chocolate butter':
            return new ChocolateButter(cookies, count, ingredient);

            default:
            return 'Wrong cookie name';
        }
    }

    static cookieRecommendation(day, cookie){
        
    }
}

const display = () => {
    const options = fs.readFileSync('./cookies.txt', 'utf-8').split('\n');
    const ingredient = fs.readFileSync('./ingredients.txt', 'utf-8').split('\n');

    let obj = {};
    let result = [];

    ingredient.forEach(el => {
        const data = el.split('=');
        obj[data[0]] = data[1];
    });

    const peanutButter = new PeanutButter('peanut butter', 100);
    peanutButter.addIngredient('peanut butter');
    console.log(peanutButter)

    const chocolateChip = new ChocolateChip('chocolate chip', 200);
    chocolateChip.addIngredient('chocolate chip');
    console.log(chocolateChip)

    const chocolateCheese = new ChocolateCheese('chocolate cheese', 250);
    chocolateCheese.addIngredient('chocolate cheese');
    console.log(chocolateCheese)

    const chocolateButter = new ChocolateButter('chocolate butter', 150);
    chocolateButter.addIngredient('chocolate butter');
    console.log(chocolateButter)

    
    // options.forEach(data => {
    //     const dataRes = Ingredients.spliter(obj[data]);

    //     switch(data){
    //         case 'peanut butter':
    //         const peanut_butter_ing = [];
    //         dataRes.forEach(el => {
    //             peanut_butter_ing.push(new Ingredients(el[1], el[0]));
    //         });

    //         const peanutButter = CookieFactory.create(data, 100, peanut_butter_ing);
    //         result.push(peanutButter);
    //         break;
    
    //         case 'chocolate chip':
    //         const choc_chip_ing = [];
    //         dataRes.forEach(el => {
    //             choc_chip_ing.push(new Ingredients(el[1], el[0]));
    //         });

    //         const chocolateChip = CookieFactory.create(data, 200, choc_chip_ing);
    //         result.push(chocolateChip);
    //         break;
    
    //         case 'chocolate cheese':
    //         const choc_cheese_ing = [];
    //         dataRes.forEach(el => {
    //             choc_cheese_ing.push(new Ingredients(el[1], el[0]));
    //         });

    //         const chocolateCheese = CookieFactory.create(data, 100, choc_cheese_ing);
    //         result.push(chocolateCheese);
    //         break;
    
    //         case 'chocolate butter':
    //         const choc_butter_ing = [];
    //         dataRes.forEach(el => {
    //             choc_butter_ing.push(new Ingredients(el[1], el[0]));
    //         });

    //         const chocolateButter = new ChocolateButter(data, 150, choc_butter_ing);
    //         result.push(chocolateButter);
    //         break;
    
    //         default:
    //         break;
    //     }
    // });

    result.forEach(instance => {
        // let sugarFreeFoods = CookieFactory.cookieRecommendation('tuesday', instance);
        // console.log('sugar free cakes are :');
        // sugarFreeFoods.forEach(el => {
        //     console.log(el.name)
        // });
        console.log(instance)
    });
}

display();
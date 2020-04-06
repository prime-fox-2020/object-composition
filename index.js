class Cookie {
    constructor(name, ingredients) {
        this.name = name;
        this.ingredient = ingredients;
        this.status = "mentah";
        // this.sugar = this.checkSugar(ingredients);
    }

    bake() {
        this.status = "selesai dimasak";
    }
    // checkSugar(ingredients) {
    //     for (let component of ingredients) {
    //         if (component.name == "sugar") {
    //             return true;
    //         }
    //     }
    //     return false;
    // }
}

class PeanutButter extends Cookie {
    constructor(name, ingredient) {
        super(name, ingredient);
        this.count = 100; 
    }
}

class ChocolateChip extends Cookie {
    constructor(name, ingredient) {
        super(name, ingredient);
        this.count = 200;
    }
}

class OtherCookie extends Cookie {
    constructor(name, ingredient) {
        super(name, ingredient);
        this.count = 150;
    }
}

class Ingredient {
    constructor(name, amount, unit) {
        this.name = name;
        this.amount = amount;
        this.unit = unit
    }
}

class CookieFactory {
    static create(cookieList) {
        let cookies = [];
        // processing the name & ingredient from string to array of object;
        for (let i in cookieList) {
            cookieList[i] = cookieList[i].split('='); // separate the ingredient
            
            cookieList[i][1] = cookieList[i][1].split(',');
            for (let ingredient in cookieList[i][1]) {
                cookieList[i][1][ingredient] = cookieList[i][1][ingredient].split(':'); // seperate the amount of the ingredient
                cookieList[i][1][ingredient][1] = cookieList[i][1][ingredient][1].split(' '); // seperate the unit of the amount
                cookieList[i][1][ingredient] = new Ingredient(cookieList[i][1][ingredient][0], +cookieList[i][1][ingredient][1][0], cookieList[i][1][ingredient][1][1]);
            }

            switch(cookieList[i][0]) {
                case 'peanut butter': cookies.push(new PeanutButter(cookieList[i][0], cookieList[i][1])); break;
                case 'chocolate chip': cookies.push(new ChocolateChip(cookieList[i][0], cookieList[i][1])); break;
                default: cookies.push(new OtherCookie(cookieList[i][0], cookieList[i][1])); break;
            }
        }
        return cookies;
    }

    static cookieRecomendation(day, cookieList) {
        let selection = [];
        let undesireable = CookieFactory.undesireableIngredient(day);
        for (let cookie = 0; cookie < cookieList.length; cookie++) {
            let selected = true;
            for (let ingredient of cookieList[cookie].ingredient) {
                if (ingredient.name == undesireable) {
                    selected = false;
                    break;
                }
            }
            if (selected) {selection.push(cookieList[cookie]);}
        }
        return selection;
    }
    
    static undesireableIngredient(day) {
        let undesireable = '';
        // selectria base on the day
        switch (day) {
            case 'monday': undesireable = "flavour adders"; break;
            case 'tuesday': undesireable = "sugar"; break;
            case 'wednesday': undesireable = "cinnamon"; break;
            case 'thursday': undesireable = "flour"; break;
            case 'friday': undesireable = "chips"; break;
            default: 
        }
        return undesireable;
    }
}


const fs = require('fs');
let cookieList = fs.readFileSync('./cookies.txt', 'utf8').split('\n');
cookies = CookieFactory.create(cookieList);

// // bake the cookies
// for (let cookie of cookies){
//     cookie.bake();
// }

// console.log(cookies);
// // Display the ingredients
// for (let cookie of cookies) {
//     console.log(cookie.name);
//     console.log(cookie.ingredient);
// }

/**
 * Today menu recomendation
 * monday, only menu without flavour adders
 * tuesday, only menu without sugar
 * wednesday, only menu without cinnamon
 * thursday, only menu with no gluten flour
 * friday, only menu with chips
 * saturday & sunday, all you can eat
 */
today = process.argv[2]; // Input the day in terminal
const todayMenu = CookieFactory.cookieRecomendation(today, cookies);
console.log(`Yeay, today is ${today == "saturday" || today == "sunday" ? "weekends! You can eat all cookies" : `${today}! All of our menu has no ${CookieFactory.undesireableIngredient(today)}`}. Enjoy our menu below:`);
for (let menu in todayMenu) {
    console.log(`${+menu+1}. ${todayMenu[menu].name}`);
}
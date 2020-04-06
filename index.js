var crumbleChoco = [
    {
        "name": "flour",
        "amount": "1 cup"
    },
    {
        "name": "milk",
        "amount": "2 cup"
    },
    {
        "name": "chocolate",
        "amount": "1 bar"
    },
]

var crumblePeanut = [
    {
        "name": "butter",
        "amount": "1 cup"
    },
    {
        "name": "indomie",
        "amount": "1 piring"
    },
    {
        "name": "ayam suir",
        "amount": "1 gram"
    },
]
// Class Parent Utama
class Cookie {
    constructor(ingredients) {
        this.status = "mentah"
        this.has_sugar = false;
        this.ingredients = this.generateIngredient(ingredients);
    }
    bake() {
        this.status = "selesai dimasak"
    }
    generateIngredient(ingredients) {
        let result = [];
        for (let ingredient of ingredients) {
            if (ingredient.name.includes("sugar")) {
                this.has_sugar = true;
            }
            result.push(new Ingredient(ingredient))
        }
        return result;
    }
}
// Class Tambahan
class Ingredient {
    constructor(option) {
        this.name = option["name"];
        this.amount = option["amount"]
    }
}
// Child of Cookie
class PeanutButter extends Cookie {
    constructor(ingredients) {
        super(ingredients);
        this.name = "peanut butter"
        this.peanut_count = 100
    }
}

class ChocholateChip extends Cookie {
    constructor(ingredients) {
        super(ingredients);
        this.name = "chocolate chip"
        this.choc_chip_count = 200
    }

}
class ChocholateChipCrumbled extends Cookie {
    constructor(ingredients) {
        super(ingredients);
        this.name = "chocolate chip crumbled"
        this.count = 200
    }

}
class PeanutButterCrumbled extends Cookie {
    constructor(ingredients) {
        super(ingredients);
        this.name = "peanut butter crumbled"
        this.count = 200
    }
}

class OtherCookie extends Cookie {
    constructor(name, ingredients) {
        super(ingredients);
        this.name = name;
        this.other_count = 150;
    }
}

class CookieFactory {
    static create(cookies, ingredients) {
        let resultCookies = [];

        for (let kue of cookies) {
            let objKue = CookieFactory.searchClass(kue, ingredients);
            resultCookies.push(objKue)
        }
        return resultCookies;
    }

    static searchClass(str, ingredient) {
        if (str === "peanut butter") return new PeanutButter(ingredient[str]);
        if (str === "chocolate chip") return new ChocholateChip(ingredient[str]);
        return new OtherCookie(str, ingredient[str]);
    }
    static cookieRecomendation(day, listOfCookies) {
        // in case ada hari lain
        switch (day.toLowerCase()) {
            case "tuesday": {
                return listOfCookies.filter(cookie => !cookie.has_sugar);
            }
        }
    }
}

let fs = require('fs');
let options = fs.readFileSync("cookies.txt").toString().split("\n");
let ingredientsJ = JSON.parse(fs.readFileSync("ingredients.json").toString())

let batch_of_cookies = CookieFactory.create(options, ingredientsJ);
batch_of_cookies.push(new ChocholateChipCrumbled(crumbleChoco), new PeanutButterCrumbled(crumblePeanut));
console.log(batch_of_cookies);


let sugarFreeCookies = CookieFactory.cookieRecomendation("Tuesday", batch_of_cookies)
console.log("Cakes free sugar are: ")
for (let cookie of sugarFreeCookies) {
    console.log('- ', cookie.name);
}

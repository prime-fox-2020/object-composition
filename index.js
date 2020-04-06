const fs = require("fs")
const options = fs.readFileSync("./cookies.txt", "utf8").split("\r\n")

class Ingredient {
    constructor(options) {
        this.name = options[1]
        this.amount = options[0]
    }
}

class Cookie {
    constructor(name, ingredients) {
        this.name = name
        this.status = "mentah"
        this.ingredients = this.ingredientsArrToObj(ingredients)
    }

    bake() {
        this.status = "selesai dimasak"
    }

    ingredientsArrToObj(ingredients) {
        let ingredientsArr = []
        for (let i = 0; i < ingredients.length; i++) {
            ingredientsArr.push(new Ingredient(ingredients[i].trim().split(" : ")))
        }
        // console.log(ingredientsArr)
        return ingredientsArr
    }

}

class PeanutButter extends Cookie {
    constructor(name, ingredients) {
        super(name, ingredients)
        this.peanut_count = 100
    }
}

class ChocolateChip extends Cookie {
    constructor(name, ingredients) {
        super(name, ingredients)
        this.choc_chic_count = 200
    }
}

class OtherCookies extends Cookie {
    constructor(name, ingredients) {
        super(name, ingredients)
        this.other_count = 150
    }
}

class CookieFactory {
    static create(cookies) {
        // accepts a list of cookie types and returns those cookies
        let cookiesArr = []
        for (let cookie of cookies) {
            let cookieName = cookie.slice(0, cookie.indexOf(" = "))
            let ingredients = cookie.slice(cookie.indexOf(" = ") + 2).split(",")
            switch (cookieName) {
                case "peanut butter":
                    cookiesArr.push(new PeanutButter("peanut butter", ingredients))
                    break;
                case "chocolate chip":
                    cookiesArr.push(new ChocolateChip("chocolate chip", ingredients))
                    break;
                default:
                    cookiesArr.push(new OtherCookies(cookieName, ingredients))
                    break;
            }
        }
        // for (let i = 0; i < cookiesArr.length; i++) {
        //     // console.log(cookiesArr[i])
        return cookiesArr


        // }
    }

    static cookieRecommendation(day, b_o_c) {
        this.day = day
        this.b_o_c = b_o_c
        let cookieRecommend = []
        switch (day) {
            case "sunday":
            cookieRecommend.push("flour")
                break;
            case "monday":
                cookieRecommend.push("butter")
                break;
            case "tuesday":
                cookieRecommend.push("sugar")
                break;
            case "wednesday":
                cookieRecommend.push("gluten free flour")
                break;
            case "thrusday":
                cookieRecommend.push("cinnamon")
                break;
            case "friday":
                cookieRecommend.push("chips")
                break;
            case "saturday":
                cookieRecommend.push("")
                break;
            default:
                break;
        }
        for (let i = 0; i < b_o_c.length; i++) {
            let check = true
            // console.log(b_o_c[i].ingredients)
            for (let j = 0; j < b_o_c[i].ingredients.length; j++) {
                if (day == "sunday" && b_o_c[i].ingredients[j].name === "flour") {
                    check = false
                } else if (day == "monday" && b_o_c[i].ingredients[j].name === "butter") {
                    check = false
                } else if (day == "tuesday" && b_o_c[i].ingredients[j].name === "sugar") {
                    check = false
                } else if (day == "wednesday" && b_o_c[i].ingredients[j].name === "gluten free flour") {
                    check = false
                } else if (day == "thrusday" && b_o_c[i].ingredients[j].name === "cinnamon") {
                    check = false
                } else if (day == "friday" && b_o_c[i].ingredients[j].name === "chips") {
                    check = false
                } else if (day == "saturday") {
                    check = true
                }
            }
            if (check) {
                cookieRecommend.push(b_o_c[i])
            }
        }
        console.log(cookieRecommend)
        return cookieRecommend
    }
    // define other methods as needed
}

let batch_of_cookies = CookieFactory.create(options)
// console.log(batch_of_cookies)

let sugarFreeFoods = CookieFactory.cookieRecommendation("saturday", batch_of_cookies);
console.log((sugarFreeFoods[0] + " free cakes are :").trim());
for (let i = 1; i < sugarFreeFoods.length; i++) {
    console.log(sugarFreeFoods[i].name)

}
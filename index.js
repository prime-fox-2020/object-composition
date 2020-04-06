
const fs = require('fs')
const options = fs.readFileSync('./cookies.txt', 'utf8')
  .split(/\r\n|\n/g)
const CookieFactory = require('./cookie-factory')

let batchOfCookies = CookieFactory.create(options)
// console.log(batchOfCookies[0]._ingredients)
console.log(batchOfCookies)

let sugarFreeFoods = CookieFactory.cookieRecommendation("tuesday", batchOfCookies);
console.log("sugar free cakes are :");
for (let i = 0; i < sugarFreeFoods.length; i++) {
  console.log(sugarFreeFoods[i]._name);
}

/*

[
  PeanutButter {
    name: 'peanut butter',
    status: 'mentah',
    ingredients: [],
    peanutCount: 100
  },
  ChoholateChip {
    name: 'chocolate chip',
    status: 'mentah',
    ingredients: [],
    peanutCount: 200
  },
  OtherCookie {
    name: 'chocolate chesse',
    status: 'mentah',
    ingredients: [],
    peanutCount: 100
  },
  OtherCookie {
    name: 'chocolate butter',
    status: 'mentah',
    ingredients: [],
    peanutCount: 100
  }
]

 */
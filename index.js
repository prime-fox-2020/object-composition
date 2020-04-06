
const fs = require('fs')
const options = fs.readFileSync('./cookies.txt', 'utf8').split('\r\n')
const CookieFactory = require('./cookie-factory')

let batchOfCookies = CookieFactory.create(options)
console.log(batchOfCookies)

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
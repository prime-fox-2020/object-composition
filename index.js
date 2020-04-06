'use strict'


const fs = require('fs')
const option = fs.readFileSync('./cookies.txt', 'utf8').split('\n')
const dbIngredients = fs.readFileSync('./ingredients.txt', 'utf8').split('\n')

class Ingredients {
  constructor (data) {
    this.name = data['name']
    this.amount = data['amount']
  }
}

class Cookie {
  constructor (name, recipe) {
    this.name = name
    this.status = 'mentah'
    this.ingredients = this.choosingIngredients(recipe)
  }

  choosingIngredients (recipe) {
    // console.log(recipe)
    const ingredients = []
    for (const key in recipe) {
      ingredients.push(new Ingredients({ name: key, amount: recipe[key] }))
    }
    return ingredients
  }

  bake () {
    this.status = 'selesai dimasak'
  }
}

class PeanutButter extends Cookie {
  constructor (name, recipe) {
    super(name, recipe)
    this.peanut_count = 100
  }
}

class ChocolateChip extends Cookie {
  constructor (name, recipe) {
    super(name, recipe)
    this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookie {
  constructor (name, recipe) {
    super(name, recipe)
    this.other_cookie_count = 150
  }
}

class CookieFactory {
  static create (cookies, dbIngredients) {
    const orderedCookies = []
    const parsingIngredients = CookieFactory.parsingIngredients(dbIngredients)
    // Accepts a list of cookie types and return those cookies
    cookies.forEach(name => {
      switch (name) {
        case 'peanut butter':
          orderedCookies.push(new PeanutButter(name, parsingIngredients[name]))
          break
        case 'chocolate chip':
          orderedCookies.push(new ChocolateChip(name, parsingIngredients[name]))
          break
        default:
          orderedCookies.push(new OtherCookie(name, parsingIngredients[name]))
          break
      }
    })
    return orderedCookies
  }

  static cookieRecommendation (day, batchOfCookies) {
    // Create new array based on cookie recommendation on that 'day'
    if (day === 'tuesday') {
      let isContainSugar = false
      const result = []
      for (let i = 0; i < batchOfCookies.length; i++) {
        isContainSugar = false
        const check = batchOfCookies[i]['ingredients']
        // console.log(check)
        for (let j = 0; j < check.length; j++) {
          if (check[j]['name'] === 'sugar') {
            isContainSugar = true
            break
          }
        }
        if (!isContainSugar) result.push(batchOfCookies[i])
      }
      return result
    }
  }

  static parsingIngredients (dbIngredients) {
    const recipes = {}
    dbIngredients.forEach(cookie => {
      const name = (cookie.split('=')[0]).trim()
      const ingre = (cookie.split('=')[1]).trim().split(',')
      const recipe = {}
      ingre.forEach(element => {
        recipe[(element.split(':')[1]).trim()] = (element.split(':')[0]).trim()
      })
      recipes[name] = recipe
    })
    return recipes
  }
}



/* RELEASE 0 */
let batchOfCookies = CookieFactory.create(option, dbIngredients)
console.log(batchOfCookies)

/* RELEASE 1 */
let sugarFreeFoods = CookieFactory.cookieRecommendation('tuesday', batchOfCookies)
console.log(`\nSugar free cakes are :\n======================`)
for (let i = 0; i < sugarFreeFoods.length; i++) {
  console.log(sugarFreeFoods[i].name)
}
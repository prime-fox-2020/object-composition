const Cookie = require('./cookie')

class ChocolateChips extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients)
    this._chocolateCount = 200
  }
}

module.exports = ChocolateChips
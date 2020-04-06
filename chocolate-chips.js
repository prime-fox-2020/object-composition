const Cookie = require('./cookie')

class ChocolateChips extends Cookie {
  constructor(name) {
    super(name)
    this._chocolateCount = 200
  }
}

module.exports = ChocolateChips
const Cookie = require('./cookie')

class PeanutButter extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients)
    this._peanutCount = 100
  }
}

module.exports = PeanutButter
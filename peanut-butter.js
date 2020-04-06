const Cookie = require('./cookie')

class PeanutButter extends Cookie {
  constructor(name) {
    super(name)
    this._peanutCount = 100
  }
}

module.exports = PeanutButter
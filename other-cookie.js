const Cookie = require('./cookie')

class OtherCookie extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients)
    this._otherCount = 100
  }
}

module.exports = OtherCookie
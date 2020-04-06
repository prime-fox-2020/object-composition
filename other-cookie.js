const Cookie = require('./cookie')

class OtherCookie extends Cookie {
  constructor(name) {
    super(name)
    this._otherCount = 100
  }
}

module.exports = OtherCookie
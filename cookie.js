class Cookie {
  constructor(name) {
    this._name = name
    this._status = 'mentah'
    this._ingredients = []
  }

  bake() {
    this._status = 'selesai dimasak'
  }
}

module.exports = Cookie
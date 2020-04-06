class Cookie {
  constructor(name, ingredients = []) {
    this._name = name
    this._status = 'mentah'
    this._ingredients = ingredients
    this._hasSugar = ingredients.some(el => el._name === 'sugar')
  }

  bake() {
    this._status = 'selesai dimasak'
  }
}

module.exports = Cookie
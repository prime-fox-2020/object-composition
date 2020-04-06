const ChoholateChip = require('./chocolate-chips')
const PeanutButter = require('./peanut-butter')
const OtherCookie = require('./other-cookie')
const Ingredient = require('./ingredient')



class CookieFactory {

  //terima daftar jenis cookie dan return cookie object
  static create(cookies) {
    const list = []

    cookies.forEach(line => {
      const namaDanBahans = line.split('=').map(el => el.trim())
      const ingredients = namaDanBahans[1].split(',').map(el => el.trim()).map(el => {
        let pair = el.split(':').map(el => el.trim())
        return new Ingredient(pair)
      })

      switch (namaDanBahans[0]) {
        case 'peanut butter': list.push(new PeanutButter(namaDanBahans[0], ingredients))
          break
        case 'chocolate chip': list.push(new ChoholateChip(namaDanBahans[0], ingredients))
          break
        default: list.push(new OtherCookie(namaDanBahans[0], ingredients))
          break
      }
    })

    return list
  }
  //mothod lain yg diperlukan
  static cookieRecommendation(day, list = []) {
    const userPref = {
      sunday : [],
      monday : [],
      tuesday : ['sugar'],
      wednesday : [],
      thursday : [],
      friday : [],
      satursay : []
    },
    reject = userPref[day]
    return list.filter(kue => kue._ingredients.every(bahan => !reject.includes(bahan._name)))
  }
}

module.exports = CookieFactory
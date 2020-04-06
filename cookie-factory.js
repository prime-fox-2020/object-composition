const ChoholateChip = require('./chocolate-chips')
const PeanutButter = require('./peanut-butter')
const OtherCookie = require('./other-cookie')
class CookieFactory {
  static create(cookies) {
    //terima daftar jenis cookie dan return cookie object
    const list = []
    const daftarKue = {
      'peanut butter': new PeanutButter('peanut butter'),
      'chocolate chip': new ChoholateChip('chocolate chip')
    }

    cookies.forEach(namaKue => {
      daftarKue[namaKue] ?
        list.push(daftarKue[namaKue])
        : list.push(new OtherCookie(namaKue))
    });
    return list
  }
  //mothod lain yg diperlukan
}

module.exports = CookieFactory
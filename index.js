class Cookie {
  constructor(name) {
    this.name = name;
    this.status = 'mentah';
    this.ingredients = [];
  }

  bake() {
    this.status = 'selesai dimasak';
  }
}

class PeanutButter extends Cookie {
  constructor(name) {
    super(name);
    this.peanut_count = 100;
  }
}

class ChocolateChip extends Cookie {
  constructor(name) {
    super(name);
    this.choc_chip_count = 200;
  }
}

class OtherCookie extends Cookie {
  constructor(name) {
    super(name);
    this.other_count = 150;
  }
}

class CookieFactory {
  static create(cookies) {
    let array = [];
    for (let i = 0; i < cookies.length; i++) {
      switch (cookies[i]) {
        case 'peanut butter': array.push(new PeanutButter(cookies[i])); break;
        case 'chocolate chip': array.push(new ChocolateChip(cookies[i])); break;
        default: array.push(new ChocolateChip(cookies[i])); break;
      }
    }
    return array;
  }
}

const fs = require('fs');
let options = fs.readFileSync('./cookies.txt', 'utf8').split('\n');
let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies);
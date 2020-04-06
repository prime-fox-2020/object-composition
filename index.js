//Nama kue
var fs = require('fs');
var split1 = fs.readFileSync('cookies.txt', 'utf8');
var options = split1.split('\n');
// Bahan kue
var split2 = fs.readFileSync('bahan.txt', 'utf8');
var bahan = split2.split('\n');
// console.log(bahan);

class Ingredient {
	constructor(name, amount) {
		this.name = name;
		this.amount = amount;
	}
}

class Cookie {
	constructor(nama) {
		this.name = nama;
		this.status = 'mentah';
		this.ingredients = [];
	}
	bake() {
		this.status = 'selesai dimasak';
	}
}

class PeanutButter extends Cookie {
	constructor(nama) {
		super(nama);
		this.peanut_count = 100;
	}
}

class ChocolateChip extends Cookie {
	constructor(nama) {
		super(nama);
		this.peanut_count = 200;
	}
}
class OtherCookies extends Cookie {
	constructor(nama) {
		super(nama);
		this.other_count = 150;
	}
}

class CookieFactory {
	static create(cookies) {
		this.kue = [];

		for (var i = 0; i < cookies.length; i++) {
			if (cookies[i] === 'peanut butter') {
				this.kue.push(new PeanutButter('peanut butter'));
			} else if (cookies[i] === 'chocolate chip') {
				this.kue.push(new ChocolateChip('chocolate chip'));
			} else {
				this.kue.push(new OtherCookies(cookies[i]));
			}
		}
		let kotakKue = [];
		for (var i = 0; i < bahan.length; i++) {
			let kotakBahanBahan = [];
			let ambilBahan = bahan[i].split(' = ')[1].split(', ');
			let ambilNama = bahan[i].split(' =')[0];

			for (var j = 0; j < ambilBahan.length; j++) {
				let namaBahan = ambilBahan[j].split(' : ')[1];
				let jumlahTakaran = ambilBahan[j].split(' : ')[0];
				kotakBahanBahan.push(new Ingredient(namaBahan, jumlahTakaran));
			}
			console.log(kotakBahanBahan);
			kotakKue.push({ ambilNama, kotakBahanBahan });
		}

		for (var i = 0; i < this.kue.length; i++) {
			for (var j = 0; j < kotakKue.length; j++) {
				if (kotakKue[j].ambilNama === this.kue[i].name) {
					this.kue[i].ingredients = kotakKue[j].kotakBahanBahan;
				}
			}
		}
		return this.kue;
	}

	static cookieRecomendation(day, cookies) {
		if (day === 'tuesday') {
			let sugarFreeFoods = [];
			let counter = 0;
			for (var i = 0; i < cookies.length; i++) {
				counter = 0;
				for (var j = 0; j < cookies[i].ingredients.length; j++) {
					if (cookies[i].ingredients[j].name === 'sugar' && cookies[i].ingredients[j].name !== 'sugar free') {
						counter++;
					}
				}
				if (counter === 0) {
					sugarFreeFoods.push(cookies[i]);
				}
			}
			return sugarFreeFoods;
		}
	}
}

let batch_of_cookies = CookieFactory.create(options);
let SugarFreeFoods = CookieFactory.cookieRecomendation('tuesday', batch_of_cookies);
console.log(batch_of_cookies)
console.log('Sugar free foods are');
console.log('---------------------');
for (var i = 0; i < SugarFreeFoods.length; i++) {
	console.log(SugarFreeFoods[i].name);
}



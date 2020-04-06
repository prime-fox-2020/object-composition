

class Cookies{

    constructor(name){
        this.name = name
        this.status = `mentah`
        this.ingredients = []
    }

    bake(){
        this.status = `Selesai dimasak`
    }

}

class PeanutButter extends Cookies{
    constructor(){
        super(`peanut butter`)
        this.peanut_count = 100
    }
}

class ChocolateChip extends Cookies{
    constructor(){
        super(`chocolate chip`)
        this.choc_chip_count = 200
    }
}

class OtherCookie extends Cookies{
    constructor(name){
        super(name)
        this._count = 150
    }
}

class ChocolateChipCrumbled extends Cookies{
    constructor(){
        super(`chocolate chip crumbled`)
        this._count = 100
    }
}

class PeanutButterCrumbled extends Cookies{
    constructor(){
        super(`peanut butter crumbled`)
        this._count = 100
    }
}




class CookieFacktory{

    constructor(){
        this.kue2 = []
    }

    static create(cookies){
        let cookiesArr = cookies.split(`\r\n`)
        let jajanan =[]

        for (let i = 0; i < cookiesArr.length; i++) {
            if(cookiesArr[i] == `peanut butter`){
                jajanan.push( new PeanutButter() )
            }else if(cookiesArr[i] == `chocolate chip`){
                jajanan.push( new ChocolateChip() )
            }else if(cookiesArr[i] == `chocolate chip crumbled`){
                jajanan.push( new ChocolateChipCrumbled() )
            }else if(cookiesArr[i] == `peanut butter crumbled`){
                jajanan.push( new PeanutButterCrumbled() )
            }else{
                jajanan.push( new OtherCookie(cookiesArr[i]) )
            }
        }
        return jajanan
        //accepts a list of cookie type and returns those cookies
    }

    static cookieRecommendation(hari,data2){
        let kuePilihan =[]
        if(hari ==`thuesday` ){
            //Komposisi
            let ingredients = new Ingredients();
            let dataKue = ingredients.ubahData(data2)
            for (const kue in dataKue[`bahan`]) {
                let cek = false
                for (const komposisi in dataKue[`bahan`][kue]) {
                    if(komposisi == `sugar`){
                        cek = true
                    }
                }
                if(cek==false){
                    kuePilihan.push(kue)
                }
            }
        }
        return kuePilihan
    }

    //define other methods as needed
}


class Ingredients{
    constructor(){
        this.bahan = {}
    }

     ubahData(data2){

        // Proses ubah data2 ( text ), Menjadi data Object Of Object
        let bahanSplit1 = data2.split(`\r\n`)
        let bahanSplit2 = []
        for (let i = 0; i < bahanSplit1.length; i++) {
            bahanSplit2.push(bahanSplit1[i].split(` = `))
        }
        let bahanSplit3 = []
        for (let i = 0; i < bahanSplit2.length; i++) {
            bahanSplit3.push(bahanSplit2[i][1].split(`, `))
        }
        let bahanSplit4 =[]
        for (let i = 0; i < bahanSplit3.length; i++) {
            let tampung = []
            for (let j = 0; j < bahanSplit3[i].length; j++) {
                tampung.push(bahanSplit3[i][j].split(' : '))
            }
            bahanSplit4.push(tampung)
        }

        for (let i = 0; i < bahanSplit2.length; i++) {
            let object = {}
            for (let j = 0; j < bahanSplit4[i].length; j++) {
                object[bahanSplit4[i][j][1]]=bahanSplit4[i][j][0]
            }
            this.bahan[bahanSplit2[i][0]] = object
        }
        return this
    }

}

 let fs = require(`fs`);
 let options = fs.readFileSync(`./cookies.txt`,`utf8`)

 //Membuat File txt baru dan kemudian di read
 let fs2 = require(`fs`);
 let data2 =  fs2.readFileSync(`./Ingrediens.txt`,`utf8`)

 let batch_of_cookies = CookieFacktory.create(options)
 console.log(batch_of_cookies)


let sugarFreeFoods = CookieFacktory.cookieRecommendation(`thuesday`,data2)
console.log(`sugar free cakes are :`)

for (let i = 0; i < sugarFreeFoods.length; i++) {
    console.log(sugarFreeFoods[i])
}
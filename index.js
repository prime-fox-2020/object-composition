

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
            }else{
                jajanan.push( new OtherCookie(cookiesArr[i]) )
            }
        }

        return jajanan
        //accepts a list of cookie type and returns those cookies
    }

    //define other methods as needed
}



 let fs = require(`fs`);

 let options = fs.readFileSync(`./cookies.txt`,`utf8`)


 let batch_of_cookies = CookieFacktory.create(options)
 console.log(batch_of_cookies)

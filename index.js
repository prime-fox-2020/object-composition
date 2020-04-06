const fs=require('fs')
const data=fs.readFileSync('./cookies.txt','utf8')
const rasa=data.split()
let options=[]
let temp=''
for (let i = 0; i < rasa[0].length; i++) {
    if(rasa[0][i] !== '\n'){
        temp+=rasa[0][i]
    }else if(rasa[0][i]=='\n'){
        options.push(temp)
        temp=''
    }
}
options.push(temp)

class Ingredients{
    constructor(options){
        this.name=options['name']
        this.amount=options['amount']
    }
}

class Cookies {
    constructor(){
        this.name=''
        this.status='mentah'
        this.ingredients=this.cetak()
    }

    bake(){
        this.status='selesai memasak'
    }

    cetak(){
        const dataBahan=fs.readFileSync('./bahan.txt','utf8')
        let bahan=dataBahan.split('\n')
        let kue=[]
        let lengkap=[]
        for (let i = 0; i < bahan.length; i++) {
        kue.push(bahan[i].split(' = ')[0])
        let ingre=bahan[i].split(' = ')[1].split(', ')
            for (let j = 0; j < ingre.length; j++) {
            let temp=ingre[j].split(' : ')
            let obj={name: temp[1],amount: temp[0]}
            let ingredients=new Ingredients(obj)
            lengkap.push(ingredients)
        }
    }
    return lengkap
    }
}

class PeanutButter extends Cookies{
    constructor(name,ingredients){
        super(name,ingredients)
        this.name=name
        this.ingredients=[new Cookies().ingredients[0],new Cookies().ingredients[1],new Cookies().ingredients[2],new Cookies().ingredients[3],new Cookies().ingredients[4]]
        this.peanut_count=100
    }
}


class ChocolateChip extends Cookies{
    constructor(name,ingredients){
        super(name,ingredients)
        this.name=name
        this.ingredients=[new Cookies().ingredients[5],new Cookies().ingredients[6],new Cookies().ingredients[7]]
        this.choc_chip_count=200
    }
}

class OtherCookie extends Cookies{
    constructor(name,ingredients){
        super(name,ingredients)
        this.name=name
        this.choc_chip_count=150
        if(name=='chocolate cheese'){
            this.ingredients=[new Cookies().ingredients[8],new Cookies().ingredients[9],new Cookies().ingredients[10],new Cookies().ingredients[11]]
        }else if (name=='chocolate butter'){
            this.ingredients=[new Cookies().ingredients[12],new Cookies().ingredients[13],new Cookies().ingredients[14]]
        }
    }
}


class CookieFactory{
    static create(cookies){
        let res=[]
        for (let i = 0; i < cookies.length; i++) {
            if(cookies[i]=='peanut butter'){
                res.push(new PeanutButter(cookies[i]))
            }else if(cookies[i]=='chocolate chip'){
                res.push(new ChocolateChip(cookies[i]))
            }else if(cookies[i]=='chocolate cheese'){
                res.push(new OtherCookie(cookies[i]))
            }else if(cookies[i]=='chocolate butter'){
                res.push(new OtherCookie(cookies[i]))
            }
            
        }
        return res
    }
    static cookieRecommendation(hari,cookies){
        let exist=true
        let arr=[]
        console.log(`${hari} recommendation: `)
       for (let i = 0; i < cookies.length; i++) {
           for (let j = 0; j < cookies[i].ingredients.length; j++) {
               if(cookies[i].ingredients[j].name=='sugar'){
                exist=true
                break
               }else if (cookies[i].ingredients[j].name!=='sugar'){
                exist =false
               }
           }
           if(exist==false){
            arr.push(cookies[i])
           }
       }
       return arr
    }

}

let batch_of_cookies= CookieFactory.create(options)
console.log(batch_of_cookies)

let sugarFreeFoods=CookieFactory.cookieRecommendation('tuesday',batch_of_cookies)
console.log('sugar free cakes are: ')
for (let i = 0; i < sugarFreeFoods.length; i++) {
    console.log(sugarFreeFoods[i].name)
}

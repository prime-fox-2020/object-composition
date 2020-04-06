let str = 'chocolate butter = 1 cup : gluten free flour, 1 cup : flavor adders, 2 tsp : butter'
let obj = str.split(/=/g).map(el => el.trim())
console.log(obj)
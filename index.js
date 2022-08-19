const bakeryData = require('./src/data/bakery.json')
const incomeLastWeek = require('./src/challanges/chalanges-one')
const alergenMenu =require('./src/challanges/chalanges-two')
const income =require('./src/challanges/chalanges-three')

//console.log(incomeLastWeek(bakeryData))
//console.log(alergenMenu(bakeryData))
console.log(income(bakeryData))
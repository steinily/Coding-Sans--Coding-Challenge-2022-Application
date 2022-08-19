const bakeryData = require('./src/data/bakery.json')
const incomeLastWeek = require('./src/challanges/chalanges-one')
const menu =require('./src/challanges/chalanges-two')

console.log(incomeLastWeek(bakeryData))
console.log(menu(bakeryData))
const bakeryData = require('./src/data/bakery.json')
const incomeLastWeek = require('./src/challanges/chalanges-one')
const alergenMenu =require('./src/challanges/chalanges-two')
const income =require('./src/challanges/chalanges-three');


//console.log(incomeLastWeek(bakeryData))
//console.log(alergenMenu(bakeryData))
//console.log(income(bakeryData))

const recipes = bakeryData.recipes
const sales = bakeryData.salesOfLastWeek
const wholesale = bakeryData.wholesalePrices

const recepiesNameAndIngredients = recipes.map(element => {
    const name = element.name ;
    const ingredients = element.ingredients;
    return{name ,ingredients}
})

const unitChange = recepiesNameAndIngredients.map((element) =>
    {element.ingredients.forEach(elem =>{
        const unitNum = elem.amount.split(" ")
        switch(unitNum[1]){
            case 'ml' :
                unitNum[0] = Number(unitNum[0]/1000)
                unitNum[1] = 'l'
                break;
            case 'g':
                unitNum[0] = Number(unitNum[0]/1000)
                unitNum[1] = 'kg';
                break;
            default:
                break;
                         }
        elem.amount = unitNum.join(" ")

        return elem.amount;})
    return element});


const usedIngredients = unitChange.map(element =>{
    sales.map(elem => {
    const {name , amount} = elem
    if(element.name == name){
        element.ingredients.forEach(elems => {
            num = elems.amount.split(" ")
            num[0] = Number(num[0]) * amount
            elems.amount=num.join(" ")
            return elems.amount
        }
        )
        return element
    }
    }
    )
   return element
}).filter(element => sales.map(elem => elem.name).includes(element.name) )

//wholesale.map(elem=> elem)

usedIngredients.map(elem => console.log(elem))


//------------------------------------------------------------------------------------
//          Challenge  3
// What was last week's profit?

// Now that the Tax Guys are off his back, and people with food allergies are safe,
// Stevie wants to know how much money he actually made last week. Based on the quantity of the items sold,
// with the ingredients taken into account,
// calculate the difference between the sum of sale prices and the wholesale price of the ingredients used.

//Your function should take the whole data-set, and return a number,
// the difference between the amount of money selling sweets generated, 
//and the cost of producing them, calculated based on the wholesale price of the ingredients used.


//------------------------------------------------------------------------------------


const bakeryData = require('../data/bakery.json')
const salesOfLastWeek = require('./chalanges-one')

function totalIncome(bakeryData){

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
                num[0] = (Number.parseFloat(num[0]) * amount).toFixed(2)
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



    function search(value) {
        const item = wholesale.filter(element => element.name == value)
        return item
    }
    function calculate(amount, value, price){
        numAmount = amount.split(" ")
        numValue = value.split(" ")
        calc = Number.parseFloat((numAmount[0] / numValue[0])*price).toFixed(2)
        return calc
    }


    for(let i=0 ; i < usedIngredients.length ; i++){
        for(let j=0 ; j < usedIngredients[i].ingredients.length; j++){
            const item = search(usedIngredients[i].ingredients[j].name)
            usedIngredients[i].ingredients[j].price = calculate(usedIngredients[i].ingredients[j].amount,item[0].amount,item[0].price)
            
        }
        
    }



    let totalIngredienPrice=0
    for(let i=0 ; i < usedIngredients.length ; i++){
        for(let j=0 ; j < usedIngredients[i].ingredients.length; j++){
            
            totalIngredienPrice +=  Number(usedIngredients[i].ingredients[j].price)
            
        }
        
    }

    const totalIncomeLastWeek = salesOfLastWeek(bakeryData) - totalIngredienPrice

    
    return totalIncomeLastWeek
    
}    


const answerForChallangetThree = totalIncome(bakeryData)


console.log(`Answer for Challange - Three : ${answerForChallangetThree}`)




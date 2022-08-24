//------------------------------------------------------------------------------------
//          Challenge  4
//      The freedom of choice

//The best-selling items are already available,
//but Stevie wants to know what sweets he could make without purchasing additional ingredients, only working from his existing inventory.

//At this point, Stevie confesses with tears in his eyes that he somehow managed to go through primary school without actually
//learning metric unit conversions. He only knows milliliters and grams, so the recipes in his cookbook are in these units.
//However, his inventory software, and the wholesaler both report in kilograms and liters.

//This hasn't been much of a problem as long as he was conducting heart surgeries, apart from getting weird looks from his butcher
//when asking for 1523 grams of chicken breast. But he can't run a bakery like this, so he needs your help.

//Give Stevie the amount of sweets he could produce,if he used his entire inventory for one recipe.
//Do this for each recipe he can make based on his current inventory and list it in alphabetic order based on the recipe's name.
//Your function should take the whole data-set, and return a list matching the structure of the example below.


//------------------------------------------------------------------------------------


const bakeryData = require('../data/bakery.json')

function maxBaking(bakerydata){
    
    const recipes = bakeryData.recipes
    const inventory = bakeryData.inventory

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





    function maxCapacity (ingredients , inventory){
            let ing = ingredients.amount.split(" ")
            let inv = inventory.amount.split(" ")
            return Number.parseFloat((inv[0] / ing [0])).toFixed(2)
        }


    const inventoryMaxBakeCapacity = recepiesNameAndIngredients.map(element => {
        for(let i = 0 ; i < element.ingredients.length;i++){

            let search=inventory.find(({name}) => name == element.ingredients[i].name )
            element.ingredients[i].max = maxCapacity(element.ingredients[i],search)
        }
        return element
    })


    
    const recipeSort = inventoryMaxBakeCapacity.sort((a, b) => {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
        return -1;
        }
        if (nameA > nameB) {
        return 1;
        }
    
        // names must be equal
        return 0;
    });


    for(let i = 0 ; i < recipeSort.length; i++ ){
        recipeSort[i].ingredients.sort((a,b)=> a.max - b.max)
    }

    const maxBakingCapacity = recipeSort.map(elem =>{
        return { name: elem.name  , amount : elem.ingredients[0].max}
    })

    return maxBakingCapacity

}

const answerForChallangetFour = maxBaking(bakeryData)

console.log(answerForChallangetFour)

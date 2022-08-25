//------------------------------------------------------------------------------------
//          Challenge  6
/*        Next two week's sales
//
//Consistency and plannability are key!
//
//Based on this mantra, Stevie wants to know the ingredients he should order to last him two weeks combined with his inventory.
//He already knows last week's sales, and he assumes the next two weeks will be the same. 
//To be on the safe side, he'd like to have a 10% surplus of everything on top of the amount which would last two weeks.
//
//Calculate the amount of ingredients based on past sales for the next two weeks,
//and add 10% on top of it. 
//Your function should take the whole data-set, and return a shopping list for Stevie to take to his wholesaler, 
//based on the example below. Remember, the wholesaler needs the amounts in kilograms and liters.
*/
//------------------------------------------------------------------------------------

const bakeryData = require("../data/bakery.json");
const answerTojson = require("../utils/answerTojson");

function TaskCalcFutureSales() {
  const salesOflastWeek = bakeryData.salesOfLastWeek;
  const wholesale = bakeryData.wholesalePrices;
  const inventory = bakeryData.inventory;

  /* Creating a new array with the name and ingredients of each recipe. */
  const recepiesNameAndIngredients = bakeryData.recipes.map((element) => {
    return { name: element.name, ingredients: element.ingredients };
  });

  /* Creating a new array with the name and amount of each recipe. */
  const nextTwoWeekSales = salesOflastWeek.map((element) => {
    return { name: element.name, amount: element.amount * 2 };
  });

  const search = (cake) => {
    const elem = recepiesNameAndIngredients.find(
      (element) => element.name == cake.name
    );
    return {
      name: elem.name,
      ingredients: elem.ingredients.map((elems) => {
        const unitNum = elems.amount.split(" ");
        switch (unitNum[1]) {
          case "ml":
            unitNum[0] = Number((unitNum[0] / 1000) * cake.amount).toFixed(2);
            unitNum[1] = "l";
            break;
          case "g":
            unitNum[0] = Number((unitNum[0] / 1000) * cake.amount).toFixed(2);
            unitNum[1] = "kg";
            break;
          case "pc":
            unitNum[0] = Number(unitNum[0] * cake.amount).toFixed(2);
            unitNum[1] = "pc";
            break;
          default:
            break;
        }
        elem.amount = unitNum.join(" ");

        return { name: elems.name, amount: elem.amount };
      }),
      amount: cake.amount,
    };
  };

  const nextTwoWeekSalesIngrediendts = nextTwoWeekSales.map((element) =>
    search(element)
  );

  function groupBy(objectArray, property) {
    return objectArray.reduce((acc, obj) => {
      const key = obj[property];
      acc[key] ??= [];
      acc[key].push(obj);
      return acc;
    }, {});
  }

  const groupedShoppingList = groupBy(nextTwoWeekSalesIngrediendts.flatMap(elem => elem.ingredients), "name");

let cummShopingList =[]
for(let item of Object.keys(groupedShoppingList)){
  let items = Object.values(groupedShoppingList[item]).reduce((elem , {...next}) => {
   if(elem){
    elem.amount = Number.parseFloat(elem.amount)
   }
    return {
    name : elem.name,
    amount : (elem.amount + Number(next.amount.split(" ")[0])).toFixed(2) +" " +  next.amount.split(" ")[1]  }
  })
  cummShopingList.push(items)
}

let shop = []
cummShopingList.forEach(elem =>{ 
let invStock =inventory.find(item => item.name === elem.name)
let newAmount = Number(elem.amount.split(" ")[0]) - Number(invStock.amount.split(" ")[0])
if (newAmount > 0 ){
  shop.push({
    name:elem.name,
    amount: (newAmount).toFixed(2) + " " + elem.amount.split(" ")[1] })}
})

let finalShopingList = []
 shop.forEach(elem =>{
  let whsale = wholesale.find(item =>item.name === elem.name )
  let price = Number(whsale.price) / Number(whsale.amount.split(" ")[0])

  let troley = Math.ceil((Number(elem.amount.split(" ")[0])+
  (Number(elem.amount.split(" ")[0])*0.1))/Number(whsale.amount.split(" ")[0]))*Number(whsale.amount.split(" ")[0]) 

  
  finalShopingList.push({
    name:elem.name,
    amount:(troley).toFixed(0)+" "+elem.amount.split(" ")[1],
    totalPrice: Number((troley*price).toFixed(0))
  })

 } )


  const OrderedTaskCalcFutureSales = finalShopingList.sort((a,b) => b.totalPrice - a.totalPrice);
  return OrderedTaskCalcFutureSales
}
console.log(TaskCalcFutureSales())
answerTojson(TaskCalcFutureSales(), "answerSix.json");

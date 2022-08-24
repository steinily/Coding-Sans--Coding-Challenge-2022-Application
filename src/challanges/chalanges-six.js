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

/*
Todo:
 -Szeretné tudni hogy mennyi pénzbe kerül az alapnyag a következő 2 hétre hogyha :
-következő 2 héten is ugyanennyi lesz az eladás mint az elmult héten
-10% + rászámol minden alapanyagra ,
-persze a jelenlegi inventory-t figyelembe kell venni a számitásoknál

tehát :
phase 1 - a múlt heti eladások alapanyag készletét megkeressük  , majd beszorozúk 2-övel hogy a a következő 2 hét várható eladását megkapjuk,
phase 2 - az igy megkapot adatokra rászámolúnk 10% ot hogy megkapjuk a surplust.
phase 3 - ezeket az adatok megkapva listába szeve visszaadjuk.
*/

function nextTwoWeekSalesInventory (){
    
    const salesOflastWeek = bakeryData.salesOfLastWeek
    const wholesale = bakeryData.wholesalePrices

    const recepiesNameAndIngredients = bakeryData.recipes.map((element) => {
        return { name :element.name , ingredients: element.ingredients };
      });

    const nextTwoWeekSales = salesOflastWeek.map(element => {return { name: element.name , amount:element.amount*2 }})

    function percentage(percent, total) {
      return ((percent/ 100) * total).toFixed(2)
  }
  

  const search = (cake) => {
    const elem = recepiesNameAndIngredients.find(
      (element) => element.name == cake.name
    );
    return {
      name: elem.name,
      ingredients: elem.ingredients.map(elems => {
        const unitNum = elems.amount.split(" ");
      switch (unitNum[1]) {
        case "ml":
          unitNum[0] = Number((unitNum[0] / 1000) * cake.amount);
          unitNum[0] = Number(unitNum[0]) + Number(percentage(10,unitNum[0]))
          unitNum[1] = "l";
          break;
        case "g":
          unitNum[0] = Number((unitNum[0] / 1000) * cake.amount);
          unitNum[0] = Number(unitNum[0]) + Number(percentage(10,unitNum[0]))
          unitNum[1] = "kg";
          break;
        case "pc":
          unitNum[0] = Number(unitNum[0] * cake.amount);
          unitNum[0] = Number(unitNum[0]) + Number(percentage(10,unitNum[0]))
          unitNum[1] = "pc";
        default:
          break;
      }
      elem.amount = unitNum.join(" ");

      return {name: elems.name , amount: elem.amount };
    
      }),
      amount: cake.amount,
    };
  };


  const shoppingList = nextTwoWeekSales.map((element) => search(element));

function searchPrice(value) {
    const item = wholesale.filter(element => element.name == value)
    return item
}
function calculate(amount, value, price){
    numAmount = amount.split(" ")
    numValue = value.split(" ")
    calc = Number.parseFloat((numAmount[0] / numValue[0])*price).toFixed(2)
    return calc
}


for(let i=0 ; i < shoppingList.length ; i++){
    for(let j=0 ; j < shoppingList[i].ingredients.length; j++){
        const item = searchPrice(shoppingList[i].ingredients[j].name)
        shoppingList[i].ingredients[j].ingredientPrice = calculate(shoppingList[i].ingredients[j].amount,item[0].amount,item[0].price)
        
    }
    
}

function flatShopping(item){
        return flatShoppingList.push({name : item.name  , amount: item.amount , ingredientPrice: item.ingredientPrice})     
  }  

let flatShoppingList = []
for(let i = 0 ; i < shoppingList.length; i++){
    for(let j = 0 ; j < shoppingList[i].ingredients.length;j++){ 
        flatShopping(shoppingList[i].ingredients[j])
        }
}

function groupBy(objectArray, property) {
  return objectArray.reduce((acc, obj) => {
    const key = obj[property];
    acc[key] ??= [];
    acc[key].push(obj);
    return acc;
  }, {});
}

const groupedShoppingList = groupBy(flatShoppingList, 'name')



let total=[]

for(let item of Object.keys(groupedShoppingList) ){
  let grandAmount = 0
  let grandPrice = 0
  let unit = ""

  for(let j = 0 ; j < groupedShoppingList[item].length; j++){
    let numsAmount = groupedShoppingList[item][j].amount.split(" ")
    unit = numsAmount[1]
    grandAmount = grandAmount + Number(numsAmount[0])
    grandPrice = grandPrice + Number(groupedShoppingList[item][j].ingredientPrice)
  } 

  total.push({
    name: item ,
    amount : Number.parseFloat(grandAmount).toFixed(2)+" "+unit,
    totalPrice : grandPrice 
  })
}

// total - curren inventory


}
nextTwoWeekSalesInventory()
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
            unitNum[0] = Number((unitNum[0] / 1000) * cake.amount);
            unitNum[1] = "l";
            break;
          case "g":
            unitNum[0] = Number((unitNum[0] / 1000) * cake.amount);
            unitNum[1] = "kg";
            break;
          case "pc":
            unitNum[0] = Number(unitNum[0] * cake.amount);
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

  function flatShopping(item) {
    return flatShoppingList.push({
      name: item.name,
      amount: item.amount,
    });
  }

  let flatShoppingList = [];
  for (let i = 0; i < nextTwoWeekSalesIngrediendts.length; i++) {
    for (
      let j = 0;
      j < nextTwoWeekSalesIngrediendts[i].ingredients.length;
      j++
    ) {
      flatShopping(nextTwoWeekSalesIngrediendts[i].ingredients[j]);
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

  const groupedShoppingList = groupBy(flatShoppingList, "name");

  let total = [];
  for (let item of Object.keys(groupedShoppingList)) {
    let grandAmount = 0;
    let unit = "";
    for (let j = 0; j < groupedShoppingList[item].length; j++) {
      let numsAmount = groupedShoppingList[item][j].amount.split(" ");
      unit = numsAmount[1];
      grandAmount = grandAmount + Number(numsAmount[0]);
    }
    total.push({
      name: item,
      amount: Number(grandAmount) + " " + unit,
    });
  }

  const TaskCalcFutureSales = [];
  for (let i = 0; i < total.length; i++) {
    for (let j = 0; j < inventory.length; j++) {
      if (total[i].name == inventory[j].name) {
        let tAnum = total[i].amount.split(" ");
        let iAnum = inventory[j].amount.split(" ");
        let finalAmount = Number(tAnum[0]) - Number(iAnum[0]);

        if (finalAmount < 0) {
          continue;
        } else {
          TaskCalcFutureSales.push({
            name: total[i].name,
            amount: finalAmount + " " + tAnum[1],
          });
        }
      }
    }
  }
    function searchPrice(value) {
      const item = wholesale.filter((element) => element.name == value);
      return item;
    }

    let finalArray = [];
    for (let i = 0; i < TaskCalcFutureSales.length; i++) {
      const itemPrice = searchPrice(TaskCalcFutureSales[i].name);
      finalArray.name = TaskCalcFutureSales[i].name;
      finalArray.amount = () => {
        let num = TaskCalcFutureSales[i].amount.split(" ");
        let wholesaleItem = itemPrice[0].amount.split(" ");
        let _num =Math.ceil(Number(num[0]/wholesaleItem[0]));

        return  Math.round(Number(_num*wholesaleItem[0]) +Number(_num*wholesaleItem[0])*0,1 )+ " " + num[1];
      };
      finalArray.totalPrice =
        (finalArray.amount().split(" ")[0]/itemPrice[0].amount.split(" ")[0]) * itemPrice[0].price;

      finalArray.push({
        name: finalArray.name,
        amount: finalArray.amount(),
        totalPrice: Math.round(finalArray.totalPrice),
      });
    }

  const OrderedTaskCalcFutureSales = finalArray.sort((a,b) => b.totalPrice - a.totalPrice);
  return OrderedTaskCalcFutureSales
}

answerTojson(TaskCalcFutureSales(), "answerSix.json");

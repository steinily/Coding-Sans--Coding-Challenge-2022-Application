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

/**
 * It takes a percentage and a total and returns the percentage of the total
 * @param percent - The percentage you want to calculate.
 * @param total - The total amount of money you want to calculate the percentage for.
 * @returns The percentage of the total.
 */
  function percentage(percent, total) {
    return ((percent / 100) * total).toFixed(2);
  }

  /**
   * It takes a cake object, finds the recipe for that cake, and returns a new cake object with the
   * ingredients multiplied by the amount of cakes you want to make
   * @param cake - {name: "cake", amount: "1"}
   * @returns {
   *     name: "Cake",
   *     ingredients: [
   *       { name: "flour", amount: "1.1 kg" },
   *       { name: "sugar", amount: "1.1 kg" },
   *       { name: "eggs", amount: "11 pc" },
   *       { name: "milk", amount:
   */
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
            unitNum[0] =
              Number(unitNum[0]) + Number(percentage(10, unitNum[0]));
            unitNum[1] = "l";
            break;
          case "g":
            unitNum[0] = Number((unitNum[0] / 1000) * cake.amount);
            unitNum[0] =
              Number(unitNum[0]) + Number(percentage(10, unitNum[0]));
            unitNum[1] = "kg";
            break;
          case "pc":
            unitNum[0] = Number(unitNum[0] * cake.amount);
            unitNum[0] =
              Number(unitNum[0]) + Number(percentage(10, unitNum[0]));
            unitNum[1] = "pc";
          default:
            break;
        }
        elem.amount = unitNum.join(" ");

        return { name: elems.name, amount: elem.amount };
      }),
      amount: cake.amount,
    };
  };

  /* Taking the nextTwoWeekSales array and mapping it to the search function. */
  const shoppingList = nextTwoWeekSales.map((element) => search(element));

/**
 * It takes a value, searches the wholesale array for an object with a name property that matches the
 * value, and returns the object.
 * @param value - the value of the input field
 * @returns An array of objects.
 */
  function searchPrice(value) {
    const item = wholesale.filter((element) => element.name == value);
    return item;
  }


/**
 * It loops through the shoppingList array, then loops through the ingredients array, then searches for
 * the ingredient name in the priceList array, then calculates the price of the ingredient, then
 * assigns the price to the ingredientPrice property.
 * @param amount - "1/2 cup"
 * @param value - "1/2 cup"
 * @param price - the price of the item
 * @returns the value of the variable calc.
 */
  function calculate(amount, value, price) {
    numAmount = amount.split(" ");
    numValue = value.split(" ");
    calc = Number.parseFloat((numAmount[0] / numValue[0]) * price).toFixed(2);
    return calc;
  }

  for (let i = 0; i < shoppingList.length; i++) {
    for (let j = 0; j < shoppingList[i].ingredients.length; j++) {
      const item = searchPrice(shoppingList[i].ingredients[j].name);
      shoppingList[i].ingredients[j].ingredientPrice = calculate(
        shoppingList[i].ingredients[j].amount,
        item[0].amount,
        item[0].price
      );
    }
  }


/**
 * It takes an array of objects and a property name, and returns an object with the property name as
 * the key and the array of objects as the value.
 */
  function flatShopping(item) {
    return flatShoppingList.push({
      name: item.name,
      amount: item.amount,
      ingredientPrice: item.ingredientPrice,
    });
  }

  let flatShoppingList = [];
  for (let i = 0; i < shoppingList.length; i++) {
    for (let j = 0; j < shoppingList[i].ingredients.length; j++) {
      flatShopping(shoppingList[i].ingredients[j]);
    }
  }

/**
 * It takes an array of objects and a property name, and returns an object whose keys are the values of
 * the property in the objects, and whose values are arrays of objects that have that value for the
 * property.
 * 
 * Here's a longer explanation:
 * 
 * The function takes two arguments: an array of objects, and a property name.
 * 
 * It returns an object.
 * 
 * The keys of the object are the values of the property in the objects.
 * 
 * The values of the object are arrays of objects that have that value for the property.
 * 
 * function groupBy(objectArray, property) {
 * @param objectArray - The array of objects you want to group.
 * @param property - The property to group by.
 * @returns An object with the keys being the values of the property and the values being an array of
 * objects that have that property value.
 */
  function groupBy(objectArray, property) {
    return objectArray.reduce((acc, obj) => {
      const key = obj[property];
      acc[key] ??= [];
      acc[key].push(obj);
      return acc;
    }, {});
  }

  const groupedShoppingList = groupBy(flatShoppingList, "name");

/* Taking the groupedShoppingList array and adding the amount and totalPrice of each ingredient
together. */
  let total = [];

  for (let item of Object.keys(groupedShoppingList)) {
    let grandAmount = 0;
    let grandPrice = 0;
    let unit = "";

    for (let j = 0; j < groupedShoppingList[item].length; j++) {
      let numsAmount = groupedShoppingList[item][j].amount.split(" ");
      unit = numsAmount[1];
      grandAmount = grandAmount + Number(numsAmount[0]);
      grandPrice =
        grandPrice + Number(groupedShoppingList[item][j].ingredientPrice);
    }

    total.push({
      name: item,
      amount: Number.parseFloat(grandAmount).toFixed(2) + " " + unit,
      totalPrice: grandPrice,
    });
  }


  for (let j = 0; j < inventory.length; j++) {
    const item = searchPrice(inventory[j].name);
    inventory[j].ingredientPrice = calculate(
      inventory[j].amount,
      item[0].amount,
      item[0].price
    );
  }

  /* Taking the total array and the inventory array and subtracting the amount and totalPrice of each
  ingredient from each other. */

  const TaskCalcFutureSales = [];
  for (let i = 0; i < total.length; i++) {
    for (let j = 0; j < inventory.length; j++) {
      if (total[i].name == inventory[j].name) {
        let tAnum = total[i].amount.split(" ");
        let iAnum = inventory[j].amount.split(" ");
        let finalAmount = Number(tAnum[0]) - Number(iAnum[0]);
        let finalPrice =
          Number(total[i].totalPrice) - Number(inventory[j].ingredientPrice);

        if (finalAmount < 0) {
          TaskCalcFutureSales.push({
            name: total[i].name,
            amount: 0 + " " + tAnum[1],
            totalPrice: 0,
          });
        } else {
          TaskCalcFutureSales.push({
            name: total[i].name,
            amount: Number.parseFloat(finalAmount).toFixed(0) + " " + tAnum[1],
            totalPrice: Number.parseFloat(finalPrice).toFixed(0),
          });
        }
      }
    }
  }
  return TaskCalcFutureSales;
}


answerTojson(TaskCalcFutureSales(), "answerSix.json");
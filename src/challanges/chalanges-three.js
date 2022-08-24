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

const bakeryData = require("../data/bakery.json");
const TaskSumTotalSales = require("./chalanges-one");
const answerTojson = require("../utils/answerTojson");
const unitconvert = require("../utils/unitcovert");

function TaskSumTotalProfit(bakeryData) {
  const sales = bakeryData.salesOfLastWeek;
  const wholesale = bakeryData.wholesalePrices;

  /* Creating a new array with the name and ingredients of each recipe. */
  const recepiesNameAndIngredients = bakeryData.recipes.map((element) => {
    return { name: element.name, ingredients: element.ingredients };
  });

  /* Changing the unit of the amount of ingredients. */
  const unitChange = unitconvert(recepiesNameAndIngredients, 1);

  /* Taking the ingredients from the unitChange array and multiplying them by the amount of sales.
    Filtering the array of recepiesNameAndIngredients and only keeping the ones that are in the
    sales array. */
  const usedIngredients = unitChange
    .map((element) => {
      sales.map((elem) => {
        const { name, amount } = elem;
        if (element.name == name) {
          element.ingredients.forEach((elems) => {
            num = elems.amount.split(" ");
            num[0] = (Number.parseFloat(num[0]) * amount).toFixed(2);
            elems.amount = num.join(" ");
            return elems.amount;
          });
          return element;
        }
      });
      return element;
    })
    .filter((element) => sales.map((elem) => elem.name).includes(element.name));

  /**
   * It takes a value, filters the wholesale array for an element that has a name property equal to the
   * value, and returns the filtered array.
   * @param value - The value you want to search for
   * @returns the item.
   */
  function search(value) {
    const item = wholesale.filter((element) => element.name == value);
    return item;
  }

  /**
   * It takes the ingredients from the usedIngredients array, searches for the ingredient in the
   * ingredients array, and then calculates the price of the ingredient based on the amount used and the
   * price of the ingredient.
   * @param amount - "num"
   * @param value - "num"
   * @param price - the price of the item
   * @returns [
   *         {
   *             "name": "Pizza",
   *             "ingredients": [
   *                 {
   *                     "name": "Tomato",
   *                     "amount": "1 kg",
   *                     "price": "2.00"
   *                 },
   *                 {
   *                     "name": "Cheese",
   *                     "amount": "1 kg",
   */

  function calculate(amount, value, price) {
    numAmount = amount.split(" ");
    numValue = value.split(" ");
    calc = Number.parseFloat((numAmount[0] / numValue[0]) * price).toFixed(2);
    return calc;
  }

  for (let i = 0; i < usedIngredients.length; i++) {
    for (let j = 0; j < usedIngredients[i].ingredients.length; j++) {
      const item = search(usedIngredients[i].ingredients[j].name);
      usedIngredients[i].ingredients[j].price = calculate(
        usedIngredients[i].ingredients[j].amount,
        item[0].amount,
        item[0].price
      );
    }
  }

  /* Adding the price of all the ingredients used. */
  let totalIngredienPrice = 0;
  for (let i = 0; i < usedIngredients.length; i++) {
    for (let j = 0; j < usedIngredients[i].ingredients.length; j++) {
      totalIngredienPrice += Number(usedIngredients[i].ingredients[j].price);
    }
  }

  const totalIncomeLastWeek =
    TaskSumTotalSales(bakeryData) - totalIngredienPrice;

  return totalIncomeLastWeek;
}

answerTojson(TaskSumTotalProfit(bakeryData), "answerThree.json");

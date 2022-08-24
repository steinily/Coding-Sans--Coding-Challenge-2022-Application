//------------------------------------------------------------------------------------
//          Challenge  1
// What was last week's sales in terms of money?

// With the Tax Authority already breathing down Stevie's neck,
// he quickly needs to report his last week of sales. Based on the data you received,
// calculate how much money he generated, if he only needs to report his total sales.

//Your function should take the whole data-set, and return a number,
// calculated based on his last week's sales, and the price he sells the sweets for.

//------------------------------------------------------------------------------------

const bakeryData = require("../data/bakery.json");
const answerTojson = require("../utils/answerTojson");

/**
 * It takes an object with a name and amount property, finds the price of the item with the same name,
 * and returns the product of the price and amount
 * @param data - an object with two properties:
 * @returns The total income of the bakery for the week.
 */

function TaskSumTotalSales(data) {
  /* Taking the data from the recipes object and mapping it to a new array. It is then taking the
    name and price from the object and assigning it to a new object. It is then taking the price and
    converting it to a number. */
  const bakeryPrices = Object.values(data.recipes).map((entrys) => {
    const { name, price } = entrys;
    const priceNum = Number(price.replace(/[^0-9\.-]+/g, ""));
    return {
      name,
      priceNum,
    };
  });

  /* Taking the data from the salesOfLastWeek object and mapping it to a new array. It is then taking the
    name and amount from the object and assigning it to a new object. */
  const sales = Object.values(data.salesOfLastWeek).map((entrys) => {
    const { name, amount } = entrys;
    return {
      name,
      amount,
    };
  });

  /**
   * It takes an object with a name and amount property, finds the price of the item with the same name,
   * and returns the product of the price and amount
   * @param salesItem - the object that is being passed in from the sales array
   * @returns The price of the item multiplied by the amount of the item.
   */
  let income = (salesItem) => {
    const price = bakeryPrices.find(({ name }) => name === salesItem.name);
    return price.priceNum * salesItem.amount;
  };

  let initValue = 0;
  const sumSales = sales.forEach((element) => {
    initValue += income(element);
  });

  return initValue;
}

answerTojson(TaskSumTotalSales(bakeryData), "answerOne.json");

module.exports = TaskSumTotalSales;

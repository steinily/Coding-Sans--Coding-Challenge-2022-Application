//------------------------------------------------------------------------------------
//          Challenge  5
//      The wedding of the Godfather's daughter

//Stevie made some bad choices in the past,
//and getting involved with shady people was definitely one of them.
//A few days ago, two guys came into the shop,
//and reminded him that Guido the Merciful is having a wedding for his only daughter.
//For the wedding, they requested the following items to be made, in a manner Stevie just could not refuse:

//Francia krémes : 300
//Rákóczi túrós : 200
//Képviselőfánk : 300
//Isler : 100
//Tiramisu: 150

//Calculate how much money this sets poor Stevie back,
//who regrets asking for money all those years ago from the mafia for his already bankrupt Ostrich Farm.
//Stevie wants to keep his cakery running, so he doesn’t want to touch his inventory.

//For the amount, calculate the ingredients price on wholesale.
//Your function should take the whole data-set (the order) and return a number (the amount of his losses in money).
//For some help, you can use the array below for the order:

//[
//    [
//        {
//          "name": "Francia krémes",
//          "amount": 300
//        },
//        {
//          "name": "Rákóczi túrós",
//          "amount": 200
//        },
//        {
//          "name": "Képviselőfánk",
//          "amount": 300
//        },
//        {
//          "name": "Isler",
//          "amount": 100
//        },
//        {
//          "name": "Tiramisu",
//          "amount": 150
//        }
//      ]
//------------------------------------------------------------------------------------

const bakeryData = require("../data/bakery.json");
const answerTojson = require("../utils/answerTojson");
const unitconvert = require("../utils/unitcovert");
const cakesForWedding = require("../data/cakesForWedding.json")

function TaskCalcOrderForWedding(bakeryData, cakesForWedding) {
  
  const wholesale = bakeryData.wholesalePrices;

/* Creating a new array with the name and ingredients of each recipe. */
  const recepiesNameAndIngredients = bakeryData.recipes.map((element) => {
    return { name :element.name , ingredients: element.ingredients };
  });



/**
 * It takes an array of objects, and returns an array of objects, where each object has the same name
 * and ingredients as the original object, but with an additional amount property.
 * @param cake - {name: String, amount:  Number}
 * @returns return {
 *       name: elem.name,
 *       ingredients: elem.ingredients,
 *       amount: cake.amount,
 *     };
 */
  const wedding = (cake) => {
    const elem = recepiesNameAndIngredients.find(
      (element) => element.name == cake.name
    );
    return {
      name: elem.name,
      ingredients: elem.ingredients,
      amount: cake.amount,
    };
  };

  const cakes = cakesForWedding.map((element) => wedding(element));


  /* Converting the units of the ingredients to liters and kilograms. */

const amountIncrease =unitconvert(cakes ,"elem")

/**
 * For each recipe, for each ingredient, find the ingredient in the wholesale array, calculate the
 * price of the ingredient in the recipe, and add the price to the ingredient in the recipe.
 * @param value - "1/2 cup"
 * @returns [
 *   {
 *     "name": "Cake",
 *     "ingredients": [
 *       {
 *         "name": "Flour",
 *         "amount": "1 cup",
 *         "price": "0.25"
 *       },
 *       {
 *         "name": "Sugar",
 *         "amount": "1 cup",
 *         "
 */
  function search(value) {
    const item = wholesale.filter((element) => element.name == value);
    return item;
  }
  function calculate(amount, value, price ) {
    numAmount = amount.split(" ");
    numValue = value.split(" ");
    oneWayRoad = Math.ceil(Number(Math.floor(numAmount[0])/numValue[0]))
    calc = Number(oneWayRoad * price);
    return calc;
  }

  for (let i = 0; i < amountIncrease.length; i++) {
    for (let j = 0; j < amountIncrease[i].ingredients.length; j++) {
      const item = search(amountIncrease[i].ingredients[j].name);
      amountIncrease[i].ingredients[j].price = calculate(
        amountIncrease[i].ingredients[j].amount,
        item[0].amount,
        item[0].price,

      );
    }
  }

console.log(amountIncrease.map(elem => console.log(elem)))
/* Calculating the total price of the ingredients. */

  let totalIngredienPrice = 0;
  for (let i = 0; i < amountIncrease.length; i++) {
    for (let j = 0; j < amountIncrease[i].ingredients.length; j++) {
      totalIngredienPrice += Number(amountIncrease[i].ingredients[j].price);
    }
  }
  return totalIngredienPrice;
}

answerTojson(TaskCalcOrderForWedding(bakeryData, cakesForWedding), "answerFive.json");


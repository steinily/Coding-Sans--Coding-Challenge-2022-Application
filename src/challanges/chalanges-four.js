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

const bakeryData = require("../data/bakery.json");
const answerTojson = require("../utils/answerTojson");
const unitconvert = require("../utils/unitcovert");

function TaskCalcTotalBakeableAmount(bakeryData) {
  const inventory = bakeryData.inventory;

  /* Creating a new array of objects with the name and ingredients of each recipe. */

  const recepiesNameAndIngredients = bakeryData.recipes.map((element) => {
    return { name: element.name, ingredients: element.ingredients };
  });

  /* Converting the units of the ingredients to liters and kilograms. */
  unitconvert(recepiesNameAndIngredients, 1);

  /**
   * It takes the ingredients and inventory arrays and returns the maximum capacity of each recipe.
   * @param ingredients -
   * @param inventory -
   */
  function maxCapacity(ingredients, inventory) {
    let ing = ingredients.amount.split(" ");
    let inv = inventory.amount.split(" ");
    return Number.parseFloat(inv[0] / ing[0]);
  }

  const inventoryMaxBakeCapacity = recepiesNameAndIngredients.map((element) => {
    for (let i = 0; i < element.ingredients.length; i++) {
      let search = inventory.find(
        ({ name }) => name == element.ingredients[i].name
      );
      element.ingredients[i].max = maxCapacity(element.ingredients[i], search);
    }
    return element;
  });

  /* Sorting the array of objects by name. */
  const recipeSort = inventoryMaxBakeCapacity.sort((a, b) =>
    a.name.localeCompare(b.name , 'hu')
  );

  /* Sorting the ingredients of each recipe by the maximum capacity of each ingredient. */
  for (let i = 0; i < recipeSort.length; i++) {
    recipeSort[i].ingredients.sort((a, b) => a.max - b.max);
  }

  /* Creating a new array of objects with the name and amount of each recipe. */
  const maxBakingCapacity = recipeSort.map((elem) => {
    return { name: elem.name, amount: Math.floor(Number.parseFloat(elem.ingredients[0].max)) };
  });

  return maxBakingCapacity;
}

answerTojson(TaskCalcTotalBakeableAmount(bakeryData), "answerFour.json");

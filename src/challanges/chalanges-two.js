//------------------------------------------------------------------------------------
//          Challenge  2
// Create a menu for people with food allergies.

// Currently, Stevie keeps all information about gluten or lactose free options in his head,
// and his memory isn’t getting better.
// To avoid him having a local hospital on speed-dial, create a list of gluten and lactose-free items!
// It should have three sections, gluten-free only , lactose-free only , and both gluten and lactose-free.

// Your function should take the whole data-set,
// and return an object, with the three options containing an array of objects with the name,
// and price of each item.
//------------------------------------------------------------------------------------

function allergies(data) {

  function isGlutenFree(value) {
    return value.glutenFree == true;
  }
  function isLactoseFree(value) {
    return value.lactoseFree == true;
  }
  function isLactoseAndGlutenFree(value) {
    return value.glutenFree == true && value.lactoseFree == true;
  }

  function nameAndPrice(value) {
    const { name, price } = value;
    return { name, price };
  }

  const alergen = {
    glutenFree: Object.values(data.recipes)
      .filter((glutenFREE) => isGlutenFree(glutenFREE))
      .map((glutenFREE) => nameAndPrice(glutenFREE)),

    lactoseFree: Object.values(data.recipes)
      .filter((lactoseFREE) => isLactoseFree(lactoseFREE))
      .map((lactoseFREE) => nameAndPrice(lactoseFREE)),

    lactoseAndGlutenFree: Object.values(data.recipes).filter((alergenFREE) =>
      isLactoseAndGlutenFree(alergenFREE)).map((alergenFREE) =>
        nameAndPrice(alergenFREE))
      
    ,
  };

  return alergen;
}

module.exports = allergies;

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

function income(data){

    const ingredientsList = Object.values(data.recipes).map((entrys) => {
        const { name , ingredients } = entrys;
        return {name , ingredients } 
    })
    

    const sales = Object.values(data.salesOfLastWeek).map((entrys) => {
        const { name, amount } = entrys;
        return {
          name,
          amount,
        };
      });

      
      }
module.exports = income

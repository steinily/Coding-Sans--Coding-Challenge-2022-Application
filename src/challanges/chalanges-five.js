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

const cakesForWedding = [
  {
    name: "Francia krémes",
    amount: 300,
  },
  {
    name: "Rákóczi túrós",
    amount: 200,
  },
  {
    name: "Képviselőfánk",
    amount: 300,
  },
  {
    name: "Isler",
    amount: 100,
  },
  {
    name: "Tiramisu",
    amount: 150,
  },
];

function wedding(bakeryData, cakesForWedding) {
  
  const wholesale = bakeryData.wholesalePrices;

  const recepiesNameAndIngredients = bakeryData.recipes.map((element) => {
    return { name :element.name , ingredients: element.ingredients };
  });

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

  const amountIncrease = cakes.map((element) => {
    element.ingredients.forEach((elem) => {
      const unitNum = elem.amount.split(" ");
      switch (unitNum[1]) {
        case "ml":
          unitNum[0] = Number((unitNum[0] / 1000) * element.amount);
          unitNum[1] = "l";
          break;
        case "g":
          unitNum[0] = Number((unitNum[0] / 1000) * element.amount);
          unitNum[1] = "kg";
          break;
        case "pc":
          unitNum[0] = Number(unitNum[0] * element.amount);
          unitNum[1] = "pc";
        default:
          break;
      }
      elem.amount = unitNum.join(" ");

      return elem.amount;
    });
    return element;
  });

  function search(value) {
    const item = wholesale.filter((element) => element.name == value);
    return item;
  }
  function calculate(amount, value, price) {
    numAmount = amount.split(" ");
    numValue = value.split(" ");
    calc = Number.parseFloat((numAmount[0] / numValue[0]) * price).toFixed(2);
    return calc;
  }

  for (let i = 0; i < amountIncrease.length; i++) {
    for (let j = 0; j < amountIncrease[i].ingredients.length; j++) {
      const item = search(amountIncrease[i].ingredients[j].name);
      amountIncrease[i].ingredients[j].price = calculate(
        amountIncrease[i].ingredients[j].amount,
        item[0].amount,
        item[0].price
      );
    }
  }

  let totalIngredienPrice = 0;
  for (let i = 0; i < amountIncrease.length; i++) {
    for (let j = 0; j < amountIncrease[i].ingredients.length; j++) {
      totalIngredienPrice += Number(amountIncrease[i].ingredients[j].price);
    }
  }
  return totalIngredienPrice;
}

console.log(wedding(bakeryData, cakesForWedding));

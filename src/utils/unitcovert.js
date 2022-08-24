


function unitconvert (data,multiple=1) {

   return data.map((element) => {
        element.ingredients.forEach((elem) => {
          const unitNum = elem.amount.split(" ");
          if(multiple == 'element'){
            multiple = element.amount
          }

          switch (unitNum[1]) {
            case "ml":
              unitNum[0] = Number((unitNum[0] / 1000) * multiple);
              unitNum[1] = "l";
              break;
            case "g":
              unitNum[0] = Number((unitNum[0] / 1000) * multiple);
              unitNum[1] = "kg";
              break;
            case "pc":
              unitNum[0] = Number(unitNum[0] * multiple);
              unitNum[1] = "pc";
            default:
              break;
          }
          elem.amount = unitNum.join(" ");
    
          return elem.amount;
        });
        return element;
      });


}

module.exports = unitconvert
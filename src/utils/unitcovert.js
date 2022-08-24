


function unitconvert (data,multiple=1) {

   return data.map((element,idx) => {
    if(multiple == 'elem'){
      multip = element.amount
    }else{
      multip=1
    }

        element.ingredients.forEach((elem, idx) => {
          const unitNum = elem.amount.split(" ")
          switch (unitNum[1]) {
            case "ml":
              unitNum[0] = Number.parseFloat((unitNum[0] / 1000) * multip);
              unitNum[1] = "l";
              break;
            case "g":
              unitNum[0] = Number.parseFloat((unitNum[0] / 1000) * multip);
              unitNum[1] = "kg";
              break;
            case "pc":
              unitNum[0] = Number.parseFloat(unitNum[0] * multip);
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
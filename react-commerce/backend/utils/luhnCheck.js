const luhnCheck = (card_number) => {
  // console.log(card_number)
    
    let cctoString = card_number.toString();
    cctoString = cctoString.replace(/\s/g, "");
    let num2 = 0;
    let num3 = 0;
    let num4 = 0;
    let num5 = 0;
    let num6 = 0;
    let s = "";
  
    for (let i = 0; i <= cctoString.length - 1; i = i + 2) {
      num2 = parseInt(cctoString.charAt(i)) * 2;
      num3 = num2;
      s = String(num2);
  
      if (s.length === 2) {
        while (num3 > 0) {
          num4 += Math.floor(num3 % 10);
          num3 = num3 / 10;
        }
      } else {
        num5 += num2;
      }
    }
  
    for (let j = 1; j <= cctoString.length - 1; j = j + 2) {
      num6 += parseInt(cctoString.charAt(j));
    }
  
    return (num6 + num5 + num4) % 10 === 0;
  };
  
  module.exports = luhnCheck;
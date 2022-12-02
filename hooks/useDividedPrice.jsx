import React from "react";

function useDividedPrice(price) {
  const stringedPrice = price.toString();
  console.log(stringedPrice);
  const stringLength = stringedPrice.length;
  const Parts = Math.ceil(stringLength / 3);
  const baghimande = stringLength % 3;

  var FinalString = "";
  var Stringcp = "";

  for (let i = 0; i < Parts; i++) {
    if (i == Parts - 1) {
      if (baghimande) {
        var RaghameAkhar = stringedPrice.slice(0, baghimande);
      } else {
        var RaghameAkhar = stringedPrice.slice(0, 3);
      }
      // console.log(RaghameAkhar);
      FinalString = RaghameAkhar + ",";
    } else {
      if (baghimande) {
        var part = stringedPrice.slice(
          baghimande + baghimande * i,
          baghimande + baghimande * i + 3
        );
      }else {
        var part = stringedPrice.slice(
            3 + 3 * i,
            3 + (3 * i) + 3
          );
      }
      Stringcp = Stringcp + part + `${i == Parts - 2 ? "" : ","}`;
      //   console.log(part);
    }
    FinalString = FinalString + Stringcp;
  }
  // console.log(FinalString);

  return FinalString;
}

export default useDividedPrice;

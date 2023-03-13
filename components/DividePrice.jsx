import React from 'react'
import useDividedPrice from '../hooks/useDividedPrice'
import PersianNumber from "react-persian-currency/lib/PersianNumber";

function DividePrice({children}) {
    const output = useDividedPrice(children)
  return (
    <PersianNumber>
        {output}
    </PersianNumber>
  )
}

export default DividePrice
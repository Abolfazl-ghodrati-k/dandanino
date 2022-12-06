import React, { useContext } from 'react'
import { Store } from '../../utils/Store'

function login() {
  const {state,disatch} = useContext(Store)
  return (
    <div>login</div>
  )
}

export default login
import React from 'react'
import { preparePrice } from 'bfx-api-node-util'
import NumberInput from './input.number'

const PriceInput = ({ ...props }) => (
  <NumberInput {...props} />
)

PriceInput.processValue = v => +preparePrice(+v)

PriceInput.validateValue = (v, t) => {
  const numericError = NumberInput.validateValue(v, t)

  if (numericError) {
    return numericError
  }

  if (+v < 0) {
    return t('orderForm.greaterThan0Message')
  }

  return null
}

export default PriceInput

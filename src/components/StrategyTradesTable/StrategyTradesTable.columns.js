/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react'
import { PrettyValue } from '@ufx-ui/core'

import { reactVirtualizedCellRenderer } from '../../util/ui'
import { AMOUNT_DECIMALS, PRICE_SIG_FIGS } from '../../constants/precision'

export default [{
  label: 'Price',
  dataKey: 'price',
  width: 60,
  cellRenderer: ({ rowData = {} }) => (
    <PrettyValue
      value={rowData?.price}
      sigFig={PRICE_SIG_FIGS}
      fadeTrailingZeros
    />
  ),
}, {
  label: 'Amount',
  dataKey: 'amount',
  width: 120,
  cellRenderer: ({ rowData = {} }) => (
    <PrettyValue
      value={rowData?.amount}
      decimals={AMOUNT_DECIMALS}
      fadeTrailingZeros
      strike={0}
    />
  ),
}, {
  label: 'P/L',
  dataKey: 'pl',
  width: 120,
  cellRenderer: ({ rowData = {} }) => (
    <PrettyValue
      value={rowData?.pl}
      decimals={AMOUNT_DECIMALS}
      fadeTrailingZeros
      strike={0}
    />
  ),
}, {
  label: 'Label',
  dataKey: 'label',
  width: 200,
  cellRenderer: ({ rowData = {} }) => reactVirtualizedCellRenderer(rowData.label),
}, {
  label: 'Time',
  dataKey: 'mts',
  width: 150,
  cellRenderer: ({ rowData = {} }) => reactVirtualizedCellRenderer(new Date(rowData.mts).toLocaleString()),
}]

import _get from 'lodash/get'
import { createSelector } from 'reselect'

import getMarkets from './get_markets'

const EMPTY_OBJ = {}

const getMarketBySymbol = createSelector(
  [
    getMarkets,
    (_, symbol) => symbol,
  ],
  (markets, symbol) => _get(markets, [symbol], EMPTY_OBJ),
)

export default getMarketBySymbol

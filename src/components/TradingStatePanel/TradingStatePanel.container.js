import { connect } from 'react-redux'
import { reduxSelectors } from '@ufx-ui/bfx-containers'

import {
  getFilteredPositionsCount,
  getFilteredAtomicOrdersCount,
  getFilteredAlgoOrdersCount,
} from '../../redux/selectors/ws'
import { getMarkets } from '../../redux/selectors/meta'
import UIActions from '../../redux/actions/ui'
import { getComponentState } from '../../redux/selectors/ui'

import TradingStatePanel from './TradingStatePanel'

const mapStateToProps = (state = {}, { layoutID, layoutI: id } = {}) => ({
  getPositionsCount: getFilteredPositionsCount(state),
  getAtomicOrdersCount: getFilteredAtomicOrdersCount(state),
  getAlgoOrdersCount: getFilteredAlgoOrdersCount(state),
  markets: getMarkets(state),
  savedState: getComponentState(state, layoutID, 'trading_state', id),
  getCurrencySymbol: reduxSelectors.getCurrencySymbolMemo(state),
})

const mapDispatchToProps = dispatch => ({
  updateState: (layoutID, componentID, state) => {
    dispatch(UIActions.updateComponentState({
      state,
      layoutID,
      componentID,
    }))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(TradingStatePanel)

import { connect } from 'react-redux'

import UIActions from '../../redux/actions/ui'
import WSActions from '../../redux/actions/ws'
import { getIsPaperTrading, getThemeSetting } from '../../redux/selectors/ui'
import SwitchMode from './SwitchMode'

const mapStateToProps = (state = {}) => ({
  isPaperTrading: getIsPaperTrading(state),
  settingsTheme: getThemeSetting(state),
})

const mapDispatchToProps = dispatch => ({
  changeTradingMode: (isPaperTrading) => {
    dispatch(UIActions.setTradingMode(isPaperTrading))
    dispatch(WSActions.changeMode())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(SwitchMode)

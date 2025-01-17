import { v4 } from 'uuid'
import i18n from '../../../locales/i18n'

import UIActions from '../../actions/ui'
import UITypes from '../../constants/ui'

export default () => {
  return store => next => (action = {}) => {
    const { type } = action
    const { payload } = action
    switch (type) {
      case UITypes.SAVE_LAYOUT: {
        store.dispatch(UIActions.recvNotification({
          mts: Date.now(),
          status: 'success',
          text: i18n.t('notifications.layoutSaved'),
          cid: v4(),
        }))
        next(action)
        break
      }
      case UITypes.STRATEGY_SELECT: {
        store.dispatch(UIActions.updateStrategyId(null))
        next(action)
        break
      }
      case 'WS_DATA_STRATEGY': {
        const { id } = payload
        store.dispatch(UIActions.updateStrategyId(id))
        next(action)
        break
      }
      default: {
        next(action)
        break
      }
    }
  }
}

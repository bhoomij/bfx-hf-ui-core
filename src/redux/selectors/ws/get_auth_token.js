import _get from 'lodash/get'
import { createSelector } from 'reselect'
import { REDUCER_PATHS, isElectronApp, BFX_TOKEN_COOKIE } from '../../config'
import { getCookieValue } from '../../../util/browser'

const path = REDUCER_PATHS.WS

const getElectronAppToken = (state) => _get(state, `${path}.auth.token`, null)

const getAuthToken = createSelector(
  [getElectronAppToken, () => getCookieValue(BFX_TOKEN_COOKIE)],
  (electronAppToken, cookieToken) => {
    if (!isElectronApp) {
      console.trace('cookieToken: ', cookieToken)
      return cookieToken
    }

    return electronAppToken
  },
)

export default getAuthToken

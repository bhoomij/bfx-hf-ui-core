import { put } from 'redux-saga/effects'
import axios from 'axios'
import Debug from 'debug'
import { PUB_REST_API_URL } from '../../config'

import marketActions from '../../actions/market'

const debug = Debug('hfui:rx:s:market-hfui:getting CCY full names')

const PAIR_URL = `${PUB_REST_API_URL}/v2/conf/pub:map:pair:sym`

const URL = `${PUB_REST_API_URL}/v2/conf/pub:map:currency:label`

export default function* () {
  try {
    const { data: dataPairs } = yield axios.get(PAIR_URL)
    yield put(marketActions.setPerpsNames(dataPairs))
    const { data } = yield axios.get(URL)
    yield put(marketActions.setCCYFullNames(data))
  } catch (err) {
    debug('failed to fetch ccy full names: %s', err.message)
  }
}

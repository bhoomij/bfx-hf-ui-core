const REDUCER_PATHS = {
  WS: 'ws',
  ROUTER: 'router',
  META: 'meta',
  UI: 'ui',
  NOTIFICATIONS: 'notifications',
  AOS: 'aos',
  ZENDESK: 'zendesk',
}

const UFX_REDUCER_PATHS = {
  UFX: 'ufx',
  WS: 'ws',
  BOOK: 'book',
  TRADES: 'trades',
  TICKER: 'ticker',
}

const MAX_STORED_TRADES = 25

const PUB_WS_API_URL = process.env.REACT_APP_WS_API_URL || 'wss://api-pub.bitfinex.com/ws/2'

const isElectronApp = process.env.REACT_APP_IS_ELECTRON_APP === 'true'

const electronAppVersion = process.env.REACT_APP_BFX_HF_UI_VERSION

export {
  REDUCER_PATHS,
  PUB_WS_API_URL,
  UFX_REDUCER_PATHS,
  MAX_STORED_TRADES,
  isElectronApp,
  electronAppVersion,
}

export const SOCKET_STATUS_MAP = {
  ONLINE: 'online',
  OFFLINE: 'offline',
  CONNECTING: 'connecting',
}

export default {
  SOCKET_ERROR: 'WS_SOCKET_ERROR',
  SEND: 'WS_SEND',
  BUFF_SEND: 'WS_BUFF_SEND',
  CONNECT: 'WS_CONNECT',
  DISCONNECT: 'WS_DISCONNECT',
  CONNECTED: 'WS_CONNECTED',
  RECONNECTED: 'WS_RECONNECTED',
  DISCONNECTED: 'WS_DISCONNECTED',
  FLUSH_QUEUE: 'WS_FLUSH_QUEUE',

  DATA_AUTH_CONFIGURED: 'WS_DATA_AUTH_CONFIGURED',
  DATA_AUTH_TOKEN: 'WS_DATA_AUTH_TOKEN',
  DATA_WEB_AUTH_SUCCESS: 'WS_DATA_WEB_AUTH_SUCCESS',
  AUTH_API_VALIDATING: 'WS_AUTH_API_VALIDATING',
  DATA_MARKETS: 'WS_DATA_MARKETS',
  DATA_STRATEGY: 'WS_DATA_STRATEGY',
  DATA_REMOVE_STRATEGY: 'WS_DATA_REMOVE_STRATEGY',
  DATA_STRATEGIES: 'WS_DATA_STRATEGIES',
  DATA_API_CREDENTIALS_CONFIGURED: 'WS_DATA_API_CREDENTIALS_CONFIGURED',
  DATA_CLIENT_STATUS_UPDATE: 'WS_DATA_CLIENT_STATUS_UPDATE',
  DATA_POSITIONS: 'WS_DATA_POSITIONS',
  DATA_POSITION: 'WS_DATA_POSITION',
  DATA_POSITION_CLOSE: 'WS_DATA_POSITION_CLOSE',
  DATA_BALANCES: 'WS_DATA_BALANCES',
  SET_BALANCES: 'WS_SET_BALANCES',
  DATA_BALANCE: 'WS_DATA_BALANCE',
  SET_BALANCE: 'WS_SET_BALANCE',
  DATA_ORDERS: 'WS_DATA_ORDERS',
  DATA_ORDER: 'WS_DATA_ORDER',
  DATA_ORDER_CLOSE: 'WS_DATA_ORDER_CLOSE',
  DATA_ORDER_CLOSE_ASYNC: 'WS_DATA_ORDER_CLOSE_ASYNC',
  DATA_ALGO_ORDER_STOPPED: 'WS_DATA_ALGO_ORDER_STOPPED',
  DATA_ALGO_ORDER: 'WS_DATA_ALGO_ORDER',
  DATA_ALGO_ORDERS: 'WS_DATA_ALGO_ORDERS',
  DATA_NOTIFICATION: 'WS_DATA_NOTIFICATION',
  CLEAR_ALGO_ORDERS: 'WS_CLEAR_ALGO_ORDERS',

  PURGE_DATA_BACKTEST: 'WS_PURGE_DATA_BACKTEST',

  RESET_DATA_BACKTEST: 'WS_RESET_DATA_BACKTEST',
  RESET_DATA_EXECUTION: 'WS_RESET_DATA_EXECUTION',

  DATA_SYNC_START: 'WS_DATA_SYNC_START',
  DATA_SYNC_END: 'WS_DATA_SYNC_END',

  BACKTEST_EXECUTE: 'WS_BACKTEST_EXECUTE',
  BACKTEST_CANDLE: 'WS_BACKTEST_CANDLE',
  BACKTEST_TRADE: 'WS_BACKTEST_TRADE',
  BACKTEST_START: 'WS_BACKTEST_START',
  BACKTEST_END: 'WS_BACKTEST_END',
  BACKTEST_RESULTS: 'WS_BACKTEST_RESULTS',
  EXECUTION_STOP: 'WS_EXECUTION_STOP',
  EXECUTION_START: 'WS_EXECUTION_START',
  EXECUTION_LOADING: 'WS_EXECUTION_LOADING',
  SET_EXECUTION_RESULTS: 'WS_SET_EXECUTION_RESULTS',
  SET_BACKTEST_OPTIONS: 'WS_SET_BACKTEST_OPTIONS',
  SET_EXECUTION_OPTIONS: 'WS_SET_EXECUTION_OPTIONS',
  SET_PRICE_UPDATE: 'WS_SET_PRICE_UPDATE',
  SET_LIVE_EXECUTION_TRADES: 'WS_SET_LIVE_EXECUTION_TRADES',
  SET_PAST_STRATEGIES: 'WS_SET_PAST_STRATEGIES',
  SET_STARTED_LIVE_STRATEGY: 'WS_SET_STARTED_LIVE_STRATEGY',
  SET_STOPPED_LIVE_STRATEGY: 'WS_SET_STOPPED_LIVE_STRATEGY',
  SET_BACKTEST_LOADING: 'WS_SET_BACKTEST_LOADING',
  UPDATE_FAVORITE_PAIRS: 'WS_UPDATE_FAVORITE_PAIRS',

  BUFFER_DATA_FROM_EXCHANGE: 'WS_BUFFER_DATA_FROM_EXCHANGE',

  ALIAS_API_SERVER: 'bfx-hf-server',
  ALIAS_DATA_SERVER: 'bfx-hf-data-server',

  UPDATING_API_KEY: 'WS_UPDATING_API_KEY',

  DATA_ORDER_HIST: 'WS_DATA_ORDER_HIST',
  SET_ORDER_HIST: 'WS_SET_ORDER_HIST',
}

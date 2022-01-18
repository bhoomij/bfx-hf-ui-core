import { isElectronApp } from '../redux/config'

export const tradingTerminal = {
  path: '/',
  label: 'main.trading',
}

export const marketData = {
  path: '/data',
  label: 'main.market',
}

export const strategyEditor = {
  path: '/strategy-editor',
  label: 'main.strategyEditor',
}

const routes = {
  tradingTerminal,
  marketData,
  ...(isElectronApp ? { strategyEditor } : {}),
}

export default routes

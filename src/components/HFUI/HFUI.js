/* eslint-disable consistent-return */
import React, { useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router'
import PropTypes from 'prop-types'
import _isFunction from 'lodash/isFunction'

import closeElectronApp from '../../redux/helpers/close_electron_app'
import TradingPage from '../../pages/Trading'
import StrategyEditorPage from '../../pages/StrategyEditor'
import MarketDataPage from '../../pages/MarketData'
import AuthenticationPage from '../../pages/Authentication'

import TradingModeModal from '../TradingModeModal'
import BadConnectionModal from '../BadConnectionModal'
import OldFormatModal from '../OldFormatModal'
import AOPauseModal from '../AOPauseModal'
import NotificationsSidebar from '../NotificationsSidebar'

import Routes from '../../constants/routes'
import { isElectronApp } from '../../redux/config'
import { storeAuthToken } from '../../util/browser'

import './style.css'
import { isDevEnv } from '../../util/autologin'

const HFUI = ({
  authToken, getSettings, notificationsVisible, getFavoritePairs, currentMode, GAPageview,
  currentPage, onUnload, subscribeAllTickers, shouldShowAOPauseModalState, settingsShowAlgoPauseInfo,
}) => {
  function unloadHandler() {
    if (authToken !== null) {
      onUnload(authToken, currentMode)
    }
  }

  function onElectronAppClose() {
    if (!authToken || !settingsShowAlgoPauseInfo) {
      closeElectronApp()
    } else {
      shouldShowAOPauseModalState()
    }
  }

  useEffect(() => {
    window.removeEventListener('beforeunload', unloadHandler)
    window.addEventListener('beforeunload', unloadHandler)
    return () => {
      window.removeEventListener('beforeunload', unloadHandler)
    }
  }, [authToken, currentMode])

  useEffect(() => {
    // if running in the electron environment
    if (_isFunction(window.require)) {
      const electron = window.require('electron')
      const { ipcRenderer } = electron
      ipcRenderer.on('app-close', onElectronAppClose)

      return () => {
        ipcRenderer.removeListener('app-close', onElectronAppClose)
      }
    }
  }, [authToken, settingsShowAlgoPauseInfo])

  useEffect(() => {
    GAPageview(currentPage)
  }, [currentPage])

  useEffect(() => {
    if (authToken) {
      getSettings(authToken)
      getFavoritePairs(authToken, currentMode)
      subscribeAllTickers()
    }
  }, [authToken])

  useEffect(() => {
    if (!isElectronApp && isDevEnv()) {
      storeAuthToken()
    }
  }, [])

  return (
    <>
      {!authToken ? (
        <AuthenticationPage />
      ) : (
        <>
          <Switch>
            <Redirect from='/index.html' to='/' exact />
            <Route path={Routes.tradingTerminal.path} render={() => <TradingPage />} exact />
            {isElectronApp && Routes.strategyEditor && <Route path={Routes.strategyEditor.path} render={() => <StrategyEditorPage />} />}
            <Route path={Routes.marketData.path} render={() => <MarketDataPage />} />
          </Switch>
          {isElectronApp && (
          <>
            <TradingModeModal />
            <BadConnectionModal />
            <OldFormatModal />
            <AOPauseModal />
          </>
          )}
        </>
      )}
      <NotificationsSidebar notificationsVisible={notificationsVisible} />
    </>
  )
}

HFUI.propTypes = {
  authToken: PropTypes.string,
  currentPage: PropTypes.string,
  currentMode: PropTypes.string.isRequired,
  getSettings: PropTypes.func.isRequired,
  getFavoritePairs: PropTypes.func.isRequired,
  onUnload: PropTypes.func.isRequired,
  notificationsVisible: PropTypes.bool.isRequired,
  GAPageview: PropTypes.func.isRequired,
  subscribeAllTickers: PropTypes.func.isRequired,
  shouldShowAOPauseModalState: PropTypes.func.isRequired,
  settingsShowAlgoPauseInfo: PropTypes.bool,
}

HFUI.defaultProps = {
  authToken: '',
  currentPage: '',
  settingsShowAlgoPauseInfo: true,
}

export default HFUI

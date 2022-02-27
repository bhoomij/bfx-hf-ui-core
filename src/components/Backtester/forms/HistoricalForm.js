import React, { useEffect, memo } from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from '@ufx-ui/core'
import _find from 'lodash/find'
import { useTranslation } from 'react-i18next'

import Button from '../../../ui/Button'
import Dropdown from '../../../ui/Dropdown'
import MarketSelect from '../../MarketSelect'
import TimeFrameDropdown from '../../TimeFrameDropdown'
import { getDefaultMarket } from '../../../util/market'

import DateInput from '../../OrderForm/FieldComponents/input.date'

const ONE_MIN = 1000 * 60
const ONE_HOUR = ONE_MIN * 60
const ONE_DAY = ONE_HOUR * 24
const MAX_DATE = new Date()

const getBacktestOptions = (t) => [
  {
    label: t('strategyEditor.historical'),
    value: 'Historical',
  }, {
    label: t('strategyEditor.live'),
    value: 'Live',
  },
]

const HistoricalForm = ({
  formState, updateError, backtestStrategy, markets, setFormState, disabled, executionType, updateExecutionType, tickers,
}) => {
  const { t } = useTranslation()
  const isHistoricalMode = executionType === 'Historical'

  const defaultFormState = (state) => {
    return {
      startDate: new Date(Date.now() - ONE_DAY),
      endDate: new Date(Date.now() - (ONE_MIN * 15)),
      selectedTimeFrame: '15m',
      selectedMarket: getDefaultMarket(markets),
      trades: false,
      candles: true,
      checkboxErr: false,
      ...state,
    }
  }

  const {
    trades, endDate, candles, startDate, emptyBtErr, selectedMarket, selectedTimeFrame,
  } = defaultFormState(formState)

  const validateForm = () => {
    if (!trades && !candles) {
      setFormState(() => ({ emptyBtErr: true }))
    } else {
      setFormState(() => ({ emptyBtErr: false }))
    }
  }

  useEffect(validateForm, [trades, candles])

  const executeBacktest = () => {
    if (!selectedTimeFrame) {
      return updateError('ERROR: Invalid timeFrame')
    }
    if (isHistoricalMode) {
      if (endDate <= startDate) {
        return updateError('ERROR: Invalid time period')
      }
    }

    return backtestStrategy({
      activeMarket: selectedMarket.uiID,
      tf: selectedTimeFrame,
      startDate: isHistoricalMode ? startDate : null,
      endDate: isHistoricalMode ? endDate : null,
      candles,
      trades,
    })
  }

  const toggleCandles = (val) => {
    setFormState(() => ({ candles: val }))
  }

  const toggleTrades = (val) => {
    setFormState(() => ({ trades: val }))
  }

  return (
    <div className='hfui-backtester__executionform'>
      <div className='hfui-backtester_row'>
        <div className='hfui-backtester__flex_start'>
          <Dropdown
            value={executionType}
            onChange={updateExecutionType}
            options={getBacktestOptions(t)}
          />
        </div>
        <div className='hfui-backtester__flex_start hfui-backtester__market-select'>
          <MarketSelect
            value={selectedMarket}
            onChange={(selection) => {
              const sel = _find(tickers, m => m.uiID === selection.uiID)
              setFormState(() => ({ selectedMarket: sel }))
            }}
            markets={tickers}
            renderWithFavorites
          />
        </div>
        <div className='hfui-backtester__flex_start'>
          <TimeFrameDropdown
            tf={selectedTimeFrame}
            onChange={tf => {
              setFormState(() => ({ selectedTimeFrame: tf }))
            }}
          />
        </div>
      </div>
      <div className='hfui-backtester_row'>
        {isHistoricalMode
      && (
      <>
        <div className='hfui-backtester_dateInput hfui-backtester__flex_start'>
          <DateInput
            onChange={val => setFormState(() => ({ startDate: val }))}
            def={{ label: t('strategyEditor.startDate') }}
            value={startDate}
            maxDate={endDate}
          />
        </div>
        <div className='hfui-backtester_dateInput hfui-backtester__flex_start'>
          <DateInput
            onChange={val => setFormState(() => ({ endDate: val }))}
            def={{ label: t('strategyEditor.endDate') }}
            value={endDate}
            maxDate={MAX_DATE}
            minDate={startDate}
          />
        </div>
      </>
      )}
        <div>
          <Button
            onClick={executeBacktest}
            style={{ marginLeft: 5 }}
            className='hfui-backtester__flex_start hfui-backtester__start-button'
            disabled={disabled || emptyBtErr}
            label={t('ui.startBtn')}
            green
          />
        </div>
      </div>
      <div className='hfui-backtester_row'>
        <div className='hfui-backtester_dateInput hfui-backtester__flex_start'>
          <Checkbox
            label={t('strategyEditor.useCandlesCheckbox')}
            checked={candles}
            onChange={toggleCandles}
          />
        </div>
        <div className='hfui-backtester_dateInput hfui-backtester__flex_start'>
          <Checkbox
            label={t('strategyEditor.useTradesCheckbox')}
            checked={trades}
            onChange={toggleTrades}
          />
        </div>
      </div>
      {emptyBtErr && (
        <div className='hfui-backtester_row'>
          <div className='hfui-backtester__flex_start'>
            <div className='hfui-backtester__check-error' key='of-error'>
              <p>{t('strategyEditor.checkboxWarningMessage')}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

HistoricalForm.propTypes = {
  disabled: PropTypes.bool,
  formState: PropTypes.shape({
    trades: PropTypes.bool,
    candles: PropTypes.bool,
  }),
  markets: PropTypes.objectOf(PropTypes.object),
  updateError: PropTypes.func.isRequired,
  setFormState: PropTypes.func.isRequired,
  backtestStrategy: PropTypes.func.isRequired,
  updateExecutionType: PropTypes.func.isRequired,
}

HistoricalForm.defaultProps = {
  formState: {
    trades: false,
    candles: false,
  },
  markets: [],
  disabled: false,
}

export default memo(HistoricalForm)

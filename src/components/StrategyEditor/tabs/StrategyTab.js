import React, { memo, useCallback } from 'react'
import StrategyPerfomanceMetrics from '../../StrategyPerfomanceMetrics'
import { results } from '../../../pages/Strategies/mock_data'
import StrategyTradesTable from '../../StrategyTradesTable'
import StrategiesGridLayout from '../components/StrategiesGridLayout'
import { COMPONENTS_KEYS, LAYOUT_CONFIG } from './StrategyTab.constants'
import StrategyLiveChart from '../../StrategyLiveChart'

const StrategyTab = () => {
  const renderGridComponents = useCallback((i) => {
    switch (i) {
      case COMPONENTS_KEYS.LIVE_CHART:
        return <StrategyLiveChart />

      case COMPONENTS_KEYS.STRATEGY_PERFOMANCE:
        return <StrategyPerfomanceMetrics results={results} />

      case COMPONENTS_KEYS.STRATEGY_TRADES:
        return <StrategyTradesTable results={results} />

      default:
        return null
    }
  }, [])

  return (
    <div className='hfui-strategyeditor__wrapper'>
      <StrategiesGridLayout layoutConfig={LAYOUT_CONFIG} renderGridComponents={renderGridComponents} />
    </div>
  )
}

export default memo(StrategyTab)

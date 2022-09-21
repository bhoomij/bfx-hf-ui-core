import React from 'react'
import PropTypes from 'prop-types'
import _isEmpty from 'lodash/isEmpty'
import { VirtualTable } from '@ufx-ui/core'
import { useTranslation } from 'react-i18next'
import { activeStrategiesColumns } from './StrategiesList.columns'
import { STRATEGY_SHAPE } from '../../constants/prop-types-shapes'

const ActiveStrategiesList = ({ onRowClick, strategies, getMarketPair }) => {
  const { t } = useTranslation()

  return (
    <>
      {_isEmpty(strategies) ? (
        <div className='no-trades__wrapper'>
          <span className='no-trades__notification'>
            {t('strategyEditor.noStrategiesToDisplay')}
          </span>
        </div>
      ) : (
        <VirtualTable
          data={strategies}
          columns={activeStrategiesColumns(t, getMarketPair)}
          defaultSortBy='startedOn'
          defaultSortDirection='DESC'
          onRowClick={onRowClick}
        />
      )}
    </>
  )
}

ActiveStrategiesList.propTypes = {
  onRowClick: PropTypes.func.isRequired,
  strategies: PropTypes.arrayOf(PropTypes.shape(STRATEGY_SHAPE)).isRequired,
  getMarketPair: PropTypes.func.isRequired,
}

export default ActiveStrategiesList

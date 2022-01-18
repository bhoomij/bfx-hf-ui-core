import React, { useState, memo } from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from '@ufx-ui/core'
import { useTranslation } from 'react-i18next'

import BalancesTable from '../BalancesTable'
import Panel from '../../ui/Panel'
import PanelSettings from '../../ui/PanelSettings'

import './style.css'

const BalancesTablePanel = ({ onRemove, dark }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [hideZeroBalances, setHideZeroBalances] = useState(true)

  const onToggleShowingSettings = () => setIsSettingsOpen(prevState => !prevState)

  const { t } = useTranslation()

  // TODO: Extract settings panel/wrapper into own component
  return (
    <Panel
      label={t('balancesTableModal.title')}
      onRemove={onRemove}
      settingsOpen={isSettingsOpen}
      onToggleSettings={onToggleShowingSettings}
      dark={dark}
      darkHeader={dark}
    >
      {isSettingsOpen ? (
        <PanelSettings
          onClose={onToggleShowingSettings}
          content={(
            <Checkbox
              label={t('balancesTableModal.hideZeroCheckbox')}
              checked={hideZeroBalances}
              onChange={setHideZeroBalances}
            />
          )}
        />
      ) : (
        <BalancesTable
          hideZeroBalances={hideZeroBalances}
        />
      )}
    </Panel>
  )
}

BalancesTablePanel.propTypes = {
  onRemove: PropTypes.func,
  dark: PropTypes.bool,
}

BalancesTablePanel.defaultProps = {
  onRemove: () => { },
  dark: true,
}

export default memo(BalancesTablePanel)

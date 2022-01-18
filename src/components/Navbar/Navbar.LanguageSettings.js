import React, { useEffect } from 'react'
import _keys from 'lodash/keys'
import _map from 'lodash/map'
import _findKey from 'lodash/findKey'

import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import Dropdown from '../../ui/Dropdown'
import { LANGUAGES, LANGUAGE_NAMES } from '../../locales/i18n'
import UIActions from '../../redux/actions/ui'
import { getCurrentLanguage } from '../../redux/selectors/ui'

const languagesKeys = _keys(LANGUAGE_NAMES)
const languagesOptions = _map(languagesKeys, lang => ({ value: lang, label: LANGUAGE_NAMES[lang] }))

const LanguageSettings = () => {
  const { i18n } = useTranslation()
  const language = useSelector(getCurrentLanguage)
  const dispatch = useDispatch()
  const i18nLang = i18n.language
  const i18nMappedLang = _findKey(LANGUAGES, (value) => value === i18nLang)

  useEffect(() => {
    dispatch(UIActions.setLanguage(i18nMappedLang))
  }, [dispatch, i18nMappedLang])

  const changeLanguageHandler = (lang) => {
    i18n.changeLanguage(LANGUAGES[lang])

    dispatch(UIActions.setLanguage(lang))
  }
  return (
    <Dropdown
      value={language}
      options={languagesOptions}
      placeholder={LANGUAGE_NAMES[language] || LANGUAGE_NAMES.en}
      onChange={changeLanguageHandler}
    />

  )
}

export default LanguageSettings

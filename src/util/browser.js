import * as cookie from 'js-cookie'

import { BFX_TOKEN_COOKIE, AUTH_URL_PARAM } from '../redux/config'

export const getCookieValue = (key) => cookie.get(key)

export const setCookie = (key, value, opts) => {
  cookie.set(key, value, opts)
}

export const getUrlParam = (param) => (
  new URLSearchParams(window.location.search).get(param)
)

export const storeAuthToken = () => {
  const param = getUrlParam(AUTH_URL_PARAM)
  setCookie(BFX_TOKEN_COOKIE, param)
  // TODO: redirect back without autToken url-param
}

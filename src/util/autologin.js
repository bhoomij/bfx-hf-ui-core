const AUTOLOGIN = 'AUTOLOGIN'
const PASS = 'HFUI__PASS'

export function getAutoLoginState() {
  return localStorage.getItem(AUTOLOGIN) === 'true'
}

export function updateAutoLoginState(state) {
  localStorage.setItem(AUTOLOGIN, state)
}

export function isDevEnv() {
  return process.env?.NODE_ENV === 'development'
}

export function updateStoredPassword(password) {
  if (isDevEnv()) {
    localStorage.setItem(PASS, password)
  } else {
    console.log('updateStoredPassword: else')
    window.electronService.saveKeyToEStore(PASS, password)
  }
}

export function removeStoredPassword() {
  if (isDevEnv()) {
    localStorage.removeItem(PASS)
  } else {
    console.log('removeStoredPassword: else')
    window.electronService.deleteKeyFromEStore(PASS)
  }
}

export function getStoredPassword() {
  if (isDevEnv()) {
    return localStorage.getItem(PASS)
  }
  console.log('getStoredPassword: else')
  const result = window.electronService.getKeyFromEStore()[PASS] || {}
  console.log('result: ', result)
  return result?.[PASS]
}

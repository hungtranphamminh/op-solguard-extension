export const LocalStorage = (function () {
  async function _setToken(accessToken: string) {
    if (accessToken) {
      await chrome.storage.local.set({ accessToken: accessToken })
    }
  }

  async function _getAccessToken() {
    const result = await chrome.storage.local.get(['accessToken'])
    return result.accessToken
  }

  async function _setRefreshToken(refreshToken: string) {
    if (refreshToken) {
      await chrome.storage.local.set({ refreshToken: refreshToken })
      // localStorage.setItem('refreshToken', refreshToken)
    }
  }

  async function _getRefreshToken() {
    const refreshToken = await chrome.storage.local.get(['refreshToken'])
    return refreshToken?.refreshToken
  }

  function _clearToken() {
    chrome.storage.local.remove([
      'accessToken',
      'refreshToken',
      'currentAccount',
      'user_id',
      'chainId',
    ])
  }

  async function _getKey(accountId: string, chainId: string | number) {
    const result = await chrome.storage.local.get(`${accountId}-${chainId}-key`)
    return result[`${accountId}-${chainId}-key`]
  }
  async function _setEvmAddress(evmAddress: string) {
    await chrome.storage.local.set({ evmAddress: evmAddress })
  }
  async function _getEvmAddress() {
    const result = await chrome.storage.local.get(['evmAddress'])
    /* todo: replace */
    // return result.evmAddress
    return '0xbB44C4f44a561239c42f892333a541627ef2E8E6'
  }

  async function _getConfigStatus(configIndex: Number) {
    const result = await chrome.storage.local.get(['config' + configIndex])
    return result['config' + configIndex]
  }

  async function _setConfigStatus(configIndex: Number, status) {
    switch (configIndex) {
      case 1: {
        await chrome.storage.local.set({ config1: status })
        break
      }
      case 2: {
        await chrome.storage.local.set({ config2: status })
        break
      }
      case 3: {
        await chrome.storage.local.set({ config3: status })
        break
      }
      default:
        break
    }
  }

  return {
    setToken: _setToken,
    getAccessToken: _getAccessToken,
    getRefreshToken: _getRefreshToken,
    setRefreshToken: _setRefreshToken,
    clearToken: _clearToken,
    setEvmAddress: _setEvmAddress,
    getEvmAddress: _getEvmAddress,
    getConfigStatus: _getConfigStatus,
    setConfigStatus: _setConfigStatus,
  }
})()

import { useEffect } from 'react'
import { IsMaliciousWindow } from './detector/detector'
import { InitInterceptor } from './interceptor/MetamaskInterceptor'

const isDeepInjector = true

export default function InjectedShield() {
  useEffect(() => {
    console.log('Shield Injected')
    InterceptMessage()
  }, [])

  const InterceptMessage = async () => {
    if (IsMaliciousWindow()) {
      window.alert('Malicious window detected at: ' + window.location.href)
      chrome.runtime.sendMessage('liknlkfmpnlbcfdbjonfgieffnklkifm', {
        action: 'alert',
      })
    } else {
      await InitInterceptor()
    }
  }

  return null
}

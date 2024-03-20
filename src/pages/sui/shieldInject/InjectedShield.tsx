import { useEffect } from 'react'
// import { createRoot } from 'react-dom/client'
import { SimulateAttacks } from './simulateAttack/SimulateAttacks'
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
      window.alert('malicious window detected')
    } else {
      window.alert('malicious window undetected')

      await InitInterceptor()
    }
  }

  return null
}

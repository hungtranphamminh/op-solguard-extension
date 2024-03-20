import config from '@src/config'
import { LocalStorage } from '@src/utils/localStorage'
import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // chrome.storage.local.clear()

  useEffect(() => {
    console.log('LocalStorage.getAccessToken()', LocalStorage.getAccessToken())
    const checkAuthentication = async () => {
      const accessToken = await LocalStorage.getAccessToken()
      if (accessToken) {
        setIsAuthenticated(true)
        setLoading(true)
        setLoading(false)
      } else {
        setIsAuthenticated(false)
        navigate(config.routes.LANDINGPAGE)
      }
    }

    checkAuthentication()
  }, [])

  useEffect(() => {
    // Set up the listener
    const listener = (changes: { [key: string]: chrome.storage.StorageChange }) => {
      if (changes.accessToken) {
        const newAccessToken = changes.accessToken.newValue
        if (!newAccessToken) {
          navigate(config.routes.LOGIN) // Navigate to login when token is invalidated
        }
      }
    }

    chrome.storage.local.onChanged.addListener(listener)

    return () => {
      chrome.storage.local.onChanged.removeListener(listener)
    }
  }, [navigate])

  return isAuthenticated ? <Outlet /> : null
}
export default PrivateRoute

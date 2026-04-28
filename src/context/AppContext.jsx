import { createContext, useContext, useState, useEffect } from 'react'
import { useInventory } from '../hooks/useInventory'
import { useImages } from '../hooks/useImages'
import { useVariations } from '../hooks/useVariations'
import { useProfiles } from '../hooks/useProfiles'
import { useAuth } from '../hooks/useAuth'

const LS_SETTINGS = 'etsy_settings'

function loadSettings() {
  try {
    const persisted = JSON.parse(localStorage.getItem(LS_SETTINGS)) ?? {}
    return {
      apiKey: persisted.apiKey ?? '',
      shopId: persisted.shopId ?? '',
      accessToken: '', // token session'da tutulur, localStorage'a yazilmaz
    }
  } catch {
    return { apiKey: '', accessToken: '', shopId: '' }
  }
}

function pageFromPath() {
  const path = window.location.pathname.replace('/', '') || 'landing'
  const valid = ['landing', 'products', 'images', 'variations', 'profiles', 'settings', 'privacy']
  return valid.includes(path) ? path : 'landing'
}

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [activePage, setActivePageState] = useState(pageFromPath)
  const [settings, setSettings] = useState(loadSettings)

  const setActivePage = (page) => {
    setActivePageState(page)
    const path = page === 'landing' ? '/' : `/${page}`
    if (window.location.pathname !== path) {
      window.history.pushState({ page }, '', path)
    }
  }

  useEffect(() => {
    const handlePop = (e) => {
      setActivePageState(e.state?.page ?? pageFromPath())
    }
    window.addEventListener('popstate', handlePop)
    return () => window.removeEventListener('popstate', handlePop)
  }, [])

  useEffect(() => {
    // accessToken localStorage'a yazilmaz — sadece apiKey ve shopId saklanir
    const { accessToken: _omit, ...safeSettings } = settings
    localStorage.setItem(LS_SETTINGS, JSON.stringify(safeSettings))
  }, [settings])

  const auth = useAuth()
  const inventory = useInventory()
  const images = useImages()
  const variations = useVariations(inventory.updateProduct)
  const profilesState = useProfiles()

  return (
    <AppContext.Provider
      value={{ activePage, setActivePage, settings, setSettings, ...auth, ...inventory, ...images, ...variations, ...profilesState }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}

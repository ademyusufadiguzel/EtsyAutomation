import { createContext, useContext, useState, useEffect } from 'react'
import { useInventory } from '../hooks/useInventory'
import { useImages } from '../hooks/useImages'
import { useVariations } from '../hooks/useVariations'
import { useProfiles } from '../hooks/useProfiles'

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

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [activePage, setActivePage] = useState('landing')
  const [settings, setSettings] = useState(loadSettings)

  useEffect(() => {
    // accessToken localStorage'a yazilmaz — sadece apiKey ve shopId saklanir
    const { accessToken: _omit, ...safeSettings } = settings
    localStorage.setItem(LS_SETTINGS, JSON.stringify(safeSettings))
  }, [settings])

  const inventory = useInventory()
  const images = useImages()
  const variations = useVariations(inventory.updateProduct)
  const profilesState = useProfiles()

  return (
    <AppContext.Provider
      value={{ activePage, setActivePage, settings, setSettings, ...inventory, ...images, ...variations, ...profilesState }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}

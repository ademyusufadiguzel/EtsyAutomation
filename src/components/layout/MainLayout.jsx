import { useApp } from '../../context/AppContext'
import { LandingNavbar } from './LandingNavbar'
import { AppNavbar } from './AppNavbar'
import { LandingPage } from '../pages/LandingPage'
import { DashboardPage } from '../pages/DashboardPage'
import { ProductsPage } from '../pages/ProductsPage'
import { ImagesPage } from '../pages/ImagesPage'
import { VariationsPage } from '../pages/VariationsPage'
import { ProfilesPage } from '../pages/ProfilesPage'
import { SettingsPage } from '../pages/SettingsPage'
import { PrivacyPage } from '../pages/PrivacyPage'
import { LoginPage } from '../pages/LoginPage'

const pages = {
  landing: LandingPage,
  dashboard: DashboardPage,
  products: ProductsPage,
  images: ImagesPage,
  variations: VariationsPage,
  profiles: ProfilesPage,
  settings: SettingsPage,
  privacy: PrivacyPage,
}

const PUBLIC_PAGES = ['landing', 'privacy']

export function MainLayout() {
  const { activePage, user, loading } = useApp()
  const Page = pages[activePage] ?? LandingPage

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-sm text-gray-400">Yukleniyor...</div>
      </div>
    )
  }

  if (!user && !PUBLIC_PAGES.includes(activePage)) {
    return <LoginPage />
  }

  const isPublic = PUBLIC_PAGES.includes(activePage)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {isPublic ? <LandingNavbar /> : <AppNavbar />}
      <main className="flex-1">
        <Page />
      </main>
      <footer className="border-t border-gray-100 bg-white px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-400">
        <span>Etsy Auto-Lister Pro &copy; {new Date().getFullYear()}</span>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          <a href="https://www.etsy.com/developers" target="_blank" rel="noreferrer" className="hover:text-gray-600 transition-colors">
            Etsy Developer Portal
          </a>
          <span>Etsy, Inc. ile baglantili degildir.</span>
        </div>
      </footer>
    </div>
  )
}

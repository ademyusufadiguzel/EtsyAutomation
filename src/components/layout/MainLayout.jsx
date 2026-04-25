import { Sidebar } from './Sidebar'
import { useApp } from '../../context/AppContext'
import { LandingPage } from '../pages/LandingPage'
import { ProductsPage } from '../pages/ProductsPage'
import { ImagesPage } from '../pages/ImagesPage'
import { VariationsPage } from '../pages/VariationsPage'
import { ProfilesPage } from '../pages/ProfilesPage'
import { SettingsPage } from '../pages/SettingsPage'
import { PrivacyPage } from '../pages/PrivacyPage'

const pages = {
  landing: LandingPage,
  products: ProductsPage,
  images: ImagesPage,
  variations: VariationsPage,
  profiles: ProfilesPage,
  settings: SettingsPage,
  privacy: PrivacyPage,
}

export function MainLayout() {
  const { activePage } = useApp()
  const Page = pages[activePage] ?? LandingPage

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-auto">
        <main className="flex-1">
          <Page />
        </main>
        <footer className="border-t border-gray-100 bg-white px-8 py-4 flex items-center justify-between text-xs text-gray-400">
          <span>Etsy Auto-Lister Pro &copy; {new Date().getFullYear()}</span>
          <div className="flex gap-4">
            <a
              href="https://www.etsy.com/developers"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-600 transition-colors"
            >
              Etsy Developer Portal
            </a>
            <button
              onClick={() => {}}
              className="hover:text-gray-600 transition-colors"
            >
              Etsy Auto-Lister Pro, Etsy, Inc. ile bağlantılı değildir.
            </button>
          </div>
        </footer>
      </div>
    </div>
  )
}

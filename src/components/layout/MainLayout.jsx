import { useState } from 'react'
import { Sidebar } from './Sidebar'
import { useApp } from '../../context/AppContext'
import { LandingPage } from '../pages/LandingPage'
import { ProductsPage } from '../pages/ProductsPage'
import { ImagesPage } from '../pages/ImagesPage'
import { VariationsPage } from '../pages/VariationsPage'
import { ProfilesPage } from '../pages/ProfilesPage'
import { SettingsPage } from '../pages/SettingsPage'
import { PrivacyPage } from '../pages/PrivacyPage'
import { LoginPage } from '../pages/LoginPage'

const pages = {
  landing: LandingPage,
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
  const [sidebarOpen, setSidebarOpen] = useState(false)
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

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — fixed overlay on mobile, static on desktop */}
      <div
        className={`fixed md:static inset-y-0 left-0 z-50 md:z-auto transform transition-transform duration-200 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-auto min-w-0">

        {/* Mobile top bar */}
        <header className="md:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-200 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-600 hover:text-gray-900 p-1"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
              <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" />
              <line x1="3" y1="18" x2="21" y2="18" strokeLinecap="round" />
            </svg>
          </button>
          <span className="font-bold text-gray-800 text-sm">Etsy Auto-Lister Pro</span>
        </header>

        <main className="flex-1">
          <Page />
        </main>

        <footer className="border-t border-gray-100 bg-white px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <span>Etsy Auto-Lister Pro &copy; {new Date().getFullYear()}</span>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            <a
              href="https://www.etsy.com/developers"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-600 transition-colors"
            >
              Etsy Developer Portal
            </a>
            <span>Etsy, Inc. ile baglantili degildir.</span>
          </div>
        </footer>
      </div>
    </div>
  )
}

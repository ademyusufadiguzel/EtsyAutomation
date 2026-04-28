import { useState } from 'react'
import { useApp } from '../../context/AppContext'

const NAV_PAGES = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'products', label: 'Urunler' },
  { id: 'images', label: 'Gorseller' },
  { id: 'variations', label: 'Varyasyonlar' },
  { id: 'profiles', label: 'Profiller' },
]

export function AppNavbar() {
  const { activePage, setActivePage, user, signOut } = useApp()
  const [open, setOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    setActivePage('landing')
    setOpen(false)
  }

  const navigate = (id) => {
    setActivePage(id)
    setOpen(false)
  }

  const shortEmail = user?.email?.split('@')[0] ?? ''

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="px-4 md:px-8 flex items-center h-14 gap-6">
        {/* Logo */}
        <button
          onClick={() => navigate('landing')}
          className="font-bold text-gray-900 text-sm flex-shrink-0"
        >
          Etsy Auto-Lister <span className="text-orange-500">Pro</span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 flex-1">
          {NAV_PAGES.map((page) => (
            <button
              key={page.id}
              onClick={() => navigate(page.id)}
              className={`px-3 py-4 text-sm font-medium border-b-2 transition-colors ${
                activePage === page.id
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              {page.label}
            </button>
          ))}
        </nav>

        {/* Desktop user */}
        <div className="hidden md:flex items-center gap-3 ml-auto">
          <span className="text-xs text-gray-400">{shortEmail}</span>
          <button
            onClick={handleSignOut}
            className="text-xs text-red-400 hover:text-red-600 transition-colors"
          >
            Cikis Yap
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-gray-600 hover:text-gray-900 p-1 ml-auto"
        >
          {open ? (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
              <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" />
              <line x1="3" y1="18" x2="21" y2="18" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
          {NAV_PAGES.map((page) => (
            <button
              key={page.id}
              onClick={() => navigate(page.id)}
              className={`block w-full text-left text-sm py-2 font-medium ${
                activePage === page.id ? 'text-orange-600' : 'text-gray-600'
              }`}
            >
              {page.label}
            </button>
          ))}
          <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-400">{shortEmail}</span>
            <button onClick={handleSignOut} className="text-xs text-red-400">Cikis Yap</button>
          </div>
        </div>
      )}
    </header>
  )
}

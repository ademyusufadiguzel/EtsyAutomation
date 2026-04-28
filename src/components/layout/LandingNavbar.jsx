import { useState } from 'react'
import { useApp } from '../../context/AppContext'

export function LandingNavbar() {
  const { user, setActivePage } = useApp()
  const [open, setOpen] = useState(false)

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex items-center justify-between h-14">
        {/* Logo */}
        <button
          onClick={() => setActivePage('landing')}
          className="font-bold text-gray-900 text-base"
        >
          Etsy Auto-Lister <span className="text-orange-500">Pro</span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => scrollTo('ozellikler')}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Ozellikler
          </button>
          <button
            onClick={() => scrollTo('nasil-calisir')}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Nasil Calisir
          </button>
          <button
            onClick={() => setActivePage('privacy')}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Gizlilik
          </button>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <button
              onClick={() => setActivePage('dashboard')}
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Uygulamaya Git
            </button>
          ) : (
            <button
              onClick={() => setActivePage('products')}
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Giris Yap
            </button>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-gray-600 hover:text-gray-900 p-1"
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
          <button onClick={() => scrollTo('ozellikler')} className="block w-full text-left text-sm text-gray-600 py-2">Ozellikler</button>
          <button onClick={() => scrollTo('nasil-calisir')} className="block w-full text-left text-sm text-gray-600 py-2">Nasil Calisir</button>
          <button onClick={() => { setActivePage('privacy'); setOpen(false) }} className="block w-full text-left text-sm text-gray-600 py-2">Gizlilik</button>
          <div className="pt-2 border-t border-gray-100">
            <button
              onClick={() => { setActivePage(user ? 'dashboard' : 'products'); setOpen(false) }}
              className="w-full bg-orange-500 text-white text-sm font-medium px-4 py-2 rounded-lg"
            >
              {user ? 'Uygulamaya Git' : 'Giris Yap'}
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

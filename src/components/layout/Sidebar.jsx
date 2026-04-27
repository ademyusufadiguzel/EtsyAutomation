import { useApp } from '../../context/AppContext'


const PAGES = [
  { id: 'landing', label: 'Anasayfa' },
  { id: 'products', label: 'Urunler' },
  { id: 'images', label: 'Gorseller' },
  { id: 'variations', label: 'Varyasyonlar' },
  { id: 'profiles', label: 'Profiller' },
  { id: 'settings', label: 'Ayarlar' },
]

export function Sidebar({ onClose }) {
  const { activePage, setActivePage, user, signOut } = useApp()

  const handleSignOut = async () => {
    await signOut()
    setActivePage('landing')
    onClose?.()
  }

  const navigate = (id) => {
    setActivePage(id)
    onClose?.()
  }

  return (
    <nav className="w-52 min-h-screen bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
      <div className="px-5 py-5 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h1 className="text-base font-bold text-gray-800">Etsy Auto-Lister</h1>
          <p className="text-xs text-gray-400 mt-0.5">Pro</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="md:hidden text-gray-400 hover:text-gray-600 p-1">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>
      <ul className="flex-1 px-3 py-4 space-y-1">
        {PAGES.map((page) => (
          <li key={page.id}>
            <button
              onClick={() => navigate(page.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activePage === page.id
                  ? 'bg-orange-50 text-orange-600'
                  : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              {page.label}
            </button>
          </li>
        ))}
      </ul>
      <div className="px-4 py-4 border-t border-gray-100 space-y-2">
        <button
          onClick={() => navigate('privacy')}
          className={`block text-xs transition-colors ${activePage === 'privacy' ? 'text-orange-600' : 'text-gray-400 hover:text-gray-600'}`}
        >
          Gizlilik Politikasi
        </button>
        {user && (
          <button
            onClick={handleSignOut}
            className="block text-xs text-red-400 hover:text-red-600 transition-colors"
          >
            Cikis Yap
          </button>
        )}
        {!user && (
          <button
            onClick={() => navigate('products')}
            className="block text-xs text-orange-500 hover:text-orange-600 transition-colors"
          >
            Giris Yap
          </button>
        )}
      </div>
    </nav>
  )
}

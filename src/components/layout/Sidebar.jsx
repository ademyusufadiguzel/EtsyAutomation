import { useApp } from '../../context/AppContext'

const PAGES = [
  { id: 'landing', label: 'Anasayfa' },
  { id: 'products', label: 'Urunler' },
  { id: 'images', label: 'Gorseller' },
  { id: 'variations', label: 'Varyasyonlar' },
  { id: 'profiles', label: 'Profiller' },
  { id: 'settings', label: 'Ayarlar' },
]

export function Sidebar() {
  const { activePage, setActivePage } = useApp()

  return (
    <nav className="w-52 min-h-screen bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
      <div className="px-5 py-5 border-b border-gray-100">
        <h1 className="text-base font-bold text-gray-800">Etsy Auto-Lister</h1>
        <p className="text-xs text-gray-400 mt-0.5">Pro</p>
      </div>
      <ul className="flex-1 px-3 py-4 space-y-1">
        {PAGES.map((page) => (
          <li key={page.id}>
            <button
              onClick={() => setActivePage(page.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activePage === page.id
                  ? 'bg-orange-50 text-orange-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {page.label}
            </button>
          </li>
        ))}
      </ul>
      <div className="px-4 py-4 border-t border-gray-100">
        <button
          onClick={() => setActivePage('privacy')}
          className={`text-xs transition-colors ${
            activePage === 'privacy' ? 'text-orange-600' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Gizlilik Politikası
        </button>
      </div>
    </nav>
  )
}

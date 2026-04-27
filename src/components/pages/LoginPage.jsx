import { useState } from 'react'
import { useApp } from '../../context/AppContext'

export function LoginPage() {
  const { signIn, setActivePage } = useApp()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const { error } = await signIn(email, password)
    setLoading(false)
    if (error) {
      setError('E-posta veya sifre hatali. Lutfen tekrar deneyin.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Etsy Auto-Lister</h1>
          <p className="text-sm text-gray-400 mt-1">Pro</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-8 py-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">Giris Yap</h2>
          <p className="text-sm text-gray-400 mb-6">Devam etmek icin hesabiniza giris yapin.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ornek@mail.com"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sifre</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg transition-colors text-sm"
            >
              {loading ? 'Giris yapiliyor...' : 'Giris Yap'}
            </button>
          </form>
        </div>

        <p className="text-center mt-6">
          <button
            onClick={() => setActivePage('landing')}
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            Anasayfaya Don
          </button>
        </p>
      </div>
    </div>
  )
}

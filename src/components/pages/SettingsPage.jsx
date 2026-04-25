import { useApp } from '../../context/AppContext'

export function SettingsPage() {
  const { settings, setSettings } = useApp()

  const update = (field, value) => setSettings((prev) => ({ ...prev, [field]: value }))

  return (
    <div className="p-4 md:p-8 max-w-xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">API Ayarlari</h2>
        <p className="text-sm text-gray-500 mt-1">
          Etsy API bilgilerinizi girin. Bu bilgiler yalnizca bu oturumda saklanir.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">API Anahtari</label>
          <input
            type="text"
            value={settings.apiKey}
            onChange={(e) => update('apiKey', e.target.value)}
            placeholder="keystring..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Access Token</label>
          <input
            type="password"
            value={settings.accessToken}
            onChange={(e) => update('accessToken', e.target.value)}
            placeholder="Bearer token..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          <p className="text-xs text-gray-400 mt-1">
            Tarayici kapatilinca silinir — oturum suresi dolunca yeniden gir.
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Shop ID</label>
          <input
            type="text"
            value={settings.shopId}
            onChange={(e) => update('shopId', e.target.value)}
            placeholder="12345678"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
        </div>
      </div>

      <div className="mt-8 bg-orange-50 border border-orange-200 rounded-lg px-4 py-3">
        <p className="text-sm text-orange-800 font-semibold">Etsy API Onayi Bekleniyor</p>
        <p className="text-xs text-orange-600 mt-1">
          API anahtariniz onaylanana kadar gercek yukleme yapilamamaktadir. Demo modu ile
          uygulamayi test edebilirsiniz.
        </p>
      </div>
    </div>
  )
}

import { useState, useMemo } from 'react'
import { useApp } from '../../context/AppContext'
import { validateAll } from '../../utils/seoValidator'
import { demoProducts } from '../../utils/demoData'
import { FileUploader } from '../FileUploader'
import { ProductTable } from '../ProductTable'
import { publishProducts } from '../../services/etsyApi'

export function ProductsPage() {
  const { products, toggleApprove, approveAll, settings, loadFile, fileName, error, activeProfile, setActivePage } = useApp()
  const [isDemo, setIsDemo] = useState(false)
  const [demoApproved, setDemoApproved] = useState(() => demoProducts.map((p) => ({ ...p })))
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(null)
  const [results, setResults] = useState([])

  const validatedProducts = useMemo(() => validateAll(products), [products])
  const approvedProducts = validatedProducts.filter((p) => p.approved && p.seoErrors.length === 0)

  const validatedDemo = useMemo(() => validateAll(demoApproved), [demoApproved])
  const approvedDemo = validatedDemo.filter((p) => p.approved && p.seoErrors.length === 0)

  const handleUpload = async () => {
    if (approvedProducts.length === 0) return
    setUploading(true)
    setResults([])
    const res = await publishProducts(approvedProducts, setProgress, settings, activeProfile)
    setResults(res)
    setUploading(false)
    setProgress(null)
  }

  const handleDemoToggle = (id) => {
    setDemoApproved((prev) => prev.map((p) => (p.id === id ? { ...p, approved: !p.approved } : p)))
  }

  const handleDemoToggleAll = (value) => {
    setDemoApproved((prev) => prev.map((p) => ({ ...p, approved: value })))
  }

  const successCount = results.filter((r) => r.success).length
  const failCount = results.filter((r) => !r.success).length

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Urunler</h2>
        <button
          onClick={() => setIsDemo((v) => !v)}
          className={`text-sm px-4 py-2 rounded-lg font-medium transition-colors ${
            isDemo
              ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {isDemo ? 'Demo Modu Aktif' : 'Demo Modunu Ac'}
        </button>
      </div>

      {isDemo ? (
        <>
          <div className="mb-6 bg-orange-50 border border-orange-200 rounded-xl px-5 py-4">
            <p className="text-orange-800 font-semibold text-sm">Demo Modu</p>
            <p className="text-orange-600 text-sm mt-0.5">
              Bu mod, uygulamanin nasil calistigini gostermek icindir. Gercek yukleme icin Etsy API
              bilgilerinizi Ayarlar sayfasindan ekleyin.
            </p>
          </div>

          <ProductTable
            products={validatedDemo}
            onToggle={handleDemoToggle}
            onToggleAll={handleDemoToggleAll}
            readOnly
          />

          <div className="mt-6 flex items-center gap-4">
            <button
              disabled
              className="bg-gray-300 cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl"
            >
              {approvedDemo.length} Urunu Yukle (Demo)
            </button>
            <p className="text-sm text-gray-400">Demo modunda gercek yukleme yapilmaz.</p>
          </div>
        </>
      ) : (
        <>
          <FileUploader onFile={loadFile} fileName={fileName} />

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
              {error}
            </div>
          )}

          {validatedProducts.length > 0 && (
            <>
              <ProductTable
                products={validatedProducts}
                onToggle={toggleApprove}
                onToggleAll={approveAll}
              />

              <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                <span>Aktif Profil:</span>
                <button
                  onClick={() => setActivePage('profiles')}
                  className="text-orange-600 hover:text-orange-700 font-medium underline underline-offset-2"
                >
                  {activeProfile.name}
                </button>
                <span>({activeProfile.state}, taxonomy: {activeProfile.taxonomyId})</span>
              </div>

              <div className="mt-3 flex items-center gap-4">
                <button
                  onClick={handleUpload}
                  disabled={uploading || approvedProducts.length === 0}
                  className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                >
                  {uploading
                    ? `Yukleniyor... ${progress ? `(${progress.index + 1}/${progress.total})` : ''}`
                    : `${approvedProducts.length} Urunu Yukle`}
                </button>
                {approvedProducts.length === 0 && (
                  <p className="text-sm text-gray-400">
                    Yuklemek icin hatasiz urunleri onaylayin.
                  </p>
                )}
              </div>
            </>
          )}

          {results.length > 0 && (
            <div className="mt-4 space-y-2">
              {successCount > 0 && (
                <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 text-sm">
                  {successCount} urun basariyla Etsy'e yuklendi.
                </div>
              )}
              {failCount > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm">
                  <p className="text-red-700 font-medium mb-1">{failCount} urun yuklenemedi:</p>
                  {results
                    .filter((r) => !r.success)
                    .map((r, i) => (
                      <p key={i} className="text-red-500 text-xs">
                        - {r.error}
                      </p>
                    ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}

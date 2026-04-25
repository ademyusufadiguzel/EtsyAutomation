import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { VariationEditor } from '../variations/VariationEditor'
import { demoProducts } from '../../utils/demoData'

export function VariationsPage() {
  const { products, setProducts } = useApp()
  const [selectedId, setSelectedId] = useState(null)

  const loadDemo = () => {
    setProducts(demoProducts.map((p) => ({ ...p })))
  }

  const selectedProduct = products.find((p) => p.id === selectedId)

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Varyasyon Editoru</h2>
        <p className="text-sm text-gray-500 mt-1">
          Her urun icin renk, beden gibi varyasyon tiplerini ve kombinasyon fiyat/stoklarini
          duzenleyin.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-start gap-3">
          <p className="text-sm text-gray-400">
            Henuz urun yuklenmedi. Once Urunler sayfasindan Excel dosyasi yukleyin.
          </p>
          <button
            onClick={loadDemo}
            className="text-sm bg-orange-50 text-orange-600 hover:bg-orange-100 border border-orange-200 px-4 py-2 rounded-lg transition-colors"
          >
            Demo urunleri yukle
          </button>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-64 md:flex-shrink-0">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Urunler</p>
            <ul className="space-y-1">
              {products.map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => setSelectedId(p.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedId === p.id
                        ? 'bg-orange-50 text-orange-600 font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span className="block truncate">{p.title}</span>
                    {p.variations.length > 0 && (
                      <span className="text-xs text-gray-400">{p.variations.length} varyasyon tipi</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1">
            {selectedProduct ? (
              <VariationEditor product={selectedProduct} />
            ) : (
              <div className="border border-gray-200 rounded-xl p-10 text-center text-gray-400 text-sm">
                Sol listeden bir urun secin.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

import { ProductRow } from './products/ProductRow'

export function ProductTable({ products, onToggle, onToggleAll, readOnly = false }) {
  if (products.length === 0) return null

  const allApproved = products.every((p) => p.approved)
  const approvedCount = products.filter((p) => p.approved).length

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-gray-500">
          {approvedCount} / {products.length} urun secildi
        </p>
        <button
          onClick={() => onToggleAll(!allApproved)}
          className="text-sm text-orange-500 hover:text-orange-700 font-medium"
        >
          {allApproved ? 'Tum secimi kaldir' : 'Tumunu sec'}
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Onayla</th>
              <th className="px-4 py-3 text-left">Gorsel</th>
              <th className="px-4 py-3 text-left">Baslik</th>
              <th className="px-4 py-3 text-left">Fiyat</th>
              <th className="px-4 py-3 text-left">Etiketler</th>
              <th className="px-4 py-3 text-left">Stok</th>
              <th className="px-4 py-3 text-left">Varyasyon</th>
              <th className="px-4 py-3 text-left">SEO</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <ProductRow key={product.id} product={product} onToggle={onToggle} readOnly={readOnly} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

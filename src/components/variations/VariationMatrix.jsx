import { useApp } from '../../context/AppContext'
import { comboLabel } from '../../utils/variationUtils'

export function VariationMatrix({ product }) {
  const { updateCombination } = useApp()
  const combos = Object.entries(product.variationCombinations)

  if (combos.length === 0) return null

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
        <p className="text-xs font-semibold text-gray-600 uppercase">
          Kombinasyon Matrisi ({combos.length} kombinasyon)
        </p>
      </div>
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-500 text-xs">
          <tr>
            <th className="px-4 py-2 text-left">Kombinasyon</th>
            <th className="px-4 py-2 text-left">Fiyat (bos = ana fiyat)</th>
            <th className="px-4 py-2 text-left">Stok (bos = ana stok)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {combos.map(([key, combo]) => (
            <tr key={key}>
              <td className="px-4 py-2 text-gray-700 font-medium">
                {comboLabel(product.variations, key)}
              </td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  value={combo.price ?? ''}
                  onChange={(e) =>
                    updateCombination(
                      product.id,
                      key,
                      'price',
                      e.target.value === '' ? null : parseFloat(e.target.value)
                    )
                  }
                  placeholder={String(product.price)}
                  className="border border-gray-200 rounded px-2 py-1 text-xs w-28 focus:outline-none focus:ring-1 focus:ring-orange-300"
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  value={combo.quantity ?? ''}
                  onChange={(e) =>
                    updateCombination(
                      product.id,
                      key,
                      'quantity',
                      e.target.value === '' ? null : parseInt(e.target.value)
                    )
                  }
                  placeholder={String(product.quantity)}
                  className="border border-gray-200 rounded px-2 py-1 text-xs w-28 focus:outline-none focus:ring-1 focus:ring-orange-300"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

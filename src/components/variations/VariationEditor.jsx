import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { VariationTypeRow } from './VariationTypeRow'
import { VariationMatrix } from './VariationMatrix'

export function VariationEditor({ product }) {
  const { addVariationType } = useApp()
  const [newTypeName, setNewTypeName] = useState('')

  const handleAddType = () => {
    if (!newTypeName.trim()) return
    addVariationType(product.id, newTypeName.trim())
    setNewTypeName('')
  }

  const hasCombinations = Object.keys(product.variationCombinations).length > 0

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {product.variations.map((type) => (
          <VariationTypeRow key={type.id} product={product} variationType={type} />
        ))}
        {product.variations.length === 0 && (
          <p className="text-sm text-gray-400 italic">
            Henuz varyasyon tipi eklenmedi. Asagidan yeni bir tip ekleyin (ornek: Renk, Beden).
          </p>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newTypeName}
          onChange={(e) => setNewTypeName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddType()}
          placeholder="Yeni varyasyon tipi (ornek: Renk, Beden)"
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
        <button
          onClick={handleAddType}
          className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-lg transition-colors"
        >
          Tip Ekle
        </button>
      </div>

      {hasCombinations && <VariationMatrix product={product} />}
    </div>
  )
}

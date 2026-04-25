import { useState } from 'react'
import { useApp } from '../../context/AppContext'

export function VariationTypeRow({ product, variationType }) {
  const { removeVariationType, addOption, removeOption } = useApp()
  const [newOption, setNewOption] = useState('')

  const handleAddOption = () => {
    if (!newOption.trim()) return
    addOption(product.id, variationType.id, newOption.trim())
    setNewOption('')
  }

  return (
    <div className="border border-gray-200 rounded-lg p-3 bg-white">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-gray-700">{variationType.name}</span>
        <button
          onClick={() => removeVariationType(product.id, variationType.id)}
          className="text-xs text-red-400 hover:text-red-600 transition-colors"
        >
          Kaldir
        </button>
      </div>

      <div className="flex flex-wrap gap-1 mb-2">
        {variationType.options.map((opt) => (
          <span
            key={opt.id}
            className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full flex items-center gap-1"
          >
            {opt.label}
            <button
              onClick={() => removeOption(product.id, variationType.id, opt.id)}
              className="text-gray-400 hover:text-red-500 transition-colors leading-none ml-0.5"
            >
              x
            </button>
          </span>
        ))}
        {variationType.options.length === 0 && (
          <span className="text-gray-400 text-xs italic">Henuz secenek yok</span>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddOption()}
          placeholder={`${variationType.name} secenegi ekle`}
          className="flex-1 border border-gray-200 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-orange-300"
        />
        <button
          onClick={handleAddOption}
          className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded transition-colors"
        >
          Ekle
        </button>
      </div>
    </div>
  )
}

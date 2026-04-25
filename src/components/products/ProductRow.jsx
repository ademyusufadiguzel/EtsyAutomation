import { useApp } from '../../context/AppContext'
import { InlineEditCell } from './InlineEditCell'
import { RowImageUpload } from '../images/RowImageUpload'
import { VariationBadge } from '../variations/VariationBadge'

export function ProductRow({ product, onToggle, readOnly = false }) {
  const { updateProduct } = useApp()
  const hasError = product.seoErrors && product.seoErrors.length > 0

  return (
    <tr
      className={`transition-colors ${
        hasError ? 'bg-red-50' : product.approved ? 'bg-green-50' : 'bg-white'
      }`}
    >
      <td className="px-4 py-3">
        <input
          type="checkbox"
          checked={product.approved}
          onChange={() => onToggle(product.id)}
          disabled={hasError}
          className="w-4 h-4 accent-orange-500 cursor-pointer disabled:cursor-not-allowed"
        />
      </td>
      <td className="px-4 py-3">
        {readOnly ? (
          <div className="w-10 h-10 rounded-lg border border-gray-200 bg-gray-100" />
        ) : (
          <RowImageUpload product={product} />
        )}
      </td>
      <td className="px-4 py-3 max-w-xs">
        {readOnly ? (
          <p className="font-medium text-gray-800 truncate" title={product.title}>
            {product.title}
          </p>
        ) : (
          <InlineEditCell
            value={product.title}
            onSave={(v) => updateProduct(product.id, { title: v })}
            className="font-medium text-gray-800 block w-full"
          />
        )}
        <p className="text-gray-400 text-xs mt-0.5">{product.title.length} / 140 kar.</p>
      </td>
      <td className="px-4 py-3">
        {readOnly ? (
          <span className="text-gray-700 font-medium">${product.price.toFixed(2)}</span>
        ) : (
          <InlineEditCell
            value={product.price}
            onSave={(v) => updateProduct(product.id, { price: parseFloat(v) || 0 })}
            type="number"
            className="text-gray-700 font-medium"
          />
        )}
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-1 max-w-xs">
          {product.tags.slice(0, 5).map((tag, i) => (
            <span key={i} className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
          {product.tags.length > 5 && (
            <span className="text-gray-400 text-xs">+{product.tags.length - 5}</span>
          )}
        </div>
      </td>
      <td className="px-4 py-3">
        {readOnly ? (
          <span className="text-gray-700">{product.quantity}</span>
        ) : (
          <InlineEditCell
            value={product.quantity}
            onSave={(v) => updateProduct(product.id, { quantity: parseInt(v) || 0 })}
            type="number"
            className="text-gray-700"
          />
        )}
      </td>
      <td className="px-4 py-3">
        <VariationBadge product={product} />
      </td>
      <td className="px-4 py-3">
        {hasError ? (
          <div className="group relative">
            <span className="text-red-500 font-medium cursor-help">Hata</span>
            <ul className="absolute z-10 right-0 top-6 bg-white border border-red-200 rounded-lg shadow-lg p-3 text-xs text-red-600 w-64 hidden group-hover:block">
              {product.seoErrors.map((err, i) => (
                <li key={i} className="mb-1">- {err}</li>
              ))}
            </ul>
          </div>
        ) : (
          <span className="text-green-600 font-medium">OK</span>
        )}
      </td>
    </tr>
  )
}

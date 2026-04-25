export function VariationBadge({ product }) {
  const count = product.variations?.length ?? 0
  if (count === 0) return <span className="text-gray-300 text-xs">-</span>

  return (
    <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full font-medium">
      {count} tip
    </span>
  )
}

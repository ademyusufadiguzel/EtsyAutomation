export function TopListings({ transactions }) {
  const countMap = {}
  transactions.forEach((t) => {
    const id = t.listing_id
    const title = t.title ?? `Listing #${id}`
    if (!countMap[id]) countMap[id] = { title, count: 0, revenue: 0 }
    countMap[id].count += t.quantity ?? 1
    countMap[id].revenue += ((t.price?.amount ?? 0) / 100) * (t.quantity ?? 1)
  })

  const top = Object.values(countMap)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-800 text-sm">En Cok Satanlar</h3>
      </div>
      {top.length === 0 ? (
        <p className="px-5 py-6 text-sm text-gray-400">Henuz islem yok.</p>
      ) : (
        <ul className="divide-y divide-gray-100">
          {top.map((item, i) => (
            <li key={i} className="px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xs font-bold text-gray-300 w-4 flex-shrink-0">{i + 1}</span>
                <p className="text-sm text-gray-700 truncate">{item.title}</p>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0 ml-4">
                <span className="text-xs text-gray-400">{item.count} satis</span>
                <span className="text-sm font-medium text-gray-700">${item.revenue.toFixed(2)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

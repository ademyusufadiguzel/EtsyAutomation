export function ActiveListings({ listings }) {
  const sorted = [...listings].sort((a, b) => (a.quantity ?? 0) - (b.quantity ?? 0))

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-semibold text-gray-800 text-sm">Aktif Listeler</h3>
        <span className="text-xs text-gray-400">{listings.length} urun</span>
      </div>
      {sorted.length === 0 ? (
        <p className="px-5 py-6 text-sm text-gray-400">Aktif listeleme bulunamadi.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-5 py-2 text-left">Baslik</th>
                <th className="px-5 py-2 text-left">Fiyat</th>
                <th className="px-5 py-2 text-left">Stok</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sorted.slice(0, 10).map((l) => (
                <tr key={l.listing_id}>
                  <td className="px-5 py-3 text-gray-700 max-w-xs truncate">{l.title}</td>
                  <td className="px-5 py-3 text-gray-700 font-medium">
                    ${((l.price?.amount ?? 0) / l.price?.divisor ?? 1).toFixed(2)}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      (l.quantity ?? 0) < 5
                        ? 'bg-red-100 text-red-600'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {l.quantity ?? 0}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

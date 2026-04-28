function statusBadge(receipt) {
  if (receipt.is_shipped) return <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Kargolandi</span>
  if (receipt.status === 'paid') return <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Odendi</span>
  return <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Bekliyor</span>
}

export function RecentOrders({ receipts }) {
  const recent = [...receipts].sort((a, b) => b.create_timestamp - a.create_timestamp).slice(0, 5)

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-800 text-sm">Son Siparisler</h3>
      </div>
      {recent.length === 0 ? (
        <p className="px-5 py-6 text-sm text-gray-400">Henuz siparis yok.</p>
      ) : (
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
            <tr>
              <th className="px-5 py-2 text-left">Siparis No</th>
              <th className="px-5 py-2 text-left">Tarih</th>
              <th className="px-5 py-2 text-left">Tutar</th>
              <th className="px-5 py-2 text-left">Durum</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {recent.map((r) => (
              <tr key={r.receipt_id}>
                <td className="px-5 py-3 text-gray-700 font-medium">#{r.receipt_id}</td>
                <td className="px-5 py-3 text-gray-500">
                  {new Date(r.create_timestamp * 1000).toLocaleDateString('tr-TR')}
                </td>
                <td className="px-5 py-3 text-gray-700">
                  ${((r.grandtotal?.amount ?? r.total_price ?? 0) / 100).toFixed(2)}
                </td>
                <td className="px-5 py-3">{statusBadge(r)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

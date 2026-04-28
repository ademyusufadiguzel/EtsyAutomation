export function StatsCards({ receipts, listings }) {
  const now = new Date()
  const thisMonth = receipts.filter((r) => {
    const d = new Date(r.create_timestamp * 1000)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  })
  const monthRevenue = thisMonth.reduce((sum, r) => sum + (r.grandtotal?.amount ?? r.total_price ?? 0) / 100, 0)
  const pending = receipts.filter((r) => !r.is_shipped && !r.status === 'completed').length

  const stats = [
    { label: 'Toplam Siparis', value: receipts.length },
    { label: 'Bu Ay Gelir', value: `$${monthRevenue.toFixed(2)}` },
    { label: 'Aktif Listeler', value: listings.length },
    { label: 'Bekleyen Siparis', value: receipts.filter((r) => !r.is_shipped).length },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-xs text-gray-400 mb-1">{s.label}</p>
          <p className="text-2xl font-bold text-gray-900">{s.value}</p>
        </div>
      ))}
    </div>
  )
}

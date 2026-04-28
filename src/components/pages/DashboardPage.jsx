import { useState, useEffect } from 'react'
import { useApp } from '../../context/AppContext'
import { getShop, getActiveListings, getReceipts, getTransactions } from '../../services/etsyApi'
import { StatsCards } from '../dashboard/StatsCards'
import { RecentOrders } from '../dashboard/RecentOrders'
import { TopListings } from '../dashboard/TopListings'
import { ActiveListings } from '../dashboard/ActiveListings'

const DEMO_SHOP = { shop_name: 'Demo Magazam', currency_code: 'USD', country_iso: 'US' }

const DEMO_RECEIPTS = [
  { receipt_id: 1001, create_timestamp: Date.now() / 1000 - 86400, is_shipped: true, status: 'paid', grandtotal: { amount: 599 } },
  { receipt_id: 1002, create_timestamp: Date.now() / 1000 - 172800, is_shipped: false, status: 'paid', grandtotal: { amount: 349 } },
  { receipt_id: 1003, create_timestamp: Date.now() / 1000 - 259200, is_shipped: true, status: 'paid', grandtotal: { amount: 499 } },
  { receipt_id: 1004, create_timestamp: Date.now() / 1000 - 345600, is_shipped: false, status: 'open', grandtotal: { amount: 899 } },
  { receipt_id: 1005, create_timestamp: Date.now() / 1000 - 432000, is_shipped: true, status: 'paid', grandtotal: { amount: 599 } },
]

const DEMO_TRANSACTIONS = [
  { listing_id: 1, title: 'Wedding Invitation Printable', quantity: 3, price: { amount: 599 } },
  { listing_id: 2, title: 'Birthday Card PNG Template', quantity: 2, price: { amount: 349 } },
  { listing_id: 1, title: 'Wedding Invitation Printable', quantity: 1, price: { amount: 599 } },
  { listing_id: 3, title: 'Boho Baby Shower Invitation', quantity: 2, price: { amount: 499 } },
  { listing_id: 4, title: 'Modern Resume Template', quantity: 1, price: { amount: 899 } },
  { listing_id: 2, title: 'Birthday Card PNG Template', quantity: 1, price: { amount: 349 } },
]

const DEMO_LISTINGS = [
  { listing_id: 1, title: 'Wedding Invitation Printable Card', price: { amount: 599, divisor: 100 }, quantity: 999 },
  { listing_id: 2, title: 'Birthday Card PNG Template', price: { amount: 349, divisor: 100 }, quantity: 3 },
  { listing_id: 3, title: 'Boho Baby Shower Invitation', price: { amount: 499, divisor: 100 }, quantity: 999 },
  { listing_id: 4, title: 'Modern Resume Template', price: { amount: 899, divisor: 100 }, quantity: 1 },
]

export function DashboardPage() {
  const { settings } = useApp()
  const isDemo = !settings.shopId

  const [shop, setShop] = useState(isDemo ? DEMO_SHOP : null)
  const [receipts, setReceipts] = useState(isDemo ? DEMO_RECEIPTS : [])
  const [transactions, setTransactions] = useState(isDemo ? DEMO_TRANSACTIONS : [])
  const [listings, setListings] = useState(isDemo ? DEMO_LISTINGS : [])
  const [loading, setLoading] = useState(!isDemo)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (isDemo) return
    setLoading(true)
    Promise.all([
      getShop(settings),
      getActiveListings(settings),
      getReceipts(settings),
      getTransactions(settings),
    ])
      .then(([shopData, listingsData, receiptsData, transactionsData]) => {
        setShop(shopData)
        setListings(listingsData.results ?? [])
        setReceipts(receiptsData.results ?? [])
        setTransactions(transactionsData.results ?? [])
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [settings.shopId])

  if (loading) {
    return (
      <div className="p-8 text-sm text-gray-400">Magaza verileri yukleniyor...</div>
    )
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            {shop?.shop_name ?? 'Dashboard'}
          </h2>
          {isDemo && (
            <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full mt-1 inline-block">
              Demo Modu — Gercek veri icin Ayarlar sayfasindan API bilgilerinizi girin
            </span>
          )}
        </div>
        {shop && !isDemo && (
          <span className="text-xs text-gray-400">{shop.currency_code} · {shop.country_iso}</span>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
          API hatasi: {error}
        </div>
      )}

      <StatsCards receipts={receipts} listings={listings} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentOrders receipts={receipts} />
        <TopListings transactions={transactions} />
      </div>

      <ActiveListings listings={listings} />
    </div>
  )
}

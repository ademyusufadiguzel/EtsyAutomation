import { useState } from 'react'
import { useApp } from '../../context/AppContext'

const WHO_MADE_OPTIONS = [
  { value: 'i_did', label: 'Ben yaptim' },
  { value: 'someone_else', label: 'Baska biri yapti' },
  { value: 'collective', label: 'Kolektif' },
]

const WHEN_MADE_OPTIONS = [
  { value: 'made_to_order', label: 'Siparis uzerine yapildi' },
  { value: '2020_2024', label: '2020–2024' },
  { value: '2010_2019', label: '2010–2019' },
  { value: '2004_2009', label: '2004–2009' },
  { value: 'before_2004', label: '2004 oncesi' },
  { value: '2000_2003', label: '2000–2003' },
  { value: '1990s', label: '1990lar' },
  { value: '1980s', label: '1980ler' },
]

export function ProfilesPage() {
  const {
    profiles,
    activeProfileId,
    activeProfile,
    setActiveProfileId,
    addProfile,
    updateProfile,
    deleteProfile,
  } = useApp()

  const [editingId, setEditingId] = useState(activeProfileId)
  const editing = profiles.find((p) => p.id === editingId) ?? profiles[0]

  const update = (field, value) => updateProfile(editing.id, field, value)

  const handleAddProfile = () => {
    const newId = addProfile()
    setEditingId(newId)
  }

  const handleDelete = () => {
    const fallbackId = profiles.find((p) => p.id !== editing.id)?.id ?? 'default'
    deleteProfile(editing.id)
    setEditingId(fallbackId)
  }

  return (
    <div className="p-4 md:p-8 max-w-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Listeleme Profilleri</h2>
          <p className="text-sm text-gray-500 mt-1">
            Profil, yayinlamada kullanilacak Etsy alan degerlerini saklar. Aktif profil tum
            listelere otomatik uygulanir.
          </p>
        </div>
        <button
          onClick={handleAddProfile}
          className="text-sm px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
        >
          + Yeni Profil
        </button>
      </div>

      {/* Profile tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {profiles.map((p) => (
          <button
            key={p.id}
            onClick={() => setEditingId(p.id)}
            className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
              editingId === p.id
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {p.name}
            {p.id === activeProfileId && (
              <span className="ml-1.5 text-xs opacity-70">(aktif)</span>
            )}
          </button>
        ))}
      </div>

      {/* Edit form */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Profil Adi</label>
          <input
            type="text"
            value={editing.name}
            onChange={(e) => update('name', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Kim Yapti?</label>
          <select
            value={editing.whoMade}
            onChange={(e) => update('whoMade', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            {WHO_MADE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ne Zaman Yapildi?</label>
          <select
            value={editing.whenMade}
            onChange={(e) => update('whenMade', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            {WHEN_MADE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Kategori ID{' '}
            <span className="text-gray-400 font-normal text-xs">(Etsy taxonomy_id)</span>
          </label>
          <input
            type="number"
            value={editing.taxonomyId}
            onChange={(e) => update('taxonomyId', Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          <p className="text-xs text-gray-400 mt-1">
            Dijital indirme icin genellikle 2078 kullanilir.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Yayinlama Durumu</label>
          <select
            value={editing.state}
            onChange={(e) => update('state', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            <option value="draft">Taslak (draft) — onaylamadan once sakla</option>
            <option value="active">Aktif (active) — aninda yayinla</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Kargo Profil ID{' '}
            <span className="text-gray-400 font-normal text-xs">(opsiyonel)</span>
          </label>
          <input
            type="text"
            value={editing.shippingProfileId}
            onChange={(e) => update('shippingProfileId', e.target.value)}
            placeholder="Etsy kargo profil ID"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Iade Politika ID{' '}
            <span className="text-gray-400 font-normal text-xs">(opsiyonel)</span>
          </label>
          <input
            type="text"
            value={editing.returnPolicyId}
            onChange={(e) => update('returnPolicyId', e.target.value)}
            placeholder="Etsy iade politika ID"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={() => setActiveProfileId(editing.id)}
          disabled={editing.id === activeProfileId}
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-default text-white font-medium text-sm rounded-lg transition-colors"
        >
          {editing.id === activeProfileId ? 'Zaten Aktif' : 'Bu Profili Aktif Yap'}
        </button>
        <button
          onClick={handleDelete}
          disabled={profiles.length === 1}
          className="px-4 py-2 bg-red-50 hover:bg-red-100 disabled:opacity-40 disabled:cursor-default text-red-600 font-medium text-sm rounded-lg border border-red-200 transition-colors"
        >
          Profili Sil
        </button>
      </div>

      {/* Active profile summary */}
      <div className="mt-8 bg-orange-50 border border-orange-200 rounded-lg px-4 py-3">
        <p className="text-sm text-orange-800 font-semibold">Aktif Profil: {activeProfile.name}</p>
        <p className="text-xs text-orange-600 mt-1">
          Durum: {activeProfile.state} &nbsp;|&nbsp; Kategori: {activeProfile.taxonomyId}{' '}
          &nbsp;|&nbsp; Kim yapti: {activeProfile.whoMade} &nbsp;|&nbsp; Ne zaman:{' '}
          {activeProfile.whenMade}
        </p>
      </div>
    </div>
  )
}

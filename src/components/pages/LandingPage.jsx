import { useApp } from '../../context/AppContext'

const icons = {
  excel: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.8}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="14 2 14 8 20 8" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="8" y1="13" x2="16" y2="13" strokeLinecap="round" />
      <line x1="8" y1="17" x2="16" y2="17" strokeLinecap="round" />
    </svg>
  ),
  image: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.8}>
      <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.8}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="2 17 12 22 22 17" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="2 12 12 17 22 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  bookmark: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.8}>
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.8}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  edit: (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.8}>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
}

const FEATURES = [
  {
    icon: 'excel',
    title: 'Excel ile Toplu Yükleme',
    description: 'Ürünlerinizi bir Excel veya CSV dosyasına girin, uygulama hepsini otomatik olarak Etsy\'e listelesin.',
    color: 'text-green-600 bg-green-50',
  },
  {
    icon: 'image',
    title: 'Görsel Yönetimi',
    description: 'Ürün görsellerini sürükle-bırak ile yükleyin. Her ürüne ayrı görsel atayın ya da toplu ekleyin.',
    color: 'text-blue-600 bg-blue-50',
  },
  {
    icon: 'layers',
    title: 'Varyasyon Editörü',
    description: 'Renk, beden gibi varyasyon tiplerini tanımlayın. Kombinasyon matrisi otomatik oluşturulur.',
    color: 'text-purple-600 bg-purple-50',
  },
  {
    icon: 'bookmark',
    title: 'Listeleme Profilleri',
    description: 'Kargo profili, kategori ve yayın durumu gibi ayarları profil olarak kaydedin.',
    color: 'text-orange-600 bg-orange-50',
  },
  {
    icon: 'check',
    title: 'SEO Doğrulama',
    description: 'Başlık uzunluğu, etiket sayısı ve zorunlu alan kontrolü otomatik yapılır.',
    color: 'text-teal-600 bg-teal-50',
  },
  {
    icon: 'edit',
    title: 'Inline Düzenleme',
    description: 'Tabloda herhangi bir alana tıklayarak başlık, fiyat ve stok bilgisini anında düzenleyin.',
    color: 'text-rose-600 bg-rose-50',
  },
]

const STEPS = [
  {
    number: '01',
    title: 'Excel Dosyasını Hazırlayın',
    description: 'Başlık, açıklama, fiyat, etiket ve görsel adını içeren bir Excel dosyası oluşturun ve uygulamaya yükleyin.',
    detail: 'title, description, price, tags, image_name, quantity',
  },
  {
    number: '02',
    title: 'Görselleri ve Varyasyonları Ekleyin',
    description: 'Ürün görsellerini toplu yükleyin, renk/beden gibi varyasyon tiplerini tanımlayın.',
    detail: 'Sürükle-bırak ile toplu görsel yükleme',
  },
  {
    number: '03',
    title: 'Onaylayın ve Yayınlayın',
    description: 'SEO kontrolünden geçen ürünleri onaylayın. Seçili listeleme profiliyle tek tıkla Etsy\'e yükleyin.',
    detail: 'Otomatik SEO doğrulama + API entegrasyonu',
  },
]

const STATS = [
  { value: 'v3', label: 'Etsy Open API' },
  { value: '3', label: 'Adımda Yükleme' },
  { value: '100+', label: 'Toplu Ürün Desteği' },
  { value: '0', label: 'Sunucu Maliyeti' },
]

function AppMockup() {
  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden text-left">
      {/* Window chrome */}
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-3 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-400" />
        <div className="w-3 h-3 rounded-full bg-yellow-400" />
        <div className="w-3 h-3 rounded-full bg-green-400" />
        <div className="flex-1 mx-4">
          <div className="bg-white rounded-md px-3 py-1 text-xs text-gray-400 border border-gray-200">
            lostenadem.netlify.app
          </div>
        </div>
      </div>
      {/* App layout */}
      <div className="flex h-64">
        {/* Sidebar */}
        <div className="w-36 bg-white border-r border-gray-100 p-3 flex flex-col gap-1">
          <div className="px-2 py-1.5 text-xs font-bold text-gray-700 mb-1">Auto-Lister</div>
          {['Urunler', 'Gorseller', 'Varyasyonlar', 'Profiller', 'Ayarlar'].map((item, i) => (
            <div
              key={item}
              className={`px-2 py-1.5 rounded-md text-xs font-medium ${
                i === 0 ? 'bg-orange-50 text-orange-600' : 'text-gray-500'
              }`}
            >
              {item}
            </div>
          ))}
        </div>
        {/* Content */}
        <div className="flex-1 p-4 overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs font-bold text-gray-700">Urunler</div>
            <div className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-md">4 Urunu Yukle</div>
          </div>
          {/* Table header */}
          <div className="grid grid-cols-4 gap-2 text-xs text-gray-400 uppercase font-medium border-b border-gray-100 pb-1 mb-1">
            <div>Gorsel</div>
            <div className="col-span-2">Baslik</div>
            <div>Fiyat</div>
          </div>
          {/* Table rows */}
          {[
            { img: 'bg-rose-200', title: 'Wedding Invitation...', price: '$5.99', approved: true },
            { img: 'bg-blue-200', title: 'Birthday Card PNG...', price: '$3.49', approved: true },
            { img: 'bg-green-200', title: 'Boho Baby Shower...', price: '$4.99', approved: false },
            { img: 'bg-yellow-200', title: 'Modern Resume...', price: '$8.99', approved: false },
          ].map((row, i) => (
            <div key={i} className={`grid grid-cols-4 gap-2 items-center py-1.5 text-xs border-b border-gray-50 ${row.approved ? 'bg-green-50' : ''}`}>
              <div className={`w-7 h-7 rounded-md ${row.img}`} />
              <div className="col-span-2 text-gray-600 truncate">{row.title}</div>
              <div className="text-gray-700 font-medium">{row.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function LandingPage() {
  const { setActivePage } = useApp()

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-8 py-20">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-400 opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

        <div className="relative max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left */}
            <div className="flex-1 text-center lg:text-left">
              <span className="inline-block bg-orange-500 bg-opacity-20 text-orange-400 text-xs font-semibold px-3 py-1 rounded-full mb-6 border border-orange-500 border-opacity-30">
                Etsy Open API v3 Entegrasyonu
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
                Etsy Mağazanızı<br />
                <span className="text-orange-400">Otomatikleştirin</span>
              </h1>
              <p className="text-lg text-gray-400 mb-8 max-w-lg leading-relaxed">
                Excel dosyanızdan yüzlerce ürünü tek seferde Etsy'e listeleyin.
                Görsel yönetimi, varyasyon editörü ve SEO doğrulama dahil.
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <button
                  onClick={() => setActivePage('products')}
                  className="bg-orange-500 hover:bg-orange-400 text-white font-semibold px-7 py-3 rounded-xl transition-colors shadow-lg shadow-orange-500/25"
                >
                  Hemen Dene
                </button>
                <button
                  onClick={() => setActivePage('privacy')}
                  className="text-gray-400 hover:text-white font-medium px-5 py-3 rounded-xl border border-gray-700 hover:border-gray-500 transition-colors"
                >
                  Gizlilik Politikası
                </button>
              </div>
            </div>
            {/* Right — App mockup */}
            <div className="flex-1 w-full">
              <AppMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-gray-900 mb-1">{s.value}</div>
              <div className="text-sm text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="ozellikler" className="px-4 md:px-8 py-14 md:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Her Şey Tek Araçta</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Etsy mağazanızı büyütmek için ihtiyacınız olan tüm özellikler,
              sade ve hızlı bir arayüzde.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${f.color}`}>
                  {icons[f.icon]}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="nasil-calisir" className="px-4 md:px-8 py-14 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Nasıl Çalışır?</h2>
            <p className="text-gray-500">3 adımda Etsy'e toplu yükleme.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((step, i) => (
              <div key={step.number} className="relative">
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-full w-full h-px bg-gray-200 -translate-x-4 z-0" />
                )}
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white font-bold text-sm flex items-center justify-center mb-4 shadow-lg shadow-orange-500/25">
                    {step.number}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-3">{step.description}</p>
                  <span className="inline-block text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-md border border-orange-100">
                    {step.detail}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 md:px-8 py-14 md:py-20 bg-gradient-to-br from-orange-500 to-orange-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Etsy Mağazanızı Büyütmeye Başlayın
          </h2>
          <p className="text-orange-100 mb-8 text-lg">
            Demo modunda API anahtarı gerekmez. Hemen deneyin.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setActivePage('products')}
              className="bg-white hover:bg-orange-50 text-orange-600 font-semibold px-8 py-3 rounded-xl transition-colors shadow-lg"
            >
              Uygulamayı Aç
            </button>
            <button
              onClick={() => setActivePage('settings')}
              className="text-white border border-white border-opacity-40 hover:border-opacity-70 font-medium px-6 py-3 rounded-xl transition-colors"
            >
              API Bağla
            </button>
          </div>
        </div>
      </section>

      {/* API Notice */}
      <section className="px-8 py-8 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs text-gray-400">
            Bu uygulama <strong className="text-gray-600">Etsy Open API v3</strong> kullanmaktadır.
            Etsy, Inc. ile bağlantılı değildir. API kullanımı Etsy'nin{' '}
            <a
              href="https://www.etsy.com/developers/documentation/getting_started/api_basics"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-gray-600"
            >
              geliştirici koşullarına
            </a>{' '}
            tabidir.
          </p>
        </div>
      </section>
    </div>
  )
}

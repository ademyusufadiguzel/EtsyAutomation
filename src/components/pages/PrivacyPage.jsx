const SECTIONS = [
  {
    title: '1. Toplanan Veriler',
    content: `Bu uygulama aşağıdaki verileri yalnızca sizin cihazınızda işler:

- Etsy API anahtarı ve Shop ID (tarayıcı localStorage'ında saklanır)
- Access Token (yalnızca oturum süresince bellekte tutulur, diske yazılmaz)
- Excel/CSV dosyalarından yüklenen ürün verileri (başlık, fiyat, açıklama, etiketler)
- Yüklediğiniz ürün görselleri (yalnızca tarayıcı belleğinde tutulur)
- Listeleme profil ayarları (tarayıcı localStorage'ında saklanır)

Hiçbir veri uygulama sunucusuna gönderilmez. Tüm işlemler doğrudan sizin tarayıcınız ile Etsy API arasında gerçekleşir.`,
  },
  {
    title: '2. Verilerin Kullanımı',
    content: `Toplanan veriler yalnızca şu amaçla kullanılır:

- Etsy mağazanıza ürün listesi oluşturmak
- Ürün görsellerini Etsy listeleme API'sine yüklemek
- Uygulama ayarlarınızı ve profillerinizi oturumlar arasında saklamak

Verileriniz üçüncü taraflarla paylaşılmaz, satılmaz veya pazarlama amacıyla kullanılmaz.`,
  },
  {
    title: '3. Etsy API Kullanımı',
    content: `Bu uygulama Etsy Open API v3 ile entegre çalışmaktadır. API aracılığıyla gerçekleştirilen işlemler Etsy'nin kendi gizlilik politikasına tabidir. Etsy gizlilik politikasına etsy.com/legal/privacy adresinden ulaşabilirsiniz.

Uygulama yalnızca aşağıdaki işlemler için Etsy API'sine erişim talep eder:
- Ürün listeleme oluşturma (listings:write)
- Ürün görseli yükleme (listings:write)`,
  },
  {
    title: '4. Veri Güvenliği',
    content: `Güvenliğinizi korumak için alınan önlemler:

- Access Token tarayıcı localStorage'ına kaydedilmez; yalnızca sayfa açık olduğu sürece bellekte tutulur.
- API anahtarı ve Shop ID yalnızca sizin cihazınızda saklanır.
- Uygulama HTTPS üzerinden sunulmaktadır.
- Hiçbir arka uç sunucusu veya veritabanı kullanılmamaktadır.`,
  },
  {
    title: '5. Çerezler ve localStorage',
    content: `Uygulama çerez (cookie) kullanmamaktadır. Tarayıcı localStorage aşağıdaki anahtarlar için kullanılır:

- etsy_settings: API anahtarı ve Shop ID
- etsy_profiles: Listeleme profil ayarları
- etsy_active_profile_id: Aktif profil seçimi

Bu verileri tarayıcınızın geliştirici araçlarından istediğiniz zaman silebilirsiniz.`,
  },
  {
    title: '6. Veri Saklama Süresi',
    content: `localStorage'daki veriler siz silene kadar veya tarayıcı verilerini temizleyene kadar saklanır. Access token oturum sonunda otomatik olarak silinir. Uygulama, verilerinizi harici bir sunucuda saklamaz.`,
  },
  {
    title: '7. Haklarınız',
    content: `Verileriniz yalnızca kendi cihazınızda bulunduğu için dilediğiniz zaman:

- Tarayıcı ayarlarından localStorage verilerini silebilirsiniz.
- API anahtarınızı Etsy Developer Portal üzerinden iptal edebilirsiniz.
- Uygulamayı kullanmayı durdurabilirsiniz.`,
  },
  {
    title: '8. İletişim',
    content: `Gizlilik politikamız hakkında sorularınız için lostenadem.netlify.app adresindeki uygulama üzerinden iletişime geçebilirsiniz.`,
  },
]

export function PrivacyPage() {
  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Gizlilik Politikası</h2>
        <p className="text-sm text-gray-400">Son güncelleme: Nisan 2026</p>
        <p className="text-sm text-gray-500 mt-3 leading-relaxed">
          Bu gizlilik politikası, Etsy Auto-Lister Pro uygulamasının kişisel verilerinizi nasıl
          işlediğini açıklamaktadır. Uygulamayı kullanarak bu politikayı kabul etmiş sayılırsınız.
        </p>
      </div>

      <div className="space-y-8">
        {SECTIONS.map((section) => (
          <div key={section.title}>
            <h3 className="font-semibold text-gray-800 mb-2">{section.title}</h3>
            <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
              {section.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

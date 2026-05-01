import { useEffect, useRef } from 'react'
import { useApp } from '../../context/AppContext'
import './LandingPage.css'

const FEATURES = [
  { num: '01', title: 'Toplu Listeleme', desc: 'Excel veya CSV dosyanızdan yüzlerce ürünü tek tıkla Etsy\'e yükleyin. Başlık, fiyat, etiket, açıklama — hepsi otomatik.' },
  { num: '02', title: 'Görsel Yönetimi', desc: 'Ürün görsellerini sürükle-bırak ile toplu yükleyin. Dosya adına göre otomatik eşleştirme, satır bazlı önizleme.' },
  { num: '03', title: 'Varyasyon Editörü', desc: 'Renk, beden gibi varyasyon tiplerini tanımlayın. Kombinasyon matrisi otomatik oluşur; her kombinasyona fiyat ve stok belirleyin.' },
  { num: '04', title: 'Listeleme Profilleri', desc: 'Kargo profili, kategori ve yayın durumu gibi ayarları profil olarak kaydedin. Her yayınlamada tek tıkla uygulayın.' },
  { num: '05', title: 'SEO Doğrulama', desc: 'Başlık uzunluğu, etiket sayısı ve zorunlu alan kontrolü otomatik yapılır. Hatalı ürünler onaylanmadan yüklenmez.' },
  { num: '06', title: 'Inline Düzenleme', desc: 'Tablo üzerinde başlık, fiyat ve stoka tıklayarak anında düzenleme yapın. Kaydetmek için Enter — iptal için Escape.' },
]

const STEPS = [
  { num: '01', title: 'Excel Hazırlayın', desc: 'Başlık, açıklama, fiyat, etiket ve görsel adını içeren bir Excel dosyası oluşturun. Şablonu indirip doldurun.' },
  { num: '02', title: 'Görselleri Yükleyin', desc: 'Ürün görsellerinizi toplu sürükle-bırak ile ekleyin. Dosya adı, Excel\'deki image_name sütunuyla otomatik eşleşir.' },
  { num: '03', title: 'Onaylayın ve Yayınlayın', desc: 'SEO kontrolünden geçen ürünleri işaretleyin. Seçili listeleme profiliyle Etsy\'e tek tıkla yükleyin.' },
]

const TESTIMONIALS = [
  {
    text: '"Daha önce her ürünü tek tek giriyordum, saatler alıyordu. Artık 200 ürünü birkaç dakikada yüklüyorum. Bu araç olmadan nasıl çalıştığımı düşünemiyorum."',
    author: 'Elif K.',
    role: 'El yapımı takı · İstanbul',
  },
  {
    text: '"Varyasyon editörü inanılmaz. 5 renk × 4 beden = 20 kombinasyon, her birine ayrı fiyat. Eskiden bu işi spreadsheet\'te yapıyordum."',
    author: 'Ahmet D.',
    role: 'Tekstil ürünleri · Bursa',
  },
  {
    text: '"SEO doğrulama özelliği sayesinde hatalı ürün yüklemem kalmadı. Dashboard\'dan mağazamın durumunu anlık takip edebiliyorum."',
    author: 'Selin M.',
    role: 'Dijital tasarım · Ankara',
  },
]

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  )
}

export function LandingPage() {
  const { user, setActivePage } = useApp()
  const bodyRef = useRef(null)

  useEffect(() => {
    // Hero animation fallback
    const t = setTimeout(() => {
      document.querySelectorAll('.lp-hero-eyebrow, .lp-hero-title, .lp-hero-sub, .lp-hero-actions, .lp-hero-stats')
        .forEach((el) => { el.style.opacity = '1'; el.style.transform = 'none' })
    }, 1800)

    // Reveal on scroll
    const els = document.querySelectorAll('.lp-reveal')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) setTimeout(() => e.target.classList.add('lp-visible'), i * 80)
      })
    }, { threshold: 0.1 })
    els.forEach((el) => observer.observe(el))

    return () => { clearTimeout(t); observer.disconnect() }
  }, [])

  return (
    <div className="lp-body" ref={bodyRef}>

      {/* HERO */}
      <div id="home" style={{ position: 'relative' }}>
        <div className="lp-hero-bg" />
        <div className="lp-hero">
          <div className="lp-hero-content">
            <p className="lp-hero-eyebrow">Etsy Satıcıları İçin</p>
            <h1 className="lp-hero-title">
              Mağazanı <em>büyüt,</em><br />zamanını geri kazan
            </h1>
            <p className="lp-hero-sub">
              Excel dosyanızdan yüzlerce ürünü tek seferde Etsy'e listeleyin.
              Görsel yönetimi, varyasyon editörü ve SEO doğrulama tek araçta.
            </p>
            <div className="lp-hero-actions">
              <button className="lp-btn-primary" onClick={() => setActivePage(user ? 'dashboard' : 'products')}>
                {user ? 'Dashboard\'a Git' : 'Ücretsiz Dene'}
              </button>
              <a className="lp-btn-ghost" href="#ozellikler">Özellikleri Gör</a>
            </div>
          </div>
          <div className="lp-hero-stats">
            <div className="lp-stat">
              <div className="lp-stat-num">Etsy v3</div>
              <div className="lp-stat-label">Open API</div>
            </div>
            <div className="lp-stat">
              <div className="lp-stat-num">3</div>
              <div className="lp-stat-label">Adımda Yükleme</div>
            </div>
            <div className="lp-stat">
              <div className="lp-stat-num">100+</div>
              <div className="lp-stat-label">Toplu Ürün</div>
            </div>
            <div className="lp-stat">
              <div className="lp-stat-num">%0</div>
              <div className="lp-stat-label">Sunucu Maliyeti</div>
            </div>
          </div>
          <div className="lp-hero-divider" />
        </div>
      </div>

      {/* FEATURES */}
      <section id="ozellikler" className="lp-section">
        <div className="lp-features-header lp-reveal">
          <div>
            <p className="lp-section-label">Neler Sunuyoruz</p>
            <h2 className="lp-section-title">Ciddi satıcılar için<br />ciddi araçlar</h2>
          </div>
          <p className="lp-features-intro">
            Etsy Auto-Lister Pro'daki her özellik tek bir soruyu yanıtlamak için tasarlandı:
            başarılı bir Etsy satıcısının gerçekten neye ihtiyacı var?
          </p>
        </div>
        <div className="lp-features-grid">
          {FEATURES.map((f) => (
            <div className="lp-feature-card lp-reveal" key={f.num}>
              <div className="lp-feature-num">{f.num}</div>
              <h3 className="lp-feature-title">{f.title}</h3>
              <p className="lp-feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="nasil-calisir" className="lp-section">
        <div className="lp-reveal" style={{ textAlign: 'center', marginBottom: 72 }}>
          <p className="lp-section-label">Nasıl Çalışır</p>
          <h2 className="lp-section-title">3 adımda Etsy'e yükleme</h2>
        </div>
        <div className="lp-steps">
          {STEPS.map((s) => (
            <div className="lp-step-card lp-reveal" key={s.num}>
              <div className="lp-step-num">{s.num}</div>
              <h3 className="lp-step-title">{s.title}</h3>
              <p className="lp-step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="lp-section">
        <div className="lp-about">
          <div className="lp-about-visual lp-reveal">
            <div className="lp-about-box lp-about-box-1" />
            <div className="lp-about-box lp-about-box-2">
              <p className="lp-about-quote">"200 ürünü artık dakikalar içinde yükleyebiliyorum."</p>
              <p className="lp-about-quote-attr">— Elif K., El Yapımı Takı Satıcısı</p>
            </div>
          </div>
          <div className="lp-about-text lp-reveal">
            <p className="lp-section-label">Hakkımızda</p>
            <h2 className="lp-section-title">Satıcılar tarafından,<br />satıcılar için</h2>
            <p className="lp-section-sub">
              Etsy Auto-Lister Pro'yu Etsy satıcılarının gerçek sorunlarını çözmek için geliştirdik.
              Tahmin, hesap tabloları ve işe yaramaz araçlardan bıktık.
            </p>
            <ul className="lp-about-list">
              <li>
                <span className="lp-about-list-num">01</span>
                <span className="lp-about-list-text">Etsy Open API v3 entegrasyonu ile güvenli ve doğrudan bağlantı.</span>
              </li>
              <li>
                <span className="lp-about-list-num">02</span>
                <span className="lp-about-list-text">Veri analistiymişsiniz gibi değil, yaratıcı bir ortak gibi hissettirir.</span>
              </li>
              <li>
                <span className="lp-about-list-num">03</span>
                <span className="lp-about-list-text">Hızlı geliştirilen, dinleyen ve güncellenen bir ekip tarafından desteklenir.</span>
              </li>
            </ul>
            <button className="lp-btn-primary" onClick={() => setActivePage(user ? 'dashboard' : 'products')}>
              {user ? 'Uygulamaya Git' : 'Hemen Başla'}
            </button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <div className="lp-testimonials-wrap">
        <div className="lp-testimonials-inner">
          <div className="lp-testimonials-header lp-reveal">
            <p className="lp-section-label">Kullanıcı Yorumları</p>
            <h2 className="lp-section-title">Satıcılar seviyor</h2>
          </div>
          <div className="lp-testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <div className="lp-testimonial-card lp-reveal" key={i}>
                <div className="lp-testimonial-stars">
                  {[...Array(5)].map((_, j) => <StarIcon key={j} />)}
                </div>
                <p className="lp-testimonial-text">{t.text}</p>
                <p className="lp-testimonial-author">{t.author}</p>
                <p className="lp-testimonial-role">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA BAND */}
      <div className="lp-cta-band">
        <h2 className="lp-cta-title lp-reveal">Mağazanızı büyütmeye<br />hazır mısınız?</h2>
        <p className="lp-cta-sub lp-reveal">API anahtarı olmadan demo modunda hemen başlayın.</p>
        <div className="lp-cta-actions lp-reveal">
          <button className="lp-btn-primary" onClick={() => setActivePage(user ? 'dashboard' : 'products')}>
            {user ? 'Dashboard\'a Git' : 'Ücretsiz Dene'}
          </button>
          <a className="lp-btn-ghost" href="#ozellikler">Tüm Özellikleri Gör</a>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="lp-footer">
        <div className="lp-footer-inner">
          <div className="lp-footer-brand">
            <span className="lp-footer-logo">Etsy Auto-Lister Pro</span>
            <p>Etsy mağazasını ciddiye alan satıcılar için araçlar.</p>
          </div>
          <div>
            <p className="lp-footer-col-title">Ürün</p>
            <ul className="lp-footer-links">
              <li><a href="#ozellikler">Özellikler</a></li>
              <li><a href="#nasil-calisir">Nasıl Çalışır</a></li>
              <li><button style={{all:'unset',cursor:'pointer',fontSize:15,fontWeight:300,color:'var(--cream-faint)'}} onClick={() => setActivePage(user ? 'dashboard' : 'products')}>Uygulamayı Aç</button></li>
            </ul>
          </div>
          <div>
            <p className="lp-footer-col-title">Yasal</p>
            <ul className="lp-footer-links">
              <li><button style={{all:'unset',cursor:'pointer',fontSize:15,fontWeight:300,color:'var(--cream-faint)'}} onClick={() => setActivePage('privacy')}>Gizlilik Politikası</button></li>
              <li><a href="https://www.etsy.com/developers" target="_blank" rel="noreferrer">Etsy Developer</a></li>
            </ul>
          </div>
          <div>
            <p className="lp-footer-col-title">Hesap</p>
            <ul className="lp-footer-links">
              {user ? (
                <li><button style={{all:'unset',cursor:'pointer',fontSize:15,fontWeight:300,color:'var(--cream-faint)'}} onClick={() => setActivePage('dashboard')}>Dashboard</button></li>
              ) : (
                <li><button style={{all:'unset',cursor:'pointer',fontSize:15,fontWeight:300,color:'var(--cream-faint)'}} onClick={() => setActivePage('products')}>Giriş Yap</button></li>
              )}
            </ul>
          </div>
        </div>
        <div className="lp-footer-bottom">
          <p className="lp-footer-copy">© {new Date().getFullYear()} Etsy Auto-Lister Pro. Tüm hakları saklıdır.</p>
          <p className="lp-footer-copy">Etsy, Inc. ile bağlantılı değildir.</p>
        </div>
      </footer>
    </div>
  )
}

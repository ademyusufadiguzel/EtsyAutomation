import { useState, useEffect } from 'react'
import { useApp } from '../../context/AppContext'

export function LandingNavbar() {
  const { user, setActivePage } = useApp()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  const navStyle = {
    position: 'fixed',
    top: 0, left: 0, right: 0,
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scrolled ? '16px 60px' : '28px 60px',
    transition: 'all 0.4s',
    background: scrolled ? 'rgba(17,3,8,0.88)' : 'transparent',
    backdropFilter: scrolled ? 'blur(16px)' : 'none',
    borderBottom: scrolled ? '1px solid rgba(180,80,80,0.15)' : 'none',
  }

  const logoStyle = {
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: 'italic',
    fontWeight: 400,
    fontSize: 24,
    color: '#e8d5c4',
    letterSpacing: '0.02em',
    textDecoration: 'none',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  }

  const linkStyle = {
    fontFamily: "'Cinzel', serif",
    fontSize: 11,
    fontWeight: 400,
    letterSpacing: '0.18em',
    color: '#c4a898',
    textDecoration: 'none',
    textTransform: 'uppercase',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'color 0.2s',
  }

  const ctaStyle = {
    fontFamily: "'Cinzel', serif",
    fontSize: 11,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#110308',
    background: '#e8d5c4',
    border: 'none',
    padding: '10px 24px',
    cursor: 'pointer',
    transition: 'background 0.2s',
  }

  return (
    <>
      <nav style={navStyle}>
        <button style={logoStyle} onClick={() => { setActivePage('landing'); setOpen(false) }}>
          Etsy Auto-Lister Pro
        </button>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 40 }} className="hidden-mobile">
          <button style={linkStyle} onClick={() => scrollTo('ozellikler')}>Özellikler</button>
          <button style={linkStyle} onClick={() => scrollTo('nasil-calisir')}>Nasıl Çalışır</button>
          <button style={linkStyle} onClick={() => setActivePage('privacy')}>Gizlilik</button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }} className="hidden-mobile">
          <button
            style={ctaStyle}
            onClick={() => setActivePage(user ? 'dashboard' : 'products')}
            onMouseEnter={(e) => e.target.style.background = '#c9a96e'}
            onMouseLeave={(e) => e.target.style.background = '#e8d5c4'}
          >
            {user ? 'Dashboard' : 'Giriş Yap'}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          style={{ ...linkStyle, padding: 4, display: 'none' }}
          className="show-mobile"
        >
          {open ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div style={{
          position: 'fixed', top: 60, left: 0, right: 0, zIndex: 99,
          background: 'rgba(17,3,8,0.97)', borderBottom: '1px solid rgba(180,80,80,0.15)',
          padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 4,
        }}>
          <button style={{ ...linkStyle, textAlign: 'left', padding: '10px 0' }} onClick={() => scrollTo('ozellikler')}>Özellikler</button>
          <button style={{ ...linkStyle, textAlign: 'left', padding: '10px 0' }} onClick={() => scrollTo('nasil-calisir')}>Nasıl Çalışır</button>
          <button style={{ ...linkStyle, textAlign: 'left', padding: '10px 0' }} onClick={() => { setActivePage('privacy'); setOpen(false) }}>Gizlilik</button>
          <div style={{ paddingTop: 12, borderTop: '1px solid rgba(180,80,80,0.15)', marginTop: 8 }}>
            <button style={ctaStyle} onClick={() => { setActivePage(user ? 'dashboard' : 'products'); setOpen(false) }}>
              {user ? 'Dashboard' : 'Giriş Yap'}
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  )
}

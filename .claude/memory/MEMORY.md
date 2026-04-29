# EtsyAutomation Project Memory

## Project
- Path: /Users/ademyusufadiguzel/Desktop/EtsyAutomation
- Stack: React + Vite + Tailwind CSS + xlsx + @supabase/supabase-js
- GitHub: https://github.com/ademyusufadiguzel/EtsyAutomation (main branch)
- Live site: https://lostenadem.netlify.app/ (Netlify) — Vercel'e de deploy edildi

## Architecture
- Global state via AppContext (src/context/AppContext.jsx) — wraps useInventory + useImages + useVariations + useProfiles + useAuth
- Navigation: activePage string state + window.history.pushState (no router)
- Pages: landing, dashboard, products, images, variations, profiles, settings, privacy
- App.jsx: AppProvider -> MainLayout
- MainLayout: LandingNavbar (public pages) veya AppNavbar (giris sonrasi) + page + footer
- Sidebar yok — kaldirıldı

## Auth (Supabase)
- src/lib/supabase.js — createClient singleton
- src/hooks/useAuth.js — getSession, onAuthStateChange, signIn, signUp, signInWithGoogle, signOut
- Login sonrasi dashboard'a yonlendirme
- PUBLIC_PAGES: landing, privacy — diger sayfalar login gerektirir
- Supabase proje: yicrjdzraajthizhpmuh.supabase.co

## Key Files
- src/context/AppContext.jsx — global state, history routing, localStorage (apiKey+shopId), auth
- src/hooks/useInventory.js — Excel parsing, updateProduct (fn or object)
- src/hooks/useImages.js — useRef(Map) image store, version counter
- src/hooks/useVariations.js — variation type/option/combination helpers
- src/hooks/useProfiles.js — localStorage'a kaydedilen listeleme profilleri
- src/utils/variationUtils.js — generateCombinations, comboLabel
- src/components/layout/LandingNavbar.jsx — anchor linkli marketing navbar
- src/components/layout/AppNavbar.jsx — giris sonrasi sayfa navbar
- src/components/layout/MainLayout.jsx — layout + login guard
- src/components/pages/DashboardPage.jsx — magaza ozeti, siparisler, listeler (demo+API)
- src/components/dashboard/* — StatsCards, RecentOrders, TopListings, ActiveListings
- src/components/pages/LoginPage.jsx — email/sifre + Google OAuth, tab: giris/kayit
- src/components/pages/LandingPage.jsx — marketing sayfasi (id: ozellikler, nasil-calisir)
- src/components/pages/* — ProductsPage, ImagesPage, VariationsPage, ProfilesPage, SettingsPage, PrivacyPage
- src/components/products/ProductRow.jsx — inline edit via InlineEditCell
- src/components/images/RowImageUpload.jsx + BulkImageDropZone.jsx
- src/components/variations/VariationEditor.jsx + VariationTypeRow.jsx + VariationMatrix.jsx + VariationBadge.jsx
- src/services/etsyApi.js — createListing, publishProducts, getShop, getActiveListings, getReceipts, getTransactions

## Product Shape
{ id, title, description, price, tags[], image_name, quantity, approved, variations[], variationCombinations{} }
- variations: [{ id, name, options: [{ id, label }] }]
- variationCombinations: { [sortedOptionIds.join('_')]: { price: null|number, quantity: null|number } }

## Profile Shape
{ id, name, whoMade, whenMade, taxonomyId, state, shippingProfileId, returnPolicyId }
- localStorage: etsy_profiles, etsy_active_profile_id

## Settings (localStorage: etsy_settings)
- apiKey, shopId kalici; accessToken sadece session'da (localStorage'a yazilmaz)
- Runtime settings etsyApi.js'e gecilir, .env VITE_ETSY_* vars'i override eder

## User Preferences
- Emoji yok
- Turkce UI
- Plan modu kullanma — degisiklikleri direkt yaz, onay bekleme
- Her degisiklikten sonra: git add -A && git commit -m "..." && git push

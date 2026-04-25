import { useState, useCallback, useEffect } from 'react'

const DEFAULT_PROFILE = {
  id: 'default',
  name: 'Varsayilan Profil',
  whoMade: 'i_did',
  whenMade: 'made_to_order',
  taxonomyId: 2078,
  state: 'draft',
  shippingProfileId: '',
  returnPolicyId: '',
}

const LS_PROFILES = 'etsy_profiles'
const LS_ACTIVE = 'etsy_active_profile_id'

function loadFromStorage() {
  try {
    const profiles = JSON.parse(localStorage.getItem(LS_PROFILES))
    const activeProfileId = localStorage.getItem(LS_ACTIVE)
    return {
      profiles: Array.isArray(profiles) && profiles.length > 0 ? profiles : [DEFAULT_PROFILE],
      activeProfileId: activeProfileId ?? 'default',
    }
  } catch {
    return { profiles: [DEFAULT_PROFILE], activeProfileId: 'default' }
  }
}

export function useProfiles() {
  const [profiles, setProfiles] = useState(() => loadFromStorage().profiles)
  const [activeProfileId, setActiveProfileId] = useState(() => loadFromStorage().activeProfileId)

  useEffect(() => {
    localStorage.setItem(LS_PROFILES, JSON.stringify(profiles))
  }, [profiles])

  useEffect(() => {
    localStorage.setItem(LS_ACTIVE, activeProfileId)
  }, [activeProfileId])

  const activeProfile = profiles.find((p) => p.id === activeProfileId) ?? profiles[0]

  const addProfile = useCallback(() => {
    const newProfile = { ...DEFAULT_PROFILE, id: crypto.randomUUID(), name: 'Yeni Profil' }
    setProfiles((prev) => [...prev, newProfile])
    return newProfile.id
  }, [])

  const updateProfile = useCallback((id, field, value) => {
    setProfiles((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)))
  }, [])

  const deleteProfile = useCallback((id) => {
    setProfiles((prev) => {
      const next = prev.filter((p) => p.id !== id)
      return next.length > 0 ? next : [DEFAULT_PROFILE]
    })
    setActiveProfileId((prev) => (prev === id ? 'default' : prev))
  }, [])

  return {
    profiles,
    activeProfileId,
    activeProfile,
    setActiveProfileId,
    addProfile,
    updateProfile,
    deleteProfile,
  }
}

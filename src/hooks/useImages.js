import { useRef, useState, useCallback } from 'react'

export function useImages() {
  const mapRef = useRef(new Map())
  const [imageVersion, setImageVersion] = useState(0)

  const addImages = useCallback((fileList) => {
    Array.from(fileList).forEach((file) => {
      const key = file.name.toLowerCase()
      const existing = mapRef.current.get(key)
      if (existing) URL.revokeObjectURL(existing.objectURL)
      mapRef.current.set(key, { file, objectURL: URL.createObjectURL(file) })
    })
    setImageVersion((v) => v + 1)
  }, [])

  const getImage = useCallback((imageName) => {
    if (!imageName) return null
    return mapRef.current.get(imageName.toLowerCase()) ?? null
  }, [])

  const removeImage = useCallback((imageName) => {
    const key = imageName.toLowerCase()
    const entry = mapRef.current.get(key)
    if (entry) {
      URL.revokeObjectURL(entry.objectURL)
      mapRef.current.delete(key)
      setImageVersion((v) => v + 1)
    }
  }, [])

  const allImages = useCallback(() => {
    return Array.from(mapRef.current.entries()).map(([name, entry]) => ({ name, ...entry }))
  }, [])

  return { addImages, getImage, removeImage, allImages, imageVersion }
}

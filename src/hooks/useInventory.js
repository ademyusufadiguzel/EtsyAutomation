import { useState, useCallback } from 'react'
import * as XLSX from 'xlsx'

const REQUIRED_COLUMNS = ['title', 'description', 'price', 'tags', 'image_name', 'quantity']

export function useInventory() {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)
  const [fileName, setFileName] = useState(null)

  const loadFile = useCallback((file) => {
    setError(null)

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const workbook = XLSX.read(e.target.result, { type: 'array' })
        const sheet = workbook.Sheets[workbook.SheetNames[0]]
        const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' })

        if (rows.length === 0) {
          setError('Excel dosyasi bos.')
          return
        }

        const missing = REQUIRED_COLUMNS.filter((col) => !(col in rows[0]))
        if (missing.length > 0) {
          setError(`Eksik sutunlar: ${missing.join(', ')}`)
          return
        }

        const parsed = rows.map((row, index) => ({
          id: index,
          title: String(row.title ?? '').trim(),
          description: String(row.description ?? '').trim(),
          price: Number(row.price) || 0,
          tags: String(row.tags ?? '')
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
          image_name: String(row.image_name ?? '').trim(),
          quantity: Number(row.quantity) || 0,
          approved: false,
          variations: [],
          variationCombinations: {},
        }))

        setProducts(parsed)
        setFileName(file.name)
      } catch {
        setError('Dosya okunamiyor. Gecerli bir .xlsx veya .csv dosyasi yukleyin.')
      }
    }
    reader.readAsArrayBuffer(file)
  }, [])

  const toggleApprove = useCallback((id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, approved: !p.approved } : p))
    )
  }, [])

  const approveAll = useCallback((value) => {
    setProducts((prev) => prev.map((p) => ({ ...p, approved: value })))
  }, [])

  const updateProduct = useCallback((id, updater) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p
        return typeof updater === 'function' ? updater(p) : { ...p, ...updater }
      })
    )
  }, [])

  return { products, setProducts, error, fileName, loadFile, toggleApprove, approveAll, updateProduct }
}

import { useCallback } from 'react'
import { generateCombinations } from '../utils/variationUtils'

export function useVariations(updateProduct) {
  const addVariationType = useCallback(
    (productId, name) => {
      updateProduct(productId, (p) => {
        const newType = { id: crypto.randomUUID(), name, options: [] }
        const variations = [...p.variations, newType]
        return { ...p, variations, variationCombinations: generateCombinations(variations, p.variationCombinations) }
      })
    },
    [updateProduct]
  )

  const removeVariationType = useCallback(
    (productId, typeId) => {
      updateProduct(productId, (p) => {
        const variations = p.variations.filter((t) => t.id !== typeId)
        return { ...p, variations, variationCombinations: generateCombinations(variations, p.variationCombinations) }
      })
    },
    [updateProduct]
  )

  const addOption = useCallback(
    (productId, typeId, label) => {
      updateProduct(productId, (p) => {
        const variations = p.variations.map((t) =>
          t.id === typeId
            ? { ...t, options: [...t.options, { id: crypto.randomUUID(), label }] }
            : t
        )
        return { ...p, variations, variationCombinations: generateCombinations(variations, p.variationCombinations) }
      })
    },
    [updateProduct]
  )

  const removeOption = useCallback(
    (productId, typeId, optionId) => {
      updateProduct(productId, (p) => {
        const variations = p.variations.map((t) =>
          t.id === typeId
            ? { ...t, options: t.options.filter((o) => o.id !== optionId) }
            : t
        )
        return { ...p, variations, variationCombinations: generateCombinations(variations, p.variationCombinations) }
      })
    },
    [updateProduct]
  )

  const updateCombination = useCallback(
    (productId, comboKey, field, value) => {
      updateProduct(productId, (p) => ({
        ...p,
        variationCombinations: {
          ...p.variationCombinations,
          [comboKey]: { ...p.variationCombinations[comboKey], [field]: value },
        },
      }))
    },
    [updateProduct]
  )

  return { addVariationType, removeVariationType, addOption, removeOption, updateCombination }
}

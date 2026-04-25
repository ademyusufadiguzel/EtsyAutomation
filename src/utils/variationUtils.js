// Generate all combinations of options across variation types
export function generateCombinations(variationTypes, existingCombinations = {}) {
  if (variationTypes.length === 0) return {}
  if (variationTypes.some((t) => t.options.length === 0)) return {}

  const allOptions = variationTypes.map((t) => t.options)
  const combos = cartesian(allOptions)

  const result = {}
  for (const combo of combos) {
    const key = combo
      .map((o) => o.id)
      .sort()
      .join('_')
    result[key] = existingCombinations[key] ?? { price: null, quantity: null }
  }

  return result
}

function cartesian(arrays) {
  return arrays.reduce(
    (acc, opts) => acc.flatMap((combo) => opts.map((opt) => [...combo, opt])),
    [[]]
  )
}

export function comboLabel(variationTypes, comboKey) {
  const optionIds = new Set(comboKey.split('_'))
  const labels = []
  for (const type of variationTypes) {
    for (const option of type.options) {
      if (optionIds.has(option.id)) {
        labels.push(option.label)
        break
      }
    }
  }
  return labels.join(' / ')
}

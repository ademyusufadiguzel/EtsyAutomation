const TITLE_MAX = 140
const TAG_MAX_COUNT = 13
const TAG_MAX_LENGTH = 20

function getDuplicateWords(title) {
  const words = title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(Boolean)
  const seen = new Set()
  const duplicates = new Set()
  for (const word of words) {
    if (seen.has(word)) duplicates.add(word)
    else seen.add(word)
  }
  return [...duplicates]
}

export function validateProduct(product) {
  const errors = []

  // Title checks
  if (!product.title) {
    errors.push('Başlık boş olamaz.')
  } else {
    if (product.title.length > TITLE_MAX) {
      errors.push(`Başlık ${product.title.length} karakter (max ${TITLE_MAX}).`)
    }
    const dups = getDuplicateWords(product.title)
    if (dups.length > 0) {
      errors.push(`Başlıkta tekrarlanan kelimeler: ${dups.join(', ')}.`)
    }
  }

  // Tag checks
  if (!product.tags || product.tags.length === 0) {
    errors.push('En az 1 etiket gerekli.')
  } else {
    if (product.tags.length > TAG_MAX_COUNT) {
      errors.push(`${product.tags.length} etiket var (max ${TAG_MAX_COUNT}).`)
    }
    const longTags = product.tags.filter((t) => t.length > TAG_MAX_LENGTH)
    if (longTags.length > 0) {
      errors.push(`Uzun etiketler: ${longTags.map((t) => `"${t}"`).join(', ')}.`)
    }
  }

  // Price check
  if (!product.price || product.price <= 0) {
    errors.push('Fiyat 0\'dan büyük olmalı.')
  }

  // Image check
  if (!product.image_name) {
    errors.push('Görsel adı boş olamaz.')
  }

  return errors
}

export function validateAll(products) {
  return products.map((p) => ({
    ...p,
    seoErrors: validateProduct(p),
  }))
}

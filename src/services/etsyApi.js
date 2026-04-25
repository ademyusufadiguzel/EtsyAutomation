const BASE_URL = 'https://openapi.etsy.com/v3'

function getCredentials(settings = {}) {
  return {
    apiKey: settings.apiKey || import.meta.env.VITE_ETSY_API_KEY || '',
    accessToken: settings.accessToken || import.meta.env.VITE_ETSY_ACCESS_TOKEN || '',
    shopId: settings.shopId || import.meta.env.VITE_ETSY_SHOP_ID || '',
  }
}

function headers(creds, contentType = 'application/json') {
  return {
    'x-api-key': creds.apiKey,
    Authorization: `Bearer ${creds.accessToken}`,
    'Content-Type': contentType,
  }
}

async function handleResponse(res) {
  if (res.status === 429) throw new Error('Limit Yetersiz: API rate limit asildi.')
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error_description || body.error || `HTTP ${res.status}`)
  }
  return res.json()
}

export async function createListing(product, settings, profile = {}) {
  const creds = getCredentials(settings)
  const body = {
    quantity: product.quantity,
    title: product.title,
    description: product.description,
    price: product.price,
    who_made: profile.whoMade ?? 'i_did',
    when_made: profile.whenMade ?? 'made_to_order',
    taxonomy_id: profile.taxonomyId ?? 2078,
    tags: product.tags,
    state: profile.state ?? 'draft',
    shipping_profile_id: profile.shippingProfileId || null,
    ...(profile.returnPolicyId ? { return_policy_id: profile.returnPolicyId } : {}),
  }

  const res = await fetch(`${BASE_URL}/application/shops/${creds.shopId}/listings`, {
    method: 'POST',
    headers: headers(creds),
    body: JSON.stringify(body),
  })

  return handleResponse(res)
}

export async function uploadListingImage(listingId, imageFile, settings) {
  const creds = getCredentials(settings)
  const formData = new FormData()
  formData.append('image', imageFile)
  formData.append('rank', 1)

  const res = await fetch(
    `${BASE_URL}/application/shops/${creds.shopId}/listings/${listingId}/images`,
    {
      method: 'POST',
      headers: {
        'x-api-key': creds.apiKey,
        Authorization: `Bearer ${creds.accessToken}`,
      },
      body: formData,
    }
  )

  return handleResponse(res)
}

export async function publishProducts(products, onProgress, settings, profile = {}) {
  const results = []

  for (let i = 0; i < products.length; i++) {
    const product = products[i]
    try {
      onProgress({ index: i, total: products.length, status: 'uploading', title: product.title })
      const listing = await createListing(product, settings, profile)
      results.push({ id: product.id, listingId: listing.listing_id, success: true })
    } catch (err) {
      results.push({ id: product.id, success: false, error: err.message })
    }
  }

  return results
}

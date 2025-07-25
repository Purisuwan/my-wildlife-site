/**
 * React hook for loading limited edition Google Sheets data in client components
 */

import { useState, useEffect } from 'react'
import { LimitedEditionProduct, getLimitedEditionProducts } from '@/lib/limited-edition-sheets'

export function useLimitedEditionProducts() {
  const [products, setProducts] = useState<LimitedEditionProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    async function loadProducts() {
      try {
        setLoading(true)
        console.log('🔄 Loading limited edition products via React hook...')
        
        // Set a maximum timeout for the entire operation (like store)
        const timeoutPromise = new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error('Loading timeout - falling back to static data')), 8000)
        })
        
        const productsPromise = getLimitedEditionProducts()
        
        const data = await Promise.race([productsPromise, timeoutPromise])
        
        if (mounted) {
          setProducts(data)
          setError(null)
          console.log('✅ Limited edition products loaded successfully:', data.length)
        }
      } catch (err) {
        console.error('❌ Error loading limited edition products:', err)
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to load limited edition products')
          // Still try to load static data as fallback (like store)
          try {
            const { staticLimitedEditionProducts } = await import('@/lib/limited-edition-sheets')
            setProducts(staticLimitedEditionProducts)
            console.log('🔄 Loaded static fallback limited edition products:', staticLimitedEditionProducts.length)
          } catch (staticErr) {
            console.error('❌ Failed to load static fallback:', staticErr)
          }
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadProducts()

    return () => {
      mounted = false
    }
  }, [])

  return { products, loading, error }
}

export function useLimitedEditionProduct(id: string) {
  const { products, loading, error } = useLimitedEditionProducts()
  const product = products.find(p => p.id === id)
  
  return { product, loading, error }
}

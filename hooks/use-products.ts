/**
 * React hook for loading Google Sheets data in client components
 */

import { useState, useEffect } from 'react'
import { Product } from '@/lib/products'
import { getProducts } from '@/lib/products-dynamic'

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    async function loadProducts() {
      try {
        setLoading(true)
        console.log('🔄 Loading products via React hook...')
        
        // Set a maximum timeout for the entire operation
        const timeoutPromise = new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error('Loading timeout - falling back to static data')), 8000)
        })
        
        const productsPromise = getProducts()
        
        const data = await Promise.race([productsPromise, timeoutPromise])
        
        if (mounted) {
          setProducts(data)
          setError(null)
          console.log('✅ Products loaded successfully:', data.length)
        }
      } catch (err) {
        console.error('❌ Error loading products:', err)
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to load products')
          // Still try to load static data as fallback
          try {
            const { products: staticProducts } = await import('@/lib/products-dynamic')
            setProducts(staticProducts)
            console.log('🔄 Loaded static fallback products:', staticProducts.length)
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

export function useProduct(id: string) {
  const { products, loading, error } = useProducts()
  const product = products.find(p => p.id === id)
  
  return { product, loading, error }
}

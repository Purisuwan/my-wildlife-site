"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/context/cart-context"
import Lightbox from "@/components/lightbox"
import { useProducts } from "@/hooks/use-products"

export default function StorePage() {
  const { dispatch } = useCart()
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortOrder, setSortOrder] = useState("featured")
  const { products, loading, error } = useProducts()

  // Get unique categories from products
  const categories = ["All", ...Array.from(new Set(products.map(p => p.category).filter((cat): cat is string => Boolean(cat))))]

  // Filter products by category
  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(p => p.category === selectedCategory)

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOrder) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "title":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  const lightboxImages = sortedProducts.map((product) => ({
    id: Number.parseInt(product.id),
    src: product.image,
    title: product.name,
    description: product.description,
    category: "Wildlife Print",
    price: `$${product.price}`,
  }))

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  const addToCart = (product: (typeof products)[0]) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      },
    })
  }

  return (
    <>
      <div className="h-20"></div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Book Store
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Museum-quality prints and educational materials that support wildlife conservation
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  selectedCategory === category
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="rounded-none border border-gray-300 bg-white px-3 py-1 text-sm"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="title">Name</option>
            </select>
          </div>
        </div>

        {loading && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white mx-auto mb-4"></div>
            <p className="text-lg">Loading products...</p>
          </div>
        )}
        
        {error && (
          <div className="text-center">
            <p className="text-red-600">Error loading products: {error}</p>
            <p className="text-sm text-muted-foreground mt-2">Using fallback data</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product, index) => (
            <Card key={product.id} className="group overflow-hidden">
              <div className="relative overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={400}
                  className="h-[300px] w-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => openLightbox(index)}
                />
              </div>
              <CardContent className="p-6">
                <Link href={`/store/product/${product.id}`} className="group">
                  <h3 className="text-xl font-semibold group-hover:underline">{product.name}</h3>
                </Link>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-lg font-bold">${product.price}</p>
                  <Button onClick={() => addToCart(product)} className="rounded-none" size="sm">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Lightbox
          images={lightboxImages}
          currentIndex={currentImageIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setCurrentImageIndex}
        />
      </div>
    </>
  )
}

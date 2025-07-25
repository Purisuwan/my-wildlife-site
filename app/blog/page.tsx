"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLimitedEditionProducts } from "@/hooks/use-limited-edition"
import { getLimitedEditionImageUrl } from "@/lib/limited-edition-sheets"
import Lightbox from "@/components/lightbox"

export default function LimitedEditionPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortOrder, setSortOrder] = useState("featured")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { products, loading, error } = useLimitedEditionProducts()

  // Get unique categories from products
  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))]

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
        return a.title.localeCompare(b.title)
      default:
        return 0
    }
  })

  // Create lightbox images array from sorted products
  const lightboxImages = sortedProducts.map((product, index) => ({
    id: Number.parseInt(product.id) || index,
    src: product.imageFilename,
    title: product.title,
    description: product.description,
    category: product.category,
    edition: "Limited Edition"
  }))

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  return (
    <>
      <div className="h-20"></div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Limited Edition Prints
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Exclusive limited edition products, each piece carefully crafted and available in limited quantities.
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
            <p className="text-lg">Loading limited edition products...</p>
          </div>
        )}
        
        {error && (
          <div className="text-center">
            <p className="text-red-600">Error loading limited edition products: {error}</p>
            <p className="text-sm text-muted-foreground mt-2">Using fallback data</p>
          </div>
        )}

        {/* Balanced masonry layout like reference */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {sortedProducts.map((product, index) => (
            <div key={product.id} className="group break-inside-avoid">
              <div className="overflow-hidden bg-gray-100 cursor-pointer relative rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                <img
                  src={product.imageFilename}
                  alt={product.title}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  style={{ 
                    aspectRatio: 'auto',
                    objectFit: 'cover'
                  }}
                  onClick={() => openLightbox(index)}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg"
                  }}
                />
              </div>
              
              <div className="text-center mt-4 space-y-1">
                <Link
                  href={`/blog/print/${product.id}`}
                  className="block text-lg font-bold text-gray-900 hover:text-black transition-colors uppercase tracking-wide"
                >
                  {product.title}
                </Link>
                <p className="text-sm text-gray-600">
                  {product.category}
                </p>
              </div>
            </div>
          ))}
        </div>

        {sortedProducts.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found in this category.</p>
            <Button 
              variant="outline" 
              onClick={() => setSelectedCategory("All")}
              className="mt-4"
            >
              View All Products
            </Button>
          </div>
        )}

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

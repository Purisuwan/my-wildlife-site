"use client"

import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ShoppingCart } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/hooks/use-toast"
import { useProduct } from "@/hooks/use-products"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { dispatch } = useCart()
  const { toast } = useToast()

  const { product, loading, error } = useProduct(params.id as string)

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-2xl font-bold">Loading product ...</h1>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-2xl font-bold text-red-600">Error loading product</h1>
        <p className="mt-2">{error}</p>
        <Button onClick={() => router.push("/store")} className="mt-4">
          Back to Store
        </Button>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Button onClick={() => router.push("/store")} className="mt-4">
          Back to Store
        </Button>
      </div>
    )
  }

  const addToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      },
    })
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <div className="container mx-auto px-4 py-24 md:px-6">
      <Button onClick={() => router.push("/store")} variant="ghost" className="mb-8 rounded-none">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Store
      </Button>

      <div className="grid gap-12 md:grid-cols-2">
        {/* Product Images */}
        <div>
          <div className="mb-4 overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={600}
              height={800}
              className="w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.gallery.map((image, index) => (
              <div key={index} className="overflow-hidden">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} ${index + 1}`}
                  width={400}
                  height={300}
                  className="w-full object-cover cursor-pointer hover:opacity-75"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
          <p className="mt-4 text-2xl font-bold text-primary">US${product.price}</p>

          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">{product.category || "Wildlife Photography"}</h3>
            <p className="text-muted-foreground leading-relaxed">{product.fullDescription || "Wildlife Photography"}</p>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <input
              type="number"
              min="1"
              defaultValue="1"
              className="w-16 rounded-none border border-border bg-background px-3 py-2 text-center"
            />
            <Button onClick={addToCart} className="rounded-none flex-1">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </div>

          <div className="mt-8 space-y-4 text-sm text-muted-foreground">
            <p>• High-quality digital product</p>
            <p>• Instant download after purchase</p>
            <p>• 30-day money-back guarantee</p>
            <p>• Customer support included</p>
          </div>
        </div>
      </div>
    </div>
  )
}

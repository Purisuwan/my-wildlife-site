"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Minus, Plus, X } from "lucide-react"
import { useCart } from "@/context/cart-context"

export default function CartPage() {
  const { state, dispatch } = useCart()

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-3xl font-bold mb-4">Cart</h1>
        <p className="text-muted-foreground mb-8">Your cart is empty</p>
        <Button asChild className="rounded-none">
          <Link href="/store">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-24 md:px-6">
      <h1 className="text-3xl font-bold text-center mb-8">Cart</h1>

      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/store" className="text-muted-foreground hover:underline">
            Continue shopping
          </Link>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4 pb-4 border-b text-sm font-medium text-muted-foreground">
            <div>Product</div>
            <div className="text-center">Price</div>
            <div className="text-center">Quantity</div>
            <div className="text-center">Subtotal</div>
          </div>

          {state.items.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="grid grid-cols-4 gap-4 items-center">
                  <div className="flex items-center gap-4">
                    <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-red-500">
                      <X className="h-4 w-4" />
                    </button>
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="h-16 w-16 object-cover"
                    />
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                    </div>
                  </div>
                  <div className="text-center">US${item.price}</div>
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-center font-medium">US${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 border-t pt-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-medium">Subtotal</span>
            <span className="text-lg font-medium">US${state.total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center mb-8">
            <span className="text-xl font-bold">Total</span>
            <span className="text-xl font-bold">US${state.total.toFixed(2)}</span>
          </div>
          <Button asChild className="w-full rounded-none" size="lg">
            <Link href="/checkout">Proceed to Checkout</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function OrderConfirmationPage() {
  return (
    <div className="container mx-auto px-4 py-24 md:px-6">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Thank you for your purchase. Your order has been successfully placed and you will receive a confirmation
            email shortly.
          </p>
        </div>

        <div className="bg-muted p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">What happens next?</h2>
          <div className="space-y-3 text-left">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                1
              </div>
              <div>
                <h3 className="font-medium">Order Processing</h3>
                <p className="text-sm text-muted-foreground">
                  We'll prepare your items for shipping within 1-2 business days.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                2
              </div>
              <div>
                <h3 className="font-medium">Shipping Notification</h3>
                <p className="text-sm text-muted-foreground">
                  You'll receive tracking information once your order ships.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                3
              </div>
              <div>
                <h3 className="font-medium">Delivery</h3>
                <p className="text-sm text-muted-foreground">
                  Your order will arrive within 5-7 business days for standard shipping.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="rounded-none">
            <Link href="/store">Continue Shopping</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-none bg-transparent">
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

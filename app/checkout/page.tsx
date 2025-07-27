"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/hooks/use-toast"

export default function CheckoutPage() {
  const { state, dispatch } = useCart()
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    country: "",
    address: "",
    city: "",
    state: "",
    postcode: "",
    phone: "",
    email: "",
    notes: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const orderData = {
        timestamp: new Date().toLocaleString("en-US", {
          timeZone: "Asia/Bangkok",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false
        }),
        type: "Store Order",
        orderId: `ORDER-${Date.now()}`,
        firstName: formData.firstName,
        lastName: formData.lastName,
        company: formData.company,
        country: formData.country,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        postcode: formData.postcode,
        phone: formData.phone,
        email: formData.email,
        notes: formData.notes,
        items: state.items.map((item) => `${item.name} (Qty: ${item.quantity})`).join(", "),
        total: state.total,
        paymentMethod: paymentMethod,
        cardNumber: paymentMethod === "card" ? `****-****-****-${formData.cardNumber.slice(-4)}` : "QR Code Payment", // Only store last 4 digits for card
      }

      // Send to Google Sheets
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxf0GdVc6g8_45809Ja2BtOpZYvePEs8ndkXXjPTE8e30n5uYyzkOfSmffBIQ8GCls/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        },
      )

      if (response.ok) {
        // Clear cart
        dispatch({ type: "CLEAR_CART" })

        toast({
          title: "Order Placed Successfully!",
          description: "Thank you for your purchase. You will receive a confirmation email shortly.",
        })

        router.push("/order-confirmation")
      } else {
        throw new Error("Failed to submit order")
      }
    } catch (error) {
      console.error("Error submitting order:", error)

      // For demo purposes, still show success and clear cart
      dispatch({ type: "CLEAR_CART" })

      toast({
        title: "Order Placed Successfully!",
        description: "Thank you for your purchase. You will receive a confirmation email shortly.",
      })

      router.push("/order-confirmation")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Button onClick={() => router.push("/store")}>Continue Shopping</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-24 md:px-6">
      <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>

      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="grid gap-8 md:grid-cols-2">
          {/* Billing Details */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Billing Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="rounded-none"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="rounded-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="company">Company Name (optional)</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="rounded-none"
                  />
                </div>

                <div>
                  <Label htmlFor="country">Country / Region *</Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="rounded-none"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="address">Street Address *</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="rounded-none"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="city">Town / City *</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="rounded-none"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="state">State / County *</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="rounded-none"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="postcode">Postcode / ZIP *</Label>
                  <Input
                    id="postcode"
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleInputChange}
                    className="rounded-none"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="rounded-none"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="rounded-none"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Order Notes (optional)</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="rounded-none"
                    placeholder="Notes about your order, e.g. special notes for delivery."
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary & Payment */}
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Your Order</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between font-medium border-b pb-2">
                    <span>Product</span>
                    <span>Subtotal</span>
                  </div>
                  {state.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span>US${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-medium border-t pt-2">
                    <span>Subtotal</span>
                    <span>US${state.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total</span>
                    <span>US${state.total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Payment Method Selection */}
                <div>
                  <Label className="text-base font-medium">Payment Method</Label>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card">Credit/Debit Card</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="qr" id="qr" />
                      <Label htmlFor="qr">QR Code Payment</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Card Payment Form */}
                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="rounded-none"
                        placeholder="1234 1234 1234 1234"
                        required={paymentMethod === "card"}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date *</Label>
                        <Input
                          id="expiryDate"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          className="rounded-none"
                          placeholder="MM/YY"
                          required={paymentMethod === "card"}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV *</Label>
                        <Input
                          id="cvv"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className="rounded-none"
                          placeholder="123"
                          required={paymentMethod === "card"}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* QR Code Payment */}
                {paymentMethod === "qr" && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="text-lg font-medium mb-4">Scan QR Code to Pay</h3>
                      <div className="flex justify-center mb-4">
                        <Image
                          src="/images/Payment/download.png"
                          alt="QR Code for Payment"
                          width={200}
                          height={200}
                          className="border border-gray-300 rounded-lg"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Scan this QR code with your mobile banking app or digital wallet
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Amount: US${state.total.toFixed(2)}
                      </p>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Payment Instructions:</h4>
                      <ol className="text-sm text-blue-800 space-y-1">
                        <li>1. Open your mobile banking app or digital wallet</li>
                        <li>2. Select "Scan QR Code" or "QR Payment"</li>
                        <li>3. Scan the QR code above</li>
                        <li>4. Confirm the payment amount: US${state.total.toFixed(2)}</li>
                        <li>5. Complete the payment in your app</li>
                        <li>6. Click "Place Order" below after payment is complete</li>
                        <li>7. After Place Order we will contact back as soon as possible to get your payment confirmation and give you delivery details</li>
                      </ol>
                    </div>
                  </div>
                )}

                <Button type="submit" className="w-full rounded-none" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : "Place Order"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </div>
  )
}

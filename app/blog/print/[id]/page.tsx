"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, ShoppingCart } from "lucide-react"
import { useLimitedEditionProduct } from "@/hooks/use-limited-edition"
import Lightbox from "@/components/lightbox"

export default function LimitedEditionPrintDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    Location: "",
    message: "",
    newsletter: false,
  })

  const { product, loading, error } = useLimitedEditionProduct(params.id as string)

  const openLightbox = () => {
    setLightboxOpen(true)
  }

  // Create lightbox images array from the single product
  const lightboxImages = product ? [{
    id: Number.parseInt(product.id) || 1,
    src: product.imageFilename,
    title: product.title,
    description: product.description,
    category: product.category,
    edition: "Limited Edition"
  }] : []

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-2xl font-bold">Loading limited edition ...</h1>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-2xl font-bold text-red-600">Error loading limited edition product</h1>
        <p className="mt-2">{error}</p>
        <Button onClick={() => router.push("/blog")} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Limited Edition
        </Button>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-2xl font-bold">Limited edition product not found</h1>
        <Button onClick={() => router.push("/blog")} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Limited Edition
        </Button>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simple test alert
    alert('Form submitted! Check if this appears.')
    
    setIsSubmitting(true)

    try {
      // Prepare data for Google Sheets
      const submissionData = {
        timestamp: new Date().toISOString(),
        productTitle: product.title,
        productId: product.id,
        name: formData.name,
        email: formData.email,
        location: formData.Location,
        message: formData.message,
        newsletter: formData.newsletter ? 'Yes' : 'No'
      }

      console.log('Submitting data:', submissionData) // Debug log

      // Send to Google Sheets via Google Apps Script Web App
      const response = await fetch('https://script.google.com/macros/s/AKfycbzi9awm1eHkwWYLji-8SrI7etzGGXaNF2SAwwHiG5-s4cH3Bbg3fhBqNRSf33mSVON-iA/exec', {
        method: 'POST',
        mode: 'no-cors', // Add this to handle CORS issues
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      })

      console.log('Response received:', response) // Debug log

      // With no-cors mode, we can't check response.ok, so we assume success
      toast({
        title: "Inquiry submitted successfully!",
        description: "We'll get back to you within 24 hours.",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        Location: "",
        message: "",
        newsletter: false,
      })

    } catch (error) {
      console.error('Submission error:', error)
      toast({
        title: "Error submitting inquiry",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header spacing */}
      <div className="h-20"></div>

      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <Button 
          variant="ghost" 
          onClick={() => router.push("/blog")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Limited Edition
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="space-y-6">
            <div className="overflow-hidden rounded-lg bg-gray-100 cursor-pointer group">
              <img
                src={product.imageFilename}
                alt={product.title}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                onClick={openLightbox}
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg"
                }}
              />
            </div>
            <p className="text-center text-sm text-gray-500">Click image to view in full screen</p>
          </div>

          {/* Details Section */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>
              <div className="prose prose-gray max-w-none">
                <p>{product.description}</p>
              </div>
            </div>

            {/* Product Info */}
            <div className="border-t pt-6 space-y-4">
              <div>
                <span className="font-semibold">Category:</span>
                <span className="ml-2 text-gray-600">{product.category}</span>
              </div>
              {product.size && (
                <div>
                  <span className="font-semibold">Available Size:</span>
                  <span className="ml-2 text-gray-600">{product.size}</span>
                </div>
              )}
              <div>
                <span className="font-semibold">Edition:</span>
                <span className="ml-2 text-gray-600">Limited Edition</span>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="border-t pt-8">
              <h2 className="text-2xl font-bold mb-6">Inquiry Form</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Size Information Display */}
                <div>
                  <Label className="text-base font-semibold">Available Size</Label>
                  <div className="mt-2">
                    <span className="text-gray-700">
                      {product.size || "16×24 inches, 24×36 inches, 32×48 inches"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Contact us for specific size requirements or custom dimensions.
                  </p>
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="Location">Location *</Label>
                    <Input
                      id="Location"
                      name="Location"
                      value={formData.Location}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Any specific requirements or questions..."
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    id="newsletter"
                    name="newsletter"
                    type="checkbox"
                    checked={formData.newsletter}
                    onChange={handleInputChange}
                    className="form-checkbox"
                  />
                  <Label htmlFor="newsletter" className="text-sm">
                    Subscribe to our newsletter for updates on new releases
                  </Label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                </Button>
              </form>
            </div>
          </div>
        </div>

        <Lightbox
          images={lightboxImages}
          currentIndex={0}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          onNavigate={() => {}} // Single image, so no navigation needed
        />
      </div>
    </div>
  )
}

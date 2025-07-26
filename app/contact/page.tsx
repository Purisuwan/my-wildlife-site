"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Prepare data for Google Sheets
      const submissionData = {
        timestamp: new Date().toISOString(),
        name: formData.name,
        email: formData.email,
        message: formData.message
      }

      console.log('Submitting contact data:', submissionData)

      // Send to Google Sheets via Google Apps Script Web App
      const response = await fetch('https://script.google.com/macros/s/AKfycbwA9JNp9vhw6-vVRPTGGDkd0-nESSbD4u4mqQRgBAJI__kyxNxAyKU1Xsa3Tf72uxrfWA/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      })

      console.log('Contact form response:', response)

      // Show popup alert for immediate feedback
      alert('Message sent successfully! Thank you for contacting us.')

      // Show success toast
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll respond as soon as possible.",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

    } catch (error) {
      console.error('Contact form submission error:', error)
      
      // Show popup alert for error
      alert('Error sending message. Please try again later.')
      
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Hero Section */}
       <section className="py-16 md:py-8">
        <div className="h-20"></div>
          <div className="text-center mb-1">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Contact
            </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            For inquiries, collaborations, or just to say hello
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Send a Message</h2>
              <p className="mt-4 text-muted-foreground">
                Have a question about prints, workshops, or licensing? Fill out the form below and I'll get back to you
                as soon as possible.
              </p>
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="rounded-none"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email address"
                    className="rounded-none"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message"
                    className="min-h-[150px] rounded-none"
                    required
                  />
                </div>
                <Button type="submit" className="w-full rounded-none" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Contact Information</h2>
              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="mt-1 text-muted-foreground">info@wildlifephotography.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="mt-1 text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="mt-1 text-muted-foreground">
                      Nakhonratchasima
                      <br />
                      Thailand
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-10">
                <h3 className="font-medium">Follow</h3>
                <div className="mt-4 flex space-x-4">
                  <Link
                    href="#"
                    className="rounded-full border border-border p-2 transition-colors hover:bg-muted"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </Link>
                  <Link
                    href="#"
                    className="rounded-full border border-border p-2 transition-colors hover:bg-muted"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Frequently Asked Questions</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              {
                question: "Do you offer private photography workshops?",
                answer:
                  "Yes, I offer both group and private photography workshops throughout the year. These range from one-day local sessions to multi-week international expeditions. Contact me for current availability and pricing.",
              },
              {
                question: "Can I license your images for commercial use?",
                answer:
                  "Absolutely. My images are available for licensing for various commercial purposes. Please contact me with details about your project, and I'll provide licensing options and pricing.",
              },
              {
                question: "How long does shipping take for print orders?",
                answer:
                  "Standard prints typically ship within 5-7 business days. Large format and custom prints may take 10-14 business days. International shipping times vary by location.",
              },
              {
                question: "Do you accept custom print requests?",
                answer:
                  "Yes, I'm happy to accommodate custom print requests, including specific sizes, materials, or images from my portfolio that aren't currently listed in the store. Please contact me to discuss your requirements.",
              },
              {
                question: "Are you available for speaking engagements?",
                answer:
                  "I regularly speak at conservation events, photography conferences, and educational institutions. Please reach out with details about your event, and I'll check my availability.",
              },
              {
                question: "How can I join one of your photography expeditions?",
                answer:
                  "Information about upcoming expeditions is posted on my website and newsletter. Most trips are limited to 6-8 participants to ensure a quality experience. Contact me for details on specific trips.",
              },
            ].map((faq, index) => (
              <div key={index} className="rounded-lg border bg-card p-6">
                <h3 className="font-medium">{faq.question}</h3>
                <p className="mt-2 text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

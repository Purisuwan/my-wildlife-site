"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  // Slideshow images from limited-edition folder
  const heroImages = [
    "/images/limited-edition/516930260_9954350284619283_2642336253183266056_n.jpg",
    "/images/limited-edition/518284550_9985441824843462_4345875780933125577_n.jpg",
    "/images/limited-edition/518352313_10046510578736586_7739042478145945783_n.jpg",
    "/images/limited-edition/518811770_10038702709517373_2363748120092957531_n.jpg",
    "/images/limited-edition/519421729_10061326177255026_8645730988978430344_n.jpg",
    "/images/limited-edition/522127626_10068779516509692_8638792474902019974_n.jpg"
  ]

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Auto-advance slideshow every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [heroImages.length])
  return (
    <>
      {/* Hero Section */}
      <section className="py-8 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden rounded-lg shadow-2xl">
            {/* Slideshow Images */}
            {heroImages.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`Wildlife hero image ${index + 1}`}
                fill
                priority={index === 0}
                className={`object-cover transition-opacity duration-1000 ${
                  index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
                sizes="100vw"
              />
            ))}
            
            {/* Slideshow Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? 'bg-white scale-110'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Capturing the Wild</h1>
          <p className="mt-6 max-w-2xl text-lg text-white/90">
            Documenting the beauty and fragility of our natural world through the lens
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="rounded-none">
              <Link href="/store">View Gallery</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-none bg-transparent text-white border-white hover:bg-white/20 hover:text-white"
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
          </div>
        </div>
      </section>

      {/* Featured Store */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Featured Stores</h2>
              <p className="mt-2 text-muted-foreground">Explore the latest collections from around the world</p>
            </div>
            <Button asChild variant="ghost" className="group">
              <Link href="/store" className="flex items-center gap-2">
                View All Collections
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Dear",
                image: "/images/products/46049041_1851408448246881_91340420943970304_n.jpg",
                description: "Description",
              },
              {
                title: "Wildlife of Dong Phayayen-Khao Yai",
                image: "/images/products/46157918_1851408464913546_5479694270384308224_n.jpg",
                description: "Description",
              },
              {
                title: "Call of the Wild: Paradise of the Thai Kingdom",
                image: "/images/products/46171502_1851408421580217_798453859348381696_n.jpg",
                description: "Description",
              },
            ].map((gallery, index) => (
              <Link key={index} href="/store" className="group relative overflow-hidden">
                <div className="w-full overflow-hidden">
                  <Image
                    src={gallery.image || "/placeholder.svg"}
                    alt={gallery.title}
                    width={800}
                    height={600}
                    className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-medium">{gallery.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{gallery.description}</p>
                  <div className="mt-4 flex items-center text-sm font-medium">
                    Explore
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="bg-muted py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-2 md:grid-cols-2 md:gap-4">
            <div className="relative overflow-hidden max-w-sm mx-auto md:mx-0">
              <Image
                src="/images/About/506470185_9760293294024984_8720796233752892488_n.jpg"
                alt="Wildlife photographer"
                width={400}
                height={400}
                className="object-cover rounded-lg"
                sizes="(min-width: 1200px) 300px, 300px"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">About the Photographer</h2>
              <p className="mt-6 text-muted-foreground">
                With over 15 years of experience documenting wildlife across seven continents, I've dedicated my career
                to capturing the beauty of our natural world and raising awareness about conservation efforts.
              </p>
              <p className="mt-4 text-muted-foreground">
                My work has been featured in National Geographic, BBC Wildlife, and numerous international exhibitions.
                I believe in the power of photography to inspire change and protect our planet's most vulnerable
                species.
              </p>
              <div className="mt-8">
                <Button asChild variant="outline" className="rounded-none bg-transparent">
                  <Link href="/about">Read My Story</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop Preview */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Limited Edition Prints</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Bring the beauty of wildlife into your home with museum-quality prints. Each purchase supports
              conservation efforts worldwide.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Arctic Fox",
                image: "/images/limited-edition/518352313_10046510578736586_7739042478145945783_n.jpg",
                price: "$250",
              },
              {
                title: "Bengal Tiger",
                image: "/images/limited-edition/518811770_10038702709517373_2363748120092957531_n.jpg",
                price: "$350",
              },
              {
                title: "Humpback Breach",
                image: "/images/limited-edition/519421729_10061326177255026_8645730988978430344_n.jpg",
                price: "$300",
              },
              {
                title: "Mountain Gorilla",
                image: "/images/limited-edition/522127626_10068779516509692_8638792474902019974_n.jpg",
                price: "$400",
              },
            ].map((product, index) => (
              <Link key={index} href="/blog" className="group">
                <div className="overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    width={500}
                    height={600}
                    className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <h3 className="font-medium">{product.title}</h3>
                  <p>{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Button asChild className="rounded-none">
              <Link href="/blog">Shop All Prints</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Join the Journey</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Subscribe to receive updates on new galleries, behind-the-scenes content, and exclusive offers on limited
              edition prints.
            </p>
            <form className="mt-8 flex w-full max-w-md flex-col gap-4 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-none border border-border bg-background px-4 py-2"
                required
              />
              <Button type="submit" className="rounded-none">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

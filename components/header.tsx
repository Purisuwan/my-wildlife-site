"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ShoppingCart } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCart } from "@/context/cart-context"
import { Badge } from "@/components/ui/badge"
import { Instagram, Facebook } from "lucide-react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { state } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm dark:bg-black/90" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 transition-colors hover:text-foreground/80" />
              {state.items.length > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 p-0 text-xs text-white">
                  {state.items.reduce((sum, item) => sum + item.quantity, 0)}
                </Badge>
              )}
            </Link>
            <Link href="/" className="text-2xl font-bold tracking-tighter transition-colors">
              Narong
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-3 mr-4">
              <Link
                href="https://www.instagram.com/narong_suwannarong/"
                className="rounded-full border border-border p-3 transition-colors hover:bg-muted"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-6 w-6" />
              </Link>
              <Link
                href="https://www.facebook.com/narong.suwannarong"
                className="rounded-full border border-border p-3 transition-colors hover:bg-muted"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-6 w-6" />
              </Link>
            </div>
            <Link href="/" className="text-base font-medium transition-colors hover:text-foreground/80">
              Home
            </Link>
            <Link href="/about" className="text-base font-medium transition-colors hover:text-foreground/80">
              About
            </Link>
            <Link href="/store" className="text-base font-medium transition-colors hover:text-foreground/80">
              Store
            </Link>
            <Link href="/blog" className="text-base font-medium transition-colors hover:text-foreground/80">
              Limited Editions
            </Link>
            <Link href="/contact" className="text-base font-medium transition-colors hover:text-foreground/80">
              Contact
            </Link>
          </nav>
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="container mx-auto px-4 py-4 bg-background">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                Home
              </Link>
              <Link href="/about" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                About
              </Link>
              <Link href="/store" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                Store
              </Link>
              <Link href="/blog" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                Limited Editions
              </Link>
              <Link href="/contact" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                Contact
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

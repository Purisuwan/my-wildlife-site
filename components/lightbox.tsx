"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LightboxImage {
  id: number
  src: string
  title: string
  description?: string
  category?: string
  price?: string
  edition?: string
}

interface LightboxProps {
  images: LightboxImage[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNavigate: (index: number) => void
}

export default function Lightbox({ images, currentIndex, isOpen, onClose, onNavigate }: LightboxProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "Escape":
          onClose()
          break
        case "ArrowLeft":
          handlePrevious()
          break
        case "ArrowRight":
          handleNext()
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, currentIndex])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1
    onNavigate(newIndex)
    setIsLoading(true)
  }

  const handleNext = () => {
    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0
    onNavigate(newIndex)
    setIsLoading(true)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen || !images[currentIndex]) return null

  const currentImage = images[currentIndex]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      {/* Close Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-black/50 text-white hover:bg-black/70"
        onClick={onClose}
      >
        <X className="h-6 w-6" />
      </Button>

      {/* Image Counter */}
      <div className="absolute top-4 right-16 z-10 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
        {currentIndex + 1}/{images.length}
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 z-10 h-12 w-12 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 z-10 h-12 w-12 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70"
            onClick={handleNext}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </>
      )}

      {/* Main Image Container */}
      <div className="relative h-full w-full max-h-[90vh] max-w-[90vw] flex items-center justify-center">
        <div className="relative h-full w-full">
          <Image
            src={currentImage.src || "/placeholder.svg"}
            alt={currentImage.title}
            fill
            className="object-contain"
            sizes="90vw"
            priority
            onLoad={() => setIsLoading(false)}
          />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            </div>
          )}
        </div>
      </div>

      {/* Image Information */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
        <div className="container mx-auto flex items-end justify-between">
          <div className="text-white">
            <h3 className="text-xl font-semibold">{currentImage.title}</h3>
            {currentImage.description && <p className="mt-1 text-sm text-white/80">{currentImage.description}</p>}
            {currentImage.category && <p className="mt-1 text-xs text-white/60">{currentImage.category}</p>}
          </div>
          <div className="text-right text-white">
            {currentImage.edition && <p className="text-sm font-medium">Edition {currentImage.edition}</p>}
            {currentImage.price && <p className="text-lg font-bold">{currentImage.price}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

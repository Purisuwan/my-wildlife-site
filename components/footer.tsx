import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-6 md:px-6">
        <div className="flex items-center justify-center">
          <p className="text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} Narong Photography. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

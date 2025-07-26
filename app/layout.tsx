import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/context/cart-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Narong Suwannarong - Photography",
  description: "Capturing the beauty of wildlife through the lens",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            /* Disable text selection globally */
            * {
              -webkit-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
              user-select: none;
              -webkit-touch-callout: none;
              -webkit-tap-highlight-color: transparent;
            }
            
            /* Re-enable text selection for form inputs */
            input, textarea, [contenteditable="true"] {
              -webkit-user-select: text;
              -moz-user-select: text;
              -ms-user-select: text;
              user-select: text;
            }
            
            /* Prevent image dragging but allow clicking */
            img {
              -webkit-user-drag: none;
              -khtml-user-drag: none;
              -moz-user-drag: none;
              -o-user-drag: none;
              user-drag: none;
              -webkit-touch-callout: none;
              pointer-events: auto;
            }
            
            /* Disable highlighting */
            ::selection {
              background: transparent;
            }
            
            ::-moz-selection {
              background: transparent;
            }
            
            /* Prevent image context menu */
            img {
              -webkit-touch-callout: none;
              -webkit-user-select: none;
              -khtml-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
              user-select: none;
            }
          `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            // Disable right-click context menu only on images
            document.addEventListener('contextmenu', function(e) {
              if (e.target.tagName === 'IMG') {
                e.preventDefault();
                return false;
              }
            });
            
            // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
            document.addEventListener('keydown', function(e) {
              // F12
              if (e.keyCode === 123) {
                e.preventDefault();
                return false;
              }
              // Ctrl+Shift+I
              if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
                e.preventDefault();
                return false;
              }
              // Ctrl+Shift+J
              if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
                e.preventDefault();
                return false;
              }
              // Ctrl+U
              if (e.ctrlKey && e.keyCode === 85) {
                e.preventDefault();
                return false;
              }
              // Ctrl+S
              if (e.ctrlKey && e.keyCode === 83) {
                e.preventDefault();
                return false;
              }
            });
            
            // Disable image dragging
            document.addEventListener('dragstart', function(e) {
              if (e.target.tagName === 'IMG') {
                e.preventDefault();
                return false;
              }
            });
            
            // Prevent long-press save on mobile for images
            document.addEventListener('DOMContentLoaded', function() {
              // Remove browser extension attributes that can cause hydration mismatches
              const body = document.body;
              if (body) {
                body.removeAttribute('data-new-gr-c-s-check-loaded');
                body.removeAttribute('data-gr-ext-installed');
                body.removeAttribute('data-new-gr-c-s-loaded');
                body.removeAttribute('grammarly-extension');
              }
              
              const images = document.querySelectorAll('img');
              images.forEach(function(img) {
                img.addEventListener('dragstart', function(e) {
                  e.preventDefault();
                  return false;
                });
                
                // Prevent long-press context menu on mobile
                img.addEventListener('touchstart', function(e) {
                  if (e.touches.length > 1) {
                    e.preventDefault();
                  }
                });
                
                img.addEventListener('touchend', function(e) {
                  e.preventDefault();
                });
                
                img.addEventListener('contextmenu', function(e) {
                  e.preventDefault();
                  return false;
                });
              });
            });
          `,
          }}
        />
      </head>
      <body 
        className={`${inter.className} antialiased`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <CartProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

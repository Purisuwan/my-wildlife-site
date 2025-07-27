/**
 * Google Sheets Data Integration
 * This file handles fetching product data from Google Sheets
 */

import { Product } from './products'

export interface GoogleSheetProduct {
  id: string
  title: string
  price: number
  description: string
  fullDescription?: string
  imageFilename?: string
  category?: string
}

// Image mapping function (duplicated to avoid circular dependency)
function getImageUrl(filename: string): string {
  const imageMap: { [key: string]: string } = {
    "1.jpg": "46049041_1851408448246881_91340420943970304_n.jpg",
    "2.jpg": "46157918_1851408464913546_5479694270384308224_n.jpg", 
    "3.jpg": "46171502_1851408421580217_798453859348381696_n.jpg",
    "4.jpg": "46183924_1851408371580222_3627577524784988160_n.jpg",
    "5.jpg": "475777108_8867635843290738_8796161327523431186_n.jpg",
    "6.jpg": "475809357_8867635723290750_4545945436560665291_n.jpg",
    "7.jpg": "475844922_8867635873290735_5182707465057393519_n.jpg",
    "8.jpg": "475880434_8867635459957443_3220833299838462007_n.jpg",
    "9.jpg": "492004825_9368956366492014_878423927105912464_n.jpg",
    "10.jpg": "492077609_9370656769655307_3718851616967647908_n.jpg",
    "11.jpg": "496011660_9517738658280450_6532994532541587677_n.jpg",
  }
  
  const actualFilename = imageMap[filename]
  if (!actualFilename) {
    return "/placeholder.svg"
  }
  
  return `/images/products/${actualFilename}`
}

/**
 * Convert Google Sheets data to our Product interface
 */
export function convertSheetDataToProducts(sheetData: GoogleSheetProduct[]): Product[] {
  return sheetData.map(item => ({
    id: item.id,
    name: item.title,
    image: getImageUrl(item.imageFilename || `${item.id}.jpg`),
    description: item.description,
    category: item.category,
    price: item.price,
    fullDescription: item.fullDescription || item.description,
    gallery: item.id === "1" ? [
      getImageUrl("2.jpg"),
      getImageUrl("3.jpg"),
      getImageUrl("4.jpg"),
    ] : item.id === "2" ? [
      getImageUrl("2.jpg"),
      getImageUrl("3.jpg"),
      getImageUrl("4.jpg"),
    ] : item.id === "3" ? [
      getImageUrl("2.jpg"),
      getImageUrl("3.jpg"),
      getImageUrl("4.jpg"),
    ] : item.id === "4" ? [
      getImageUrl("2.jpg"),
      getImageUrl("3.jpg"),
      getImageUrl("4.jpg"),
    ] : item.id === "5" ? [
      getImageUrl("5.jpg"),
      getImageUrl("6.jpg"),
      getImageUrl("7.jpg"),
    ] : item.id === "6" ? [
      getImageUrl("6.jpg"),
      getImageUrl("7.jpg"),
      getImageUrl("8.jpg"),
    ] : item.id === "7" ? [
      getImageUrl("7.jpg"),
      getImageUrl("8.jpg"),
      getImageUrl("9.jpg"),
    ] : item.id === "8" ? [
      getImageUrl("8.jpg"),
      getImageUrl("9.jpg"),
      getImageUrl("10.jpg"),
    ] : item.id === "9" ? [
      getImageUrl("9.jpg"),
      getImageUrl("10.jpg"),
      getImageUrl("11.jpg"),
    ] : item.id === "10" ? [
      getImageUrl("10.jpg"),
      getImageUrl("11.jpg"),
      getImageUrl("1.jpg"),
    ] : item.id === "11" ? [
      getImageUrl("11.jpg"),
      getImageUrl("1.jpg"),
      getImageUrl("2.jpg"),
    ] : [getImageUrl(item.imageFilename || `${item.id}.jpg`),
      // Add more gallery images based on your needs
    ],
  }))
}

/**
 * Fetch data from Google Sheets CSV export
 * Your sheet: https://docs.google.com/spreadsheets/d/1g9BnlXJ8-LePOFRGGrOTi0v8B_6nKlVTGlPzbMUQ75I/edit?usp=sharing
 * Make sure it's shared publicly (Anyone with the link can view)
 */
export async function fetchGoogleSheetData(): Promise<GoogleSheetProduct[]> {
  try {
    // Your Google Sheet ID
    const SHEET_ID = "1g9BnlXJ8-LePOFRGGrOTi0v8B_6nKlVTGlPzbMUQ75I"
    const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=0`
    
    console.log('🔄 Fetching data from Google Sheets:', CSV_URL)
    
    // Add timeout to prevent hanging
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout
    
    const response = await fetch(CSV_URL, {
      cache: 'no-store', // Always fetch fresh data
      signal: controller.signal,
      headers: {
        'Accept': 'text/csv,text/plain,*/*'
      }
    })
    
    clearTimeout(timeoutId)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const csvText = await response.text()
    console.log('✅ Successfully fetched CSV data, length:', csvText.length)
    
    // Check if we got HTML instead of CSV (means sheet isn't public)
    if (csvText.includes('<html') || csvText.includes('<!DOCTYPE')) {
      throw new Error('Google Sheet is not publicly accessible. Please make it public: Share → Anyone with link can view')
    }
    
    console.log('📄 First 200 characters:', csvText.substring(0, 200))
    
    const products = parseCSVToProducts(csvText)
    console.log('🎯 Parsed products:', products.length)
    
    return products
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.error('❌ Google Sheets request timed out after 5 seconds')
    } else {
      console.error('❌ Error fetching Google Sheet data:', error)
    }
    // Return empty array to trigger fallback to static data
    return []
  }
}

/**
 * Parse CSV text to product objects
 */
function parseCSVToProducts(csvText: string): GoogleSheetProduct[] {
  const lines = csvText.split('\n')
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
  
  return lines.slice(1)
    .filter(line => line.trim()) // Remove empty lines
    .map(line => {
      const values = parseCSVLine(line)
      const product: any = {}
      
      headers.forEach((header, index) => {
        const value = values[index]?.trim().replace(/"/g, '') || ''
        
        // Map common column names to our interface
        switch (header.toLowerCase()) {
          case 'id':
            product.id = value
            break
          case 'title':
          case 'name':
            product.title = value
            break
          case 'price':
            product.price = parseFloat(value) || 0
            break
          case 'description':
          case 'short_description':
            product.description = value
            break
          case 'full_description':
          case 'long_description':
            product.fullDescription = value
            break
          case 'image':
          case 'image_filename':
            product.imageFilename = value
            break
          case 'category':
            product.category = value
            break
          default:
            product[header] = value
        }
      })
      
      return product as GoogleSheetProduct
    })
}

/**
 * Simple CSV line parser (handles quotes and commas)
 */
function parseCSVLine(line: string): string[] {
  const result = []
  let current = ''
  let inQuotes = false
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    
    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      result.push(current)
      current = ''
    } else {
      current += char
    }
  }
  
  result.push(current)
  return result
}

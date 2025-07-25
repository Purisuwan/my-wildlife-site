/**
 * Google Sheets integration for Limited Edition products
 */

const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTyaRU4DoK-iQJTrBGxVG5thCvMM_-KygFo-xZystMfNc-ftAvw4udPGudzZI99O1x1yBckFujNJWhz/pub?output=csv"

export interface LimitedEditionProduct {
  id: string
  title: string
  price: number
  description: string
  category: string
  size: string
  imageFilename: string
}

// Image mapping function for limited edition (like store page pattern)
function getLimitedEditionImageUrl(filename: string): string {
  // If filename is already a full path, use it directly
  if (filename.includes('/')) {
    return filename
  }
  
  // Map simple filenames to actual uploaded image names
  const imageMap: { [key: string]: string } = {
    "1.jpg": "516930260_9954350284619283_2642336253183266056_n.jpg",
    "2.jpg": "518352313_10046510578736586_7739042478145945783_n.jpg",
    "3.jpg": "518811770_10038702709517373_2363748120092957531_n.jpg",
    "4.jpg": "518284550_9985441824843462_4345875780933125577_n.jpg",
    "5.jpg": "519421729_10061326177255026_8645730988978430344_n.jpg",
    "6.jpg": "522127626_10068779516509692_8638792474902019974_n.jpg",
  }
  
  const actualFilename = imageMap[filename] || filename
  return `/images/limited-edition/${actualFilename}`
}

// Simple CSV parser for Google Sheets data
function parseCSVLine(line: string): string[] {
  const result: string[] = []
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

function parseCSVToLimitedEditionProducts(csvText: string): LimitedEditionProduct[] {
  const lines = csvText.split('\n')
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
  
  const products = lines.slice(1)
    .filter(line => line.trim()) // Remove empty lines
    .map((line) => {
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
          case 'category':
            product.category = value
            break
          case 'size':
            product.size = value
            break
          default:
            product[header] = value
        }
      })
      
      // Auto-generate image filename from ID
      product.imageFilename = `${product.id}.jpg`
      
      return product as LimitedEditionProduct
    })
  
  return products
}

export async function fetchLimitedEditionProductsFromSheets(): Promise<LimitedEditionProduct[]> {
  try {
    console.log('🔍 Fetching limited edition products from Google Sheets...')
    
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000) // 8 second timeout
    
    const response = await fetch(SHEET_CSV_URL, {
      signal: controller.signal,
      headers: {
        'Accept': 'text/csv,text/plain,*/*'
      },
      cache: 'no-store' // Ensure fresh data
    })
    
    clearTimeout(timeoutId)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const text = await response.text()
    
    // Check if we got HTML instead of CSV (sheet not public)
    if (text.includes('<html') || text.includes('<!DOCTYPE')) {
      throw new Error('Google Sheet is not publicly accessible. Please set sharing to "Anyone with link can view"')
    }
    
    if (!text.includes(',')) {
      throw new Error('Invalid CSV format received from Google Sheets')
    }
    
    const products = parseCSVToLimitedEditionProducts(text)
    console.log('✅ Successfully loaded', products.length, 'limited edition products from Google Sheets')
    
    return products
    
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.error('❌ Limited Edition Google Sheets request timed out after 8 seconds')
        throw new Error('Request timeout: Google Sheets took too long to respond')
      } else {
        console.error('❌ Limited Edition Google Sheets fetch error:', error.message)
        throw error
      }
    }
    throw new Error('Unknown error occurred while fetching limited edition data')
  }
}

// Static fallback data (like store page pattern)
export const staticLimitedEditionProducts: LimitedEditionProduct[] = [
  {
    id: "le-001",
    title: "Black Deer",
    price: 450,
    description: "Limited edition black deer print",
    category: "Wildlife",
    size: "A3",
    imageFilename: getLimitedEditionImageUrl("1.jpg")
  },
  {
    id: "le-002",
    title: "Tiger Portrait",
    price: 520,
    description: "Majestic tiger limited edition print",
    category: "Wildlife",
    size: "A2",
    imageFilename: getLimitedEditionImageUrl("2.jpg")
  },
  {
    id: "le-003",
    title: "Bull Power",
    price: 380,
    description: "Powerful bull artwork",
    category: "Animals",
    size: "A3",
    imageFilename: getLimitedEditionImageUrl("3.jpg")
  },
  {
    id: "le-004",
    title: "Wildlife Scene",
    price: 420,
    description: "Beautiful wildlife photography",
    category: "Wildlife",
    size: "A3",
    imageFilename: getLimitedEditionImageUrl("4.jpg")
  },
  {
    id: "le-005",
    title: "Nature Study",
    price: 350,
    description: "Stunning nature composition",
    category: "Wildlife",
    size: "A4",
    imageFilename: getLimitedEditionImageUrl("5.jpg")
  },
  {
    id: "le-006",
    title: "Animal Portrait",
    price: 480,
    description: "Professional animal photography",
    category: "Animals",
    size: "A2",
    imageFilename: getLimitedEditionImageUrl("6.jpg")
  }
]

// Main function to get limited edition products (with fallback like store)
export async function getLimitedEditionProducts(): Promise<LimitedEditionProduct[]> {
  try {
    const products = await fetchLimitedEditionProductsFromSheets()
    // Map images for each product
    return products.map(product => ({
      ...product,
      imageFilename: getLimitedEditionImageUrl(product.imageFilename)
    }))
  } catch (error) {
    console.warn('⚠️ Falling back to static limited edition products:', error)
    return staticLimitedEditionProducts
  }
}

// Export the helper function for external use
export { getLimitedEditionImageUrl }

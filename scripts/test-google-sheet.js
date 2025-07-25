/**
 * Enhanced test script to debug Google Sheets data loading
 * Run with: node scripts/test-google-sheet.js
 */

const SHEET_ID = "1ByirNL-V8Ufaz1xU2-3p-wyWR8SDwH4S6YUxlbnxRJ0"
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=0`

console.log('🔍 Testing Limited Edition Google Sheet access...')
console.log('URL:', CSV_URL)

// Simple CSV parser to test the data structure
function parseCSVLine(line) {
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

function parseCSVToProducts(csvText) {
  const lines = csvText.split('\n')
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
  
  console.log('Headers found:', headers)
  
  const products = lines.slice(1)
    .filter(line => line.trim()) // Remove empty lines
    .map((line, index) => {
      const values = parseCSVLine(line)
      console.log(`Row ${index + 1}:`, values)
      
      const product = {}
      
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
      
      return product
    })
  
  return products
}

async function testSheet() {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)
    
    const response = await fetch(CSV_URL, {
      signal: controller.signal,
      headers: {
        'Accept': 'text/csv,text/plain,*/*'
      }
    })
    
    clearTimeout(timeoutId)
    
    console.log('Status:', response.status, response.statusText)
    console.log('Content-Type:', response.headers.get('content-type'))
    
    const text = await response.text()
    console.log('Response length:', text.length)
    console.log('First 500 chars:')
    console.log(text.substring(0, 500))
    console.log('---')
    
    if (text.includes('<html') || text.includes('<!DOCTYPE')) {
      console.log('❌ ERROR: Sheet is not publicly accessible!')
      console.log('Solution: Share → Anyone with link can view')
    } else if (text.includes(',')) {
      console.log('✅ SUCCESS: Sheet appears to be CSV format')
      console.log('\n🔍 Parsing data...')
      
      const products = parseCSVToProducts(text)
      console.log('\n📊 Parsed Products:')
      products.forEach((product, index) => {
        console.log(`${index + 1}. ${product.title} - $${product.price} (${product.category})`)
        console.log(`   Description: ${product.description}`)
        console.log(`   Image: ${product.imageFilename}`)
        console.log('')
      })
      
    } else {
      console.log('⚠️ WARNING: Unexpected response format')
    }
    
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('❌ TIMEOUT: Request took longer than 5 seconds')
    } else {
      console.log('❌ ERROR:', error.message)
    }
  }
}

testSheet()

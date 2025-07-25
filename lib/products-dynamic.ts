/**
 * Dynamic Products Data
 * This file can load product data from Google Sheets or use static fallback data
 */

import { fetchGoogleSheetData, convertSheetDataToProducts } from './google-sheets'

export interface Product {
  id: string
  name: string
  image: string
  description: string
  price: number
  fullDescription: string
  gallery: string[]
}

// Export the function so it can be used by other modules
export const getGoogleDriveImageUrl = (filename: string) => {
  // Map the simple filenames to the actual uploaded image names
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

// Static fallback data (your current products)
const staticProducts: Product[] = [
  {
    id: "1",
    name: "Sunset Serenity Print",
    image: getGoogleDriveImageUrl("1.jpg"),
    description: "Beautiful sunset landscape with silhouetted grass in warm tones.",
    price: 280,
    fullDescription:
      "A breathtaking sunset scene capturing the serene beauty of nature. The warm pink and orange hues create a peaceful atmosphere, with delicate grass silhouettes dancing in the foreground. This print brings tranquility and natural beauty to any space.",
    gallery: [
      getGoogleDriveImageUrl("2.jpg"),
      getGoogleDriveImageUrl("2.jpg"),
      getGoogleDriveImageUrl("2.jpg"),
    ],
  },
  {
    id: "2",
    name: "Golden Hour Wildlife",
    image: getGoogleDriveImageUrl("2.jpg"),
    description: "Majestic deer silhouettes against a dramatic golden sunset.",
    price: 350,
    fullDescription:
      "A stunning wildlife photograph featuring deer silhouettes against a magnificent golden sunset. The dramatic lighting and composition create a powerful image that celebrates the beauty of wildlife in their natural habitat.",
    gallery: [
      getGoogleDriveImageUrl("2.jpg"),
      getGoogleDriveImageUrl("3.jpg"),
      getGoogleDriveImageUrl("4.jpg"),
    ],
  },
  {
    id: "3",
    name: "Bengal Tiger Portrait",
    image: getGoogleDriveImageUrl("3.jpg"),
    description: "Powerful portrait of a Bengal Tiger in its natural habitat.",
    price: 420,
    fullDescription:
      "An intense and powerful portrait of a Bengal Tiger, capturing the raw beauty and strength of one of nature's most magnificent predators. This image showcases the tiger's piercing gaze and distinctive markings in incredible detail.",
    gallery: [
      getGoogleDriveImageUrl("3.jpg"),
      getGoogleDriveImageUrl("4.jpg"),
      getGoogleDriveImageUrl("5.jpg"),
    ],
  },
  {
    id: "4",
    name: "Humpback Whale Breach",
    image: getGoogleDriveImageUrl("4.jpg"),
    description: "Spectacular moment of a humpback whale breaching the surface.",
    price: 380,
    fullDescription:
      "A breathtaking capture of a humpback whale breaching the ocean surface, demonstrating the incredible power and grace of these marine giants. This photograph was taken during a memorable encounter in pristine Antarctic waters.",
    gallery: [
      getGoogleDriveImageUrl("4.jpg"),
      getGoogleDriveImageUrl("5.jpg"),
      getGoogleDriveImageUrl("6.jpg"),
    ],
  },
  {
    id: "5",
    name: "Mountain Gorilla Family",
    image: getGoogleDriveImageUrl("5.jpg"),
    description: "Intimate family portrait of mountain gorillas in Rwanda.",
    price: 450,
    fullDescription:
      "An intimate family portrait of mountain gorillas in their natural habitat in the Virunga Mountains of Rwanda. This photograph captures the gentle nature and complex social bonds of these endangered primates.",
    gallery: [
      getGoogleDriveImageUrl("5.jpg"),
      getGoogleDriveImageUrl("6.jpg"),
      getGoogleDriveImageUrl("7.jpg"),
    ],
  },
  {
    id: "6",
    name: "Leopard Close-Up",
    image: getGoogleDriveImageUrl("6.jpg"),
    description: "Stunning close-up portrait of a leopard showing intricate details.",
    price: 390,
    fullDescription:
      "An extraordinary close-up portrait of a leopard, showcasing the incredible detail of their spotted coat and intense gaze. This image captures the wild beauty and mysterious nature of one of Africa's most elusive big cats.",
    gallery: [
      getGoogleDriveImageUrl("6.jpg"),
      getGoogleDriveImageUrl("7.jpg"),
      getGoogleDriveImageUrl("8.jpg"),
    ],
  },
  {
    id: "7",
    name: "Forest Antelope",
    image: getGoogleDriveImageUrl("7.jpg"),
    description: "Graceful antelope in natural forest environment.",
    price: 320,
    fullDescription:
      "A beautiful capture of an antelope in its natural forest habitat. The image showcases the grace and elegance of these magnificent creatures, highlighting their natural beauty and the serene environment they call home.",
    gallery: [
      getGoogleDriveImageUrl("7.jpg"),
      getGoogleDriveImageUrl("8.jpg"),
      getGoogleDriveImageUrl("9.jpg"),
    ],
  },
  {
    id: "8",
    name: "Wildlife Conservation",
    image: getGoogleDriveImageUrl("8.jpg"),
    description: "Powerful wildlife conservation message with stunning imagery.",
    price: 300,
    fullDescription:
      "A powerful image that combines stunning wildlife photography with an important conservation message. This piece serves as both beautiful art and a reminder of our responsibility to protect these magnificent creatures.",
    gallery: [
      getGoogleDriveImageUrl("8.jpg"),
      getGoogleDriveImageUrl("9.jpg"),
      getGoogleDriveImageUrl("10.jpg"),
    ],
  },
  {
    id: "9",
    name: "African Safari Scene",
    image: getGoogleDriveImageUrl("9.jpg"),
    description: "Classic African safari landscape with wildlife.",
    price: 360,
    fullDescription:
      "A classic African safari scene capturing the essence of the wild. This image transports viewers to the heart of Africa, showcasing the natural beauty and wildlife that make this continent so special.",
    gallery: [
      getGoogleDriveImageUrl("9.jpg"),
      getGoogleDriveImageUrl("10.jpg"),
      getGoogleDriveImageUrl("11.jpg"),
    ],
  },
  {
    id: "10",
    name: "Wilderness Portrait",
    image: getGoogleDriveImageUrl("10.jpg"),
    description: "Intimate wildlife portrait in natural wilderness setting.",
    price: 340,
    fullDescription:
      "An intimate wildlife portrait taken in a pristine wilderness setting. This image captures the essence of wild animals in their natural habitat, showcasing their beauty and the importance of wildlife conservation.",
    gallery: [
      getGoogleDriveImageUrl("10.jpg"),
      getGoogleDriveImageUrl("11.jpg"),
      getGoogleDriveImageUrl("1.jpg"),
    ],
  },
  {
    id: "11",
    name: "Nature's Majesty",
    image: getGoogleDriveImageUrl("11.jpg"),
    description: "Majestic wildlife photograph celebrating nature's beauty.",
    price: 400,
    fullDescription:
      "A majestic wildlife photograph that celebrates the incredible beauty and diversity of nature. This image represents the culmination of patience, skill, and respect for wildlife, resulting in a truly spectacular capture.",
    gallery: [
      getGoogleDriveImageUrl("11.jpg"),
      getGoogleDriveImageUrl("1.jpg"),
      getGoogleDriveImageUrl("2.jpg"),
    ],
  },
]

/**
 * Get all products - tries to load from Google Sheets first, falls back to static data
 */
export async function getProducts(): Promise<Product[]> {
  try {
    const sheetData = await fetchGoogleSheetData()
    if (sheetData.length > 0) {
      console.log('✅ Loaded products from Google Sheets')
      return convertSheetDataToProducts(sheetData)
    }
  } catch (error) {
    console.warn('⚠️ Failed to load from Google Sheets, using static data:', error)
  }
  
  console.log('📋 Using static product data')
  return staticProducts
}

/**
 * Get products synchronously (static data only)
 * Use this for components that need immediate access
 */
export const products = staticProducts

/**
 * Get product by ID
 */
export const getProductById = (id: string): Product | undefined => {
  return staticProducts.find(product => product.id === id)
}

/**
 * Get product by ID (async version that checks Google Sheets)
 */
export async function getProductByIdAsync(id: string): Promise<Product | undefined> {
  const allProducts = await getProducts()
  return allProducts.find(product => product.id === id)
}

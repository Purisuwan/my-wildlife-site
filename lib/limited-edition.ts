/**
 * Limited Edition Products Data
 * These are exclusive, high-value prints with limited availability
 */

export interface LimitedEditionProduct {
  id: number
  title: string
  image: string
  category: string
  price: number
  featured: boolean
  description?: string
  edition?: string
  availability?: string
}

// Function to get limited edition image URL
export const getLimitedEditionImageUrl = (filename: string) => {
  // Map the simple filenames to actual uploaded image names in limited-edition folder
  const imageMap: { [key: string]: string } = {
    "limited1.jpg": "516930260_9954350284619283_2642336253183266056_n.jpg",
    "limited2.jpg": "518352313_10046510578736586_7739042478145945783_n.jpg",
    "limited3.jpg": "518811770_10038702709517373_2363748120092957531_n.jpg",
    // For limited4.jpg and above, we'll use placeholder until more images are uploaded
  }
  
  const actualFilename = imageMap[filename]
  if (actualFilename) {
    return `/images/limited-edition/${actualFilename}`
  }
  
  // If no mapping found, fall back to placeholder
  return `/images/limited-edition/placeholder.svg`
}

// Limited Edition Products Data
export const limitedEditionPrints: LimitedEditionProduct[] = [
  {
    id: 1,
    title: "Polar Reflections",
    image: getLimitedEditionImageUrl("limited1.jpg"),
    category: "Arctic",
    price: 2500,
    featured: true,
    description: "Exclusive Arctic wildlife photography capturing the pristine beauty of polar landscapes.",
    edition: "Limited to 50 prints",
    availability: "Available"
  },
  {
    id: 2,
    title: "Arctic Solitude",
    image: getLimitedEditionImageUrl("limited2.jpg"),
    category: "Arctic",
    price: 3200,
    featured: true,
    description: "A breathtaking moment of solitude in the Arctic wilderness.",
    edition: "Limited to 25 prints",
    availability: "Available"
  },
  {
    id: 3,
    title: "Eyes of the Wild",
    image: getLimitedEditionImageUrl("limited3.jpg"),
    category: "Big Cats",
    price: 2800,
    featured: false,
    description: "Intense gaze of a wild predator captured in perfect detail.",
    edition: "Limited to 75 prints",
    availability: "Available"
  },
  {
    id: 4,
    title: "Frozen Moment",
    image: getLimitedEditionImageUrl("limited4.jpg"),
    category: "Antarctic",
    price: 1800,
    featured: false,
    description: "A fleeting moment frozen in time in the Antarctic landscape.",
    edition: "Limited to 100 prints",
    availability: "Available"
  },
  {
    id: 5,
    title: "Underwater Ballet",
    image: getLimitedEditionImageUrl("limited5.jpg"),
    category: "Marine",
    price: 4500,
    featured: true,
    description: "Graceful marine life performing an underwater ballet.",
    edition: "Limited to 20 prints",
    availability: "Available"
  },
  {
    id: 6,
    title: "Mountain Majesty",
    image: getLimitedEditionImageUrl("limited6.jpg"),
    category: "Primates",
    price: 2200,
    featured: false,
    description: "Majestic primates in their natural mountain habitat.",
    edition: "Limited to 60 prints",
    availability: "Available"
  },
  {
    id: 7,
    title: "Arctic Hunter",
    image: getLimitedEditionImageUrl("limited7.jpg"),
    category: "Arctic",
    price: 3500,
    featured: false,
    description: "A powerful Arctic predator in hunting mode.",
    edition: "Limited to 30 prints",
    availability: "Available"
  },
  {
    id: 8,
    title: "Serengeti Sunset",
    image: getLimitedEditionImageUrl("limited8.jpg"),
    category: "African Safari",
    price: 1600,
    featured: false,
    description: "Golden hour magic on the African Serengeti.",
    edition: "Limited to 80 prints",
    availability: "Available"
  },
  {
    id: 9,
    title: "Leopard's Gaze",
    image: getLimitedEditionImageUrl("limited9.jpg"),
    category: "Big Cats",
    price: 3800,
    featured: true,
    description: "The piercing gaze of a leopard caught in perfect light.",
    edition: "Limited to 15 prints",
    availability: "Available"
  },
  {
    id: 10,
    title: "Ocean's Depth",
    image: getLimitedEditionImageUrl("limited10.jpg"),
    category: "Marine",
    price: 2400,
    featured: false,
    description: "Mysterious depths of the ocean captured in stunning detail.",
    edition: "Limited to 90 prints",
    availability: "Available"
  },
  {
    id: 11,
    title: "Wings of Freedom",
    image: getLimitedEditionImageUrl("limited11.jpg"),
    category: "Birds",
    price: 5200,
    featured: true,
    description: "Magnificent birds in flight, symbolizing ultimate freedom.",
    edition: "Limited to 10 prints",
    availability: "Available"
  },
  {
    id: 12,
    title: "Desert Nomad",
    image: getLimitedEditionImageUrl("limited12.jpg"),
    category: "Desert",
    price: 2900,
    featured: false,
    description: "Resilient desert wildlife adapting to harsh conditions.",
    edition: "Limited to 45 prints",
    availability: "Available"
  }
]

// Helper function to get all categories
export const getLimitedEditionCategories = () => {
  const categories = [...new Set(limitedEditionPrints.map(print => print.category))]
  return ["All", ...categories]
}

// Helper function to filter and sort prints
export const getFilteredLimitedEditionPrints = (category: string, sortOrder: string) => {
  let filtered = category === "All" 
    ? limitedEditionPrints 
    : limitedEditionPrints.filter(print => print.category === category)

  // Sort the filtered results
  switch (sortOrder) {
    case "featured":
      return filtered.sort((a, b) => {
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        return 0
      })
    case "price-low":
      return filtered.sort((a, b) => a.price - b.price)
    case "price-high":
      return filtered.sort((a, b) => b.price - a.price)
    case "name":
      return filtered.sort((a, b) => a.title.localeCompare(b.title))
    default:
      return filtered
  }
}

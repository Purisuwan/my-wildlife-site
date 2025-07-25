/**
 * Helper script to update Google Drive file IDs
 * 
 * INSTRUCTIONS:
 * 1. Go to your Google Drive folder: https://drive.google.com/drive/folders/19xMSHqFGMeaJTtmV8Jud4cxt4_IijZ_o?usp=sharing
 * 2. For each image file (1.jpg through 6.jpg):
 *    a. Right-click the file
 *    b. Select "Get shareable link" or "Share"
 *    c. Copy the shareable link
 *    d. Extract the file ID from the URL
 * 
 * Example:
 * If the shareable link is: https://drive.google.com/file/d/1ABC123DEF456GHI789/view?usp=sharing
 * Then the file ID is: 1ABC123DEF456GHI789
 * 
 * 3. Replace the placeholder IDs in lib/products.ts with the actual file IDs
 */

// Example of what the Google Drive URLs look like:
const exampleUrls = {
  shareableLink: "https://drive.google.com/file/d/1ABC123DEF456GHI789/view?usp=sharing",
  directImageUrl: "https://drive.google.com/uc?export=view&id=1ABC123DEF456GHI789"
}

// Function to extract file ID from Google Drive URL
export function extractFileIdFromUrl(url: string): string | null {
  const patterns = [
    /\/file\/d\/([a-zA-Z0-9-_]+)/,
    /\/d\/([a-zA-Z0-9-_]+)/,
    /id=([a-zA-Z0-9-_]+)/
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) {
      return match[1]
    }
  }
  
  return null
}

// Test the function
console.log("Example file ID extraction:")
console.log(extractFileIdFromUrl(exampleUrls.shareableLink)) // Should output: 1ABC123DEF456GHI789

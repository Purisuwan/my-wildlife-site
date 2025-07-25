/**
 * Utility functions for handling Google Drive images
 */

/**
 * Extracts the file ID from a Google Drive sharing URL
 * Example: https://drive.google.com/file/d/1ABC123/view?usp=sharing -> 1ABC123
 */
export function extractGoogleDriveFileId(url: string): string | null {
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

/**
 * Converts a Google Drive sharing URL to a direct download URL
 */
export function getGoogleDriveDirectUrl(fileId: string): string {
  return `https://drive.google.com/uc?export=view&id=${fileId}`
}

/**
 * Helper function to get optimized image URL with size parameters
 */
export function getOptimizedGoogleDriveUrl(fileId: string, size?: number): string {
  const baseUrl = `https://drive.google.com/uc?export=view&id=${fileId}`
  return size ? `${baseUrl}&sz=${size}` : baseUrl
}

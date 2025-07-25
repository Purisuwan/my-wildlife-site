# Dynamic Product Data Setup

Your Next.js website has been successfully updated to use dynamic product data instead of static placeholders. Here's what has been implemented:

## ✅ What's Done

1. **Created shared data structure** (`lib/products.ts`)
   - Centralized product information
   - TypeScript interfaces for type safety
   - Google Drive image URL generation

2. **Updated Store page** (`app/store/page.tsx`)
   - Removed static product array
   - Now imports from shared data file
   - All existing functionality preserved (lightbox, cart, navigation)

3. **Updated Product Detail page** (`app/store/product/[id]/page.tsx`)
   - Uses shared `getProductById` function
   - Removed duplicate product data
   - All existing functionality preserved

4. **Added helper utilities**
   - Google Drive URL handling (`lib/google-drive.ts`)
   - File ID extraction script (`scripts/get-drive-file-ids.ts`)

## 🔧 Final Step Required

To display the actual Google Drive images, you need to get the file IDs:

### How to Get Google Drive File IDs:

1. **Open your Google Drive folder**:
   https://drive.google.com/drive/folders/19xMSHqFGMeaJTtmV8Jud4cxt4_IijZ_o?usp=sharing

2. **For each image file** (1.jpg through 6.jpg):
   - Right-click the file
   - Select "Get shareable link" or "Share"
   - Copy the shareable link

3. **Extract the file ID** from each URL:
   ```
   Example URL: https://drive.google.com/file/d/1ABC123DEF456GHI789/view?usp=sharing
   File ID: 1ABC123DEF456GHI789
   ```

4. **Update the file IDs** in `lib/products.ts`:
   ```typescript
   const fileIds: { [key: string]: string } = {
     "1.jpg": "YOUR_ACTUAL_FILE_ID_FOR_1_JPG",
     "2.jpg": "YOUR_ACTUAL_FILE_ID_FOR_2_JPG",
     // ... etc
   }
   ```

## 🎯 Current Status

- ✅ Application builds successfully
- ✅ Development server runs on http://localhost:3000
- ✅ All existing functionality preserved:
  - Store page navigation
  - Product detail pages (`/store/product/[id]`)
  - Image lightbox/zoom functionality
  - Shopping cart integration
- ✅ Ready for Google Drive file IDs

## 🔄 How It Works

1. **Store Page**: Displays all products in a grid, clicking images opens lightbox
2. **Product Links**: Clicking product names navigates to `/store/product/[id]`
3. **Product Detail**: Shows individual product with image gallery
4. **Image Sources**: Currently using placeholders, will switch to Google Drive images once file IDs are added

## 📝 Notes

- The layout and design remain exactly the same
- All existing functionality (lightbox, cart, navigation) is preserved
- Images will fallback to placeholders until Google Drive file IDs are updated
- The website is fully functional and ready for production once file IDs are added

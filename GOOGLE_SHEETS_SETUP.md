# 🔗 Google Sheets Integration Setup

## 📋 Overview
Your website can now load product data dynamically from Google Sheets while keeping your existing layout and functionality intact!

## 🎯 Google Sheets Format
Your Google Sheet should have these columns (column names can vary):

| Column | Description | Example |
|--------|-------------|---------|
| `id` | Unique product identifier | 1, 2, 3, etc. |
| `title` or `name` | Product name | "Sunset Serenity Print" |
| `price` | Product price (number) | 280, 350, 420 |
| `description` | Short description | "Beautiful sunset landscape..." |
| `full_description` | Long description (optional) | "A breathtaking sunset scene..." |
| `image_filename` | Image filename (optional) | "1.jpg", "sunset.jpg" |
| `category` | Product category (optional) | "Wildlife", "Landscape" |

## 🚀 Setup Steps

### Step 1: Prepare Your Google Sheet
1. **Open your Google Sheet**: https://docs.google.com/spreadsheets/d/1JRe1c8DGR67b8z7GDifhCQN9OqwMSE0KTe_C8DG1Ues/edit
2. **Make it public**:
   - Click "Share" button
   - Change access to "Anyone with the link can view"
   - Click "Done"

### Step 2: Update Your Pages (Choose One Option)

#### Option A: Keep Current Static Data (Recommended for now)
- Your website works perfectly as-is with your 11 uploaded images
- No changes needed - everything continues working

#### Option B: Enable Google Sheets Integration
Update your store page to use dynamic data:

**In `app/store/page.tsx`:**
```typescript
// Replace this import:
import { products } from "@/lib/products"

// With this:
import { getProducts } from "@/lib/products-dynamic"

// Then update the component to be async:
export default async function StorePage() {
  const products = await getProducts() // This will load from Google Sheets
  // ... rest of your component stays the same
}
```

**In `app/store/product/[id]/page.tsx`:**
```typescript
// Replace this import:
import { getProductById } from "@/lib/products"

// With this:
import { getProductByIdAsync } from "@/lib/products-dynamic"

// Then update the component:
export default async function ProductDetailPage() {
  const params = useParams()
  const product = await getProductByIdAsync(params.id as string)
  // ... rest of your component stays the same
}
```

### Step 3: Test the Integration
1. **Start with static data** (Option A) - everything works perfectly
2. **When ready**, switch to Google Sheets (Option B)
3. **Fallback protection**: If Google Sheets fails, it automatically uses your static data

## 🔧 Configuration

### Image Mapping
The system maps your Google Sheets data to your uploaded images:
- If your sheet has `image_filename` column, it uses that
- Otherwise, it uses the product `id` (e.g., "1.jpg", "2.jpg")
- Your 11 uploaded images are already mapped and working

### Error Handling
- ✅ If Google Sheets is unavailable → uses static data
- ✅ If network fails → uses static data  
- ✅ If data is malformed → uses static data
- ✅ Your website always works!

## 📊 Current Status
- ✅ **11 images uploaded and working perfectly**
- ✅ **Static product data configured**
- ✅ **Google Sheets integration ready**
- ✅ **Fallback system in place**
- ✅ **All existing functionality preserved**

## 🎯 Recommendations

1. **Start with static data** - Your site works perfectly now
2. **Test Google Sheets separately** - Make sure your sheet format is correct
3. **Switch when ready** - Easy one-line change in your components
4. **Keep both options** - Static data as reliable fallback

Your website is production-ready with beautiful images and can easily switch to Google Sheets data when you're ready! 🚀

/**
 * Test page to verify Google Sheets integration
 * Visit /test-sheets to see if data loads from your Google Sheet
 */

"use client"

import { useState } from 'react'
import { fetchGoogleSheetData } from '@/lib/google-sheets'
import { Button } from '@/components/ui/button'

export default function TestSheetsPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const testFetch = async () => {
    setLoading(true)
    setError('')
    try {
      const result = await fetchGoogleSheetData()
      setData(result)
      console.log('Google Sheets data:', result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Google Sheets Integration Test</h1>
      
      <div className="mb-6">
        <p className="mb-4">
          This page tests the connection to your Google Sheet:
          <br />
          <a 
            href="https://docs.google.com/spreadsheets/d/1JRe1c8DGR67b8z7GDifhCQN9OqwMSE0KTe_C8DG1Ues/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            View Google Sheet
          </a>
        </p>
        
        <Button onClick={testFetch} disabled={loading}>
          {loading ? 'Loading...' : 'Test Google Sheets Connection'}
        </Button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <strong>Error:</strong> {error}
          <p className="mt-2 text-sm">
            Make sure your Google Sheet is public (Anyone with the link can view)
          </p>
        </div>
      )}

      {data && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          <strong>Success!</strong> Loaded {data.length} products from Google Sheets
        </div>
      )}

      {data && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Raw Data from Google Sheets:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96 text-sm">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}

      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h3 className="font-semibold mb-2">Expected Google Sheet format:</h3>
        <p className="text-sm">Your sheet should have columns like:</p>
        <ul className="text-sm mt-2 list-disc ml-6">
          <li><code>id</code> - Product identifier (1, 2, 3, etc.)</li>
          <li><code>title</code> - Product name</li>
          <li><code>price</code> - Product price (number)</li>
          <li><code>description</code> - Short description</li>
          <li><code>full_description</code> - Long description (optional)</li>
          <li><code>image_filename</code> - Image filename (optional)</li>
        </ul>
      </div>
    </div>
  )
}

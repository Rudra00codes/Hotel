import { useEffect, useState } from 'react'
import { sanityClient } from '../lib/sanity'
import { SETTINGS_QUERY, ROOMS_QUERY } from '../utils/sanityQueries'

export default function SanityTest() {
  const [settings, setSettings] = useState<any>(null)
  const [rooms, setRooms] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const [settingsData, roomsData] = await Promise.all([
          sanityClient.fetch(SETTINGS_QUERY),
          sanityClient.fetch(ROOMS_QUERY),
        ])
        setSettings(settingsData)
        setRooms(roomsData)
        setError(null)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-grotesk text-lg">Loading Sanity data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8 max-w-2xl">
          <h1 className="text-2xl font-grotesk font-bold text-red-800 mb-4">❌ Connection Error</h1>
          <p className="text-red-600 mb-4 font-grotesk">{error}</p>
          <div className="bg-white rounded p-4 text-sm">
            <p className="font-grotesk font-semibold mb-2">Troubleshooting:</p>
            <ul className="list-disc ml-5 space-y-1 text-gray-700 font-grotesk">
              <li>Verify VITE_SANITY_PROJECT_ID in .env.local is: cbloy2zn</li>
              <li>Restart the React dev server after env changes</li>
              <li>Check Sanity Studio is running at http://localhost:3333</li>
              <li>Add some content in Sanity Studio first</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-grotesk font-extrabold text-gray-900 mb-8 uppercase tracking-wide">
          ✅ Sanity Connection Test
        </h1>

        {/* Hotel Settings */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-grotesk font-bold text-green-600 mb-4 uppercase">
            Hotel Settings
          </h2>
          {settings ? (
            <div className="space-y-2 font-grotesk">
              <p><strong>Name:</strong> {settings.hotelName || 'Not set'}</p>
              <p><strong>Phone:</strong> {settings.phone1 || 'Not set'}</p>
              <p><strong>Email:</strong> {settings.email || 'Not set'}</p>
              <p><strong>Address:</strong> {settings.address || 'Not set'}</p>
              <p><strong>Check-in:</strong> {settings.checkInTime || 'Not set'}</p>
              <p><strong>Check-out:</strong> {settings.checkOutTime || 'Not set'}</p>
            </div>
          ) : (
            <p className="text-yellow-600 font-grotesk">
              ⚠️ No settings found. Add Hotel Settings in Sanity Studio.
            </p>
          )}
        </div>

        {/* Rooms */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-grotesk font-bold text-blue-600 mb-4 uppercase">
            Rooms ({rooms.length})
          </h2>
          {rooms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rooms.map((room) => (
                <div key={room._id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                  {room.images?.[0]?.url && (
                    <img 
                      src={room.images[0].url} 
                      alt={room.images[0].alt || room.name}
                      className="w-full h-48 object-cover rounded mb-3"
                    />
                  )}
                  <h3 className="font-grotesk font-bold text-lg mb-2">{room.name}</h3>
                  <p className="text-sm text-gray-600 mb-2 font-grotesk">{room.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-grotesk font-semibold text-blue-600">
                      {room.category?.toUpperCase()}
                    </span>
                    <span className="text-sm font-grotesk font-bold text-green-600">
                      {room.priceRange}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-yellow-600 font-grotesk">
              ⚠️ No rooms found. Add Rooms in Sanity Studio.
            </p>
          )}
        </div>

        {/* Raw Data */}
        <details className="bg-gray-800 text-gray-100 rounded-lg p-6">
          <summary className="cursor-pointer font-grotesk font-bold text-lg mb-4">
            📊 Raw Data (Click to expand)
          </summary>
          <div className="space-y-4">
            <div>
              <h3 className="font-grotesk font-bold mb-2">Settings:</h3>
              <pre className="bg-gray-900 p-4 rounded overflow-auto text-sm">
                {JSON.stringify(settings, null, 2)}
              </pre>
            </div>
            <div>
              <h3 className="font-grotesk font-bold mb-2">Rooms:</h3>
              <pre className="bg-gray-900 p-4 rounded overflow-auto text-sm">
                {JSON.stringify(rooms, null, 2)}
              </pre>
            </div>
          </div>
        </details>

        <div className="mt-8 bg-green-50 border-2 border-green-200 rounded-lg p-6">
          <h3 className="font-grotesk font-bold text-green-800 text-xl mb-3">
            🎉 Next Steps:
          </h3>
          <ol className="list-decimal ml-5 space-y-2 text-gray-700 font-grotesk">
            <li>Add more content in Sanity Studio (http://localhost:3333)</li>
            <li>Update page components to use Sanity queries</li>
            <li>Remove static data files once migration is complete</li>
            <li>Deploy Sanity Studio: <code className="bg-green-100 px-2 py-1 rounded">npm run deploy</code></li>
          </ol>
        </div>
      </div>
    </div>
  )
}

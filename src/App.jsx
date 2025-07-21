import Header from './components/Header'
import CategorySection from './components/CategorySection'
import { useApi } from './hooks/useApi'
import { mockProducts } from './data/mockData'
import './App.css'

function App() {
  const { data: apiData, loading, error } = useApi('/accounts/by-category')
  
  // Use API data if available, otherwise fall back to mock data
  const productsData = apiData || mockProducts

  const handleViewAll = (category, subcategory) => {
    console.log(`View all for ${category} - ${subcategory}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading accounts...</p>
        </div>
      </div>
    )
  }

  if (error) {
    console.warn('API Error, using mock data:', error)
    // Continue with mock data if API fails
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        {/* News Banner */}
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6 rounded">
          <p className="text-sm text-yellow-800">
            <strong>News, promotions, coupons, announcements</strong> are published on our news site - 
            <a href="#" className="text-yellow-900 underline ml-1">accsmarket.news</a>
          </p>
        </div>

        {/* Category Sections */}
        <div className="space-y-6">
          {Object.entries(productsData).map(([category, subcategories]) => 
            Object.entries(subcategories).map(([subcategory, products]) => (
              <CategorySection
                key={`${category}-${subcategory}`}
                category={category}
                subcategory={subcategory}
                products={products}
                onViewAll={() => handleViewAll(category, subcategory)}
              />
            ))
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">AccsMarket</h3>
              <p className="text-sm text-gray-400">
                Your trusted marketplace for social media accounts
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Use</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Refund Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Sellers</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white">Become a Seller</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Seller Guidelines</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Seller Dashboard</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 AccsMarket. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

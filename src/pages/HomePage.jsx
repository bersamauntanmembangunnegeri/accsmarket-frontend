import CategorySection from '../components/CategorySection'
import { useApi } from '../hooks/useApi'
import { mockProducts } from '../data/mockData'

const HomePage = () => {
  const { data: apiData, loading, error } = useApi('/accounts/by-category')
  
  // Use API data if available, otherwise fall back to mock data
  const productsData = apiData || mockProducts

  const handleViewAll = (category, subcategory) => {
    console.log(`View all for ${category} - ${subcategory}`)
    // TODO: Navigate to category page
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
  )
}

export default HomePage


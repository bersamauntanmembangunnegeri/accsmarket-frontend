import { useParams, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import { useApi } from '../hooks/useApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const CategoryPage = () => {
  const { category, subcategory } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest')
  const [priceRange, setPriceRange] = useState({
    min: searchParams.get('minPrice') || '',
    max: searchParams.get('maxPrice') || ''
  })

  const buildApiEndpoint = () => {
    const params = new URLSearchParams()
    if (category) params.set('platform', category)
    if (searchTerm) params.set('search', searchTerm)
    if (priceRange.min) params.set('min_price', priceRange.min)
    if (priceRange.max) params.set('max_price', priceRange.max)

    const queryString = params.toString()
    return `/accounts${queryString ? `?${queryString}` : ''}`
  }

  const { data: accounts, loading, error, refetch } = useApi(buildApiEndpoint())

  useEffect(() => {
    refetch()
  }, [searchTerm, category, subcategory, priceRange.min, priceRange.max, refetch])

  // Sort accounts client-side for now, as backend sorting is not implemented yet
  const sortedAccounts = accounts?.accounts?.sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'stock':
        return b.stock_quantity - a.stock_quantity
      default: // newest
        return new Date(b.created_at) - new Date(a.created_at)
    }
  }) || []

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchTerm) params.set('search', searchTerm)
    if (sortBy !== 'newest') params.set('sort', sortBy)
    if (priceRange.min) params.set('minPrice', priceRange.min)
    if (priceRange.max) params.set('maxPrice', priceRange.max)
    setSearchParams(params)
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

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {category} {subcategory && `- ${subcategory}`}
        </h1>
        <p className="text-gray-600">
          {sortedAccounts.length} accounts available
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <Input
              placeholder="Search accounts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="stock">Most Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
            <Input
              type="number"
              placeholder="0.00"
              value={priceRange.min}
              onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
            <Input
              type="number"
              placeholder="100.00"
              value={priceRange.max}
              onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
            />
          </div>
        </div>
        <div className="mt-4">
          <Button onClick={handleSearch} className="bg-red-600 hover:bg-red-700">
            Apply Filters
          </Button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedAccounts.map((account) => (
          <ProductCard
            key={account.id}
            platform={account.platform}
            title={account.title}
            description={account.description}
            price={account.price}
            stock={account.stock_quantity}
            rating={account.rating}
            successRate={account.success_rate}
            minOrder={account.min_order_quantity}
            accountId={account.id}
          />
        ))}
      </div>

      {/* No Results */}
      {sortedAccounts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No accounts found matching your criteria.</p>
          <Button 
            onClick={() => {
              setSearchTerm('')
              setPriceRange({ min: '', max: '' })
              setSortBy('newest')
              setSearchParams({})
            }}
            variant="outline"
            className="mt-4"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}

export default CategoryPage


